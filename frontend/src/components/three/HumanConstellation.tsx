import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function createSeededRandom(seed: number): () => number {
  let state = seed;

  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const rand = createSeededRandom(1337);

// ─── Constants ───────────────────────────────────────────────────────────────
const COLOR_CYAN = new THREE.Color("#8BE9FD");
const COLOR_PURPLE = new THREE.Color("#BD93F9");

// Rotation limits (radians)
const HEAD_MAX_ROT_Y = 20 * THREE.MathUtils.DEG2RAD; // ±20°
const HEAD_MAX_ROT_X = 10 * THREE.MathUtils.DEG2RAD; // ±10°
const TORSO_FOLLOW_RATIO = 0.3; // torso follows 30% of head target
const HEAD_FOLLOW_RATIO = 0.7; // neck follows the remaining 70%

// Animation speeds
const HOVER_SPEED = 0.8;
const HOVER_AMPLITUDE = 0.08;
const BREATHE_SPEED = 1.5;
const BREATHE_AMPLITUDE = 0.012;
const AURA_ORBIT_SPEED = 0.15;

// Damping lambdas (higher = faster convergence)
const TORSO_DAMP = 2;
const NECK_DAMP = 3;
const EYE_DAMP = 4;

// Neck pivot sits at the top of the neck cylinder
const NECK_PIVOT_Y = 1.35;
const HEAD_OFFSET_Y = 0.2;

// ─── Procedural Geometry Helpers ─────────────────────────────────────────────

function randomPointInEllipsoid(rx: number, ry: number, rz: number, rand: () => number): THREE.Vector3 {
  const u = rand();
  const v = rand();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = Math.cbrt(rand());

  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta) * rx,
    r * Math.sin(phi) * Math.sin(theta) * ry,
    r * Math.cos(phi) * rz
  );
}

function randomPointInCylinder(rTop: number, rBottom: number, height: number, rand: () => number): THREE.Vector3 {
  const h = (rand() - 0.5) * height;
  const t = (h + height / 2) / height;
  const radius = rBottom + (rTop - rBottom) * t;

  const r = radius * Math.sqrt(rand());
  const theta = rand() * 2 * Math.PI;

  return new THREE.Vector3(r * Math.cos(theta), h, r * Math.sin(theta));
}

function generatePart(
  type: "ellipsoid" | "cylinder",
  count: number,
  params: number[],
  offset: THREE.Vector3,
  rotation: THREE.Euler | undefined,
  rand: () => number
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const p =
      type === "ellipsoid"
        ? randomPointInEllipsoid(params[0], params[1], params[2], rand)
        : randomPointInCylinder(params[0], params[1], params[2], rand);

    if (rotation) p.applyEuler(rotation);
    p.add(offset);
    pts.push(p);
  }
  return pts;
}

/** Map a Y coordinate to the cyan/purple gradient based on body height range. */
function getColorForY(y: number): THREE.Color {
  const t = THREE.MathUtils.clamp((y + 1.5) / 3.3, 0, 1);
  return COLOR_PURPLE.clone().lerp(COLOR_CYAN, t);
}

/** Pack Vector3[] into position + vertex-color Float32Arrays. */
function formatPointData(pts: THREE.Vector3[], colorOffsetY = 0) {
  const pos = new Float32Array(pts.length * 3);
  const col = new Float32Array(pts.length * 3);
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    pos[i * 3] = p.x;
    pos[i * 3 + 1] = p.y;
    pos[i * 3 + 2] = p.z;
    const c = getColorForY(p.y + colorOffsetY);
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  return { pos, col };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HumanConstellation() {
  // Refs
  const mainGroupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const neckPivotRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Group>(null);
  const eyesMaterialRef = useRef<THREE.PointsMaterial>(null);

  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  // Accessibility: cache reduced-motion preference in state so it's SSR-safe
  // and doesn't re-query the media query on every render.
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // ── Static geometry (generated once) ──────────────────────────────────────

  const { headData, bodyData, auraData, eyePositions } = useMemo(() => {
    // Head: dense ellipsoid centered at origin (positioned via group offset)
    const headPts = generatePart(
      "ellipsoid", 600, [0.18, 0.25, 0.2], new THREE.Vector3(0, 0, 0), undefined, rand
    );

    // Body: neck + torso + arms + legs
    const bodyPts = [
      ...generatePart("cylinder", 150, [0.08, 0.1, 0.2], new THREE.Vector3(0, 1.25, 0), undefined, rand),     // Neck
      ...generatePart("cylinder", 1200, [0.4, 0.25, 1.1], new THREE.Vector3(0, 0.6, 0), undefined, rand),      // Torso
      ...generatePart("cylinder", 250, [0.12, 0.1, 0.6], new THREE.Vector3(-0.5, 0.8, 0), new THREE.Euler(0, 0, 0.2), rand),   // L Upper Arm
      ...generatePart("cylinder", 250, [0.12, 0.1, 0.6], new THREE.Vector3(0.5, 0.8, 0), new THREE.Euler(0, 0, -0.2), rand),   // R Upper Arm
      ...generatePart("cylinder", 200, [0.1, 0.08, 0.6], new THREE.Vector3(-0.6, 0.2, 0), new THREE.Euler(0, 0, 0.1), rand),   // L Forearm
      ...generatePart("cylinder", 200, [0.1, 0.08, 0.6], new THREE.Vector3(0.6, 0.2, 0), new THREE.Euler(0, 0, -0.1), rand),   // R Forearm
      ...generatePart("cylinder", 400, [0.15, 0.12, 0.8], new THREE.Vector3(-0.18, -0.3, 0), undefined, rand), // L Thigh
      ...generatePart("cylinder", 400, [0.15, 0.12, 0.8], new THREE.Vector3(0.18, -0.3, 0), undefined, rand),  // R Thigh
      ...generatePart("cylinder", 300, [0.12, 0.08, 0.8], new THREE.Vector3(-0.18, -1.1, 0), undefined, rand), // L Calf
      ...generatePart("cylinder", 300, [0.12, 0.08, 0.8], new THREE.Vector3(0.18, -1.1, 0), undefined, rand),  // R Calf
    ];

    const formattedHead = formatPointData(headPts, NECK_PIVOT_Y + HEAD_OFFSET_Y);
    const formattedBody = formatPointData(bodyPts, 0);

    // Aura: ring of particles orbiting the upper body
    const auraPts: THREE.Vector3[] = [];
    for (let i = 0; i < 400; i++) {
      const r = 0.6 + rand() * 0.8;
      const theta = rand() * 2 * Math.PI;
      const y = 0.5 + rand() * 1.5;
      auraPts.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
    }

    const auraPos = new Float32Array(auraPts.length * 3);
    const auraCol = new Float32Array(auraPts.length * 3);
    const linesArray: number[] = [];

    for (let i = 0; i < auraPts.length; i++) {
      const p = auraPts[i];
      auraPos[i * 3] = p.x;
      auraPos[i * 3 + 1] = p.y;
      auraPos[i * 3 + 2] = p.z;
      auraCol[i * 3] = COLOR_CYAN.r;
      auraCol[i * 3 + 1] = COLOR_CYAN.g;
      auraCol[i * 3 + 2] = COLOR_CYAN.b;

      // ~20% of particles attempt neural connections
      if (rand() > 0.8) {
        for (let j = i + 1; j < auraPts.length; j++) {
          if (p.distanceTo(auraPts[j]) < 0.4) {
            linesArray.push(p.x, p.y, p.z, auraPts[j].x, auraPts[j].y, auraPts[j].z);
          }
        }
      }
    }

    // Pre-allocate eye positions (two points: left eye, right eye)
    const eyes = new Float32Array([-0.06, 0, 0, 0.06, 0, 0]);

    return {
      headData: formattedHead,
      bodyData: formattedBody,
      auraData: { pos: auraPos, col: auraCol, lines: new Float32Array(linesArray) },
      eyePositions: eyes,
    };
  }, []);

  // ── Animation Loop ────────────────────────────────────────────────────────

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const t = state.clock.elapsedTime;
    const { x: mouseX, y: mouseY } = state.pointer;

    // ── Cursor tracking ──
    if (bodyRef.current && neckPivotRef.current) {
      const targetY = mouseX * HEAD_MAX_ROT_Y;
      const targetX = -mouseY * HEAD_MAX_ROT_X;

      // Torso: subtle follow
      bodyRef.current.rotation.y = THREE.MathUtils.damp(
        bodyRef.current.rotation.y, targetY * TORSO_FOLLOW_RATIO, TORSO_DAMP, delta
      );

      // Neck pivot: primary head tracking
      neckPivotRef.current.rotation.y = THREE.MathUtils.damp(
        neckPivotRef.current.rotation.y, targetY * HEAD_FOLLOW_RATIO, NECK_DAMP, delta
      );
      neckPivotRef.current.rotation.x = THREE.MathUtils.damp(
        neckPivotRef.current.rotation.x, targetX, NECK_DAMP, delta
      );
    }

    // ── Global hover + breathing ──
    if (mainGroupRef.current) {
      mainGroupRef.current.position.y = Math.sin(t * HOVER_SPEED) * HOVER_AMPLITUDE;
      const s = 1 + Math.sin(t * BREATHE_SPEED) * BREATHE_AMPLITUDE;
      mainGroupRef.current.scale.set(s, s, s);
    }

    // ── Eye glow: intensifies with cursor activity (clamped to [0.5, 1.0]) ──
    if (eyesMaterialRef.current) {
      const cursorMagnitude = Math.sqrt(mouseX * mouseX + mouseY * mouseY); // 0 → ~1.41
      const targetOpacity = THREE.MathUtils.clamp(0.5 + cursorMagnitude * 0.35, 0.5, 1.0);
      eyesMaterialRef.current.opacity = THREE.MathUtils.damp(
        eyesMaterialRef.current.opacity, targetOpacity, EYE_DAMP, delta
      );
    }

    // ── Aura orbit ──
    if (auraRef.current) {
      auraRef.current.rotation.y = t * AURA_ORBIT_SPEED;
    }
  });

  // ── Early return for mobile ───────────────────────────────────────────────
  if (isMobile) return null;

  const positionX = viewport.width * 0.25;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <group position={[positionX, -0.2, 0]} scale={1.1}>
      <group ref={mainGroupRef}>

        {/* Body (torso + limbs) — rotates subtly with cursor */}
        <group ref={bodyRef}>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[bodyData.pos, 3]} />
              <bufferAttribute attach="attributes-color" args={[bodyData.col, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={0.025}
              vertexColors
              transparent
              opacity={0.5}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              sizeAttenuation
            />
          </points>

          {/* Neck Pivot — primary rotation point for head tracking */}
          <group ref={neckPivotRef} position={[0, NECK_PIVOT_Y, 0]}>
            <group position={[0, HEAD_OFFSET_Y, 0]}>

              {/* Head particles */}
              <points>
                <bufferGeometry>
                  <bufferAttribute attach="attributes-position" args={[headData.pos, 3]} />
                  <bufferAttribute attach="attributes-color" args={[headData.col, 3]} />
                </bufferGeometry>
                <pointsMaterial
                  size={0.025}
                  vertexColors
                  transparent
                  opacity={0.7}
                  depthWrite={false}
                  blending={THREE.AdditiveBlending}
                  sizeAttenuation
                />
              </points>

              {/* Eyes — two bright cyan dots that glow with cursor proximity */}
              <points position={[0, 0.02, 0.18]}>
                <bufferGeometry>
                  <bufferAttribute attach="attributes-position" args={[eyePositions, 3]} />
                </bufferGeometry>
                <pointsMaterial
                  ref={eyesMaterialRef}
                  color="#00ffff"
                  size={0.05}
                  transparent
                  opacity={0.5}
                  depthWrite={false}
                  blending={THREE.AdditiveBlending}
                  sizeAttenuation
                />
              </points>

            </group>
          </group>
        </group>

        {/* Aura — orbiting particles with neural connections */}
        <group ref={auraRef}>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[auraData.pos, 3]} />
              <bufferAttribute attach="attributes-color" args={[auraData.col, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={0.02}
              vertexColors
              transparent
              opacity={0.3}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              sizeAttenuation
            />
          </points>

          {auraData.lines.length > 0 && (
            <lineSegments>
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[auraData.lines, 3]} />
              </bufferGeometry>
              <lineBasicMaterial
                color="#8BE9FD"
                transparent
                opacity={0.1}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </lineSegments>
          )}
        </group>

      </group>
    </group>
  );
}

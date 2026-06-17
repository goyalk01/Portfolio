import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import GlowCursor from "../ui/GlowCursor";

const ParticleBackground = lazy(() => import("../three/ParticleBackground"));

export default function Layout() {
  return (
    <div className="relative min-h-screen">
      <GlowCursor />
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <Header />

      <PageTransition>
        <Outlet />
      </PageTransition>

      <Footer />
    </div>
  );
}

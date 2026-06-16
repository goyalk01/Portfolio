import os
import json
from dotenv import load_dotenv
from google import genai
from pypdf import PdfReader

load_dotenv()

def extract_text_from_pdf(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error reading PDF {pdf_path}: {e}")
        return None

def analyze_linkedin_profile(text):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY not found. Please add to .env file.")
        return None
        
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are an intelligent profile parser. Extract the following structured information from this LinkedIn profile text:
    
    Profile Text:
    {text}
    
    Return a JSON object with:
    - headline
    - summary
    - experience (list of objects: company, title, duration, description)
    - education (list of objects: school, degree, duration)
    - certifications (list of objects: title, issuer)
    - skills (list of strings)
    
    Ensure the output is valid JSON only, without markdown formatting like ```json.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        text_resp = response.text.strip()
        if text_resp.startswith("```json"):
            text_resp = text_resp[7:]
        if text_resp.endswith("```"):
            text_resp = text_resp[:-3]
            
        return json.loads(text_resp.strip())
    except Exception as e:
        print(f"Error during Gemini analysis: {e}")
        return None

if __name__ == "__main__":
    input_file = "inputs/linkedin_profile.pdf"
    
    if not os.path.exists(input_file):
        print(f"Please place your exported LinkedIn PDF at {input_file}")
    else:
        print(f"Extracting text from {input_file}...")
        text = extract_text_from_pdf(input_file)
        
        if text:
            print("Analyzing with Gemini...")
            result = analyze_linkedin_profile(text)
            
            if result:
                output_dir = "outputs"
                os.makedirs(output_dir, exist_ok=True)
                
                with open(f"{output_dir}/linkedin_data.json", "w") as f:
                    json.dump(result, f, indent=2)
                    
                print(f"Saved LinkedIn analysis to {output_dir}/linkedin_data.json")

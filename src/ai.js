import { GoogleGenerativeAI } from "@google/generative-ai";
import resume from "./resume.json";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function askResumeBot(question) {
  const context = JSON.stringify(resume, null, 2);

  const prompt = `
  You are a chatbot assistant that answers based ONLY on Yash Pawar's resume.

  Resume JSON:
  ${context}

  User question: "${question}"
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

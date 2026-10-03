import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, targetCompany, jobRole, keySkills } = req.body;

  if (!name || !targetCompany || !jobRole || !keySkills) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Write a formal, high-quality cover letter for ${name} applying for ${jobRole} at ${targetCompany}. Key skills: ${keySkills}.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return res.status(200).json({ coverLetter: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate cover letter.' });
  }
}
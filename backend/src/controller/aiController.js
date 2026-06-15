import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const fixCode = async (req, res) => {
    try {
        const { code, language } = req.body;

        if (!code) {
            return
             res.status(400)
             .json(
                { message: 'please provide code' }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

        let prompt = `You are an expert Senior Software Engineer. The user has provided the following code that might have errors or needs optimization:\n\n${code}\n\n`;

        if (language === 'Sinhala') {
            prompt += `Please provide the corrected code. Keep the code blocks in English. However, write the explanation of the errors and how you fixed them ENTIRELY IN SINHALA language. Format your response using Markdown, with separate sections for 'Corrected Code' and 'Explanation'.`;
        } else {
            prompt += `Please provide the corrected code. Explain the errors and how you fixed them clearly in English. Format your response using Markdown, with separate sections for 'Corrected Code' and 'Explanation'.`;
        }

        const result = await model.generateContent(prompt);
        const aiResponse = result.response.text();

        res.json({
             success: true,
              data: aiResponse 
            });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500)
        .json({
             success: false, 
             message: error.message });
    }
};
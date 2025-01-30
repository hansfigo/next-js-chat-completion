import { NextApiRequest, NextApiResponse } from 'next';
import OpenAi from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (!process.env.OPENAI_API_KEY) {
        res.status(500).json({ error: "Tidak Ada Api Key !!" })
    }
    // Get Input user dari request
    const { prompt } = req.body;


    if (!prompt) {
        res.status(400).json({ error: "Prompt Tidak boleh Kosong" })
    }

    // Setting API KEY dari env
    const configuration = {
        apiKey: process.env.OPENAI_API_KEY,
    }

    // Appy Setting tadi
    const openai = new OpenAi(configuration);

    try {
        // Buat Request ke GPT
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 200,
            temperature: 0.6,
        });

        //return Hasil dari request Chat gpt
        res.status(200).json(response.choices[0].text)
    } catch (error: any) {

        console.log("ERR : ", error.message);

        res.status(500).json({ error: error.message })
    }

}
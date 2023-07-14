import { NextApiResponse, NextApiRequest } from 'next'
import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get Input user dari request
    const { prompt } = JSON.parse(req.body);

    // Setting API KEY dari env
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Appy Setting tadi
    const openai = new OpenAIApi(configuration);

    // Buat Request ke GPT
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.6,
    });

    //return Hasil dari request Chat gpt
    res.status(200).json(response.data.choices[0].text)
}
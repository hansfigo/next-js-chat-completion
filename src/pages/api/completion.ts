import { NextApiResponse, NextApiRequest } from 'next'
import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (!process.env.OPENAI_API_KEY) {
        res.status(500).json({ error: "Tidak Ada Api Key !!" })
    }
    // Get Input user dari request
    const { prompt } = JSON.parse(req.body);

    // Setting API KEY dari env
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Appy Setting tadi
    const openai = new OpenAIApi(configuration);

    console.log(configuration.apiKey);
    
    try {
        // Buat Request ke GPT
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1000,
            temperature: 0.6,
        });

        //return Hasil dari request Chat gpt
        res.status(200).json(response.data.choices[0].text)
    } catch (error : any) {

        console.log("ERR : ", error.message);
        
        res.status(500).json({ error: error.message })
    }

}
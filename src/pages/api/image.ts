import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAi from "openai";

export const config = {
    api: {
        bodyParser: false, // Matikan body parser agar formidable bisa menangani request
    },
};

function base64_encode(file: string) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Tidak Ada API Key!" });
    }

    const openai = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });

    try {
        // Parsing file dan fields menggunakan Promise
        const form = formidable({ multiples: false });

        const parseForm = (): Promise<{ fields: formidable.Fields; files: formidable.Files }> =>
            new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    else resolve({ fields, files });
                });
            });

        const { fields, files } = await parseForm();

        if (!fields.prompt) {
            return res.status(400).json({ error: "Prompt Tidak boleh Kosong" });
        }

        const prompt = fields.prompt[0]; // Ambil prompt yang dikirim dari form
        const file = files.file ? files.file[0] : null; // Pastikan file ada dan benar

        var base64 = null;
        if (file) {
            base64 = base64_encode(file.filepath);
        }

        // Kirim request ke OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Kamu adalah Asisten untuk bantu apakah gambar yang dikirim sesuai dengan content brief, harapannya biar sebelum upload ke ig tidak ada miss. jawab dengan format yg teratur, dengan list. mana yg salah mana expected result. pakai emoji juga misal yg salah pake merah , yg expected/betul pake ijo. jawan sesuai kontent brief, misal hanya ada tahun ya tahun aja" },
                {
                    role: "user", content: [
                        { type: "text", text: `content brief : ${prompt}, \n apakah gambar sesuai dengan konten brief diatas?` },
                        {
                            type: "image_url",
                            image_url: {
                                "url": "data:image/jpeg;base64," + base64,
                            },
                        },
                    ]
                },

            ],
            max_tokens: 200,
            temperature: 0.4,
        });

        return res.status(200).json(response.choices[0].message.content);
    } catch (error: any) {
        console.error("ERR: ", error.message);
        return res.status(500).json({ error: error.message });
    }
}

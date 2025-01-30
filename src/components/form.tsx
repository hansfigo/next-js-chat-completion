import { completionAtom, isErrorAtom, isLoadingAtom, selectedImageAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import { ChangeEvent, FormEvent, useState } from "react";

interface Iform {
    image?: boolean
    apiURL?: string
}

export const MyForm: React.FC<Iform> = ({ image = false, apiURL = '/api/completion' }) => {
    // State untuk Loading, Respon (completion), input user dan Error
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
    const [completion, setCompletion] = useAtom(completionAtom)
    const [inputValue, setInputValue] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [isError, setIsError] = useAtom(isErrorAtom)

    const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom)

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return
        }
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e: FormEvent) => {
        let resp;

        // Biar pas submit ga reload
        e.preventDefault()

        // set status loading ke true
        setIsLoading(true)


        if (file) {
            const formData = new FormData()
            formData.append('prompt', inputValue)
            if (file) {
                formData.append('file', file as Blob)
            }
            // Melakukan POST request ke Chat GPT API
            resp = await fetch(apiURL, {
                method: 'POST',
                body: formData
            })
        } else {
            resp = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: inputValue })
            })
        }

        if (!resp) {
            return
        }

        // Throw Error jika error
        if (!resp.ok) {
            const data = await resp.json()

            setIsError({
                isError: true,
                message: data.error
            })

            console.error(data.error)
        }

        const data = await resp.json()

        // Memperbarui completion dengan response dari API call
        setCompletion(data)

        // set status loading ke false
        setIsLoading(false)

    }
    return (
        <form className="" onSubmit={handleSubmit} >
            {image && (
                <>
                    <input type="file" onChange={handleFileChange} />
                    <br />
                    <br />
                    <h3 className="font-bold text-xl">2. Tuliskan Konten Brief</h3>
                    <br />
                </>
            )}
            {image == false &&
                <div className="flex gap-4 justify-center items-center  w-full">
                    <input disabled={isLoading} onChange={handleChange} name='prompt' id='prompt' placeholder='Ask me anything !' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <button disabled={isLoading} type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5   dark:border-gray-600 disabled:bg-gray-700">Submit</button>

                </div>
            }
            {image && (
                <>
                    <textarea disabled={isLoading} rows={8} onChange={handleChange} name='prompt' id='prompt' placeholder={`Example : Tahun : 2025
Judul : Harta Tahta Mita`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <button disabled={isLoading} type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5   dark:border-gray-600 disabled:bg-gray-700 mt-4 w-full">Submit</button>
                </>
            )
            }
        </form>
    )
}
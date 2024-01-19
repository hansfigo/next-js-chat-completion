import { completionAtom, isErrorAtom, isLoadingAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import { ChangeEvent, FormEvent, useState } from "react";

export const MyForm: React.FC = () => {
    // State untuk Loading, Respon (completion), input user dan Error
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
    const [completion, setCompletion] = useAtom(completionAtom)
    const [inputValue, setInputValue] = useState<string>('')
    const [isError, setIsError] = useAtom(isErrorAtom)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = async (e: FormEvent) => {
        // Biar pas submit ga reload
        e.preventDefault()

        // set status loading ke true
        setIsLoading(true)

        try {
            // Melakukan POST request ke Chat GPT API
            const res = await fetch('/api/completion', {
                method: 'POST',
                body: JSON.stringify({ prompt: inputValue })
            })

            // Throw Error jika error
            if (!res.ok) {
                const data = await res.json()

                setIsError({
                    isError: true,
                    message: data.error
                })

                console.error(data.error)
            }

            // Mengolah response dari API call
            const data = await res.json()

            // Memperbarui completion dengan response dari API call
            setCompletion(data)

            // set status loading ke false
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form className="flex justify-centeritems-center gap-4 flex-col md:flex-row" onSubmit={handleSubmit} >
            <input disabled={isLoading} onChange={handleChange} name='prompt' id='prompt' placeholder='Ask me anything !' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            <button disabled={isLoading} type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5   dark:border-gray-600 disabled:bg-gray-700">Submit</button>
        </form>
    )
}
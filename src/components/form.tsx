import { ChangeEvent, FormEvent } from "react"

// Definisikan tipe properti yang dibutuhkan oleh komponen MyForm
type MyFormProps = {
    handleSubmit: (e: FormEvent) => Promise<void> // Fungsi yang akan dipanggil saat form disubmit
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void // Fungsi yang akan dipanggil saat nilai input berubah
    isLoading: boolean; // Menunjukkan apakah sedang dalam proses loading atau tidak
};

// Deklarasikan komponen MyForm sebagai komponen fungsi React
export const MyForm: React.FC<MyFormProps> = ({ handleSubmit, isLoading, handleChange }) => {
    return (
        <form className="flex justify-centeritems-center gap-4" onSubmit={handleSubmit} >
            <input disabled={isLoading} onChange={handleChange} name='prompt' id='prompt' placeholder='Ask me anything !' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            <button disabled={isLoading} type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5   dark:border-gray-600 disabled:bg-gray-700">Submit</button>
        </form>
    )
}
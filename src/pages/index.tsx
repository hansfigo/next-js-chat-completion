import { MyForm } from '@/components/form'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { Skeleton } from '@/components/skeleton'
import { getCompletion, getIsError, getIsLoading } from '@/lib/atom'
import { useAtom } from 'jotai'
import { JetBrains_Mono } from 'next/font/google'
import Markdown from 'react-markdown'
const jetbrain = JetBrains_Mono({ subsets: ['latin'] })

const Home = () => {
  // get data status loading dan respon chatbot
  const [isLoading] = useAtom(getIsLoading)
  const [completion] = useAtom(getCompletion)
  const [error] = useAtom(getIsError)
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between md:p-24 p-8`}
    >
      <div className='flex xl:max-w-[800px] xl:min-w-[800px] px-8 xl:px-0 flex-col gap-4'>
        <h1 className='text-2xl md:text-4xl font-bold '>GPT Completion Demo 😈</h1>
        <MyForm />

        {/* <MarkdownRenderer string={`Berikut adalah analisis gambar berdasarkan content brief yang diberikan: ### Expected Result: 1. **Tahun**: 2021 2. **Tema**: Dokumentasi acara AMCC 3. **Visual**: Relevan dengan tema komputer dan teknologi ### Hasil Analisis: - **Tahun**: ❌ **Salah** (Gambar menyebutkan tahun 2025, bukan 2021) - **Tema**: ✅ **Benar** (Gambar berisi dokumentasi acara AMCC) - **Visual**: ✅ **Benar** (Visual terkait dengan tema komputer dan teknologi) ### Kesimpulan: - Gambar **tidak sesuai** dengan content brief karena menyebutkan tahun 2025. Tahun yang diharapkan adalah 2021. 📅❌ Saran: Perbaiki tahun yang tercantum dalam gambar agar sesuai dengan content brief.`} /> */}

        {!isLoading ? (
          error.isError ? (
            <p className='text-red-600'>Terjadi Kesalahan : {error.message}</p>
          ) : (
            completion && (
              <>
                <MarkdownRenderer string={completion} />
              </>
            )
          )
        ) : (
          <Skeleton />
        )}
      </div>
      <p className='py-8'>by FigoMager , <a target='_blank' href='https://github.com/hansfigo' className='underline text-blue-400'>Github</a></p>
    </main>
  )
}
export default Home

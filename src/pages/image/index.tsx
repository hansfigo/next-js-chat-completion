import { MyForm } from '@/components/form'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { Skeleton } from '@/components/skeleton'
import { getCompletion, getIsError, getIsLoading, selectedImageAtom } from '@/lib/atom'
import { useAtom } from 'jotai'
import { JetBrains_Mono } from 'next/font/google'
const jetbrain = JetBrains_Mono({ subsets: ['latin'] })

const Home = () => {
  // get data status loading dan respon chatbot
  const [isLoading] = useAtom(getIsLoading)
  const [completion] = useAtom(getCompletion)
  const [error] = useAtom(getIsError)
  const [selectedImage] = useAtom(selectedImageAtom)


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between md:p-24 p-8`}
    >
      <div className='flex xl:max-w-[800px] xl:min-w-[800px] px-8 xl:px-0 flex-col gap-4'>
        <h1 className='text-2xl md:text-4xl font-bold '>Komvis Content IG Checker</h1>
        <h3 className='font-bold text-xl'>1. Upload Postingan</h3>
        {selectedImage && (
          <div className="flex flex-col gap-4 items-center">
            <img
              src={selectedImage}
              className="max-w-xs sm:max-w-md h-auto object-contain rounded-lg"
              alt=""
            />
          </div>
        )}
        <MyForm apiURL='/api/image' image={true} />

        {!isLoading ? (
          error.isError ? (
            <p className='text-red-600'>Terjadi Kesalahan : {error.message}</p>
          ) : (
            completion && (
              <>
                <h3 className='font-bold text-xl mt-6'>4. Hasil Analisis :</h3>
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

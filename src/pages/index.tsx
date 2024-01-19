import { MyForm } from '@/components/form'
import { Skeleton } from '@/components/skeleton'
import { getCompletion, getIsError, getIsLoading } from '@/lib/atom'
import { useAtom } from 'jotai'
import { JetBrains_Mono } from 'next/font/google'
const jetbrain = JetBrains_Mono({ subsets: ['latin'] })

const Home = () => {
  // get data status loading dan respon chatbot
  const [isLoading] = useAtom(getIsLoading)
  const [completion] = useAtom(getCompletion)
  const [error] = useAtom(getIsError)
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between md:p-24 p-8 ${jetbrain.className}`}
    >
      <div className='flex xl:max-w-[800px] xl:min-w-[800px] px-8 xl:px-0 flex-col gap-4'>
        <h1 className='text-2xl md:text-4xl font-bold '>GPT Completion Demo 😈</h1>
        <MyForm />

        {!isLoading ? (
          error.isError ? (
            <p className='text-red-600'>Terjadi Kesalahan : {error.message}</p>
          ) : (
            completion && (
              <>
                <p>Res :</p>
                <p>{completion}</p>
              </>
            )
          )
        ) : (
          <Skeleton />
        )}
      </div>
    </main>
  )
}
export default Home

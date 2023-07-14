import Image from 'next/image'
import { JetBrains_Mono } from 'next/font/google'
import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'
import { MyForm } from '@/components/form'
import { Skeleton } from '@/components/skeleton'

const jetbrain = JetBrains_Mono({ subsets: ['latin'] })

export default function Home() {

  // Track Loading / Tidak
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // buat nampung respon completion dari GPT
  const [completion, setCompletion] = useState<string>('')

  // Buat nampung input form value
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    // Biar pas submit ga reload
    e.preventDefault()

    setIsLoading(true)

    // Melakukan Post request ke Chat GPT API
    const res = await fetch('/api/completion', {
      method: 'POST',
      body: JSON.stringify({ prompt: inputValue })
    })

    // Throw Error jika error
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    //Olah post respon
    const data = await res.json()

    setCompletion(data)

    setIsLoading(false)

  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between md:p-24 p-8 ${jetbrain.className}`}
    >
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl md:text-4xl font-bold '>GPT Completion Demo 😈</h1>
        <MyForm handleSubmit={handleSubmit} handleChange={handleChange} isLoading={isLoading} />

        {/* Cek Completion ada valuenya gak */}
        {completion && (
          // Cek apakah sedang dalam proses loading
          !isLoading ? (
            // Jika tidak loading, tampilkan hasil completion
            <>
              <p>Res : </p>
              <p>{completion}</p>
            </>
          ) : (
            // Jika sedang loading, tampilkan Skeleton
            <Skeleton />
          )
        )}
      </div>
    </main>
  )
}

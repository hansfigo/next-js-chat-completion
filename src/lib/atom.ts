import { atom } from 'jotai'

// Inisialisasi global state buat status loading
const isLoadingAtom = atom<boolean>(false)

// function buat get state isLoading 
const getIsLoading = atom((get) => { return get(isLoadingAtom) })

// Inisialisasi global state buat respon chatbot
const completionAtom = atom<string>('')

// function buat get respon chatbot
const getCompletion = atom((get) => { return get(completionAtom) })

const isErrorAtom = atom({ isError: false, message: "" })
const getIsError = atom((get) => { return get(isErrorAtom) })

const selectedImageAtom = atom<string>('')

// export 
export { completionAtom, getCompletion, getIsError, getIsLoading, isErrorAtom, isLoadingAtom, selectedImageAtom }

import { ChangeEventHandler, FormEventHandler } from "react"

interface formProps {
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    input: string,
    isLoading: boolean
    handleInputChange: ChangeEventHandler<HTMLInputElement> | undefined
}


export const ChatForm = (props: formProps) => {
    const { handleSubmit, input, isLoading, handleInputChange } = props
    return (
        < form onSubmit={handleSubmit} className="flex z-20 px-8 md:px-0 container  justify-center items-center gap-4 flex-col md:flex-row fixed  left-1/2 bottom-8 transform -translate-x-1/2 -translate-y-1/2" >
            <div className="relative rounded-full w-full ">
                <input
                    id="input"
                    name="prompt"
                    value={input}
                    disabled={isLoading}
                    onChange={handleInputChange}
                    placeholder='Masukan Nama mu'
                    type="text"
                    className="px-4 py-[0.6rem] bg-gray-900 min-w-full shadow-inputShadow  shadow-white bg-opacity-20 backdrop-blur-md bg-transparent  rounded-full filled:bg-transparent "
                    required
                />
                <button
                    disabled={isLoading}
                    type="submit"
                    className="disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:border-blue-900 flex items-center justify-center bg-opacity-80 backdrop-blur-md h-[2rem] shadow-blue-800 shadow-2xl px-4 text-sm border-blue-800 text-white hover:bg-blue-500 hover:bg-opacity-30 transition-all duration-300 border-[1.5px]  absolute right-2 top-1 bottom-0 rounded-full"
                >
                    Send
                </button>
            </div>
        </form >
    )
}
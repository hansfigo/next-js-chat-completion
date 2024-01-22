import { useChat } from 'ai/react';
import Markdown from 'react-markdown';

export default function IndexPage() {
  const { messages, handleSubmit, input, handleInputChange, isLoading } = useChat(
    { api: "/api/langchain" }
  );

  const markdown = '# Hi, *Pluto*!'

  return (
    <div className='flex relative justify-center items-center w-full'>
      <form onSubmit={handleSubmit} className="flex w-full justify-center items-center gap-4 flex-col md:flex-row fixed  left-1/2 bottom-8 transform -translate-x-1/2 -translate-y-1/2"  >
        <div className="relative rounded-full overflow-hidden">
          <input
            id="input"
            name="prompt"
            value={input}
            disabled={isLoading}
            onChange={handleInputChange}
            placeholder='Ask me anything !'
            type="text"
            className="px-4 shadow-lg bg-gray-900 w-[21rem] md:w-[52rem] bg-opacity-20 backdrop-blur-md bg-transparent py-2 rounded-full focus:outline-none"
            required
          />
          <button
            disabled={isLoading}
            type="submit"
            className=" bg-white bg-opacity-80 backdrop-blur-md h-[2rem] w-[2rem] absolute right-2 top-1 bottom-0 rounded-full"
          >
            v
          </button>
        </div>
      </form>
      <div className='flex flex-col mb-20'>
        {messages.map((message, i) => (
          <>
            <div key={i}>
              {message.role === 'user' ? (
                <UserComponent content={message.content} />
              ) : (
                <AssistantComponent content={message.content} />
              )}
            </div>
            {i != messages.length - 1 ? (<hr className='opacity-25' />) : (<p></p>)}

          </>
        ))}
      </div>
    </div>

  );
}

interface chatBubbleProps {
  content: string
}


export const AssistantComponent = (props: chatBubbleProps) => {
  const { content } = props

  return (
    <div className='py-8 '>
      <h1 className='font-black'>ChatGPT</h1>
      <div className='prose dark:prose-invert'>
        <Markdown>
          {content}
        </Markdown>
      </div>
    </div>

  )
}


export const UserComponent = (props: chatBubbleProps) => {
  const { content } = props

  return (
    <div className='py-8 flex flex-col'>
      <h1 className='font-black'>You</h1>
      {content}
    </div>
  )
}

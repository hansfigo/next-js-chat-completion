import { useChat } from 'ai/react';
import Markdown from 'react-markdown';

export default function IndexPage() {
  const { messages, handleSubmit, input, handleInputChange } = useChat(
    { api: "/api/langchain" }
  );

  const markdown = '# Hi, *Pluto*!'

  return (
    <div className='flex justify-center items-center w-full'>
      <form onSubmit={handleSubmit}>
        <Markdown>
          {markdown}
        </Markdown>
        <br />
        <input
          className='text-black px-8'
          name="prompt"
          value={input}
          onChange={handleInputChange}
          id="input"
        />
        <button type="submit">Submit</button>
        {messages.map((message, i) => (
          <>
            <div key={i}>
              {message.role === 'user' ? (
                <UserComponent content={message.content} />
              ) : (
                <AssistantComponent content={message.content} />
              )}
            </div>
            <hr className='opacity-25' />
          </>
        ))}

      </form>
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

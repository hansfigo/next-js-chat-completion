import { useChat } from 'ai/react';

export default function IndexPage() {
  const { messages, handleSubmit, input, handleInputChange } = useChat(
    { api: "/api/chat" }
  );

  return (
    <div className='flex justify-center items-center w-full'>
      <form onSubmit={handleSubmit}>
        <label className='text-xl font-semibold' htmlFor="input">Prompt</label>
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
          <div key={i}>{message.content}</div>
        ))}
      </form>
    </div>

  );
}

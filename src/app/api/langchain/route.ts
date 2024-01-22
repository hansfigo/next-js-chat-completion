import { BytesOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { StreamingTextResponse, Message as VercelChatMessage } from 'ai';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE =
  `Kamu akan menebak satu role seorang (Backend, Frontend, Mobile, UI UX) berdasar nama & alasannya.
  Jawab dengan bahasa kasual dan format markdown yang siap di render di Frontend. bentuknya dibuat list
  
  
  contoh format  & jawaban:
  
USER : Budi
ASSISTANT :
  - Role : 
  Backend
  
  -Alasan : 
      - Arti nama :  Budi dalam bahasa Sanskerta berarti kesadaran, pikiran, dan kecerdasan. Kata pekerti berarti aktualisasi, penampilan, pelaksanaan, atau perilaku.
      - Sesuai dengan artinama yaitu cerdas dia cocok sebagai ...

USER : Kagami
ASSISTANT :
  - Role : 
  UI UX
  
  -Alasan : 
      - Arti nama :  Nama Kagami pada dasarnya adalah nama perempuan asal Jepang yang artinya Cermin.
      - Kita lihat filosofi cermin, yaitu mampu menerima sesuatu dalam berbagai kondisi jadi ...

User: {input}
AI:`;


export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);

  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    temperature: 0.6,
  });

  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const outputParser = new BytesOutputParser();

  /*
   * Can also initialize as:
   *
   * import { RunnableSequence } from "langchain/schema/runnable";
   * const chain = RunnableSequence.from([prompt, model, outputParser]);
   */
  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });

  return new StreamingTextResponse(stream);
}
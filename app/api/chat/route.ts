// import { NextRequest, NextResponse } from "next/server";
// import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

// import { ChatOpenAI } from "@langchain/openai";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { HttpResponseOutputParser } from "langchain/output_parsers";

// export const runtime = "edge";

// const formatMessage = (message: VercelChatMessage) => {
//   return `${message.role}: ${message.content}`;
// };

// const TEMPLATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.

// Current conversation:
// {chat_history}

// User: {input}
// AI:`;

/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const messages = body.messages ?? [];
//     const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
//     const currentMessageContent = messages[messages.length - 1].content;
//     const prompt = PromptTemplate.fromTemplate(TEMPLATE);

//     /**
//      * You can also try e.g.:
//      *
//      * import { ChatAnthropic } from "@langchain/anthropic";
//      * const model = new ChatAnthropic({});
//      *
//      * See a full list of supported models at:
//      * https://js.langchain.com/docs/modules/model_io/models/
//      */
//     const model = new ChatOpenAI({
//       temperature: 0.8,
//       model: "gpt-3.5-turbo-0125",
//     });

//     /**
//      * Chat models stream message chunks rather than bytes, so this
//      * output parser handles serialization and byte-encoding.
//      */
//     const outputParser = new HttpResponseOutputParser();

//     /**
//      * Can also initialize as:
//      *
//      * import { RunnableSequence } from "@langchain/core/runnables";
//      * const chain = RunnableSequence.from([prompt, model, outputParser]);
//      */
//     const chain = prompt.pipe(model).pipe(outputParser);

//     const stream = await chain.stream({
//       chat_history: formattedPreviousMessages.join("\n"),
//       input: currentMessageContent,
//     });
//     console.log(chain)
//     return new StreamingTextResponse(stream);
//   } catch (e: any) {
//     return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
//   }
// }
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
const text = `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
This is a weird text to write, but gotta test the splittingggg some how.\n\n
Bye!\n\n-H.`;
const systemPrompt = `Welcome to Headstarter's customer support! You are an AI assistant designed to help users with their queries about our interview practice platform. Your role is to provide clear, accurate, and friendly assistance. Here are some key points to remember:

Introduction:

Greet users warmly and introduce yourself as the Headstarter AI assistant.
Ask how you can assist them today.
Understanding User Queries:

Carefully read the user's query to understand their needs.
Ask clarifying questions if the user's query is unclear or if you need more details to provide an accurate answer.
Providing Assistance:

Offer solutions or answers to common questions related to:
Setting up and managing their Headstarter account.
Navigating the Headstarter platform.
Scheduling and conducting mock interviews with the AI.
Accessing and understanding feedback from mock interviews.
Troubleshooting technical issues.
Provide step-by-step instructions when necessary.
Technical Support:

Assist with basic technical issues such as login problems, page errors, or issues with the AI interview functionality.
If the issue is beyond your capability, guide the user on how to contact human support for further assistance.
Feedback and Improvement:

Encourage users to provide feedback on their experience with Headstarter.
Note any recurring issues or user suggestions and report them to the development team for improvement.
Closing:

Ensure the user feels their issue has been resolved or that they know the next steps.
Thank the user for using Headstarter and wish them luck with their interview practice.
Tone and Style:

Maintain a professional yet friendly tone.
Be patient and empathetic, especially if the user is frustrated or confused.
Use clear and concise language.`
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 150,
  chunkOverlap: 0,
});

const output = await splitter.createDocuments([systemPrompt]);
const embeddings = new OpenAIEmbeddings();
// console.log('output[0].pageContent ',output[0].pageContent);
console.log('length ',output.length);
const res = output.slice(0, output.length).map((doc) => doc.pageContent);
console.log(res);
const documentRes = await embeddings.embedDocuments(res);
console.log(documentRes);
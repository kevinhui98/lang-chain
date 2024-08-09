'use client';
import { ChatWindow } from "@/components/ChatWindow";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
export default function Home() {
  const test = async () => {
    const text = `Welcome to Headstarter's customer support! You are an AI assistant designed to help users with their queries about our interview practice platform. Your role is to provide clear, accurate, and friendly assistance. Here are some key points to remember:

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
Use clear and concise language.`;
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      chunkOverlap: 0,
      separators: ["\n\n"],

    });
    const output = await splitter.createDocuments([text]);
    // console.log('length ',output[0].pageContent.length);
    console.log(output.slice(0, 12));
  }
  test();
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <h1 className="text-3xl md:text-4xl mb-4" onClick={test}>
        ▲ Next.js + LangChain.js 🦜🔗
      </h1>
      <ul>
        <li className="text-l">
          🤝
          <span className="ml-2">
            This template showcases a simple chatbot using{" "}
            <a href="https://js.langchain.com/" target="_blank">
              LangChain.js
            </a>{" "}
            and the Vercel{" "}
            <a href="https://sdk.vercel.ai/docs" target="_blank">
              AI SDK
            </a>{" "}
            in a{" "}
            <a href="https://nextjs.org/" target="_blank">
              Next.js
            </a>{" "}
            project.
          </span>
        </li>
        <li className="hidden text-l md:block">
          💻
          <span className="ml-2">
            You can find the prompt and model logic for this use-case in{" "}
            <code>app/api/chat/route.ts</code>.
          </span>
        </li>
        <li>
          🏴‍☠️
          <span className="ml-2">
            By default, the bot is pretending to be a pirate, but you can change
            the prompt to whatever you want!
          </span>
        </li>
        <li className="hidden text-l md:block">
          🎨
          <span className="ml-2">
            The main frontend logic is found in <code>app/page.tsx</code>.
          </span>
        </li>
        <li className="text-l">
          🐙
          <span className="ml-2">
            This template is open source - you can see the source code and
            deploy your own version{" "}
            <a
              href="https://github.com/langchain-ai/langchain-nextjs-template"
              target="_blank"
            >
              from the GitHub repo
            </a>
            !
          </span>
        </li>
        <li className="text-l">
          👇
          <span className="ml-2">
            Try asking e.g. <code>What is it like to be a pirate?</code> below!
          </span>
        </li>
      </ul>
    </div>
  );
  return (
    <ChatWindow
      endpoint="api/chat"
      emoji="🏴‍☠️"
      titleText="Patchy the Chatty Pirate"
      placeholder="I'm an LLM pretending to be a pirate! Ask me about the pirate life!"
      emptyStateComponent={InfoCard}
    ></ChatWindow>
  );
}

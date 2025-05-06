import { ChatGroq } from "@langchain/groq";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import data from "./data.json";
import { Document } from "langchain/document";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

// Store the chain instance
let chatChain = null;
let initializationStatus = {
  isInitializing: false,
  isInitialized: false,
  status: "idle",
  error: null,
};

function formatDocumentsAsString(documents) {
  return documents.map((document) => document.pageContent).join("\n\n");
}

export async function initializeChatbot() {
  // If already initialized or initializing, return current status
  if (
    initializationStatus.isInitialized ||
    initializationStatus.isInitializing
  ) {
    return initializationStatus;
  }

  try {
    // Set initializing flag
    initializationStatus = {
      isInitializing: true,
      isInitialized: false,
      status: "initializing",
      error: null,
    };

    // Step 1: Initialize embeddings
    initializationStatus.status = "Initializing embeddings...";
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: import.meta.env.VITE_HUGGINGFACEHUB_API_KEY,
    });

    // Step 2: Initialize LLM
    initializationStatus.status = "Initializing LLM...";
    const model = new ChatGroq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0,
    });

    // Step 3: Create documents
    initializationStatus.status = "Creating documents...";
    const docs = data.map(
      (obj) => new Document({ pageContent: JSON.stringify(obj) })
    );

    // Step 4: Create vector store (this is the longest step)
    initializationStatus.status =
      "Building vector store (this may take a while)...";
    const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

    // Step 5: Initialize retriever
    initializationStatus.status = "Setting up retriever...";
    const vectorStoreRetriever = vectorStore.asRetriever();

    // Step 6: Create prompt template
    initializationStatus.status = "Configuring chatbot chain...";
    const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    
    VERY IMPORTANT: If your answer contains information about room numbers (like K-112, A-201, etc.),
    format each room number inside a special link like this, also be sure to change UNIN1, UNIN2 and UNIN3 accordingly:
    <a href="javascript:void(0)" class="router-link" data-route="/unin2" data-room="ROOM_NUMBER">ROOM_NUMBER</a>
    
    For example, if you need to mention room K-112 that is in UNIN2, format it as:
    Predavaona <a href="javascript:void(0)" class="router-link" data-route="/unin2" data-room="112">K-112</a> nalazi se u UNIN2.
    
    Make sure ALL room numbers in your response are formatted this way, as these links will be used to navigate to room locations.
    ----------------
    {context}`;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_TEMPLATE],
      ["human", "{question}"],
    ]);

    // Step 7: Create chain
    chatChain = RunnableSequence.from([
      {
        context: vectorStoreRetriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      model,
      new StringOutputParser(),
    ]);

    // Set status to initialized
    initializationStatus = {
      isInitializing: false,
      isInitialized: true,
      status: "ready",
      error: null,
    };

    return initializationStatus;
  } catch (error) {
    console.error("Error initializing chatbot:", error);

    // Set error status
    initializationStatus = {
      isInitializing: false,
      isInitialized: false,
      status: "error",
      error: error.message || "Failed to initialize chatbot",
    };

    return initializationStatus;
  }
}

export async function getChatbotAnswer(question) {
  if (!chatChain) {
    throw new Error("Chatbot not initialized. Please initialize first.");
  }

  try {
    return await chatChain.invoke(question);
  } catch (error) {
    console.error("Error getting answer:", error);
    throw error;
  }
}

// Get current initialization status
export function getInitializationStatus() {
  return initializationStatus;
}

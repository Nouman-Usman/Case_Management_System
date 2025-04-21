// import { Groq } from '@langchain/community/llms/groq';
'use server'
import { ChatGroq } from "@langchain/groq";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from 'langchain/document';

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX || 'default-index';

// Check required env vars before proceeding
if (!HUGGINGFACE_API_KEY || !PINECONE_API_KEY || !GROQ_API_KEY) {
    throw new Error('Missing one or more required API keys (HUGGINGFACE_API_KEY, PINECONE_API_KEY, GROQ_API_KEY)');
}

class RAGAgent {
    private embeddings: HuggingFaceInferenceEmbeddings;
    private vectorStore: PineconeStore | null = null;
    private llm: ChatGroq; // LCEL pipeline
    private chain: any; // LCEL pipeline
    private pinecone: Pinecone;

    constructor() {
        this.embeddings = new HuggingFaceInferenceEmbeddings({
            model: "sangmini/msmarco-cotmae-MiniLM-L12_en-ko-ja", // 384-dim, make sure Pinecone index is also 384-dim!
            apiKey: HUGGINGFACE_API_KEY,
        });

        this.llm = new ChatGroq({
            model: "gemma2-9b-it",
            apiKey: GROQ_API_KEY,
        });

        this.pinecone = new Pinecone({
            apiKey: PINECONE_API_KEY!,
        });

        const prompt = ChatPromptTemplate.fromTemplate(
            `You are a legal assistant for question-answering tasks in the context of Pakistani law. Structure your responses in Markdown format to aid in legal research. Bold the key terms like section or laws and use bullet points for lists. Provide a detailed response to the user's question.

Context:
{context}

Question:
{question}

Answer (in Markdown):`
        );

        // LCEL pipeline: prompt.pipe(llm)
        this.chain = prompt.pipe(this.llm);
    }

    async initialize() {
        const index = this.pinecone.Index(PINECONE_INDEX);
        this.vectorStore = await PineconeStore.fromExistingIndex(
            this.embeddings,
            { pineconeIndex: index }
        );
    }

    async addDocuments(texts: string[]) {
        if (!this.vectorStore) {
            await this.initialize();
        }
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const documents = await splitter.createDocuments(texts);
        await this.vectorStore!.addDocuments(documents);
    }

    /**
     * Analyze the sentiment/category of a legal question using the LLM.
     * Returns one of the predefined categories or 'None' if not legal.
     */
    async analyzeSentiment(question: string): Promise<string> {
        const VALID_CATEGORIES = [
            "Civil", "Criminal", "Corporate", "Constitutional", "Tax",
            "Family", "Intellectual Property", "Labor and Employment",
            "Immigration", "Commercial", "Environmental", "Banking and Finance",
            "Cyber Law", "Alternate Dispute Resolution"
        ];
        const sentimentPrompt = ChatPromptTemplate.fromTemplate(
            `You are a legal assistant analyzing the sentiment of text.
First, determine if the input text is related to a legal case or legal matter.
If the text is NOT related to legal matters, or the text is a general query that does not need to be addressed by any lawyer, then return exactly: None

If the text IS legal-related, analyze its sentiment and categorize it into exactly one of these categories: {categories}

Text: {text}

Return only 'None' for non-legal text, or just the category name for legal text without any additional explanation.`
        );
        const chain = sentimentPrompt.pipe(this.llm);
        const result: unknown = await chain.invoke({
            text: question,
            categories: VALID_CATEGORIES.join(", ")
        });
        // result may be an object or string depending on LLM output
        if (typeof result === "string") return result.trim();
        if (typeof result === "object" && result !== null && "content" in result) return String((result as { content: string }).content).trim();
        return "None";
    }

    async getResult(question: string) {
        if (!this.vectorStore) {
            await this.initialize();
        }

        // Retrieve top 5 relevant documents from Pinecone
        const relevantDocs = await this.vectorStore!.similaritySearch(question, 5);

        // Collect context and metadata (ensure page_number and filename are included)
        const contextDocs = relevantDocs.map((doc: Document) => ({
            pageContent: doc.pageContent,
            metadata: {
                pageNum: doc.metadata?.pageNum ?? doc.metadata?.page_number ?? null,
                filename: doc.metadata?.filename ?? doc.metadata?.file_name ?? doc.metadata?.filename ?? null,
                // Optionally include all metadata for debugging:
                // ...doc.metadata
            }
        }));
        console.log("RAG contextDocs:", contextDocs.map(d => d.metadata));

        const refrences = contextDocs.map(d => d.metadata.filename); 
        const context: string = contextDocs.map(d => d.pageContent).join('\n');
        // console.log("RAG context:", context);

        if (relevantDocs.length === 0) {
            return { answer: "No relevant documents found.", contextDocs: [] };
        }
        // Use LCEL pipeline
        const result = await this.chain.invoke({
            question,
            context,
        });
        console.log("RAG result:", result.content);
        // Return both the answer and the contextDocs (with metadata)
        return { answer: result.content, refrences };
    }
}

// Do NOT import or use this file directly in client components.
// Instead, use it only in server actions or API routes.

// --- API handler for /api/rag ---
const ragAgent = new RAGAgent();

export async function POST(req: Request) {
    try {
        const { question } = await req.json();
        if (!question || typeof question !== 'string') {
            return new Response(JSON.stringify({ error: 'Invalid question' }), { status: 400 });
        }
        const result = await ragAgent.getResult(question);
        return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        // Log error for debugging
        console.error('RAG API Error:', err);
        return new Response(JSON.stringify({ error: 'Internal server error', details: String(err) }), { status: 500 });
    }
}
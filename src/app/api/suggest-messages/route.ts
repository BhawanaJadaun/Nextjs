import {OpenAI} from 'openai';
import {OpenAIStream,StreamingTextResponse} from "ai";

// Creating an OpenAi API client 
const openai = new OpenAI({
apikey:process.env.OPENAI_API_KEY,
})
// set the run time to edge for better performance
export const runtime = 'edge';

export async function POST(req:Request){
try {
const prompt = "Create a list of open-ended and engaging questions formatted as a single string. Each question should be thought-provoking and encourage detailed responses. Separate each question using '||' as a delimiter.";

 const {message} = await req.json()
 // Ask openAI for streaming chat completion given the prompt
 const response = await openai.chat.completion.create({
 model: 'gpt-3.5-turbo-instruct',
 max_tokens:400,
 stream:true,
 message,
 prompt,
 })
} catch (error) {
if (error instanceof OpenAI.APIError) {
const{name,status,error,message} = error
return NextResponse.json({
name,status,headers,message
},{status})
}else{
console.error("An expected error")
throw error;
}
}
}
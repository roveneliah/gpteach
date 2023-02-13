import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const complete = async (prompt: string, length?: number) =>
  await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: length || 50,
    temperature: 0.7,
  });

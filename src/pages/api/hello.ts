// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { complete } from "lib/openai";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  // the req body has the prompt we will send to OpenAI api
  const prompt = req.body.prompt;

  // call the OpenAI api with the prompt
  complete(prompt).then((response: any) => {
    res.status(200).json({
      prompt,
      completion: response.data.choices[0].text,
    });
  });
}

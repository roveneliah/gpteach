// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { complete } from "lib/openai";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  // the req body has the prompt we will send to OpenAI api
  const prompt = `Given the following instance of the JSON schema for a learning curriculum, add more tests to the curriculum.  The tests should be added to the appropriate test suite.
The curriculum should demand world class levels of proficiency and fluency in the subject matter. 
  
${req.body.prompt}

Add more detail to the schema.`;

  // call the OpenAI api with the prompt
  complete(prompt, 4000).then((response: any) => {
    console.log(response.data.choices[0].text);

    res.status(200).json({
      prompt,
      completion: response.data.choices[0].text,
    });
  });
}

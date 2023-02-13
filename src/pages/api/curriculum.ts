// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { complete } from "lib/openai";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  // the req body has the prompt we will send to OpenAI api
  const prompt = `Create an instance of the following JSON schema for a learning curriculum.  This curriculum takes a test-driven approach, starting by identifying tests that the students must pass to demonstrate proficiency in some area.

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Learning Curriculum for Transformer Neural Networks",
  "description": "A test-driven approach to learning Transformer neural networks",
  "type": "object",
  "properties": {
      "title": {
          "type": "string",
          "description": "The title of the curriculum"
      },
      "tests": {
          "type": "array",
          "description": "List of tests that students must pass to demonstrate proficiency in Transformer neural networks",
          "items": {
              "type": "object",
              "properties": {
                  "test_id": {
                      "type": "string",
                      "description": "A unique identifier for the test"
                  },
                  "test_name": {
                      "type": "string",
                      "description": "The name of the test"
                  },
                  "description": {
                      "type": "string",
                      "description": "A brief description of what the test covers"
                  },
                  "passing_criteria": {
                      "type": "string",
                      "description": "The criteria that a student must meet to pass the test, expressed in natural language"
                  }
              }
          }
      }
  },
  "required": [
      "title",
      "tests"
  ]
}

Generate an instance of this schema for learning ${req.body.prompt}.`;

  // call the OpenAI api with the prompt
  complete(prompt, 2000).then((response: any) => {
    console.log(response.data.choices[0].text);

    res.status(200).json({
      prompt,
      completion: response.data.choices[0].text,
    });
  });
}

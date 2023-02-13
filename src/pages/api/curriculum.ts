// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { complete } from "lib/openai";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  // the req body has the prompt we will send to OpenAI api
  const prompt = `Create an instance of the following JSON schema for a learning curriculum.  
  
  This curriculum takes a test-driven approach, starting by identifying tests that the students must pass to demonstrate proficiency in some area.
  The schema allows for fractal nesting of tests, so that a test can be composed of other tests.  This allows for a curriculum to be composed of a series of tests, each of which is composed of a series of tests, and so on.  Please take advantage of this feature.

  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Test Driven Curriculum",
    "type": "object",
    "properties": {
        "tests": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/Test"
            }
        }
    },
    "definitions": {
        "Test": {
            "type": "object",
            "properties": {
                "test_id": {
                    "type": "string"
                },
                "test_name": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "passing_criteria": {
                    "type": "string"
                },
                "tests": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Test"
                    }
                }
            },
            "required": [
                "test_id",
                "test_name",
                "description",
                "passing_criteria"
            ]
        }
    }
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

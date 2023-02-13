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

export const createCurriculum = async (topic: string) => {
  const prompt = `Create an instance of the following JSON schema for a learning curriculum.  
  
  This curriculum takes a test-driven approach, starting by identifying tests that the students must pass to demonstrate proficiency in some area.
  The schema allows for fractal nesting of tests, so that a test can be composed of other tests.  This allows for a curriculum to be composed of a series of tests, each of which is composed of a series of tests, and so on.  Please take advantage of this feature.
  Passing criteria should be very specific, articulating specific facts or details the student should demonstrate in order to pass.

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


Generate an instance of this schema for learning ${topic}.`;

  const response = await complete(prompt, 2000);
  return response.data.choices[0].text;
};

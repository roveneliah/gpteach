// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createCurriculum } from "lib/openai";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  // call the OpenAI api with the prompt
  createCurriculum(req.body.prompt).then((curriculumRaw: any) => {
    // if curriculum cannot be parser, return error
    const curriculum = JSON.parse(curriculumRaw);

    if (!curriculum) {
      res.status(500).json({
        topic: req.body.prompt,
        completion: curriculumRaw,
        error: "Could not parse curriculum",
      });
    }

    console.log("curriculum", curriculum);

    res.status(200).json({
      topic: req.body.prompt,
      completion: curriculumRaw,
      curriculum,
      tests: curriculum.tests[0],
    });
  });
}

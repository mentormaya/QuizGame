// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import questionsFile from "../../private/questions.json";

const prisma = new PrismaClient();

async function getAllQuestions() {
  return await prisma.question.findMany();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const questions = await getAllQuestions();
    await prisma.$disconnect();
    res.status(200).json(questions);
  }
}

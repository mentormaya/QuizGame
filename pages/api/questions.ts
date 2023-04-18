// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllQuestions() {
  let qs = await prisma.question.findMany();
  const questions = Promise.all(
    qs.map(async question => {
      const optn = await prisma.options.findMany({
        where:{
          questionId: question.id
        }
      })
      const { a, b, c, d } = optn[0]
      return { ...question, options: { a, b, c, d }}
    })
  )
  await prisma.$disconnect() 
  return questions
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

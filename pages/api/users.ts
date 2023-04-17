// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

type userData = {
  id: String
  username: String
  password: String
  full_name: String
}


async function getAllUsers(){
  return await prisma.user.findMany()
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<userData[]>
) {
  if(req.method === 'GET'){
    const users = await getAllUsers()
    res.status(200).json(users)
  }

  await prisma.$disconnect()
}

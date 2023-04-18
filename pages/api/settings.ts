// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

import settingsFile from "../../private/settings.json";

const prisma = new PrismaClient();

type Settings = {
  id: String
  key: String
  value: String
  remarks: String | null
}

async function getAllSettings(){
  return await prisma.setting.findMany()
}

export default async function handler(
  req: NextApiRequest,
  // res: NextApiResponse<Settings[]>
  res: NextApiResponse
) {
  if(req.method === 'GET'){
    const settings = await getAllSettings()
    res.status(200).json(settings)
  }

  await prisma.$disconnect()
}

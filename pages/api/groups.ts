// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

async function getAllGroups(){
  let groups = await prisma.group.findMany()
  for (let group of groups){
    const members = await prisma.member.findMany({
      where: {
        groupId: group.id
      }
    })
    group = { ...group, members}
    groups =  [ ...groups.slice(0, group.id - 1 ), group, ...groups.slice(group.id) ]
  }
  await prisma.$disconnect()
  return groups
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET'){
    const groups = await getAllGroups()
    res.status(200).json(groups)
  }
}

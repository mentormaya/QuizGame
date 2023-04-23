// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

import groupsFile from "../../private/groups.json";

const prisma = new PrismaClient();

async function getAllGroups(){
  let gs = await prisma.group.findMany()
  const groups = Promise.all(
    gs.map(async group => {
      const mems = await prisma.member.findMany({
        where: {
          groupId: group.id
        }
      })
      const members = mems.map( member => {
        const { full_name, isLeader } = member
        return { full_name, isLeader }
      })
      return { ...group, members: members}
    })
  )
  await prisma.$disconnect() 
  return groups
}


function makeGroups() {
  return groupsFile.map((group) => {
      return {
          name: group.group_name,
          score: group.score,
          turn: group.turn,
          members: {
              create: group.members,
          },
      };
  });
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET'){
    const groups = await getAllGroups()
    res.status(200).json(groups)
  }
  await prisma.$disconnect() 
}

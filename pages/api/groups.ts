// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Group = {
  group_id: number,
  group_name: string,
  score: number,
  turn: boolean,
  members: [
    string,
    string,
    string
  ]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Group>
) {
  res.status(200).json({
    "group_id": 1,
    "group_name": "मकालु",
    "score": 0,
    "turn": true,
    "members": [
      "Priyanka Thakur",
      "Ajay Singh",
      "Prabin Mahato"
    ]
  })
}

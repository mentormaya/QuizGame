// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Settings = {
  TURN_TIME: number,
  PASS_TIME: number,
  TITLE: string,
  MESSAGE: string,
  APP_NAME: string,
  VERSION: string,
  AUTHOR: string,
  DESCRIPTION: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Settings>
) {
  res.status(200).json({
    "TURN_TIME": 60,
    "PASS_TIME": 15,
    "TITLE": "नेपाल राष्ट्र बैंक जनकपुर कार्यालय",
    "MESSAGE": "नेपाल राष्ट्र बैंककाे ६८औं जयन्तिकाे सुअवसरमा आयाेजित हाजिरी जवाफ प्रतियाेगिता ।",
    "APP_NAME": "Quiz Application",
    "VERSION": "1.0.0",
    "AUTHOR": "AJAY SINGH",
    "DESCRIPTION": "THIS APPLICATION IS SPECIALLY BUILT FOR THE AUSPICIOUS OCCASION OF ANNIVERSARY PROGRAM FOR NEPAL RASTRA BANK JANAKPUR OFFICE."
  })
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";

type Question = {
  id: number;
  question: string;
  type: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correct_option: string;
  published: boolean;
  shifted: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question>
) {
  res.status(200).json({
    id: 21,
    question:
      "“के हो ठूलो जगतमा, बुद्धि विवेक, उद्देश्य के लिनु, उडी छुनु चन्द्र एक” यो भनाई कसको हो ?",
    type: "MCQ_TEXT",
    options: {
      a: "लक्ष्मी प्रसाद देवकोटा",
      b: "भिमनिधि तिवारी",
      c: "युधिर शमशेर थापा",
      d: "बालकृष्ण सम",
    },
    correct_option: "a",
    published: false,
    shifted: false,
  });
}

import Image from 'next/image'
import { Inter } from 'next/font/google'

import Quiz from 'components/Quiz.tsx'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Quiz />
  )
}

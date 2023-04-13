import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div>
    <img src="/1920x1440.jpg" alt="Logo" className ='h-30 w-100' />
   </div>
  )
}

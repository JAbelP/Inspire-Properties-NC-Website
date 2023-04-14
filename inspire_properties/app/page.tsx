import { Inter } from 'next/font/google';
import Slider from './component/Slider';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const slides = [
    {path:"/testSliderImages/image-1.jpg",title:"Beach"},
    {path:"/testSliderImages/image-2.jpg",title:"Boat"},
    {path:"/testSliderImages/image-3.jpg",title:"Forest"},
    {path:"/testSliderImages/image-4.jpg",title:"city"},
    {path:"/testSliderImages/image-5.jpg",title:"Italy"}
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hello monsterlessons</h1>
      <div className="w-full h-[35rem] bg-gray-300  overflow-hidden">
        <Slider slides={slides} />
      </div>

    </div>


    )
}

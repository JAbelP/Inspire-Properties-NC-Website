
import { Inter } from 'next/font/google';
import Slider from './component/HomeComponents/Slider';
import TestFireBaseComponent from './component/HomeComponents/testFireBaseComponent';

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
      <div className="w-full h-[35rem] bg-gray-300  overflow-hidden">
        <Slider slides={slides} />
      </div>
        <TestFireBaseComponent />
    </div>
 

    )
}

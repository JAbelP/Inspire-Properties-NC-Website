
import { Inter } from 'next/font/google';
import Slider from './component/HomeComponents/Slider';
import TestFireBaseComponent from './component/HomeComponents/testFireBaseComponent';

export default function Home() {

  const slides = [
    {path:"/SlideShow/1.jpg",title:"First"},
    {path:"/SlideShow/2.jpg",title:"2nd"},
    {path:"/SlideShow/3.jpg",title:"3rd"},
    {path:"/SlideShow/4.jpg",title:"4th"},
    {path:"/SlideShow/5.jpg",title:"5th"},
    {path:"/SlideShow/6.jpg",title:"6th "}

  ]

  return (
    <div>
      <div className="w-full h-[50rem] bg-gray-300  overflow-hidden">
        <Slider slides={slides} />
      </div>
    </div>
 

    )
}

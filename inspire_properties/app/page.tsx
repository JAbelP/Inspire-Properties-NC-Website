
import { Inter } from 'next/font/google';
import Slider from './component/HomeComponents/Slider';
import TestFireBaseComponent from './component/HomeComponents/testFireBaseComponent';
import MyHeader from './component/Header';
import Myfooter from './component/Footer';
import {MainGeneralContactUsComponent} from './component/GeneralContactUsComponents/MainGeneralContactUsComponent'

export const metadata = {
  title: 'Inspire Properties - Property Services and Renovations Experts',
  description: "Your trusted partner for property services and renovations. From maintenance to landscaping, plumbing to roofing, we've got you covered. Contact us today!"
}


export default function Home() {
  

  const slides = [
    {path:"/SlideShow/1.jpg",title:"First",button:"Book With Us Today"},
    {path:"/SlideShow/2.jpg",title:"2nd",button:"Book With Us Today"},
    {path:"/SlideShow/3.jpg",title:"3rd",button:"Book With Us Today"},
    {path:"/SlideShow/4.jpg",title:"4th",button:"Book With Us Today"},
    {path:"/SlideShow/5.jpg",title:"5th",button:"Book With Us Today"},
    {path:"/SlideShow/6.jpg",title:"Yolo ",button:"Book With Us Today"}

  ]

  return (
    <div className='bg-white lg:min-h-screen flex flex-col'>
      <MyHeader/>
      <main className='flex-grow'>
      <div>
        <div className="w-full lg:h-[40rem]  bg-gray-300  overflow-hidden">
          <Slider slides={slides} />
        </div>
        <MainGeneralContactUsComponent/>
      </div>
      </main>
      <footer className='inline-block'>
        <Myfooter/>
      </footer>
    </div>

    )
}

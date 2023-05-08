
import { Inter } from 'next/font/google';
import Slider from './component/HomeComponents/Slider';
import TestFireBaseComponent from './component/HomeComponents/testFireBaseComponent';
import MyHeader from './component/Header';
import Myfooter from './component/Footer';


export default function Home() {

  const slides = [
    {path:"/SlideShow/1.jpg",title:"First",button:"Book With Us Today"},
    {path:"/SlideShow/2.jpg",title:"2nd",button:"Book With Us Today"},
    {path:"/SlideShow/3.jpg",title:"3rd",button:"Book With Us Today"},
    {path:"/SlideShow/4.jpg",title:"4th",button:"Book With Us Today"},
    {path:"/SlideShow/5.jpg",title:"5th",button:"Book With Us Today"},
    {path:"/SlideShow/6.jpg",title:"6th ",button:"Book With Us Today"}

  ]

  return (
    <body className='bg-white min-h-screen flex flex-col'>
      <MyHeader/>
      <main className='flex-grow'>
      <div>
        <div className="w-full h-[40rem] bg-gray-300  overflow-hidden">
          <Slider slides={slides} />
        </div>
      </div>
      </main>
      <footer>
        <Myfooter/>
      </footer>
    </body>

    )
}

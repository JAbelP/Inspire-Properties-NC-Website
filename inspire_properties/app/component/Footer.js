import React from 'react'
import Image from 'next/image';
import {Facebook, Marker, Phone} from './icons'


function MyFooter() {
  return (
    <div className='bg-greenLogo h-full'>
    <div className='bg-black flex flex-col gap-y-5 items-center pb-4 sm:flex-row sm:pt-5 h-max'>
        <div className=' flex flex-col items-center sm:w-1/3'>
            <Marker className="" />
            <p className='text-2xl text-center sm:px-40'>
                120 Weather Street Suit D Youngsville NC 27596 
            </p>
        </div>

        <div className='place-self-start pl-28  items-center sm:w-1/3'>
            <p className='text-3xl'>
                Get In Touch
            </p>
            <div className='flex flex-cols pt-3 pl-10 gap-x-5'>
                <a href="https://www.facebook.com/InspirePropertiesOfNorthCarlina/" rel="noopener noreferrer"> 
                 <Facebook className={'mx-1'}/>
                </a>

                <a href="tel:919-600-8888">
                 <Phone className={'mx-1'}/>
                </a>
            </div>
        </div>

        <div className='place-self-start items-center sm:w-1/3 pl-28' >
                More Information
        </div>
    </div>

    </div>)
}

export default MyFooter
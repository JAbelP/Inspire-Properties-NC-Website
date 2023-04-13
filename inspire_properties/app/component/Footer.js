import React from 'react'
import Image from 'next/image';
import {Facebook, Marker, Phone} from './icons'


function Myfooter() {
  return (
    <div className='grid grid-cols-3  place-content-stretch justify-items-center bg-black text-white'>
        {/* Location */}
        <div className='w-1/3'>
                {/* Location SVG */}
            <div className='ml-8 '>
                <Marker className={"ml-8 mt-3"}/>
                <b className='text-lg'>VISIT US</b> 

            </div>
            <div className='break-words'>

                <p className='flex-wrap'>
                120 Weather Street Suit D
                Youngsville NC 27596                 
                </p>

            </div>

        </div>
            
        <div className='grid grid-rows-2 justify-between justify-items-center h-1/2 pt-10 '>
         <div className='mb-10'>
            Get In Touch With Us!
        </div>
         <div className='flex flex-cols pt-3'>
            <Facebook className={'mx-1'}/>
            <Phone className={'mx-1'}/>
         </div>

        </div>

        <div className='grid grid-row h-1/2 pt-4'>
            <div className="mt-4">
                <p>more information</p>
            </div>
        <p className="mt-2">Careers</p>
        </div>


    </div>
  )
}

export default Myfooter
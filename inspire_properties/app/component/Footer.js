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
                    <a href='https://www.google.com/maps/dir//120+Weathers+Street,+Youngsville,+NC/@35.8533979,-78.5509336,11z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x89ac52c07418d279:0xbbdd4a97b59d562a!2m2!1d-78.4981911!2d36.0347782' target='_blank' rel='noopener noreferrer'>
                        120 Weather Street Suit D Youngsville NC 27596
                    </a>
                </p>
            </div>

        </div>
            
        <div className='grid grid-rows-2 justify-between justify-items-center h-1/2 pt-10 '>
         <div className='mb-10'>
            Get In Touch With Us!
        </div>
         <div className='flex flex-cols pt-3'>
            <a href="https://www.facebook.com/InspirePropertiesOfNorthCarlina/" rel="noopener noreferrer"> 
                <Facebook className={'mx-1'}/>
            </a>

            <a href="tel:989-992-7950">
                <Phone className={'mx-1'}/>
            </a>


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
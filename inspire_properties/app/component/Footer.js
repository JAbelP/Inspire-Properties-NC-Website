import React from 'react'
import Image from 'next/image';
import {Facebook, Marker, Phone} from './icons'


function MyFooter() {
  return (
    <div className='bg-greenLogo h-full'>
        
    {/* <div className='bg-black flex flex-col gap-y-5 items-center pb-4 sm:flex-row sm:pt-5 h-max'>
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
    </div> */}

    {/* I need to create a three column grid that as it shrinks it begins stacking on one another  */}
    <div className='grid grid-flow-row gap-y-4 pl-3 lg:grid-flow-col'>
     <div className='text-center'>
        <p className='text-xl font-bold'>
            Get In Touch
        </p>
        <a href="https://www.facebook.com/InspirePropertiesOfNorthCarlina/" rel="noopener noreferrer">
            <div className='flex flex-row gap-x-2 justify-center mb-2'>
                <Facebook />
                Follow us on Facebook
            </div>
        </a>
        <a href="tel:919-600-8888">
        <div className='flex flex-row gap-x-2 justify-center'>
        
            <Phone />
            
            call us 919-600-8888
        </div>
    </a>
     </div>
     
    <div className='mt-2 text-center pb-5'>
    <p className='text-xl font-bold'>
        Come Visit
        </p>
        <p className='whitespace-pre-line'>120 Weather Street Suit D Youngsville NC 27596 </p>
        <div className='flex justify-center'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.4065584274927!2d-78.50076602445387!3d36.03478251047203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac52c07418d279%3A0xbbdd4a97b59d562a!2s120%20Weathers%20St%2C%20Youngsville%2C%20NC%2027596!5e0!3m2!1sen!2sus!4v1684865974001!5m2!1sen!2sus" width="400" height="300" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
     </div>
     

    </div>
    
    </div>)
}

export default MyFooter
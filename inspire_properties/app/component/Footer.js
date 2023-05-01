import React from 'react'
import Image from 'next/image';
import {Facebook, Marker, Phone} from './icons'


function Myfooter() {
  return (
    <div className='bg-black flex flex-col gap-y-5 items-center pb-4 sm:flex-row sm:pt-5'>
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
    </div>)
}
//     <div className='grid grid-row-3 justify-items-center sm:grid-cols-3  sm:place-content-stretch sm:justify-items-center bg-black text-white h-full text-xl'>
//         {/* Location */}
//         <div className='w-1/3 sm:w-1/3'>
//                 {/* Location SVG */}
//             <div className='ml-10 sm: '>
//                 <Marker className={"ml-8 mt-3"}/>
//                 <b className='text-lg sm:pl-14'>VISIT US</b> 

//             </div>
//             <div className='break-words ml-4'>
//                 <p className='flex flex-wrap'>
//                         120 Weather Street Suit D Youngsville NC 27596 
//                 </p>
//                 {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.406735005507!2d-78.4981911!3d36.0347782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac52c07418d279%3A0xbbdd4a97b59d562a!2s120%20Weathers%20St%2C%20Youngsville%2C%20NC%2027596!5e0!3m2!1sen!2sus!4v1681694903677!5m2!1sen!2sus" width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='m-4'></iframe> */}
//             </div>

//         </div>
            
//         <div className='grid grid-rows-2 justify-between justify-items-center h-1/2 pt-10 '>
//          <div className='mb-10'>
//             Get In Touch With Us!
//         </div>
//          <div className='flex flex-cols pt-3 gap-x-5'>
//             <a href="https://www.facebook.com/InspirePropertiesOfNorthCarlina/" rel="noopener noreferrer"> 
//                 <Facebook className={'mx-1'}/>
//             </a>

//             <a href="tel:919-600-8888">
//                 <Phone className={'mx-1'}/>
//             </a>


//          </div>

//         </div>

//         <div className='grid grid-row h-1/2 pt-4'>
//             <div className="mt-4">
//                 <p>more information</p>
//             </div>
//         <p className="mt-2">Careers</p>
//         </div>


//     </div>
//   )
// }

export default Myfooter
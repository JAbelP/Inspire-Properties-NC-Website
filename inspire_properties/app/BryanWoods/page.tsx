import React from 'react'

function page() {
  return (
    <div className='text-black'>
      <div className='bg-greenLogo h-20 flex justify-start pb-2 items-end text-4xl'>
        Bryan Woods
      </div>
      <div className='flex flex-row flex-wrap'>
        <div className='w-44 h-28 border-4 m-6 rounded-md  shadow-2xl'>
          <div className='p-1 text-center'>
            <p>
              Fridge replacement
            </p>
            <p className='font-bold'>Status:</p>
            <p>Job starting</p>
            
          </div>
        </div>

        <div className='w-44 h-28 border-4 m-6 rounded-md  shadow-2xl bg-yellow-300'>
          <div className='p-1 text-center'>
            <p>
              Power Wash
            </p>
            <p className='font-bold'>Status:</p>
            <p>Job In Progress</p>
          </div>
        </div>
        
        <div className='w-44 h-28 border-4 m-6 rounded-md  shadow-2xl bg-greenLogo opacity-90'>
          <div className='p-1 text-center'>
            <p>
              Cutting Grass
            </p>
            <p className='font-bold'>Status:</p>
            <p>Job Finshed</p>
          </div>
        </div>
        <div className='w-44 h-28 border-4 m-6 rounded-md shadow-2xl bg-gray-200 flex justify-center items-center'>
          <p className='text-4xl font-bold'>+</p>
        </div>

        </div>


    </div>
  )
}

export default page
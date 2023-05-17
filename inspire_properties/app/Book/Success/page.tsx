import React from 'react'
import MyHeader from '@/app/component/Header'
import MyFooter from '@/app/component/Footer'
function SuccessPage() {
  return (
    <div>
      <MyHeader/>
        <div className='h-96 w-full bg-gray-600 text-center text-5xl'>
            <p className='relative top-1/3 '>
                We Will Get In Touch Soon!
            </p>
        </div>
        <footer>
          <MyFooter/>
        </footer>
    </div>
  )
}

export default SuccessPage
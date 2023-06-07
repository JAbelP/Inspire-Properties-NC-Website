import React from 'react'
import MyHeader from '../component/Header'
import MyFooter from '../component/Footer'
import Script from 'next/script';

function page() {
  return (
     <div className='bg-white min-h-screen flex flex-col'>
        <MyHeader/>
        <main className='flex-grow'>
            <div className='text-white bg-black h-60 sm:w-full w-80 sm:h-24 text-center text-6xl flex items-center justify-center'>
                Need to finance a Project?
            </div>
            <script src="https://widget.gethearth.com/script.js" id="hearth-script" data-orgid="39548" data-partner="inspire-properties-llc"></script>
              <iframe id="hearth-widget_calculator_v1"></iframe>
        </main>
        <footer className='inline-block'>
        <MyFooter/>
      </footer>
     </div>
    
  )
}

export default page
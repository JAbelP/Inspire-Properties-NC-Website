import React from 'react'
import MyHeader from "../component/Header";
import MyFooter from "../component/Footer";
import Page from "../component/BeforeAndAfter/Page";


function page() {

  return (
    <div className='bg-white min-h-screen flex flex-col'>
         <MyHeader/> 
         <main className='flex-grow'>
          <Page/>
         </main>
        

         <footer className='inline-block'>
        <MyFooter/>
      </footer>
    </div>
  )
}

export default page
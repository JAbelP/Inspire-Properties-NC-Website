import React from 'react'
import MyHeader from "../component/Header";
import MyFooter from "../component/Footer";
import Page from "../component/BeforeAndAfter/Page";


export const metadata = {
  title: 'Inspire Properties - Stunning Before and After Transformations',
  description: "Explore inspiring before & after projects by Inspire Properties. Contact us to discuss your project and experience the transformation firsthand."
}


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
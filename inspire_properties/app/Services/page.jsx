import React from 'react'
import Myheader from '../component/Header'
import MyFooter from '../component/Footer'
import {ServiceList} from '../component/ServicesComponents/ServiceList';

export const metadata = {
  title: 'Inspire Properties - Property Services and Renovations Experts',
  description: "Discover our comprehensive property services for maintenance, renovations, and  landscaping. Trust Inspire Properties for all your needs. Contact us today!"
}

function page() {
  
  return (
    <div className='bg-Color2darkBlue lg:min-h-screen flex flex-col text-black'>
        <Myheader/>
        <main className='flex-grow'>
            <ServiceList />
        </main>
        <footer className='inline-block'>
        <MyFooter/>
      </footer>
    </div>
  )
}

export default page
"use client"
import React,{useState} from 'react'
import MyHeader from "../component/Header";
import MyFooter from "../component/Footer";
import Image from 'next/image';


function page() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
      };
    
      const images = [
        '1.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg',
        '7.jpg',
        // Add more image filenames here
      ];
    
  return (
    <div className='bg-white min-h-screen flex flex-col'>
         <MyHeader/> 
         <main className='flex-grow'>
         <div className="flex">
      <div className="w-1/4 bg-gray-200 p-4">
        {images.map((image) => (
          <div
            key={image}
            className="mb-4 cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={`/BeforeAndAfter/${image}`}
              alt="Preview"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      <div className="flex-grow p-4">
        {selectedImage && (
          <div>
            <h2 className="text-2xl mb-4">Full-sized Image</h2>
            <Image
              src={`/BeforeAndAfter/${selectedImage}`}
              alt="Full-sized Preview"
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
    </div>
         </main>
        

         <footer className='inline-block'>
        <MyFooter/>
      </footer>
    </div>
  )
}

export default page
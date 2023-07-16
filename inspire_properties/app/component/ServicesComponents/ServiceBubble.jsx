import React from 'react';

export const ServiceBubble = (props) => {
  const alignClass = props.className === 'right-side' ? 'md:ml-auto md:mr-60' : 'md:mr-auto md:ml-60';

  return (
    <div className={`w-96 lg:w-[48rem] h-60 lg:my-6 my-5 rounded-3xl flex flex-col justify-center hover:scale-105 transition duration-300 mx-auto lg:${alignClass}`} style={{ backgroundImage: "url('/ServicesImages/ServiceImageSample.jpg')" }}>
      <div className='bg-Color4darkerGreen w-96 lg:w-[48rem] h-60 rounded-3xl flex flex-col justify-center' style={{ backgroundColor: 'rgba(48, 131, 28, 0.5)' }}>
        <div className="p-4">
          <h3 className="text-white text-xl font-bold mb-2">SERVICE NAME</h3>
          <p className="text-white opacity-100 text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac mauris elit. Praesent ut lacinia erat. Cras nec erat vitae nunc pharetra ultrices.
          </p>
        </div>
      </div>
    </div>
  );
};

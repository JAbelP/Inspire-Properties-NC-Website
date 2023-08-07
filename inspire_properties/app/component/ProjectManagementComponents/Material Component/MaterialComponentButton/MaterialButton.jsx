import React from 'react';
import Image from 'next/image';

function EmployeeButton() {
  return (
    <div className='mt-2'>
      <div className="w-10 h-[42px] relative">
        <div className=" group  h-9 w-9 hover:w-[129px] ease-in duration-300 bg-black rounded-lg my-auto flex items-center" >
            <Image className=' group-hover:rotate-[360deg] ease-in duration-300' src={'/plus42.png'} alt="Plus Sign" width="42" height="42" />
        </div>
      </div>
    </div>
  );
}

export default EmployeeButton;

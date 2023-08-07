import React from 'react'
import MaterialButton from './MaterialComponentButton/MaterialButton'

function Material({Products}) {
  return (
    <div className='  text-black w-[860px] h-fit 
     bg-cyan-500 mt-6 rounded-xl mx-auto  pt-2 pb-7 mb-4'>
        <div className='flex flex-row text-xl gap-x-10 pl-6 mb-2'>
            <p>
                Material
            </p>
            <p>
                Price   
            </p>
            <p>
                Qty
            </p>

        </div>

        <div className='pl-6 pt-1 '>
            {Products?.map((product) =>(
                <div className='flex flex-row text-xl gap-x-10'>
                    <p>
                        {product.productName}
                    </p>
                    <p>
                        {product.productCost}
                    </p>
                    <p>
                        {product.Quantity}
                    </p>
                </div>
            ))}
        
                <MaterialButton/>
        </div>

        <div className='h-3 bg-black text-black'>
        </div>
        <div className='text-center mt-2'>
            Total Cost: $100
        </div>
    </div>
  )
}

export default Material
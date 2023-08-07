import React from 'react'
import HeaderButton from './HeaderButtons/headerButton'

function Header() {
  return (
    <div className='text-black'>
    
    <div className="w-full h-[95px] px-[102px] py-3.5 bg-slate-400 justify-end items-start gap-[23px] inline-flex">
        <HeaderButton buttonText={'project'}/>
        <HeaderButton buttonText={'Employee'}/>
    </div>






    </div>
  )
}

export default Header
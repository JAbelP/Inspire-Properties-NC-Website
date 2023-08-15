import React from 'react'

function HeaderButton({buttonText, click}) {
  return (
        <button className="w-[187px] h-[67px] px-[55px] py-[9px] bg-fuchsia-600 hover:bg-fuchsia-950 hover:backdrop-blur-[71px] 
            group-hover: rounded-[20px] border border-black justify-center items-center gap-2 inline-flex
            text-black text-2xl font-normal capitalize hover:text-white
            "
            onClick={() => click()}
            >{buttonText}
        </button>
  )
}

export default HeaderButton
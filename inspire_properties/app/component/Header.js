"use client"
import React from "react";
import LogoSVG from "./icons/logo";
import Link from 'next/link';
import { useState,useEffect } from "react";
import {Hamburger} from './icons'

function Myheader() {
  
  const [ menuOpen, setMenuOpen ] = useState(false);

const handleMenuClick = () =>{
  setMenuOpen(!menuOpen)
}


  return (
    <div>
      <div className="flex flex-row justify-between items-start pt-8 sm:pr-10 text-2xl text-black bg-white h-25">
    {/* ----------------LOGO-------------------------- */}
        <div>
          <Link href={"/"}>
            {/* <img src="/Logo.png" alt="Logo" className="h-15 w-40" /> */}
            <LogoSVG className={"ml-4"}/>
          </Link>
        </div>
    {/* ----------------LOGO-------------------------- */}
    
    {/* ------------------------- Full Sized Header-------------------- */}
      <div className="hidden lg:block ">
          <div className="flex-grow flex-shrink-0 sm:pl-6 text-4xl">
            <div className="flex flex-row justify-end gap-x-9 flex-shrink-1 flex-wrap">
              <Link href={"/"}>
                <div>
                  <HeaderButton label={"Home"} className={"bg-green-700 my-2 rounded-lg"} />
                </div>
              </Link>
              <div>
                <Link href={"/Book"}>
                  <HeaderButton label={"Book Us"} />
                </Link>
              </div>
              {/* <div>
                <Link href={"/Services"}>
                  <HeaderButton label={"Services"} />
                </Link>
              </div> */}

              {/* <div>
                <HeaderButton label={"Our Services"} />
              </div>
              <div>
                <HeaderButton label={"Finance"} />
              </div> */}
            </div>
          </div>
      </div>
    {/* ------------------------- Full Sized Header-------------------- */}

      </div>
      <div className="absolute top-[3.5rem] visible lg:invisible z-30" style={{right: "1.5rem",top:"38px"} }>
        <button onClick={handleMenuClick}>
          <Hamburger />
        </button>
      </div>


        {/* ---------------------------- tray  ------------------------ */}
            <div className= {`fixed w-2/3 h-full bg-greenLogo right-0 top-0 duration-300 z-20 transition-transform transform ${menuOpen?("-translate-x-0"):("translate-x-full")} text-center text-5xl pt-36`}>
              <ul>

                <li className="pb-10">
                  <Link href={"/"}>
                    <p onClick={handleMenuClick}>Home</p>
                  </Link>
                </li>

                <li  className="pb-10">
                  <Link href={"/Book"}>
                    <p onClick={handleMenuClick}>Book Us</p>
                  </Link>
                </li>

                {/* <li className="pb-10">
                  <Link href={"/Services"}>
                    <p onClick={handleMenuClick}>Services</p>
                  </Link>
                </li> */}
                
                <li className="pb-10">
                  <Link href={"/BeforeAndAfter"}>
                    <p onClick={handleMenuClick}>Before and After</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div onClick={handleMenuClick} className={`fixed w-1/3 h-full bg-green-950 opacity-75 left-0 top-0 duration-300 z-20 transition-transform transform ${menuOpen?("translate-x-0"):("-translate-x-full")} text-center text-5xl pt-36`}>

            </div>
        {/* ---------------------------- tray  ------------------------ */}

    </div>
      );

    }
    const HeaderButton = ({label, className = "bg-white hover:bg-greenLogo my-2 rounded-lg "}) =>(
      <button className={className}>
          <p className="p-3">{label}</p>
      </button>
  )


export default Myheader
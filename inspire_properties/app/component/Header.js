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
      <div className="flex flex-row justify-between items-start mt-10 sm:pr-10 text-2xl text-black bg-white h-25">
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
              <div>
                <HeaderButton label={"Our Services"} />
              </div>
              <div>
                <HeaderButton label={"Finance"} />
              </div>
            </div>
          </div>
      </div>
    {/* ------------------------- Full Sized Header-------------------- */}

      </div>
      <div className="absolute top-[3.5rem] visible lg:invisible" style={{right: "1.5rem",top:"2"}}>
        <button onClick={handleMenuClick}>
          <Hamburger />
        </button>
      </div>

\

        {/* ---------------------------- tray  ------------------------ */}
      <div className={`${menuOpen ?("visible"):("hidden ")} overflow-hidden overflow-x-hidden ` }>
          <div onClick={handleMenuClick} className={`${menuOpen ?("visible"):("hidden ")}  bg-gray-700 w-1/2 h-[85rem] opacity-75 absolute top-0 left-0 ${menuOpen ?("z-30"):("-z-10")}`} style={{ transition: "transform 0.5s ease-in-out", transform: `translateX(${menuOpen ? "0" : "-100%"})` }} />
            <div className={`${menuOpen ?("visible"):("hidden ")} bg-green-100 text-black w-1/2 h-[85rem] absolute top-0 right-0  text-4xl pl-4 pt-10 flex-col flex-wrap ${menuOpen ?("z-30"):("-z-10")} `} style={{ transition: "transform 0.5s ease-in-out", transform: `translateX(${menuOpen ? "0" : "100%"})` }}>
              <Link href={"/"} className="block mb-4">
                <p onClick={handleMenuClick}>
                  Home
                </p>
              </Link>
              <Link href={"/Book"} className="block mb-4">
                <p onClick={handleMenuClick}>
                  Book Us
                </p>
              </Link>
            </div>
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
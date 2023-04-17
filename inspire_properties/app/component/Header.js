import React from "react";
import LogoSVG from "./icons/logo";
import Link from 'next/link';

function Myheader() {
  return (

    <div className="flex flex-row justify-between items-center mt-10 pr-10 text-2xl text-black bg-white h-25">
      <div>
      {/* <img src="/Logo.png" alt="Logo" className="h-15 w-40" /> */}
      <LogoSVG className={"ml-4"}/>
      </div>
      <div className="flex-grow flex-shrink-0">
        <div className="flex flex-row justify-end gap-x-9">
          <Link href={"/"}>
            <div>
              <HeaderButton label={"Home"} className={"bg-green-700 my-2"} />
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
  );

}

const HeaderButton = ({label, className}) =>(
    <button className={className}>
        <p className="p-3">{label}</p>
    </button>
)
HeaderButton.defaultProps = {
    className:"bg-white hover:bg-greenLogo my-2 "
}

export default Myheader
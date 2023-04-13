import React from "react";

function Myheader() {
  return (

    <div className="flex flex-row justify-between items-center mt-10 pr-10 text-2xl text-black bg-white h-25">
      <div>
      <img src="/Logo.png" alt="Logo" className="h-15 w-40" />
      </div>
      <div className="flex-grow flex-shrink-0">
        <div className="flex flex-row justify-end gap-x-9">
          <div>
            <HeaderButton label={"Home"} className={"bg-green-700 my-2"} />
          </div>
          <div>
            <HeaderButton label={"About Us"} />
          </div>
          <div>
            <HeaderButton label={"Our Services"} />
          </div>
          <div>
            <HeaderButton label={"More"} />
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
    className:"bg-white hover:bg-green-700 my-2 "
}

export default Myheader
"use client"
import { useState, useEffect  } from "react";
import TextBox from "./MoreInformationBooking";

function DropdownMenu( props ) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(props.selectedService);
    
   //updates the selected service
    useEffect(() => {
      setSelectedService(props.selectedService);
    }, [props.selectedService]);
    
    /**
     * toggles drop down
     */
    function toggleDropdown() {
      setIsOpen((prevState) => !prevState);
    }
  

    /**
     * selects current service 
     * @param {string} service 
     */
    function handleSelectService(service) {
      setSelectedService(service);
      setIsOpen(false); // Close the dropdown after selecting a service
      const tempArray = props.clientServicesAmount;
      tempArray[props.index] = service;
      props.changeServiceAtIndex(tempArray)
    }
  
    return (
      <div className="relative w-auto mt-3">
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex col justify-between w-80 lg:w-[88rem] lg:h-20 mx-6 px-4 lg:pl-[30rem] py-2 text-3xl break-words font-medium
           text-gray-700 bg-white border border-gray-300 rounded-md h-auto  hover:bg-gray-50 
           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {selectedService} {/* Show the selected service if there is one */}
          <svg
            className={`w-5 h-5 ml-2 transition-transform transform visible lg:hidden ${
              isOpen ? '-rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 6.707a1 1 0 0 1 0-1.414l5-5a1 1 0 1 1 1.414 1.414L7.414 6l5.293 5.293a1 1 0 1 1-1.414 1.414l-5-5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto text-xl `}
        >
          <div className="px-2 py-2 overflow-hidden">
            {Object.entries(props.services).map(([category, services]) => (
              <div key={category}>
                <p className="font-medium text-gray-900 ml-4 ">{category}</p>
                <ul className="mt-1 space-y-1">
                  {(services).map((service) => (
                    <li key={service}>
                      <button
                        type="button"
                        className="w-full text-left lg:text-center rounded-md ml-8 hover:bg-slate-500"
                        onClick={() => handleSelectService(service)}
                      >
                        {service}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <TextBox/>
      </div>
    );
  }
  
  export default DropdownMenu;
"use client"
import React from 'react'
import { servicesWeOffer } from '../../../data/services-data';
import PhoneInput from './PhoneEntryBooking';
import EmailInput from './EmailEntryBooking';
import AddressInput from './AddressEntryBooking';
import DropdownMenu from './DropDownForBookings';
import { useState } from 'react';


function SubmissionPage() {
    const [ clientEmail , setClientEmail ] = useState('');
    const [ clientPhone , setClientPhone ] = useState('');
    const [ clientAddress, setClientAddress ] = useState('');
    const [ clientServicesAmount, setClientServicesAmount ] = useState(['-----Please Select a Service-----']);
    
    const handleClientEmail = (clientEmailResponse) => {
        setClientEmail(clientEmailResponse);
    }
    
    const handleClientPhone = (clientPhoneResponse) => {
        setClientPhone(clientPhoneResponse);
    }

    const handleClientAddress = (clientAddressResponse) => {
        setClientAddress(clientAddressResponse);
    }

    const handleClickAlertTEST = () => {
        alert(`Email: ${clientEmail} Phone: ${clientPhone} Address: ${clientAddress}`);
    }
    
    const addServiceButton = () => {
        setClientServicesAmount([...clientServicesAmount, "-----Please Select a Service-----"]);
    }

    const changeServiceAtIndex = (temp) =>{
        setClientServicesAmount(temp)
        console.log(" this is new ClientServicesAmount ", temp )
    }

    const deleteServiceButton = (index) => {

          // Make a copy of the current services array in state
        const updatedServices = [...clientServicesAmount];
        console.log(clientServicesAmount)
        updatedServices.splice(index,1)
        console.log(updatedServices);
        setClientServicesAmount(updatedServices)


    }


    return (
        <div>
            <div className="w-full h-full bg-gray-600 text-black  overflow-hidden p-4">
                <PhoneInput handlePhone={handleClientPhone} />
                <EmailInput handleEmail={handleClientEmail} />
                <AddressInput handleAddress={handleClientAddress} />
                {clientServicesAmount.map((service, index) => (
                    <div key={`service-${index}`}>                        
                        <DropdownMenu selectedService={service} services={servicesWeOffer} index={index} clientServicesAmount={clientServicesAmount} changeServiceAtIndex={changeServiceAtIndex} />
                        <div className='flex'>
                            {index === (clientServicesAmount.length - 1) && (
                                <button className='bg-greenLogo p-3' onClick={addServiceButton}> Add a service </button>
                            )}
                            {   index !== 0 &&
                                    <div className='ml-auto'>
                                        <button className='bg-red-600 p-3' onClick={() => deleteServiceButton(index)}>
                                            Delete      
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubmissionPage;

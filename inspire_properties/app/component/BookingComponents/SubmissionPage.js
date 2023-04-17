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


  return (
    <div>
        <div className="w-full h-full bg-gray-600 text-black  overflow-hidden p-4">
            <PhoneInput handlePhone={handleClientPhone} />
            <EmailInput handleEmail={handleClientEmail} />
            <AddressInput handleAddress={handleClientAddress} />
            <DropdownMenu services={servicesWeOffer}/>
            <div className="flex justify-center">
                <button onClick={handleClickAlertTEST} className='bg-greenLogo text-2xl p-5'>
                    Press me
                </button>
            </div>
        </div>
    </div>
  )
}

export default SubmissionPage
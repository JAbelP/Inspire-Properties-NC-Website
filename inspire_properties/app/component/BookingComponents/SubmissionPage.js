"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { servicesWeOffer } from '../../../data/services-data';
import DropdownMenu from "./DropDownForBookings"
import Script from "next/script";

function SubmissionPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY
  const [
    formValues, setFormValues,
  ] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    date: '',
  });
  const [clientNewServiceAmount, setClientNewServiceAmount] = useState([
    { Service: '-----Please Select a Service-----', AdditionalInfo: "" }
  ]);
  const router = useRouter();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    let updatedValue = value;

    if (id === 'phone') {
      // Remove non-digit characters from phone number
      updatedValue = value.replace(/\D/g, '');

      // Restrict phone number to a maximum of 14 characters
      if (updatedValue.length > 14) {
        updatedValue = updatedValue.slice(0, 14);
      }

      // Format the phone number as (xxx) xxx-xxxx
      if (updatedValue.length > 0) {
        updatedValue = `(${updatedValue.slice(0, 3)}) ${updatedValue.slice(3, 6)}-${updatedValue.slice(6)}`;
      }
    }


    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: updatedValue,
    }));
  }

  const handleAddServiceButton = () => {
    setClientNewServiceAmount(prevServices => [
      ...prevServices,
      { Service: '-----Please Select a Service-----', AdditionalInfo: "" }
    ]);
  };

  const changeServiceAtIndex = (index, temp) => {
    setClientNewServiceAmount(prevServices => {
      const updatedServices = [...prevServices];
      updatedServices[index] = temp;
      return updatedServices;
    });
  };

  const deleteServiceButton = (index) => {
    setClientNewServiceAmount(prevServices => {
      const updatedServices = [...prevServices];
      updatedServices.splice(index, 1);
      return updatedServices;
    });
  };

  const sendEmail = async (name,email, phone, address, services,dateAndTime = new Date()) => {
    if (typeof dateAndTime === 'string') {
      dateAndTime = new Date(dateAndTime);
    };
    //formatting date and all that jazz
    const year = dateAndTime.getFullYear();
    const month = dateAndTime.getMonth();
    const day = dateAndTime.getDate();
    const hours = dateAndTime.getHours();
    const minutes = dateAndTime.getMinutes();

    const formattedDateAndTime = new Date(year, month, day, hours, minutes).toString();

      const emailBody = {
        name:name,
        email:email,
        phone:phone,    
        address:address,
        dateAndTime:formattedDateAndTime,
        services:services
      };
      
      try {
        const response = await fetch('/api/buildAPackageEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailBody)
        });

        if (response.ok) {
          console.log('Email sent successfully');
        } else {
          console.error('Failed to send email');
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Proceed with form submission

    if ( !formValues.name || !formValues.phone || !formValues.email || !formValues.address || !formValues.date) {
      const warningParts = ['Please provide:'];
      
      if (!formValues.name) {
        warningParts.push("Your Name");
      }
      if (!formValues.phone) {
        warningParts.push("Phone");
      }
      if (!formValues.email) {
        warningParts.push("Email");
      }
      if (!formValues.address) {
        warningParts.push("Address");
      }
      if( !formValues.date) {
        warningParts.push("a Service Date");
      }
      const warning = warningParts.join(' ');
      alert(warning);
      return;
    }


    grecaptcha.ready(() =>{
      grecaptcha.execute(siteKey, {action:'submit'}).then( async token => {
        console.log(token);
        const bodyForGoogleResponse = {          
          recaptchaResponse: token
        }

        try{
            const response1 = await fetch("/api/reCaptcha", {
              method: "POST",
              headers: {"content-type": "application/json;charset=utf-8"},
              body: JSON.stringify(bodyForGoogleResponse)
            });
            
            if(response1.ok){
              const json = await response1.json();
              if(json.success){
                // writeData(formValues.name, formValues.email, formValues.phone, formValues.address, clientNewServiceAmount, formValues.date);
                sendEmail(formValues.name, formValues.email, formValues.phone, formValues.address, clientNewServiceAmount, formValues.date) ;
              }

            } else{
              throw new Error(response1.statusText);
            }
          } catch(error){
            console.log(error);
          
        }
      }).catch((error) => {
        console.log(error);
      })});
    
    router.push('/Book/Success');
  };

  return (
    <div>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      />
      <div className="w-full h-full bg-gray-600 text-black overflow-hidden p-4">
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} id='Contact-Us-Form'> 
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 text-black text-3xl">
                <span className="text-red-500">*</span> Name:
              </label>
              <input
                id="name"
                type="text"
                className="border border-gray-400 px-9 py-2 w-96 lg:w-[88rem] rounded-md mb-4 focus:outline-none focus:border-greenLogo h-24 text-3xl"
                placeholder="First Name Last Name: "
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-1 text-black text-3xl">
                <span className="text-red-500">*</span> Phone:
              </label>
              <input
                id="phone"
                type="tel"
                // pattern="[0-9]*"
                maxLength="14"
                minLength="10"
                className="border border-gray-400 px-9 py-2 w-96 lg:w-[88rem] rounded-md mb-4 focus:outline-none focus:border-greenLogo h-24 text-3xl"
                placeholder="(123) 456-7890"
                value={formValues.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-black text-3xl">
                <span className="text-red-500">*</span> Email:
              </label>
              <input
                id="email"
                type="email"
                className="border border-gray-400 px-9 py-2 w-96 lg:w-[88rem] rounded-md mb-4 focus:outline-none focus:border-greenLogo h-24 text-3xl"
                placeholder="Enter your email address"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="mb-1 text-black text-3xl">
                <span className="text-red-500">*</span> Address:
              </label>
              <input
                id="address"
                type="text"
                className="border border-gray-400 px-9 py-2 w-96 lg:w-[88rem] rounded-md mb-4 focus:outline-none focus:border-greenLogo h-24 text-3xl"
                placeholder="Enter your address"
                value={formValues.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-1 text-black text-3xl pl-4">
                Date:
              </label>
              <input
                id="date"
                type="datetime-local"
                className="border border-gray-400 px-9 py-2 w-96 lg:w-[88rem]  rounded-md mb-4 focus:outline-none focus:border-greenLogo h-24 text-3xl"
                placeholder="Enter your email address"
                value={formValues.date}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>

        {clientNewServiceAmount?.map((serviceAndAdd, index) => (
          <div key={`service-${index} `}>
            <div className='flex flex-col items-center'>
              <DropdownMenu
                clientNewServiceAmount={clientNewServiceAmount}
                selectedServiceAndAdd={serviceAndAdd}
                services={servicesWeOffer}
                index={index}
                changeServiceAtIndex={(temp) => changeServiceAtIndex(index, temp)}
              />
            </div>
            <div>
              {index === (clientNewServiceAmount.length - 1) && (
                <div className='flex justify-around space-x-4'>
                  <button className='bg-greenLogo p-3 rounded-lg border-solid text-3xl border-4 border-black' onClick={handleAddServiceButton}> Add a service </button>
                     <button
                      className='bg-green-700 p-3 rounded-lg border-solid text-3xl border-4 border-black'
                      type='submit'
                      form='Contact-Us-Form'
                    >
                      Submit
                    </button>
                </div>
                
              )}
              
              {index !== 0 &&
                <div className='float-right mr-[4rem] mt-14 md:mr-[6rem] lg:mr-[26rem] '>
                  <button className='bg-red-600 p-3 rounded-lg border-solid text-3xl border-4 border-black' onClick={() => deleteServiceButton(index)}>
                    Delete
                  </button>
                </div>
              }
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}

export default SubmissionPage;

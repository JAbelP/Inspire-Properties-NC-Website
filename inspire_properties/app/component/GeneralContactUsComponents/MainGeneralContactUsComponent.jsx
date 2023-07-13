'use client'
import React, { useState } from 'react';

export const MainGeneralContactUsComponent = () => {

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    zipCode: '',
    helpText: '',
    submitted: false // Track if the form has been submitted
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'phone') {
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
      [name]: updatedValue,
    }));
  };

  const validateEmail = (email) => {
    // Use a simple email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for unfilled inputs
    const unfilledInputs = Object.keys(formValues).filter((key) => formValues[key] === '');
    if (unfilledInputs.length > 0) {
      return;
    }

    // Validate email before submission
    if (!validateEmail(formValues.email)) {
      alert('Please enter a valid email address.');
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
    


    setFormValues((prevValues) => ({
      ...prevValues,
      submitted: true, // Set submitted to true
    }));
  };

  // Render the thank you message if the form is submitted
  if (formValues.submitted) {
    return (
      <div className="bg-gray-600">
        <div className="flex justify-center lg:ml-[30rem]">
          <div className="text-black p-4 w-[75rem]">
            <div className="lg:w-1/2 bg-white p-4 rounded">
              <p className="text-black text-lg font-bold">
                Thank you! We will be in contact soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-600">
      <div className="flex justify-center lg:ml-[30rem]">
        <div className="text-black p-4 w-[75rem]">
          <form onSubmit={handleSubmit} className="lg:flex">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <div className="w-1/2 pr-2">
                  <label htmlFor="firstName" className="block text-white text-sm font-bold mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-400 rounded"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label htmlFor="lastName" className="block text-white text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-400 rounded"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-white text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="(999) 999-9999"
                  type="text"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  maxLength={14}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="Example@example.com"
                  type="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <div className="w-1/2 pr-2">
                <label htmlFor="address" className="block text-white text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    placeholder="Address"
                    type="text"
                    value={formValues.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded"
                    required
                  />
                </div>
                <div className="w-1/2 pl-2">
                <label htmlFor="zipCode" className="block text-white text-sm font-bold mb-2">
                    Zip Code
                  </label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    placeholder="Zip Code"
                    type="text"
                    value={formValues.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="helpText" className="block text-white text-sm font-bold mb-2">
                  How Can We Help You
                </label>
                <textarea
                  id="helpText"
                  name="helpText"
                  placeholder="Write your message here..."
                  value={formValues.helpText}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-400 rounded"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-Color2darkBlue hover:bg-greenLogo text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

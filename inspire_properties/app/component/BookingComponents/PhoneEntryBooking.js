"use client"
import React, { useState } from 'react';

function PhoneInput(props) {
  const [phone, setPhone] = useState('');

  function handleChange(event) {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, ''); // remove non-digits
    const formatted = formatPhoneNumber(digitsOnly); // format the phone number
    setPhone(formatted);
    props.handlePhone(formatted)
  }

  function formatPhoneNumber(digits) {
    const phoneNumberPattern = /^(\d{3})(\d{3})(\d{4})$/;
    if (phoneNumberPattern.test(digits)) {
      return digits.replace(phoneNumberPattern, '($1) $2-$3');
    } else {
      return digits;
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="phone" className="mb-1 text-black">
      <span className="text-red-500">*</span> Phone:  {/* Add red asterisk */}
      </label>
      <input
        id="phone"
        type="tel"
        pattern="[0-9]*"
        maxLength="14"
        minLength="10"
        className="border border-gray-400 px-3 py-2 w-96 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        placeholder="(123) 456-7890"
        value={phone}
        onChange={handleChange}
      />
    </div>
  );
}

export default PhoneInput;

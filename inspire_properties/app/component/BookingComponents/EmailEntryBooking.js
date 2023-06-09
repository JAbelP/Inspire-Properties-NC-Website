"use client"
import React, { useState } from 'react';
function EmailInput(props) {
  const [email, setEmail] = useState('');

  function handleChange(event) {
    setEmail(event.target.value);
    props.handleEmail(event.target.value);
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="email" className="mb-1 text-black  text-3xl ">
      <span className="text-red-500">*</span> Email:
      </label>
      <input
        id="email"
        type="email"
        className="border border-gray-400 px-9 py-2 w-96 lg:w-[88rem] rounded-md mb-4 focus:outline-none focus:border-greenLogo h-24 text-3xl"
        placeholder="Enter your email address"
        value={email}
        onChange={handleChange}
      />
    </div>
  );
}

export default EmailInput;
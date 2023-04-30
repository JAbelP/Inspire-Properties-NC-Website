"use client"
import React, { useState } from 'react';
function AddressInput(props) {
  const [address, setAddress] = useState('');

  function handleChange(event) {
    setAddress(event.target.value);
    props.handleAddress(event.target.value)
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="address" className="mb-1 text-black text-3xl">
      <span className="text-red-500">*</span> Address:
      </label>
      <input
        id="address"
        type="text"
        className="border border-gray-400 px-3 py-2 w-96 rounded-md mb-4 focus:outline-none focus:border-indigo-500 h-24 text-3xl"
        placeholder="Enter your address"
        value={address}
        onChange={handleChange}
      />
    </div>
  );
}

export default AddressInput;
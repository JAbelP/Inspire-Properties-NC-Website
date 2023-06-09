"use client"
import React, { useState } from 'react';
function NameInput(props) {
  const [name, setName] = useState('');

  function handleChange(event) {
    setName(event.target.value);
    props.handleName(event.target.value);
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="name" className="mb-1 text-black text-3xl">
      <span className="text-red-500">*</span> Name:
      </label>
      <input
        id="name"
        type="text"
        className="border border-gray-400 px-9 py-2 w-96 lg:w-[88rem]  rounded-md mb-4 focus:outline-none focus:border-greenLogo h-24 text-3xl"
        placeholder="First Name Last Name: "
        value={name}
        onChange={handleChange}

      />
    </div>
  );
}

export default NameInput;
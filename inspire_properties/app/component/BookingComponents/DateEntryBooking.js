"use client"
import React, { useState } from 'react';
function DateInput({handleDate}) {
  const [date, setDate] = useState('');

  function handleChange(event) {
    setDate(event.target.value);
    handleDate(event.target.value);
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="date" className="mb-1 text-black text-3xl pl-4">
        Date:
      </label>
      <input
        id="date"
        type="datetime-local"
        className="border border-gray-400 px-9 py-2 w-96 lg:w-[88rem]  rounded-md mb-4 focus:outline-none focus:border-greenLogo h-24 text-3xl"
        placeholder="Enter your email address"
        value={date}
        onChange={handleChange}
      />
    </div>
  );
}

export default DateInput;
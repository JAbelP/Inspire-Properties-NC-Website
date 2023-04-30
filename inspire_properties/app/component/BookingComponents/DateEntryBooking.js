"use client"
import React, { useState } from 'react';
function DateInput(props) {
  const [date, setDate] = useState('');

  function handleChange(event) {
    setDate(event.target.value);
    props.handleDate(event.target.value);
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="date" className="mb-1 text-black text-3xl pl-4">
        Date:
      </label>
      <input
        id="date"
        type="datetime-local"
        className="border border-gray-400 px-3 py-2 w-96 rounded-md mb-4 focus:outline-none focus:border-indigo-500 h-24 text-3xl"
        placeholder="Enter your email address"
        value={date}
        onChange={handleChange}
      />
    </div>
  );
}

export default DateInput;
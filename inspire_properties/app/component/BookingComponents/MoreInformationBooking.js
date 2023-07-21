"use client";
import React, { useEffect, useState } from 'react';

function TextBox(props) {
  const [selectedServiceAdd, setSelectedServiceAdd] = useState('');

  useEffect(() => {
    setSelectedServiceAdd(props.selectedServiceAndAdd.AdditionalInfo);
  }, [props.selectedServiceAndAdd.AdditionalInfo]);

  function handleChange(event) {
    setSelectedServiceAdd(event.target.value);
    const tempArray = { ...props.selectedServiceAndAdd };
    tempArray.AdditionalInfo = event.target.value;
    props.changeServiceAtIndex(tempArray);
  }

  return (
    <div className="flex flex-col mt-3">
      <label htmlFor="text" className="mb-1 text-black text-3xl mt-3">
        Additional Information:
      </label>
      <textarea
        id="text"
        className="border border-gray-400 px-3 py-2 w-auto h-32 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        placeholder="Enter your text"
        value={selectedServiceAdd}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextBox;

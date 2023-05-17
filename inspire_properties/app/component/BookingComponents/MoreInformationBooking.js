"use client";

import React, { useState } from 'react';

function TextBox(props) {
  // props addText setAddText


  function handleChange(event) {
    props.setAddText(event.target.value);
  }

  return (
    <div className="flex flex-col mt-3">
      <label htmlFor="text" className="mb-1 text-black">
        Additional Information
      </label>
      <textarea
        id="text"
        className="border border-gray-400 px-3 py-2 w-auto h-32 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        placeholder="Enter your text"
        value={props.addText}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextBox;

"use client"
import * as React from 'react';

function BookUs() {
  const [value, setValue] = React.useState('fruit');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {

   setValue(event.target.value);

  };

  
    return (
      <div className='text-black'>
        <div>

        <label>

          <p>What do we eat?</p>

        <select value={value} onChange={handleChange}>

          <option value="fruit">Fruit</option>

          <option value="vegetable">Vegetable</option>

          <option value="meat">Meat</option>

        </select>

      </label>

<p>We eat {value}!</p>

</div>
  
      </div>
   
  
      )
}

export default BookUs
"use client"
import React, { useState } from 'react';

function EmployeeTable(props) {
  const [inputValue, setInputValue] = useState(0);
  const [totalHoursSpent, setTotalHoursSpent] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);

  const handleInputChange = (event) => {
    const hours = parseFloat(event.target.value) || 0;
    const money = (props.employee.data.employeePayRate * hours).toFixed(2);
    setInputValue(hours);
    setTotalHoursSpent(hours);
    setTotalMoneySpent(money);
    props.calculate(hours, money);
  };

  return (
    <div className='my-2 flex flex-row gap-x-8'>
      <p>{props.employee.data.employeeName}</p>
      <input
        className='w-16 pl-3'
        placeholder='Hours'
        value={inputValue}
        onChange={handleInputChange}
      />
      <p>{totalMoneySpent}</p>
    </div>
  );
}

export default EmployeeTable;

"use client"
import React, { useState } from 'react';

function EmployeeTable(props) {
  //Props: employee calculate addEmployeeToDate employeeList isLast
  const [inputValue, setInputValue] = useState(0);
  const [inputDropDownValue, setInputDropDownValue] = useState(0);
  const [totalHoursSpent, setTotalHoursSpent] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);
  const [ selectedEmployeeOnDropDown, setSelectedEmployeeOnDropDown] = useState('')

  const handleInputChange = (event) => {
    const hours = parseFloat(event.target.value) || 0;
    const money = (props.employee.data.employeePayRate * hours).toFixed(2);
    setInputValue(hours);
    setTotalHoursSpent(hours);
    setTotalMoneySpent(money);
    props.calculate(hours, money);
  };
  

  const handleEmployeeDropDownChange = (event) =>{
    setSelectedEmployeeOnDropDown(event.target.value);

    const currEmployee = props.employeeList.find((employee)=> employee.data.employeeName === event.target.value)

    if(!currEmployee) {
      console.log("Selected Employee not found");
      return;
    }
    setInputDropDownValue(currEmployee.expectedHours || '')

  }

  return (
    <div className='flex flex-col'>

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

    </div>
  );
}

export default EmployeeTable;

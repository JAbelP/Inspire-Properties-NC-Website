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
      <div className={`flex flex-row ${props.isLast ? ("visible"):("hidden")}`} >
        <button >
          <p className='bg-greenLogo rounded-full px-2 border-black border-2' onClick={() =>props.addEmployeeToDate(selectedEmployeeOnDropDown)}>+</p>
        </button>
        <select 
          className='ml-3 my-2'
          value={selectedEmployeeOnDropDown}
          onChange={handleEmployeeDropDownChange}
        >
        <option value={"select an employee"}> select an employee</option>
          {Array.isArray(props.employeeList) && props.employeeList.map((employee, index) => (
            <option key={employee.data.id} value={employee.data.employeeName}>
              {employee.data.employeeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EmployeeTable;

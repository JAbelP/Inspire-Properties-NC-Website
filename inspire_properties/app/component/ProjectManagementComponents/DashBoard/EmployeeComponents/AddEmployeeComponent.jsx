"use client"
import React, {useState} from 'react'

function AddEmployeeComponent(props) {
    // props employeeList addEmployeeToDate
    const[ selectedEmployeeOnDropDown, setSelectedEmployeeOnDropDown ] = useState('');
    const [inputDropDownValue, setInputDropDownValue] = useState(0)

    const handleEmployeeDropDownChange = (event) => {
      setSelectedEmployeeOnDropDown(event.target.value);
      
      const currEmployee = props.employeeList.find((employee) => employee.data.employeeName === event.target.value);

      if(!currEmployee){
        console.log('Selected employee not found');
        return;
      }
      setInputDropDownValue(currEmployee.expectedHours||'')
    }

  return (
    <div className='flex flex-row'>
    <button>
        <p className='bg-greenLogo rounded-full px-2 border-black border-2' onClick={()=> props.addEmployeeToDate(selectedEmployeeOnDropDown)}>+</p>
    </button>
    <select className='ml-3 my-2'
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
  )
}

export default AddEmployeeComponent
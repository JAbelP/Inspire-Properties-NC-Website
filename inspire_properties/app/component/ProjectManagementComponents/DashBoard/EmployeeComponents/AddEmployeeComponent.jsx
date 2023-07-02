"use client"
import React, {useState} from 'react'

function AddEmployeeComponent(props) {
    // props 
    //props.employeeList
    //props.addEmployeeToDate
    const[ selectedEmployeeOnDropDown, setSelectedEmployeeOnDropDown ] = useState('');

    const handleEmployeeDropDownChange = (event) => {
      const currEmployee = props.employeeList.find((employee) => employee.id === event.target.value);

      if(!currEmployee){
        console.log('Selected employee not found');
        return;
      }
      setSelectedEmployeeOnDropDown(event.target.value);
    }

    const greenButtonOnClose = () => {
      if(selectedEmployeeOnDropDown !=="" && selectedEmployeeOnDropDown!== null){
        props.addEmployeeToDate(selectedEmployeeOnDropDown);
      }
    }
    
  return (
    <div className='flex flex-row'>
    <button>
        <p className='bg-greenLogo rounded-full px-2 border-black border-2' onClick={()=>greenButtonOnClose()}>+</p>
    </button>
    <select className='ml-3 my-2'
        value={selectedEmployeeOnDropDown}
        onChange={handleEmployeeDropDownChange}
    >
        <option value={"select an employee"}> select an employee</option>
          {Array.isArray(props.employeeList) && props.employeeList.map((employee, index) => (
            <option key={employee.data.id} value={employee.id}>
              {employee.data.employeeName}
            </option>
          ))}
        </select>

    </div>
  )
}

export default AddEmployeeComponent
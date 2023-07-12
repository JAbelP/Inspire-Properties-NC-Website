"use client"
import React, { useEffect } from 'react';

function EmployeeTable(props) {
  //Props
  // props.employee - {id:String,date:{employeeName,employeePayRate,payType}}
  // props.calculate - calculates hours * payRate

  return (
    <div className='flex flex-col'>

      <div className='my-2 flex flex-row gap-x-8'>
        <p>{props.employee.data.employeeName}</p>
        <p>Hours worked: {props.employee.totalEmployeeHours?(props.employee.totalEmployeeHours):(0)}</p>
        <p>Pay: {props.employee.totalEmployeeMoney?(props.employee.totalEmployeeMoney):(0)}</p>
      </div>

    </div>
  );
}

export default EmployeeTable;

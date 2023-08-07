'use client'
import React, { useState, useEffect } from 'react';
import EmployeeButton from './EmployeeComponentButton/employeeButton';

/**
 * Employee has 
 * Name
 * EmployeePayRate
 * HoursWorked
 */
function EmployeeRow({ Employees }) {
  const [employeeData, setEmployeeData] = useState(Employees);
  const [totalDayPayout, setTotalDayPayout] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    // Calculate the total day payout and total hours worked
    let totalPayout = 0;
    let totalHoursWorked = 0;

    employeeData.forEach((employee) => {
      const hoursWorked = parseFloat(employee.HoursWorked);
      const payRate = parseFloat(employee.EmployeePayRate);

      if (!isNaN(hoursWorked) && !isNaN(payRate)) {
        totalPayout += hoursWorked * payRate;
        totalHoursWorked += hoursWorked;
      }
    });

    setTotalDayPayout(totalPayout);
    setTotalHours(totalHoursWorked);
  }, [employeeData]);

  const handleHoursWorkedChange = (index, newValue) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].HoursWorked = newValue;
    setEmployeeData(updatedEmployeeData);
  };

  return (
    <div className='text-black w-[860px] h-fit min-h-[100px] bg-cyan-500 mt-6 rounded-xl mx-auto'>
      <p className='pl-4 pt-2 text-xl font-semibold'>11/11/2015</p>
      <div className='pl-6 pt-1'>
        <table className='table-fixed gap-x-4 text-xl'>
          <thead>
            <tr>
              <th>Name</th>
              <th className='px-4'>Pay Rate</th>
              <th>Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee, index) => (
              <tr key={index}>
                <td className='px-4'>{employee.Name}</td>
                <td className='px-4'>{employee.EmployeePayRate}</td>
                <td className='px-4'>
                  <input
                    className='pl-4 w-16'
                    type='number'
                    value={employee.HoursWorked}
                    onChange={(e) => handleHoursWorkedChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EmployeeButton />
      </div>
      <div className='h-3 bg-black text-black'></div>
      <div className='flex flex-row gap-x-4 pl-6 py-2'>
        <p>Day Payout: ${totalDayPayout.toFixed(2)}</p>
        <p>Day/Hour:{totalHours}</p>
      </div>
    </div>
  );
}

export default EmployeeRow;

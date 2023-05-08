"use client"
import React, { useState } from 'react'

function EmployeeModal(props) {

    const [employeeName, setEmployeeName] =useState('');
    const [selectedType, setSelectedType] = useState('');
    const [employeePayRate, setEmployeePayRate] = useState('');


    function handleEmployeeNameChange(event){
        setEmployeeName(event.target.value);

    }

    function handleEmployeePayRateChange(event){
        setEmployeePayRate(event.target.value);
    }

    function handleCancel(){
        props.handleModalCancel();
    }

    const employeeTypeDropDownOptions ={
        Salary:"Salary",
        Hourly:"Hourly",
        Contract:"Contract"
    }


    const handleSelectedTypeChange = (event) =>{
        setSelectedType(event.target.value);
    }

    function handleSubmit(){
        if( employeeName!=='' && selectedType!=='' && employeePayRate!==''){
            

            handleCancel();            
        }
        
        else
        
        {
            alert('Please fill in all inputs.')

        }

    }


  return (
    <div className={`w-fit absolute bottom-1/3 left-1/3 ${props.isOpen ?("visible"):("hidden")} `}>
        <div className='bg-red-600 w-full text-left pl-4 py-2 rounded-t-md'>
            New Employee
        </div>
        <div className='bg-slate-200 text-black text-left'>
            <div className='py-2 pl-4 '>

                <div className='flex flex-row'>
                    <label htmlFor='Employee Name' className='mr-3 my-3'> Employee name: </label>
                    <input
                        className='my-2 pl-3 mr-6'
                        id='Employee Name'
                        type='text'
                        placeholder='Employee Name'
                        value={employeeName}
                        onChange={handleEmployeeNameChange}
                    />
                </div>


                <div className='flex flex-row '>
                    <label htmlFor='Type of Pay' className='mr-3 my-3 '> Type of Pay: </label>
                    <div className='overflow-hidden mt-2'>
                        <select id='Type of Pay' className='my-1 py-1' value={selectedType} onChange={handleSelectedTypeChange}>
                            <option value=''> Select type</option>
                            {Object.keys(employeeTypeDropDownOptions).map((key) =>(
                                <option key={key} value={key}>{employeeTypeDropDownOptions[key]}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <label htmlFor='Pay Rate' className='mr-3 my-3'> Pay Rate: </label>
                    <input
                        className='my-2 pl-3 mr-6'
                        id='Pay Rate'
                        type='number'
                        placeholder='Pay rate'
                        value={employeePayRate}
                        onChange={handleEmployeePayRateChange}
                    />
                </div>

                
                


            </div>
            <div className=' flex  justify-between mx-4 pb-3'>
                <button 
                    className='bg-greenLogo p-1 rounded-md'
                    onClick={handleSubmit}
                    >
                         Submit
                </button>
                
                <button 
                    className='bg-red-900 text-white p-1 rounded-md'
                    onClick={handleCancel}
                > 
                    Cancel
                </button>
            </div>
        </div>

    </div>
  )
}

export default EmployeeModal
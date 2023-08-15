import React from 'react'
import EmployeeButton from './Employee component/EmployeeComponentButton/employeeButton'
import EmployeeRow from './Employee component/employeeRow'
import Material from "./Material Component/mainMaterial"


function MainEmployeeComponent({projectName,projectKey, projectLocation, expectedCost, projectDates}) {
  console.log("Name",projectName)
  console.log("Name",projectLocation)
  console.log("Name",expectedCost)
  console.log("Name",projectDates)
  return (
    <div className='text-black w-[1028px] h-fit bg-violet-600 mt-6 rounded-xl mx-auto pt-5 pb-10'>
    <div className='pl-11 text-xl font-semibold'>
      <p>{projectName}</p>
      <p>@{projectLocation}</p>
    </div>

      <button className='bg-red-600 p-2 rounded-md ml-10 mt-3'> add a date</button>

        <EmployeeRow Employees ={[ 
                                
                                   {Name:"Abel",EmployeePayRate:17, HoursWorked:10} , 
                                   {Name:"Jose C",EmployeePayRate:20, HoursWorked:10}
                                
                                ]}

        />


        <Material Products = {[
            {productName:"Lumber", productCost:100, Quantity:5}
        ]}/>


        <div className='h-3 bg-black text-black'>
        <p className='pt-4 pl-8'> Expected Cost: {expectedCost}</p>
        </div>
    </div>
  )
}

export default MainEmployeeComponent
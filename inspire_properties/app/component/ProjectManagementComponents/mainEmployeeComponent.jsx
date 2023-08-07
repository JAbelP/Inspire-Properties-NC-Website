import React from 'react'
import EmployeeButton from './Employee component/EmployeeComponentButton/employeeButton'
import EmployeeRow from './Employee component/employeeRow'
import Material from "./Material Component/mainMaterial"

function MainEmployeeComponent() {
  return (
    <div className='text-black w-[1028px] h-fit bg-violet-600 mt-6 rounded-xl mx-auto pt-5 pb-10'>
    <div className='pl-11 text-xl font-semibold'>
      <p>Project Name</p>
      <p>@Location</p>

    </div>
        <EmployeeRow Employees ={[ 
                                
                                   {Name:"Abel",EmployeePayRate:17, HoursWorked:10} , 
                                   {Name:"Jose C",EmployeePayRate:20, HoursWorked:10}
                                
                                ]}

        />

        Swag

        <Material Products = {[
            {productName:"Lumber", productCost:100, Quantity:5}
        ]}/>


        <div className='h-3 bg-black text-black'>
        </div>
    </div>
  )
}

export default MainEmployeeComponent
"use client"
import React, {useState} from 'react'
import EmployeeModal from "../ProjectManagementComponents/ProjectManagementModals/EmployeeModal";

function ProjectHeader() {
    const [employeeModal, setEmployeeModal] = useState(true);






    const handleEmployeeModal = () => {

        setEmployeeModal(prevState => !prevState);

    }

  return (
    <div className='bg-red-800 flex flex-row justify-end gap-x-5 text-2xl h-20 py-1 pr-6'>
        <button className='hover:bg-red-400 px-3 rounded-md border-double border-4
         border-black'
        onClick={handleEmployeeModal}
         > Employee </button>
         
        <button className='hover:bg-red-400 px-3 rounded-md border-double border-4 
        border-black'> Project </button>

        <EmployeeModal openModal={employeeModal} closeModal = { handleEmployeeModal }/>

    </div>
  )
}

export default ProjectHeader
"use client"
import React, {useState} from 'react'
import EmployeeModal from "../ProjectManagementComponents/ProjectManagementModals/EmployeeModal";
import ProjectModal from "../ProjectManagementComponents/ProjectManagementModals/ProjectModal";

function ProjectHeader() {
    const [ employeeModal, setEmployeeModal ] = useState(false);
    const [ projectModal, setProjectModal ] = useState(false);

    const handleEmployeeModal = () => {

        setEmployeeModal(prevState => !prevState);

    }

    const handleProjectModal = () => {

        setProjectModal(prevState => !prevState);

    }

  return (
    <div className='bg-red-800 flex flex-row justify-end gap-x-5 text-2xl h-20 py-1 pr-6'>
        <button className='hover:bg-red-400 px-3 rounded-md border-double border-4
         border-black'
        onClick={handleEmployeeModal}
         > Employee </button>
         
        <button className='hover:bg-red-400 px-3 rounded-md border-double border-4 
        border-black' 
        onClick={handleProjectModal}> Project </button>

        <EmployeeModal openModal={employeeModal} closeModal = { handleEmployeeModal }/>
        <ProjectModal openModal={projectModal} closeModal = { handleProjectModal }/>


    </div>
  )
}

export default ProjectHeader
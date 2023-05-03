"use client"
import React from 'react'
import { useState } from 'react'
import ProjectModal from '../ProjectManagementComponents/ProjectModal'
import EmployeeModal from '../ProjectManagementComponents/employeeModal'
 

function ManageHeader() {
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);


  const openProjectModalFunction = () => {
    setOpenProjectModal(!openProjectModal);
  }

  const openEmployeeModalFunction = () => {
    setOpenEmployeeModal(!openEmployeeModal)
  }
  

  return (
    <div className='w-full h-20 text-right bg-red-500 flex items-center justify-end'>
        <div>
            <button className='border-2 p-2 mx-1 border-double hover:bg-red-300' onClick={openEmployeeModalFunction}> New Employee </button>
            <button className='p-2 border-2 mx-1 border-double hover:bg-red-300' onClick={openProjectModalFunction}> Create New Project</button>
        </div>
        <ProjectModal 
          handleModalCancel={openProjectModalFunction}
          isOpen={openProjectModal}
        />
        <EmployeeModal
          handleModalCancel={openEmployeeModalFunction}
          isOpen={openEmployeeModal}
        />

    </div>
  )
}

export default ManageHeader
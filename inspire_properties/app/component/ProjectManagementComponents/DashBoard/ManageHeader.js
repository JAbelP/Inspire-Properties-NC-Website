"use client"
import React from 'react'
import { useState } from 'react'
import ProjectModal from '../ProjectManagementModals/CreateModals/ProjectModal';
import EmployeeModal from '../ProjectManagementModals/CreateModals/EmployeeModal';

function ManageHeader(props) {
  // Props: setProjectList, projectList

  //This opens the modals
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);


  /**
   * This updates the project list
   * @param {array} Data 
   */
  const updateProjectList =(Data)=>{
    
    props.setProjectList(Data);
  }

  /**
   * This opens the Project Modal 
   */
  const openProjectModalFunction = () => {
    setOpenProjectModal(!openProjectModal);
  }

  /**
   * This opens the Employee Modal
   */
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
          closeModal ={openProjectModalFunction}
          isOpen={openProjectModal}
          projectList={props.projectList}
          setProjectList={updateProjectList}
        />

        <EmployeeModal
          closeModal ={openEmployeeModalFunction}
          isOpen={openEmployeeModal}
          employeeList={props.employeeList} 
          setEmployeelist={props.setEmployeelist}
          />

    </div>
  )
}

export default ManageHeader
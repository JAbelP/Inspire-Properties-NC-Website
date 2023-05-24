"use client"
import React, { useState } from 'react'

function ProjectModal(props) {
    const [projectName, setProjectName] = useState('');
    const [projectExpectedBudget, setExpectedBudget] = useState('');
    const [projectExpectedHours, setProjectExpectedHours] = useState('');
    const [projectLocation, setProjectLocation] = useState('');

    /**
     * This closes the modal
     */
    function handleCancel(){
        props.closeModal();
    }

    /**
     * updates the project Name
     * @param {event} event 
     */
    function handleProjectNameChange(event){
        setProjectName(event.target.value);
    }
    /**
     * updates the expected Budget
     * @param {event} event 
     */
    function handleProjectExpectedBudgetChange(event){
        setExpectedBudget(event.target.value)
    }

    /**
     * updates the project expected hours
     * @param {event} event 
     */
    function handleProjectExpectedHours(event){
        setProjectExpectedHours(event.target.value)
    }

    /**
     * updates project Location
     * @param {event} event 
     */
    function handleProjectLocation(event){
        setProjectLocation(event.target.value)
    }

    /**
     * updates the database and the local project list
     * closes modal
     * @param {string} projectName 
     * @param {number} projectExpectedBudget 
     * @param {number} projectExpectedHours 
     * @param {string} projectLocation 
     */
    async function updateProjectList(projectName,projectExpectedBudget,projectExpectedHours,projectLocation){
        const sendBody = {projectName,projectLocation,expectedHours:projectExpectedHours,expectedBudget:projectExpectedBudget,}
        const POSTed = await fetch('/api/databaseProject',{
            method:'POST',
            body:JSON.stringify(sendBody)
        })
        const rGotted = await fetch('/api/databaseProject')
        const gotted = await rGotted.json();
        props.setProjectList(gotted);
        props.closeModal();
    }


  return (
    <div className={`w-fit absolute bottom-1/3 left-1/3 ${props.isOpen ?("visible"):("hidden")}  `}>
        <div className='bg-red-600 w-full text-left pl-4 py-2 rounded-t-md border-2 border-x-black border-t-black border-b-0'>
            New Project
        </div>
        <div className='bg-gray-300 text-black text-left border-2 border-x-black border-b-black border-t-0'>
            <div className='py-2 pl-4 '>
                <div className='flex flex-row'>
                    <label htmlFor='Project Name' className='mr-3 my-3'> Project name: </label>
                    <input
                        className='my-2 pl-3'
                        id='Project Name'
                        type='text'
                        placeholder='Project Name'
                        value={projectName}
                        onChange={handleProjectNameChange}
                    />
                </div>


                <div className='flex flex-row '>
                    <label htmlFor='Expected Budget' className='mr-3 my-3 '> Expected Budget: </label>
                    <input
                        className='my-2 pl-3 mr-8'
                        id='Expected Budget'
                        type='number'
                        placeholder='Expected Budget'
                        value={projectExpectedBudget}
                        onChange={handleProjectExpectedBudgetChange}
                    />
                </div>

                <div className='flex flex-row'>
                    <label htmlFor='Expected Hours' className='mr-3 my-3'> Expected Hours: </label>
                    <input
                        className='my-2 pl-3'
                        id='Expected Hours'
                        type='number'
                        placeholder='Expected Hours'
                        value={projectExpectedHours}
                        onChange={handleProjectExpectedHours}
                    />
                </div>


                <div className='flex flex-row'>
                    <label htmlFor='Project Location' className='mr-3 my-3'> Project Location: </label>
                    <input
                        className='my-2 pl-3'
                        id='Project Name'
                        type='text'
                        placeholder='Project Location'
                        value={projectLocation}
                        onChange={handleProjectLocation}
                    />
                </div>



            </div>
            <div className=' flex  justify-between mx-4 pb-3'>
                <button 
                    onClick={()=>updateProjectList(projectName,projectExpectedBudget,projectExpectedHours,projectLocation)}
                    className='bg-greenLogo p-1 rounded-md'
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

export default ProjectModal
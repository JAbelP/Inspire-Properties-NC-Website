"use client"
import React, { useState,useEffect } from 'react'

function UpdateProjectModal(props) {
    //props
    //projectList
    //projectId
    //closeModal

    const [projectName, setProjectName] = useState('');
    const [projectExpectedBudget, setExpectedBudget] = useState('')
    const [projectExpectedHours, setProjectExpectedHours] = useState('');
    const [projectLocation, setProjectLocation] = useState('');

    const [initialProjectName, setInitialProjectName] = useState('');
    const [initialExpectedBudget, setInitialExpectedBudget] = useState('');
    const [initialProjectExpectedHours, setInitialProjectExpectedHours] = useState('');
    const [initialProjectLocation, setInitialProjectLocation] = useState('');



    useEffect(() => {
        const setProjectDetails=() =>
        {
                console.log(props.projecId)
                console.log("Yope");
                return props.projectList.find((project) => 
                project.id === props.projectId )
            }
            const tempProj = setProjectDetails();
            setProjectName(tempProj?.data.projectName);
            setExpectedBudget(tempProj?.data.expectedBudget);
            setProjectExpectedHours(tempProj?.data?.expectedHours);
            setProjectLocation(tempProj?.data?.projectLocation);


            setInitialProjectName(tempProj?.data?.projectName);
            setInitialExpectedBudget(tempProj?.data?.expectedBudget);
            setInitialProjectExpectedHours(tempProj?.data?.expectedHours);
            setInitialProjectLocation(tempProj?.data?.projectLocation);

    },
        [props.isOpen ])

    async function handleSubmit(){
        const tempProject = props.projectList.find((project) => project.id === props.projectId )

        if(projectName !== initialProjectName){
            tempProject.data.projectName = projectName;
        }
        else{
            tempProject.data.projectName = initialProjectName;
        }

        if(projectExpectedBudget !== initialExpectedBudget){
            tempProject.data.expectedBudget = projectExpectedBudget;
        }
        else{
            tempProject.data.expectedBudget = initialExpectedBudget;
        }

        if(projectExpectedHours!== initialProjectExpectedHours){
            tempProject.data.expectedHours = projectExpectedHours;
        }
        else{
            tempProject.data.expectedHours = initialProjectExpectedHours;
        }

        if(projectLocation!== initialProjectLocation){
         tempProject.data.projectLocation = projectLocation;
        }
        else{
            tempProject.data.projectLocation = initialProjectLocation;
        }

        const body = {id: props.projectId, data: tempProject.data};
        fetch('/api/databaseProject',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        )
        props.closeModal();

    }


    function handleProjectNameChange(event){
        setProjectName(event.target.value);
    }

    /**
     * updates the expected Budget
     * @param {event} event 
     */
    function handleProjectExpectedBudgetChange(event)
    {
        setExpectedBudget(event.target.value)
    }
    
    function handleProjectExpectedHours(event)
    {
        setProjectExpectedHours(event.target.value)
    }

    function handleProjectLocation(event){
        setProjectLocation(event.target.value);
    }




  return (
    <div className={`w-fit absolute bottom-1/3 left-1/3 ${props.isOpen ?("visible"):("hidden")}  `}>
        <div className='bg-red-600 w-full text-left text-white pl-2 py-2 rounded-t-md border-2 border-x-black border-t-black border-b-0 text-2xl'>

        Update Project
        </div>
        <div className='px-2 bg-gray-300 text-black text-left border-2 border-x-black border-b-black border-t-0 text-base'>
        <div className='flex flex-row'>
                    <label htmlFor='Project Name' className='mr-3 my-3'> Project name: </label>
                    <p className="mr-3 my-3">{initialProjectName} -&gt;</p>

                    <input
                        className='my-2 pl-3'
                        id='Project Name'
                        type='text'
                        placeholder={projectName}
                        value={projectName}
                        onChange={handleProjectNameChange}
                    />
                </div>
                <div className='flex flex-row '>
                        <label htmlFor='Expected Budget' className='mr-3 my-3 '> Expected Budget: </label>
                        <p className="mr-3 my-3">{initialExpectedBudget} -&gt;</p>
                        <input
                            className='my-2 pl-3 mr-8'
                            id='Expected Budget'
                            type='number'
                            placeholder={projectExpectedBudget}
                            value={projectExpectedBudget}
                            onChange={handleProjectExpectedBudgetChange}
                        />
                    </div>

                    <div className='flex flex-row'>
                    <label htmlFor='Expected Hours' className='mr-3 my-3'> Expected Hours: </label>
                    <p className="mr-3 my-3">{initialProjectExpectedHours} -&gt;</p>
                    <input
                        className='my-2 pl-3'
                        id='Expected Hours'
                        type='number'
                        placeholder={projectExpectedHours}
                        value={projectExpectedHours}
                        onChange={handleProjectExpectedHours}
                    />
                </div>

                <div className='flex flex-row'>
                    <label htmlFor='Project Location' className='mr-3 my-3'> Project Location: </label>
                    <p className="mr-3 my-3">{initialProjectLocation} -&gt;</p>
                    <input
                        className='my-2 pl-3'
                        id='Project Name'
                        type='text'
                        placeholder='Project Location'
                        value={projectLocation}
                        onChange={handleProjectLocation}
                    />
                </div>

        <div className=' flex  justify-between mx-4 py-3'>
                <button 
                    onClick={handleSubmit}
                    className='bg-greenLogo p-1 rounded-md'
                    >
                         Submit
                </button>
                <button>
                    Delete
                </button>
                    <button 
                        className='bg-red-900 text-white p-1 rounded-md'
                        onClick={props.closeModal}
                    > 
                        Cancel
                    </button>
            </div>
        </div>
    </div>
  )
}

export default UpdateProjectModal
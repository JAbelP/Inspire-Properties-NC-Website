import React ,{useState}from 'react'

function ProjectModal(props) {

    const [projectName,setProjectName] = useState('')
    const [projectLocation,setProjectLocation] = useState('')
    const [ projectEstimatedCost , setProjectEstimatedCost ] = useState('');
    const [ projectEstimatedHours , setProjectEstimatedHours ] = useState('');
    
    function closeModal(){
        props.closeModal();
    }
    
    async function handleSubmit() {
        if ( projectName !== '' && projectLocation !== '' &&
             projectEstimatedCost !=='' && projectEstimatedHours !=='' 
           ){
          const sendBody = {
            projectName,
            projectLocation,
            expectedHours:projectEstimatedHours,
            expectedBudget:projectEstimatedCost
          };


          console.log(JSON.stringify(sendBody), "this is sendBody")
      
          const submitProject = await fetch('/api/databaseProject',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
          });
      
          closeModal();
        } else {
          alert(" please fill in the information ");
        }
      } 
     
    

    function handleProjectNameChange(event) {
        setProjectName(event.target.value);
    }
    
    function handleProjectLocation(event) {
        setProjectLocation(event.target.value);
    }



    function handleProjectEstimatedCostChange(event) {
        setProjectEstimatedCost(event.target.value);
    }

    function handleProjectEstimatedHourChange(event) {
        setProjectEstimatedHours(event.target.value);
    }

  return (
        <div className={`${props.openModal ?("visible"):("hidden ")}  absolute top-1/3 left-1/3 text-lg w-96 `}>
        <div className='bg-red-800 pl-4 text-2xl pb-2 rounded-t-lg '> Create a New Project</div>
        <div className='bg-gray-400  '>
            <div className='flex flex-col gap-y-3 pt-3 pl-2'>
                <div className='flex flex-row gap-x-3'>
                    <p>Project Name:</p>
                    <input
                        className='pl-2'
                        id="name"
                        type='text'
                        placeholder='Project Name'
                        value = {projectName}
                        onChange= {handleProjectNameChange}
                    ></input>
                </div>
                <div className='flex flex-row gap-x-3'>
                    <p>Project Location:</p>
                    <input
                        className='pl-2'
                        id="name"
                        type='text'
                        placeholder='Project Location'
                        value = {projectLocation}
                        onChange= {handleProjectLocation}
                    ></input>
                </div>
                <div className='flex flex-row gap-x-3'>
                    <p>Estimated Cost:</p>
                    <input
                        className='pl-2'
                        id="Estimated Cost"
                        type='number'
                        placeholder='Estimated Cost'
                        value = {projectEstimatedCost}
                        onChange= {handleProjectEstimatedCostChange}
                    ></input>
                </div>
                <div className='flex flex-row gap-x-3'>
                    <p>Estimated Hours:</p>
                    <input
                        className='pl-2'
                        id="Estimated Hours"
                        type='number'
                        placeholder='Estimated Hours'
                        value = {projectEstimatedHours}
                        onChange= {handleProjectEstimatedHourChange}
                    ></input>
                </div>
            </div>
        <div className='flex flex-row justify-between mx-4 py-2 r'>
            <button className='bg-green-500 p-1 rounded-md' onClick={handleSubmit}>Submit</button>
            <button className='bg-red-500 p-1 rounded-md' onClick={closeModal}>Close</button>
        </div>
        </div>
    </div>
  )
}

export default ProjectModal
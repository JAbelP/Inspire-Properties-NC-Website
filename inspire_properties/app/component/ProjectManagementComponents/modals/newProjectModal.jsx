"use client"
import React , {useState}  from 'react'
import {  addDoc, collection } from "firebase/firestore"; 
import { db } from "../../../firebaseConfig"


function NewProjectModal({onClose}) {
    
    const [ projectName, setProjectName ] = useState('');
    const [ expectedCost, setExpectedCost ] = useState('');
    const [ projectLocation, setProjectLocation ] = useState('');
    const [ projectNameFocused, setprojectNameFocused ] = useState(false);
    const [ expectedCostFocused, setExpectedCostFocused ] = useState(false);
    const [ projectLocationFocused, setProjectLocationFocused ] = useState(false);
    

    const closeModal = () => {
        onClose()
    }

    //Name Expected Cost Location
    const addProject = async ( projectName, expectedCost, projectLocation) =>{
        await addDoc(collection(db, 'Projects'),{
            Name: projectName,
            "Expected Cost": expectedCost,
            Location: projectLocation
        })
        closeModal();
    }


    const submitButtonFunction = () => {
        console.log("Submit");
        debugger;
        if( projectName !=='' && expectedCost !=='' && expectedCost !=='')
        {
            addProject(projectName, expectedCost, projectLocation)
        }
        else{

            if (projectName === '' ){
                setprojectNameFocused(true)
            }
            if (projectLocation === '') {
                setProjectLocationFocused(true)
            }
            if( expectedCost !==null || expectedCost !==''){
                setExpectedCostFocused(true)   
            }

        }
    }

    
    const cancelButtonFunction = () => {
        closeModal();
    }


  return (
    <div>
        <div className=' absolute bg-black h-screen w-full opacity-70' onClick={closeModal}/>
        <div className=' fixed left-1/4 top-1/3'>
            <div className='mb-60 w-fit bg-emerald-400 rounded-xl mx-auto'>
                <p className='text-black text-lg font-extrabold tracking-widest pl-5 pt-2'> New Project</p>
                <div className="w-full h-2 bg-stone-950" />
                    <div className=' flex flex-col'>
                        <div className='flex flex-row gap-x-8 mr-8'>
                        
                            <div className='flex flex-col ml-8'>
                                <div className="text-black text-lg font-semibold tracking-widest">Name</div>
                                <input
                                            className="w-48 h-7 rounded pl-3"
                                            type='text'
                                            value={projectName}
                                            onChange={(e) => {
                                                setProjectName(e.target.value);
                                                setprojectNameFocused(false)
                                            }}
                                            onClick={() => setprojectNameFocused(false)}
                                        />
                                {projectNameFocused && <p className='text-sm text-red-600'> *Please enter a Project Name </p>}

                            </div>
                            <div className='flex flex-col'>
                                <div className="text-black text-lg font-semibold tracking-widest">Expected Cost</div>
                                <input
                                            className="w-48 h-7 rounded pl-3"
                                            type='number'
                                            value={expectedCost}
                                            onChange={(e) => {
                                                setExpectedCost(e.target.value);
                                                setExpectedCostFocused(false);
                                            }}
                                            onClick={() => setExpectedCostFocused(false)}
                                        />
                                {expectedCostFocused && <p className='text-sm text-red-600'> *Please enter an Expected Cost </p>}

                            </div>
                            <div className='flex flex-col'>
                                <div className="text-black text-lg font-semibold tracking-widest">Locataion</div>
                                <input
                                            className="w-48 h-7 rounded pl-3"
                                            type='text'
                                            value={projectLocation}
                                            onChange={(e) => {
                                                    setProjectLocation(e.target.value);
                                                    setExpectedCostFocused(false);
                                            }}
                                            onClick={() => setProjectLocationFocused(false)}
                                        />
                                {projectLocationFocused && <p className='text-sm text-red-600'> *Please enter a Project Location </p>}
                                

                            </div>
                            
                        </div>
                        <div className='flex flex-row justify-around mt-9 mb-9'>
                            <button className="w-28 h-10 px-14 py-2 bg-fuchsia-600
                                hover:bg-fuchsia-950 hover:backdrop-blur-3xl rounded-2xl border border-black
                                justify-center items-center gap-2 flex text-black hover:text-zinc-100 text-lg font-normal"
                                onClick={submitButtonFunction}
                                >
                                Submit
                            </button>
                            
                            <button className="w-28 h-10 px-14 py-2 rounded-2xl border
                              border-black justify-center items-center gap-2 flex
                              text-black text-lg font-normal hover:bg-red-600"
                                onClick={cancelButtonFunction}
                              >
                            Cancel
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default NewProjectModal
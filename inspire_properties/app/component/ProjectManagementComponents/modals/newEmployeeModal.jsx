"use client"
import React, {useState} from 'react'
import {  addDoc, collection } from "firebase/firestore"; 
import { db } from "../../../firebaseConfig"



function NewProjectModal({onClose}) {
    

    const [name, setName] = useState('');
    const [payRate, setPayRate] = useState('');
    const [nameFocused, setNameFocused] = useState(false);
    const [payRateFocused, setPayRateFocused] = useState(false);

    const closeModal = () => {
        onClose()
    }

    const addEmployee = async(employeeName, employeePayRate) =>{
        await addDoc(collection(db,'Employees'),{
            Name: employeeName,
            'Pay Rate':Number(employeePayRate)
        })
    }

    const submitButtonFunction = () => {

        
        if( name !=="" && payRate !=="") {
            
            addEmployee(name, payRate);
        }
        
        else
        
        {
            if(name ===""){
                setNameFocused(true);
            }
            if(payRate===""){
                setPayRateFocused(true);
            }

        }
    }

    
    const cancelButtonFunction = () => {
        closeModal();
    }


  return (
    <div>
        <div className=' absolute bg-black h-screen w-full opacity-70' onClick={closeModal}/>
        <div className=' fixed left-1/3 top-1/3'>
            <div className='mb-60 w-fit bg-emerald-400 rounded-xl mx-auto '>
            <form/>
                <p className='text-black text-lg font-extrabold tracking-widest pl-5 pt-2'> New Employee</p>
                <div className="w-full h-2 bg-stone-950" />
                    <div className=' flex flex-col'>
                        <div className='flex flex-row gap-x-8 mr-8'>
                        
                            <div className='flex flex-col ml-8'>
                                <div className="text-black text-lg font-semibold tracking-widest">Name</div>
                                <input
                                            className="w-48 h-7 rounded pl-3"
                                            type='text'
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                setNameFocused(false);
                                            }}
                                            onClick={() => setNameFocused(false)}
                                        />
                                {nameFocused && <p className='text-sm text-red-600'> *Please enter a name </p>}

                            </div>
                            <div className='flex flex-col'>
                                <div className="text-black text-lg font-semibold tracking-widest">Pay Rate</div>
                                <input
                                            className="w-48 h-7 rounded pl-3"
                                            type='number'
                                            value={payRate}
                                            onChange={(e) => {
                                                setPayRate(e.target.value);
                                                setPayRateFocused(false);
                                            }}
                                            onClick={() => setPayRateFocused(false)}
                                        />
                                {payRateFocused && <p className='text-sm text-red-600'> *Please enter a name </p>}


                            </div>
                            </div>
                            
                        </div>
                        <div className='flex flex-row justify-around mt-9 pb-6'>
                        
                        <button className="w-28 h-10 px-14 py-2 rounded-2xl border
                              border-black justify-center items-center gap-2 flex
                              text-black text-lg font-normal hover:bg-red-600"
                                onClick={cancelButtonFunction}
                              >
                            Cancel
                            </button>

                            <button className="w-28 h-10 px-14 py-2 bg-fuchsia-600
                                hover:bg-fuchsia-950 hover:backdrop-blur-3xl rounded-2xl border border-black
                                justify-center items-center gap-2 flex text-black hover:text-zinc-100 text-lg font-normal"
                                onClick={submitButtonFunction}
                                >
                                Submit
                            </button>
                            
                        </div>
                    </div>
                    
            </div>
        </div>
  )
}

export default NewProjectModal
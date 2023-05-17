import React, { useState } from 'react'

function DateModal(props) {
    // props: openModal closeModal onSubmit alreadySelectedDates setAlreadySelectedDates
    const [dateSelected, setDateSelected] = useState('');

    function handleDateSelectedChange(event){
        setDateSelected(event.target.value);
    }

    function closeModal(){
        props.setAlreadySelectedDates([])
        props.closeModal();
    }

    function handleSubmit() {
        if (props.alreadySelectedDates.find((date) => date === dateSelected)) {
            alert("This date already exists on this Project");
        } else {
            props.onSubmit(dateSelected);
            setDateSelected('');
            props.setAlreadySelectedDates([])
        }
      }
      

  return (
    <div className={`${props.openModal ? ("visible"):("hidden")} absolute top-1/3 left-1/3 text-lg w-auto `}>
        <div className='bg-red-800 pl-4 text-2xl pb-2 rounded-t-lg '>Select a date</div>
                <div className='bg-gray-400 h-auto px-4 pt-2 pb-3'>
                    <input
                        className = 'pl-2'
                        type = 'date'
                        value = {dateSelected}
                        onChange = {handleDateSelectedChange}
                        ></input>
                        <div className='flex flex-row justify-between   mt-2'>
                        <button className='bg-green-500 p-1 rounded-md
                        ' onClick={handleSubmit} disabled={dateSelected? (false):(true)}> Submit</button>
                        <button className='bg-red-500 p-1 rounded-md' 
                        onClick={closeModal}> Cancel</button>

                        </div>
                </div>
    </div>
  )
}

// why did you do onClick={() => addADate(project.id)} and not onClick={addADate(project.id)}
export default DateModal
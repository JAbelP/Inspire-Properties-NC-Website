import React, { useState } from 'react'

function DateModal(props) {
    // props: openModal closeModal onSubmit alreadySelectedDates setAlreadySelectedDates
    const [dateSelected, setDateSelected] = useState('');
    // cosmetic useStates
    const [ dateFilled, setDateFilled ] = useState(true);

    function handleDateSelectedChange(event){
        setDateSelected(event.target.value);
    }

    function closeModal(){
        setDateFilled(true);
        props.setAlreadySelectedDates([])
        setDateSelected('')
        props.closeModal();
    }

    function handleSubmit() {
        if(dateSelected === ''){
            setDateFilled(false);
        }
        else
        {
            if (props.alreadySelectedDates.find((date) => date === dateSelected)) {
                alert("This date already exists on this Project");
            } else {
                props.onSubmit(dateSelected);
                setDateSelected('');
                //TODO: this isn't changing the alreadySelectedDates? do we need this or do we need to add 
                props.setAlreadySelectedDates([])
            }
        }
      }
    
    function handleDateClicked(){
        setDateFilled(true);
    }

  return (
    <div className={`${props.openModal ? ("visible"):("hidden")} absolute top-1/3 left-1/3 text-lg w-auto `}>
        <div className='bg-red-600  pl-4 text-2xl pb-2 rounded-t-lg text-white border-2 border-x-black border-t-black border-b-0'>Select a date</div>
                <div className='bg-gray-300 h-auto px-4 pt-2 pb-3 border-2 border-x-black border-b-black border-t-0'>
                    <input
                        className = 'pl-2'
                        type = 'date'
                        value = {dateSelected}
                        onChange = {handleDateSelectedChange}
                        onClick = {handleDateClicked}
                        ></input>{dateFilled? (""):(          
                                          
                                        <div className='mt-1 text-red-600  text-xs border-2 border-red-600 rounded-md
                                            w-fit p-1'>
                            Please Select a date
                            </div>)}

                        <div className='flex flex-row justify-between   mt-2'>
                                <button className='bg-greenLogo p-1 rounded-md text-black
                                ' onClick={handleSubmit} > Submit</button>
                                <button className='bg-red-900 text-white p-1 rounded-md' 
                                onClick={closeModal}> Cancel</button>
                        
                        </div>
                </div>
    </div>
  )
}

// why did you do onClick={() => addADate(project.id)} and not onClick={addADate(project.id)}
export default DateModal
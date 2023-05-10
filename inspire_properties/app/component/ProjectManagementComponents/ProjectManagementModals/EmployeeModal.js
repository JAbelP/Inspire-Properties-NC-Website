import React ,{useState}from 'react'

function EmployeeModal(props) {

    const [employeeName,setEmployeeName] = useState('')
    const [employeePayRate,setEmployeePayRate] = useState('')
    const [payType,setPayType] = useState('')

    const typeOfPay = {
        Hourly:"Hourly",
        Salary:"Salary",
        Contract:"Contract"
    }

    function closeModal(){
        props.closeModal();
    }
    
    async function handleSubmit() {
        if ( employeeName !== '' && employeePayRate !== '' && payType !=='null' ){
          const sendBody = {
            employeeName,
            employeePayRate,
            payType
          };

          console.log(payType, " this is paytype")

          console.log(JSON.stringify(sendBody), "this is sendBody")
      
          const submitEmployee = await fetch('/api/databaseEmployee',{
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
     
    

    function handleEmployeeNameChange(event) {
        setEmployeeName(event.target.value);
    }

    function handleEmployeePayRateChange(event) {
        setEmployeePayRate(event.target.value);
    }

    const handleEmployeePayTypeChange =(event) =>{
        console.log("This is right so far")
        setPayType(event.target.value);
    }
  return (
        <div className={`${props.openModal ?("visible"):("hidden ")}  absolute top-1/3 left-1/3 text-lg w-96 `}>
        <div className='bg-red-800 pl-4 text-2xl pb-2 rounded-t-lg '> Employee</div>
        <div className='bg-gray-400  '>
            <div className='flex flex-col gap-y-3 pt-3 pl-2'>
                <div className='flex flex-row gap-x-3'>
                    <p>Name:</p>
                    <input
                        className='pl-2'
                        id="name"
                        type='text'
                        placeholder='Employee Name'
                        value = {employeeName}
                        onChange= {handleEmployeeNameChange}
                    ></input>
                </div>
                <div className='flex flex-row gap-x-3'>
                    <p>Rate Of Pay:</p>
                    <input
                        className='pl-2'
                        id="Rate Of Pay"
                        type='number'
                        placeholder='Rate Of Pay'
                        value = {employeePayRate}
                        onChange= {handleEmployeePayRateChange}
                    ></input>
                </div>
                <div className='flex flex-row gap-x-3'>
                    <p>Type Of Pay:</p>
                    <select 
                        className='pl-2'
                        id='Type Of Pay'
                        value={payType}
                        onChange={handleEmployeePayTypeChange}>
                        <option value='null'> Select a Type</option>
                        {Object.keys(typeOfPay).map((key) =>(
                        <option key={key} value={key}>
                            {typeOfPay[key]}
                        </option>
                        ))}
                    </select>
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

export default EmployeeModal
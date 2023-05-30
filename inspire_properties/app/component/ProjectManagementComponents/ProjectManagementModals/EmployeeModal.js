import React ,{useState}from 'react'

function EmployeeModal(props) {

    const [employeeName,setEmployeeName] = useState('')
    const [employeePayRate,setEmployeePayRate] = useState('')
    const [payType,setPayType] = useState('')
    //--------------------------Cosmetic States--------------------------//
    const [employeeNameFilled,setEmployeeNameFilled] = useState(true);
    const [employeePayRateFilled,setEmployeePayRateFilled] = useState(true);
    const [payTypeFilled,setPayTypeFilled] = useState(true);
    //--------------------------Cosmetic States--------------------------//

    //--------------------------Cosmetic Functions--------------------------//
    function handleEmployeeNameFilledClick(){
        setEmployeeNameFilled(true);
    }
    function handleEmployeePayRateFilledClick(){
        setEmployeePayRateFilled(true);
    }
    function handlePayTypeFilledClick(){
        setPayTypeFilled(true);
    }
    
    //--------------------------Cosmetic Functions--------------------------//
    const typeOfPay = {
        Hourly:"Hourly",
        Salary:"Salary",
        Contract:"Contract"
    }

    function closeModal(){
        setEmployeeName('');
        setEmployeePayRate('');
        setPayType('null');
        setEmployeeNameFilled(true);
        setEmployeePayRateFilled(true);
        setPayTypeFilled(true);
        props.closeModal();
    }
    
    async function handleSubmit() {
        if ( employeeName !== '' && employeePayRate !== '' && payType !=='null' ){
          const sendBody = {
            employeeName,
            employeePayRate,
            payType
          };


      
          const submitEmployee = await fetch('/api/databaseEmployee',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
          });
          const newEmployeeList= await fetch('/api/databaseEmployee')
          const data = await newEmployeeList.json();
           props.setEmployeelist(data);
          closeModal();
        } else {
            if(employeeName === ''){
                setEmployeeNameFilled(false);
            }
            if(employeePayRate === ''){
                setEmployeePayRateFilled(false);
            }
            if(payType === 'null'){
                setPayTypeFilled(false);
            }
        }
      } 
     
    

    function handleEmployeeNameChange(event) {
        setEmployeeName(event.target.value);
    }

    function handleEmployeePayRateChange(event) {
        setEmployeePayRate(event.target.value);
    }

    const handleEmployeePayTypeChange =(event) =>{
        setPayType(event.target.value);
    }
  return (
        <div className={`${props.isOpen ?("visible"):("hidden ")}  absolute top-1/3 left-1/3 text-lg w-96 `}>
        <div className='bg-red-600 pl-4 text-left text-2xl pb-2 rounded-t-lg border-2 border-x-black border-t-black border-b-0 '> Employee</div>
        <div className='bg-gray-300 text-black border-2 border-x-black border-b-black border-t-0 '>
            <div className='flex flex-col gap-y-3 pt-3 pl-2'>
            <>
                <div className='flex flex-row gap-x-3'>
                    <p>Name:</p>
                    <input
                        className='pl-2'
                        id="name"
                        type='text'
                        placeholder='Employee Name'
                        value = {employeeName}
                        onChange= {handleEmployeeNameChange}
                        onClick={handleEmployeeNameFilledClick}
                    ></input>
                </div>
                { employeeNameFilled?  (""):                  
                     (<p className=' text-red-600 text-left text-xs border-2 
                    border-red-600 rounded-md
                    w-fit p-1
                    '> please enter a Name</p>)}

                </>

                <>
                <div className='flex flex-row gap-x-3'>
                    <p>Rate Of Pay:</p>
                    <input
                        className='pl-2'
                        id="Rate Of Pay"
                        type='number'
                        placeholder='Rate Of Pay'
                        value = {employeePayRate}
                        onChange= {handleEmployeePayRateChange}
                        onClick={handleEmployeePayRateFilledClick}
                    ></input>
                </div>

                { employeePayRateFilled?  (""):                  
                     (<p className=' text-red-600 text-left text-xs border-2 
                    border-red-600 rounded-md
                    w-fit p-1
                    '> please enter an Rate Of Pay</p>)}
                </>

                <>
                <div className='flex flex-row gap-x-3'>
                    <p>Type Of Pay:</p>
                    <select 
                        className='pl-2'
                        id='Type Of Pay'
                        value={payType}
                        onChange={handleEmployeePayTypeChange}
                        onClick={handlePayTypeFilledClick}
                        >
                        <option value='null'> Select a Type</option>
                        {Object.keys(typeOfPay).map((key) =>(
                        <option key={key} value={key}
                        >
                            {typeOfPay[key]}
                        </option>
                        ))}
                    </select>
                    </div>
                    { payTypeFilled?  (""):                  
                     (<p className=' text-red-600 text-left text-xs border-2 
                    border-red-600 rounded-md
                    w-fit p-1
                    '> please enter a Type of Pay</p>)}
                </>
            </div>
        <div className='flex flex-row justify-between mx-4 py-2 r'>
            <button className='bg-green-500 p-1 rounded-md' onClick={handleSubmit}>Submit</button>
            <button className='bg-red-900 p-1 rounded-md text-white' onClick={closeModal}>Cancel</button>
        </div>
        </div>
    </div>
  )
}

export default EmployeeModal
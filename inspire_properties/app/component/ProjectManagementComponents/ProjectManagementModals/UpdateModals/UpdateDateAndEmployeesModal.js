import React, {useState,useEffect} from 'react'

function UpdateDateAndEmployeesModal(props) {
    //Props
    //projectList
    //projectId
    //closeModal
    //isOpen
    //selectedDate
    //projectId

    const [projectDate, setProjectDate ] = useState('');
    const [initialProjectDate, setInitialProjectDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [listOfDatesAlreadyInProject, setListOfDatesAlreadyInProject] = useState([]);

    useEffect(() =>{
        setProjectDate(props.selectedDate.date);
        setInitialProjectDate(props.selectedDate.date);
        function fillListOfDatesAlreadyInProject(){
            const projec = props.projectList?.find(proj => proj.id === props.projectId);

            let list = [] 
            list = projec?.data?.dates.forEach(date => {
                list.push(date.date)
            })
            return list
        }
        const y = fillListOfDatesAlreadyInProject();
        setListOfDatesAlreadyInProject(y)


    },
        [props.isOpen]
        )

    const handleSelectedDate = (e) => {
            setSelectedDate(e.target.value);
        }

   async function handleSubmit(){
            const projec = props.projectList?.find(proj => proj.id === props.projectId);

            let list = [];
            list = projec?.data?.dates.map(date => date.date);
            console.log(list);
            const listWithoutOriginalSelectedDate = list.filter(date => date !== props.selectedDate.date);
            if (listWithoutOriginalSelectedDate.includes(selectedDate)) 
            {
                alert("This date is already in the project");
                return;
            }
            if(selectedDate === props.selectedDate.date){
                props.closeModal();
                return;
            }
            if(selectedDate ===""){
                return;
            }
            const indexDateChange = projec.data.dates.findIndex(date => date.date === props.selectedDate.date)
            console.log("index:", indexDateChange);
            console.log("you need to change", projec);
            projec.data.dates[indexDateChange].date = selectedDate;
            console.log(projec);
            const bodyy = {
                id: props.projectId,
                data: projec.data
            }

            fetch('/api/databaseProject',{
                method:'PUT',
                body:JSON.stringify(bodyy),   
            }
            )
            setSelectedDate('');
            props.closeModal();
        }

  return (
    <div className={`w-fit absolute bottom-1/3 left-1/3 ${props.isOpen ?("visible"):("hidden")} `}>
     <div className='bg-red-600 w-full text-left text-white px-2 py-2 rounded-t-md border-2 border-x-black border-t-black border-b-0 text-2xl'>
        Update Date / Employee
        </div>
        <div className='px-2 bg-gray-300 text-black text-left border-2 border-x-black border-b-black border-t-0 text-base'>
            <div className='flex flex-row'>
                <label htmlFor='Project Name' className='mr-3 my-3'> Project Date: </label>
                <p className="mr-3 my-3"> {initialProjectDate } -&gt;</p>
                <input
                    className = 'm-2'
                    type = 'date'
                    value = {selectedDate}
                    onChange = {handleSelectedDate}
                >
                    
                </input>
            </div>
            <div className='flex flex-row justify-between   my-2'>
                                <button className='bg-greenLogo p-1 rounded-md text-black
                                ' onClick={handleSubmit} > Submit</button>
                                <button className='bg-red-900 text-white p-1 rounded-md' 
                                onClick={props.closeModal}> Cancel</button>
                        
            </div>
     </div>
    </div>
  )
}

export default UpdateDateAndEmployeesModal
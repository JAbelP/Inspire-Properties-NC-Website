import React, {useState,useEffect} from 'react'
import UpdateEmployeeComponent from './UpdateEmployeeComponent'
import {Trash} from "../../../icons/trash"

function UpdateDateAndEmployeesModal(props) {
    //Props
    //projectList - the list of projects
    //projectId - the id of the current related project
    //closeModal - function that closes the modal
    //isOpen - if the modal is open
    //selectedDateIndex - index of the date that is related to the project id =>
     //props.projectList

    const [initialProjectDate, setInitialProjectDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [listOfDatesAlreadyInProject, setListOfDatesAlreadyInProject] = useState([]);


    /**
     * sets up the insital project date
     * sets up the project date
     * 
     */
    useEffect(() =>
      {

        const intiProjDate = props.projectList.find(proj => proj.id === props.projectId)?.data.dates[props.selectedDateIndex]?.date
        setInitialProjectDate(intiProjDate)
        setListOfDatesAlreadyInProject(props.projectList
          .find(proj => proj.id === props.projectId)?.data.dates.splice(props.selectedDateIndex, 1)
        .map(dateObj => dateObj.date));
      
        // function fillListOfDatesAlreadyInProject() {
        //   const projec = props.projectList?.find(proj => proj.id === props.projectId);
        //   let list = [];
        
        //   if (projec && projec.data && projec.data.dates) {
        //     list = projec.data.dates.map(date => date.date);
        //   }
        //   const findIndex = list.indexOf(props.selectedDate.date);
        //   if (findIndex > -1) {
        //     list.splice(findIndex, 1);
        //   }
        //   return list;
        // }
        
        // const y = fillListOfDatesAlreadyInProject();
        // setListOfDatesAlreadyInProject(y);
         },
        [props.isOpen]
      )

    /**
     * This fills in the date
     * @param {e} e 
     */
    const handleSelectedDate = (e) => {
            setSelectedDate(e.target.value);
        }


     const updateProjectDate = async() => {



    }



    /**
     * submit funciton that cheecks intial date
     * if it exits somewhere else in the proejct
     * 
     * @returns 
     */
    const onSubmit = () => {

      //if the user selected nothing in the date field
      if(selectedDate === ""){
       onClose();
       return;
      }
      
      //if the user selected the same date as the initial project date
      if(selectedDate === initialProjectDate){
        onClose();
        return;
      }

      //if the user selected a date that is already in the project
      if(listOfDatesAlreadyInProject?.includes(selectedDate)){
        alert("This date is already in the project");
        return;
      }

      //if none of these are true, update the project's date
      onClose();
    }

    /**
     * closes the modal
     * sets the modal to be blank
     */
    const onClose=() => {
      setSelectedDate("")
      props.closeModal();
    }
    
        return (
            <div className={`w-fit absolute bottom-1/3 left-1/3 ${props.isOpen ? "visible" : "hidden"}`}>
              <div className='bg-red-600 w-full text-left text-white px-2 py-2 rounded-t-md border-2 border-x-black border-t-black border-b-0 text-2xl'>
                Update Date / Employee
              </div>
              <div className='px-2 bg-gray-300 text-black text-left border-2 border-x-black border-b-black border-t-0 text-base'>
                <div className='flex flex-row'>
                  <label htmlFor='Project Name' className='mr-3 my-3'> Project Date: </label>
                  <p className="mr-3 my-3"> {initialProjectDate} -&gt;</p>
                  <input
                    className='m-2'
                    type='date'
                    value={selectedDate}
                    onChange={handleSelectedDate}
                  />
                </div>
                <table>
                    <tbody>
                        <tr>
                        <th className="pr-10"></th>
                        <th className="pr-10">Employee</th>
                        <th className="pr-10">Hours Worked</th>
                        </tr>
                        {/* JSX elements representing employee names */}
                        {/* {props.projectList.flatMap((arr) =>
                        arr.data.dates.flatMap((date) => {
                            if (date.date === props.selectedDate.date) {
                            return date.employee.map((employee) => (
                                <tr key={employee.id}>
                                <td><button onClick={()=>handleEmployeeDelete(employee.id,props.selectedDate.date)}><Trash /></button> </td>
                                <td>{employee.data.employeeName}</td>
                                <td>{employee.totalEmployeeHours?(employee.totalEmployeeHours):(0)}</td>
                                <td>-&gt;</td>
                                <td><UpdateEmployeeComponent
                                    employeeId={employee.id}
                                    // onHoursWorkedChange={handleHoursWorkedChange}2
                                    date={props.selectedDate.date}
                                    projectId={props.projectId}
                                /></td>
                                </tr>
                            ));
                            }
                            // return an empty array if the condition is not met
                            return [];
                        })
                        )} */}
                    </tbody>
                    </table>

                
                <div className='flex flex-row justify-between my-2'>
                  <button className='bg-greenLogo p-1 rounded-md text-black' onClick={onSubmit}>
                    Submit
                  </button>
                  <button className='bg-red-900 text-white p-1 rounded-md' onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          );
          
}

export default UpdateDateAndEmployeesModal
import React, {useState,useEffect} from 'react'
import UpdateEmployeeComponent from './UpdateEmployeeComponent'
import {Trash} from "../../../icons/trash"

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
    const [hoursWorkedMap, setHoursWorkedMap] = useState({});

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

        const handleHoursWorkedChange = (employeeId, hoursWorked, date, projectId) => {
            const updatedList = props.projectList.map((proj) => {
              if (proj.id === projectId) {
                return {
                  ...proj,
                  data: {
                    ...proj.data,
                    dates: proj.data.dates.map((projDate) => {
                      if (projDate.date === date) {
                        return {
                          ...projDate,
                          employee: projDate.employee.map((employee) => {
                            if (employee.id === employeeId) {
                              return {
                                ...employee,
                                totalEmployeeHours: hoursWorked,
                                totalEmployeeMoney: (hoursWorked * employee.data.employeePayRate).toFixed(2)
                              };
                            }
                            return employee;
                          }),
                        };
                      }
                      return projDate;
                    }),
                  },
                };
              }
              return proj;
            });
          const putProject = updatedList.find(proj => proj.id === projectId);
            // Update the project list with the updatedList
            updateProjectList(putProject.id,putProject.data);
          };

  async function updateProjectList(id,data) {
    const indexChange = props.projectList.findIndex(proj => proj.id === id);
    props.projectList[indexChange].data = data;


         const selectedProject = props.projectList.find(proj => proj.id === id);
        
         const projectEmployeeMoneySpent = selectedProject.data.dates.reduce(
            (total,projCost) =>{   
                const employeeP = projCost.employee.reduce((t,e)=>{
                    return t +Number((e.totalEmployeeMoney)?(e.totalEmployeeMoney):(0))
                },0)     
                 return total+employeeP
            }, 0
         )

         const projectExpenseMoneySpent = selectedProject.data.extraExpenses.reduce(
            (total,projCost) =>{
                return total + Number(projCost.ExpensePrice); 
            },0
         )

        selectedProject.data.dates.forEach(d => {
            d.totalDateHours=d.employee.reduce((total,projCost) =>{
                
                return total + Number(projCost.totalEmployeeHours);
            },0)
         });  
         const updatedProjectHoursSpent = selectedProject.data.dates.reduce((total, projCost) => {
            if (!isNaN(projCost.totalDateHours)) {
              return total + projCost.totalDateHours;
            }
            return total;
          }, 0);
          
         const projectMoneySpent= projectEmployeeMoneySpent+projectExpenseMoneySpent
         console.log("projectMoneySpent",projectMoneySpent,"updatedProjectHoursSpent",updatedProjectHoursSpent,"selectedProject",selectedProject);
         selectedProject.data.ProjectHourSpent=updatedProjectHoursSpent;
         selectedProject.data.ProjectMoneySpent=projectMoneySpent;
         
        const bodyy = {
            id: id,
            data: selectedProject
        }

         fetch('/api/databaseProject',{
            method:'PUT',
            body:JSON.stringify(bodyy),   
        }
        )

  }

  async function handleEmployeeDelete(employeeId, date) {
    // [YOU LEFT OFF HERE Make sure that the items near the bottom are updated.]
    debugger;
    const projec = props.projectList?.find(proj => proj.id === props.projectId);
    const datee = projec.data.dates.find(dateu => dateu.date === date);
    console.log("datee", datee);
    const eIndex = datee.employee.findIndex(employee => employee.id === employeeId);
  
    if (eIndex !== -1) {
      datee.employee.splice(eIndex, 1);
    }

    datee.employee.forEach(employee => {
      employee.totalEmployeeMoney = employee.totalEmployeeHours * employee.data.employeePayRate;
    })
    datee.totalDateHours = datee.employee.reduce((total,e) =>{
        return total + e.totalEmployeeHours
    },0)

    const dIndex = projec.data.dates.findIndex( datee => datee.date === date) 
    projec.data.dates[dIndex] = datee;

    projec.data.ProjectHourSpent = projec.data.dates.reduce((total, a) => {
      return total + a.totalDateHours;
    }, 0);


    
  }


  

  

   async function handleSubmit(){

            const projec = props.projectList?.find(proj => proj.id === props.projectId);

            let list = [];
            list = projec?.data?.dates.map(date => date.date);
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
                props.closeModal();
                return;
            }
            const indexDateChange = projec.data.dates.findIndex(date => date.date === props.selectedDate.date)
   
            projec.data.dates[indexDateChange].date = selectedDate;
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
                        {props.projectList.flatMap((arr) =>
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
                                    onHoursWorkedChange={handleHoursWorkedChange}
                                    date={props.selectedDate.date}
                                    projectId={props.projectId}
                                /></td>
                                </tr>
                            ));
                            }
                            // return an empty array if the condition is not met
                            return [];
                        })
                        )}
                    </tbody>
                    </table>

                
                <div className='flex flex-row justify-between my-2'>
                  <button className='bg-greenLogo p-1 rounded-md text-black' onClick={handleSubmit}>
                    Submit
                  </button>
                  <button className='bg-red-900 text-white p-1 rounded-md' onClick={props.closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          );
          
}

export default UpdateDateAndEmployeesModal
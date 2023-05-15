"use client"
import React, {useEffect, useState} from 'react'
import DateModal from "../ProjectManagementComponents/ProjectManagementModals/DateModal";
import EmployeeTable from "../ProjectManagementComponents/EmployeeTable";

function ProjectDisplay(props) {


    const [ openDateModal, setOpenDateModal ] = useState(false);
    const [ selectedProjectId, setSelectedProjectId] = useState('')
    const [ selectedEmployeeOnDropDown, setSelectedEmployeeOnDropDown] = useState('')
    const [inputValue, setInputValue] = useState('');


    const setProjectList = async(projectList) =>{
        props.setProjectList()
        

    }
    
    
    const addADate = (projectId) =>{
        setSelectedProjectId(projectId)
        setOpenDateModal(prevState => !prevState)
    }



/**
 * adds employee to the data array of the project
 * 
 * 
 * @param {string} projectID 
 * @param {date} selectedDate 
 * @returns 
 */
const addEmployeeToDate = (projectID, selectedDate) => {
    // Find the employee in the employee list based on the selected employee on the dropdown
    const currEmployee = props.employeeList.find((employee) => employee.data.employeeName === selectedEmployeeOnDropDown);
  
    // If the selected employee is not found, log an error and return
    if (!currEmployee) {
      console.log("Selected employee not found");
      return;
    }
  
    // Create an updated project list by mapping through the project list
    const updatedProjectList = props.projectList.map( (project) => {
      // Find the project with the specified ID
      if (project.id === projectID) {
        // Create a copy of the project object to update it
        const updatedProject = { ...project };
        // Keep track of the index of the date being updated
        let updatedDateIndex = -1;
  
        // Map through the dates in the project's data object to find the date that matches the selected date
        updatedProject.data.dates = updatedProject.data.dates.map((date, index) => {
          if (date.date === selectedDate) {
            // Update the date object with the new employee added to it
            updatedDateIndex = index;
            const updatedDate = { ...date };
            updatedDate.employee.push(currEmployee);
            return updatedDate;
          }
          // Return the date object as is if it doesn't match the selected date
          return date;
        });
  
        // If the date index was not updated, it means the selected date was not found in the project
        if (updatedDateIndex === -1) {
          console.log(`Date ${selectedDate} not found in project ${projectID}`);
          return project;
        }
        // update the database
        putFunction(updatedProject);
        // Return the updated project object
        return updatedProject;
        
      }
  
      // Return the project object as is if its ID doesn't match the specified ID
      return project;
    });
    // Update the project list with the updated project list
    props.setProjectList(updatedProjectList);
    setSelectedEmployeeOnDropDown('')
  };

  const putFunction = async(updatedProject) => {
    const response = await fetch('/api/databaseProject', {
      method: 'PUT',
      body: JSON.stringify(updatedProject),
    });
  
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Error updating project: ${response.status}`);
    }
  };

  const submitADate = (date) => {
        // Find the project with the matching ID
        const projectIndex = props.projectList.findIndex((project) => project.id === selectedProjectId);
        if (projectIndex === -1) {
          return; // Project not found, do nothing
        }
      
        // Clone the project object to avoid mutating state directly
        const updatedProject = { ...props.projectList[projectIndex] };
      
        // Initialize the 'dates' property as an empty array if it does not exist
        if (!updatedProject.data.dates) {
          updatedProject.data.dates = [];
        }
      
        // Push the new date into the 'dates' array
        updatedProject.data.dates.push({date:date,employee:[],extraExpenses:[]});
      
        // Clone the project list and replace the updated project
        const updatedProjectList = [...props.projectList];
        updatedProjectList[projectIndex] = updatedProject;
      
        // Update the project list state
        props.setProjectList(updatedProjectList);
        // Close the modal
        setOpenDateModal(false);
  };

  const handleEmployeeDropDownChange = (event) => {
        setSelectedEmployeeOnDropDown(event.target.value);
      
        // Find the employee in the employee list based on the selected employee on the dropdown
        const currEmployee = props.employeeList.find((employee) => employee.data.employeeName === event.target.value);
      
        // If the selected employee is not found, log an error and return
        if (!currEmployee) {
          console.log("Selected employee not found");
          return;
        }
      
        // Update the expected hours for the selected employee
        setInputValue(currEmployee.expectedHours || '');
  };

function updateDateSpent(projectID, date, hours, money,employeeIndex) {

    //Itterate through the Project list and if the ID matches that is the project we want.
    const updatedProjectListReturn = props.projectList.map((project) =>{

            if(project.id === projectID){
                //now that we have a matching project
                //we need to find the matching date
                //What I am going to do is go through each date,
                //Then I am going to go through each employee and add their
                //total money and hours

                //I will then loop through each employee add that up 
                const preUpdatedProjectReturn = project.data.dates.map((Date) =>{
                    if(Date.date === date){
                        let tempDate = null;

                        const tempEmployeeList = Date.employee.map((employee, index) => {
                            if (index === employeeIndex) {
                              const updatedEmployee = {
                                ...employee,
                                totalEmployeeHours: hours,
                                totalEmployeeMoney: money,
                              };
                              return updatedEmployee;
                            }
                            return employee;
                          });

                        const totalEmployeeHours = tempEmployeeList.reduce(
                            (total, employee) => {
                                if(
                                    employee.totalEmployeeHours !==undefined
                                     && employee.totalEmployeeHours !==NaN 
                                     &&employee.totalEmployeeHours !==null
                                  )
                                {return total + employee?.totalEmployeeHours}
                                return total;
                                    
                            },
                            0
                          );
                          const totalEmployeeMoney = tempEmployeeList.reduce(
                              (total, employee) => 
                              {            
                            if(
                                employee.totalEmployeeHours !==undefined
                                 && employee.totalEmployeeHours !==NaN 
                                 &&employee.totalEmployeeHours !==null
                              )
                              {
                                return  parseFloat(total)+ parseFloat(employee?.totalEmployeeMoney);
                            }
                                return parseFloat(total);
                            },
                              0
                            );
                            

                        tempDate = {...Date,employee:tempEmployeeList,totalDateHours:totalEmployeeHours, totalDateMoney:totalEmployeeMoney}
                        return tempDate;    
                    }
                    return Date;
                })
                const updatedProjectReturn = { id: projectID, 
                    data: {...project.data, 
                                dates:preUpdatedProjectReturn} };
                
                return updatedProjectReturn;

            }

            //if it doesn't match the project ID just return it since it is a new updatedProjectList
            return project;
    })
    props.setProjectList(updatedProjectListReturn);
    updateProjectSpent(projectID,updatedProjectListReturn);

  }


  

  

const updateProjectSpent = (projectID, ProjectT) => {
    const tempProjectList = ProjectT.map((proj) =>{
        console.log(proj)
        if(proj.id === projectID ){
            const projectHoursSpent = proj.data.dates.reduce(
                (total,projCost)=>{
                    if(projCost.totalDateHours !==undefined
                        && projCost.totalDateHours !==NaN
                        && projCost.totalDateHours !==null)
                  {  return total+projCost.totalDateHours;}
                  return total;
                },
                0
            )
            const projectMoneySpent = proj.data.dates.reduce(
                (total,projCost)=>{
                    return total+projCost.totalDateMoney;
                },
                0
            )
            const returnProj = {...proj,data:{...proj.data,ProjectHourSpent:projectHoursSpent,ProjectMoneySpent:projectMoneySpent}}
            return returnProj;

        }
        return proj;
    })
    props.setProjectList(tempProjectList);
  
  };



  return (
    <div>
        <div>
        {           
         props.projectList?.map((project) => (
                <div key={project.id}
                    className='mx-4 my-4 px-4 py-4 bg-white rounded-md'
                >
                    <div className='text-4xl'>
                        {project?.data?.projectName}
                        <p className='text-xl'> {`@ ${project?.data?.projectLocation}`}</p>
                    </div>
                        {project?.data?.dates?.map((date,index) =>(
                            <div key={index} className='bg-gray-300 mb-2 pl-3 rounded-md'>
                                <p>{date.date}</p>
                                <div className='pl-4'>
                                    {date?.employee?.map((employee, index) => (
                                        <div key={index}>
                                        <EmployeeTable employee = {employee} calculate={(hours,money)=>updateDateSpent(project.id,date.date,hours,money,index)}/>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-row'>
                                    <button >
                                        <p className='bg-greenLogo rounded-full px-2 border-black border-2' onClick={() =>addEmployeeToDate(project.id,date.date)}>+</p>
                                    </button>
                                    <select 
                                        className='ml-3 my-2'
                                        value={selectedEmployeeOnDropDown}
                                        onChange={handleEmployeeDropDownChange}
                                    >
                                        <option value={"select an employee"}> select an employee</option>
                                        {Array.isArray(props.employeeList) && props.employeeList.map((employee, index) => (
                                            <option key={employee.data.employeeName} value={employee.data.employeeName}>
                                                {employee.data.employeeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                            </div>
                        ))}
                        <button className='bg-green-600 p-1 rounded-md' onClick={() =>addADate(project.id)}> add a Date </button>
                        <DateModal openModal={openDateModal} closeModal={() => setOpenDateModal(false)} onSubmit={submitADate}/>
                        <div className='flex flex-row justify-evenly'> 
                        <div className='flex flex-col'>
                            <div className='flex flex-row'> 
                            <p>Worked Hours: </p>
                                {`${(project?.data?.ProjectHourSpent === undefined)?(0):(project?.data?.ProjectHourSpent)}`}
                            </div>
                            <div className='flex flex-row'> 
                            <p>Expected Hours: </p>
                                {`${project?.data?.expectedHours}`}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row'> 
                            <p>Spent: </p>
                                {`${(project?.data?.ProjectMoneySpent === undefined)?(0):(project?.data?.ProjectMoneySpent)}`}
                            </div>
                            <div className='flex flex-row'> 
                                <p>Expceted Budget: </p>
                                {project?.data?.expectedBudget}
                            </div>
                        </div>
                    </div>
                </div>
            ))

        }
        </div>
    </div>
  )
}

export default ProjectDisplay
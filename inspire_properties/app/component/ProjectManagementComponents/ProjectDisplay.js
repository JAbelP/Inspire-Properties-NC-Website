"use client"
import React, {useEffect, useState} from 'react'
import DateModal from "../ProjectManagementComponents/ProjectManagementModals/DateModal";
import EmployeeTable from "../ProjectManagementComponents/EmployeeTable";

function ProjectDisplay() {
    const [ projectList, setProjectList ] = useState([
        {"id":"8ohuYhPeL3H2BGEvnynK",
        "data":{"projectLocation":"Inspire Properties","projectName":"Abel","expectedBudget":"36000",
        "expectedHours":"1200000"}}
    ]);

    const [ employeeList, setEmployeelist ] = useState([{employeeName:"Abel", employeePayRate:17, payType:"Hourly"},{employeeName:"John", employeePayRate:7.25, payType:"Hourly"}])

    const [ openDateModal, setOpenDateModal ] = useState(false);
    const [ selectedProjectId, setSelectedProjectId] = useState('')
    const [ selectedEmployeeOnDropDown, setSelectedEmployeeOnDropDown] = useState('')
    const [inputValue, setInputValue] = useState('');

    // useEffect(() => {
      
    
    //   const fetchingProjectList=  async() => {
    //         const data = await fetch('api/databaseProject');
    //         const json = await data.json();
    //         setProjectList(json);
    //   }

    //   fetchingProjectList();

    // }, [])

    
    
    const addADate = (projectId) =>{
        setSelectedProjectId(projectId)
        setOpenDateModal(prevState => !prevState)
    }




// This function adds an employee to a specific date in a project
const addEmployeeToDate = (projectID, selectedDate) => {
    // Find the employee in the employee list based on the selected employee on the dropdown
    const currEmployee = employeeList.find((employee) => employee.employeeName === selectedEmployeeOnDropDown);
  
    // If the selected employee is not found, log an error and return
    if (!currEmployee) {
      console.log("Selected employee not found");
      return;
    }
  
    // Create an updated project list by mapping through the project list
    const updatedProjectList = projectList.map((project) => {
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
  
        // Return the updated project object
        return updatedProject;
      }
  
      // Return the project object as is if its ID doesn't match the specified ID
      return project;
    });
  
    // Update the project list with the updated project list
    setProjectList(updatedProjectList);
    setSelectedEmployeeOnDropDown('')
  };

  
    const submitADate = (date) => {
        // Find the project with the matching ID
        const projectIndex = projectList.findIndex((project) => project.id === selectedProjectId);
        if (projectIndex === -1) {
          return; // Project not found, do nothing
        }
      
        // Clone the project object to avoid mutating state directly
        const updatedProject = { ...projectList[projectIndex] };
      
        // Initialize the 'dates' property as an empty array if it does not exist
        if (!updatedProject.data.dates) {
          updatedProject.data.dates = [];
        }
      
        // Push the new date into the 'dates' array
        updatedProject.data.dates.push({date:date,employee:[],extraExpenses:[]});
      
        // Clone the project list and replace the updated project
        const updatedProjectList = [...projectList];
        updatedProjectList[projectIndex] = updatedProject;
      
        // Update the project list state
        setProjectList(updatedProjectList);
        // Close the modal
        setOpenDateModal(false);
      };
      const handleEmployeeDropDownChange = (event) => {
        setSelectedEmployeeOnDropDown(event.target.value);
      
        // Find the employee in the employee list based on the selected employee on the dropdown
        const currEmployee = employeeList.find((employee) => employee.employeeName === event.target.value);
      
        // If the selected employee is not found, log an error and return
        if (!currEmployee) {
          console.log("Selected employee not found");
          return;
        }
      
        // Update the expected hours for the selected employee
        setInputValue(currEmployee.expectedHours || '');
      };



function updateDateSpent(projectID, date, hours, money,employeeIndex) {
    /**
     * Goals
     * this needs to iterate through each date within a given Project 
     * add all the values together for each date 
     */

    //Itterate through the Project list and if the ID matches that is the project we want.
    const updatedProjectListReturn = projectList.map((project) =>{

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
            console.log("This is project", project);
            return project;
    })
    setProjectList(updatedProjectListReturn);
    updateProjectSpent(projectID,updatedProjectListReturn);

  }


  

  

const updateProjectSpent = (projectID, ProjectT) => {
    const tempProjectList = ProjectT.map((proj) =>{
        console.log(proj)
        if(proj.id === projectID ){
            const projectHoursSpent = proj.data.dates.reduce(
                (total,projCost)=>{
                    return total+projCost.totalDateHours;
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
    setProjectList(tempProjectList);
  
  };



  return (
    <div>
        <div>
        {           
         projectList.map((project) => (
                <div key={project.id}
                {...console.log(project)}
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
                                    {date.employee.map((employee, index) => (
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
                                        <option 
                                            value={"select an employee"}
                                            
                                        > select an employee</option>
                                        {employeeList.map((employee,index) => (
                                            <option key={employee.employeeName} value={employee.employeeName}>
                                                {employee.employeeName}
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
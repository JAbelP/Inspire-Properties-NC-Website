"use client"
import React, {useEffect, useState} from 'react'
import DateModal from "../ProjectManagementModals/CreateModals/DateModal";
import ExpenseModal from "../ProjectManagementModals/CreateModals/ExpenseModal";
import EmployeeTable from "./EmployeeComponents/EmployeeTable";
import AddEmployeeComponent from "./EmployeeComponents/AddEmployeeComponent";
import ExpenseDisplayComponent from "./ExpenseComponents/ExpenseDisplayComponent"
import { EditIcon } from '../../icons';
import UpdateProjectModal from "../ProjectManagementModals/UpdateModals/UpdateProjectModal";
import UpdateDateAndEmployeeModal from "../ProjectManagementModals/UpdateModals/UpdateDateAndEmployeesModal";

function ProjectDisplay(props) {
  // props:projectList, setProjectList,employeeList, setEmployeeList

  //--------------------------Modals--------------------------//
  const [ openDateModal, setOpenDateModal ] = useState(false);
  const [ openExpenseModal, setOpenExpenseModal ] = useState(false);
  const [ openUpdateProjectModal, setOpenUpdateProjectModal ] = useState(false);
  const [ openUpdateDateAndEmployeeModal, setOpenUpdateDateAndEmployeeModal ] = useState(false);
  //--------------------------Modals--------------------------//


    const [ selectedProjectId, setSelectedProjectId] = useState('')
    const [ selectedDate, setSelectedDate] = useState('')
    const [inputValue, setInputValue] = useState('');
    const [ alreadySelectedDates,setAlreadySelectedDates ]=useState([])


    /**
     * opens date modal and adds already selected dates to alreadySelectedDates
     * @param {string} projectId 
     */
    const addADate = (projectId) => {
      //[HUH?] Why am I selecting the Project Id? 
      setSelectedProjectId(projectId);
      setOpenDateModal(prevState => !prevState);
    
      const project = props.projectList.find(project => project.id === projectId);
      const datesAlreadySelected = project?.data?.dates?.map(date => date.date) || [];
    
      setAlreadySelectedDates(datesAlreadySelected);
    }
    
    /**
     * opens the expesnse Modal
     */
    const addAnExpense = (projectId) => {
      setSelectedProjectId(projectId);
      setOpenExpenseModal(prevState =>!prevState);
    }

    const openUpdateProjectModalHandler = (projectId) => {
      console.log('openUpdateProjectModalHandler');
      setSelectedProjectId(projectId);
      setOpenUpdateProjectModal(prevState =>!prevState);
    }

    const openUpdateDateAndEmployeeModalHandler = (projectId, date) =>{
      setSelectedProjectId(projectId);
      setSelectedDate(date);
      setOpenUpdateDateAndEmployeeModal(prevState =>!prevState);
    }



/**
 * 
 * adds the employee to the selected date
 * updates the database with relevent information
 * @param {string} projectID 
 * @param {date} selectedDate 
 * @returns 
 */
const addEmployeeToDate = (projectID, selectedDate,selectedEmployeeOnDropDown) => {
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
  };


/**
 * update project->project date to have the right employee information
 * @param {project} updatedProject 
 * @returns 
 */
  const putFunction = async(updatedProject) => {
    console.log("putFunction");
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


  /**
   * adds a date to a project
   * (NOTE: DOES NOT UPDATE DATABASE ENCOURAGE USER TO PUT IN EMPLOYEE || EXTRA EXPENSE)
   * @param {date} date 
   * @returns 
   */
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
        updatedProject.data.dates.push({date:date,employee:[]});
      
        // Clone the project list and replace the updated project
        const updatedProjectList = [...props.projectList];
        updatedProjectList[projectIndex] = updatedProject;
      
        // Update the project list state
        props.setProjectList(updatedProjectList);
        // Close the modal
        setOpenDateModal(false);
  };

  /**
   * adds an expense to a project
   * @param {expense} expense 
   * @returns 
   */
  const submitAnExpense = (expense) => {
    const projectIndex = props.projectList.findIndex((project) => project.id === selectedProjectId);
    if (projectIndex === -1) {
      return; // Project not found, do nothing
    }

   // Clone the project object to avoid mutating state directly
   const updatedProject = {...props.projectList[projectIndex] };
   if(!updatedProject.data.extraExpenses) {
    updatedProject.data.extraExpenses = []; 
  }

  updatedProject.data.extraExpenses.push(expense);

  const updatedProjectList = [...props.projectList];
  updatedProjectList[projectIndex] = updatedProject;

  //updates the spend and Worked hours
  updatedProject?.data?.extraExpenses?.forEach(element => {
    console.log(element);
    
  });

  putFunction(updatedProject);

  props.setProjectList(updatedProjectList);
  setOpenExpenseModal(false);
}

/**
 * 
 * @param {num} projectID - id of the project to be updated 
 * @param {date} date - date to be added to the project 
 * @param {num} hours - total hours spent on date 
 * @param {num} money - total money spent on date  
 * @param {num} employeeIndex -which employee's hours are we updating
 */
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

  /**
 * Updates the total hours and money spent for a project
 * @param {Project's id} projectID 
 * @param {List of all Projects} ProjectT 
 */
const updateProjectSpent = (projectID, ProjectT) => {
    const tempProjectList = ProjectT.map((proj) =>{
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
            const projectEmployeeMoneySpent = proj.data.dates.reduce(
                (total,projCost)=>{
                    return total+projCost.totalDateMoney;
                },
                0
            )
            const projectExpenseMoneySpent = proj.data.extraExpenses.reduce(
              (total,projCost)=>{
                  return total+Number(projCost.ExpensePrice);
              },
              0
            )
            const projectMoneySpent = projectEmployeeMoneySpent+projectExpenseMoneySpent

            const returnProj = {...proj,data:{...proj.data,ProjectHourSpent:projectHoursSpent,ProjectMoneySpent:projectMoneySpent}}
            return returnProj;

        }
        return proj;
    })
    props.setProjectList(tempProjectList);
  
  };



  return (
    <div className='text-black'>
        <div>
        {           
         props.projectList?.map((project) => (
                <div key={project.id}
                    className='mx-4 my-4 px-4 py-4 bg-slate-500 rounded-md border-4 border-black'
                >
                    <div className='text-4xl'>
                      <div>
                          <div className='flex flex-row'> 
                            <button onClick={()=>openUpdateProjectModalHandler(project.id)}>
                              <EditIcon strokeColor="black" hoverColor="gray" />
                            </button>
                            <UpdateProjectModal projectList = {props.projectList} projectId = {selectedProjectId} closeModal={()=>setOpenUpdateProjectModal(false)} isOpen={openUpdateProjectModal}/>
                            {project?.data?.projectName}
                          </div>
                          <p className='text-xl'> {`@ ${project?.data?.projectLocation}`}</p>
                        </div>
                    </div>
                        {project?.data?.dates?.map((date,dIndex) =>(
                            <div key={`date-${dIndex}`} className='bg-gray-300 mb-2 pl-3 rounded-md'>
                            <div className='flex flex-row pt-3 gap-x-2'>
                              <button onClick={() =>openUpdateDateAndEmployeeModalHandler(project.id,date)}>
                                <EditIcon strokeColor="black" hoverColor="gray"/>
                              </button>
                               <UpdateDateAndEmployeeModal  projectList = {props.projectList} projectId = {selectedProjectId} selectedDate={selectedDate} closeModal ={() => setOpenUpdateDateAndEmployeeModal(false)} isOpen={openUpdateDateAndEmployeeModal} />
                                <p>{date.date}</p>
                                </div>
                                <div className='pl-4'>
                                    {date.employee.map((employee, index) => (
                                        <div key={index}>
                                        <EmployeeTable 
                                          employee={employee} 
                                          calculate={(hours, money) => updateDateSpent(project.id, date.date, hours, money, index)} 
                                          addEmployeeToDate={(selectedEmployee) => addEmployeeToDate(project.id, date.date, selectedEmployee)}
                                          employeeList={props.employeeList}
                                        />
                                        </div>
                                    ))}
                                    <AddEmployeeComponent
                                        employeeList={props.employeeList}
                                        addEmployeeToDate={(selectedEmployee) => addEmployeeToDate(project.id, date.date, selectedEmployee)}
                                    />
                                </div>
                            </div>
                        ))}
                        <button className='bg-green-600 p-1 rounded-md' onClick={() =>addADate(project.id)}> add a Date </button>
                        <DateModal openModal={openDateModal} closeModal={() => setOpenDateModal(false)} onSubmit={submitADate} alreadySelectedDates={alreadySelectedDates} setAlreadySelectedDates={setAlreadySelectedDates}/>
                        {/* Expense------------------------------------- */}
                        <div>
                        {project?.data?.extraExpenses?.length > 0 && <ExpenseDisplayComponent expenses = {project?.data?.extraExpenses}/>}
                          <button className='bg-green-600 p-1 rounded-md mt-2' onClick={() =>addAnExpense(project.id)}>
                            Add Expense
                          </button>
                          <ExpenseModal closeModal={() => setOpenExpenseModal(false)} isOpen={openExpenseModal} onSubmit={submitAnExpense} />

                        </div>
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
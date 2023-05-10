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

    const [ employeeList, setEmployeelist ] = useState([{employeeName:"Abel", employeePayRate:17, payType:"Hourly"}])

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

// const updateDateSpent = (projectID, date, hours, money) => {
//   let totalMoneySpent = 0;
//   let totalHoursSpent = 0;

//   const updatedProjectList = projectList.map((project) => {
//     if (project.id === projectID) {
//       const updatedProject = { ...project };
//       let updatedDateIndex = -1;
//       updatedProject.data.dates = updatedProject.data.dates.map((d, index) => {
//         if (d.date === date) {
//           updatedDateIndex = index;
//           const updatedDate = { ...d, spentHours: hours, spentMoney: money };
//           totalMoneySpent += money;
//           totalHoursSpent += hours;
//           updatedProject.data.dates[index] = updatedDate;
//         }
//         return d;
//       });

//       if (updatedDateIndex === -1) {
//         console.log(`Date ${date} not found in project ${projectID}`);
//         return project;
//       }
//       debugger;
//       if(updatedProject.data.spentBudget !==null && updatedProject.data.spentBudget !== undefined){
//         const spentBudgetFloat = parseFloat(updatedProject.data.spentBudget);
//         const totalSpentFloat = parseFloat(totalMoneySpent);
//         console.log(typeof(spentBudgetFloat));
//         console.log(spentBudgetFloat);
//         console.log(typeof(totalSpentFloat));
//         console.log(totalSpentFloat);
//         updatedProject.data.spentBudget = totalSpentFloat+spentBudgetFloat;
//       }else{
//         const totalSpentFloat = parseFloat(totalMoneySpent);
//         updatedProject.data.spentBudget = totalSpentFloat;
//       }
//       if(updatedProject.data.date.spentHours !==null && updatedProject.data.date.spentHours !== undefined ){
//         updatedProject.data.date.spentHours += totalHoursSpent;
//       }
//       else{
//           updatedProject.data.date.spentHours = totalHoursSpent;
//       }
//       return updatedProject;
//     }
//     return project;
//   });

//   setProjectList(updatedProjectList);
// };


//     const updateProjectSpent=(projectID)=>{
//         let totalMoneySpentOnProject = 0;
//         let totalHoursSpentOnProject = 0;
//         const updatedProjectList = projectList.map((project)=>{
//             if(project.id === projectID) {
//                 let updatedProject = {...project}
//                 updatedProject.data.dates.map((DATE) =>{
//                     totalHoursSpentOnProject = DATE.spentHours + totalHoursSpentOnProject;
//                     totalMoneySpentOnProject = DATE.spentMoney+totalHoursSpentOnProject;
//                 })
//                 updatedProject = {id:project.id,...updatedProject.data,
//                      totalSpentHours:totalHoursSpentOnProject,
//                      totalSpentMoney:totalMoneySpentOnProject
//                     }
//                 return updatedProject;
//             }
//             return project;
//         })
//         setProjectList(updatedProjectList);
//     }


function updateDateSpent(project, date, employee, hours, money) {
    if (!project[date]) {
      project[date] = {};
    }
  
    // Update spent hours and money for the given date and employee
    if (!project[date][employee]) {
      project[date][employee] = {
        spentHours: 0,
        spentMoney: 0,
        expectedHours: 0
      };
    }
  
    project[date][employee].spentHours += hours;
    project[date][employee].spentMoney += money;
  
    // Calculate expected hours by adding up the total hours per project per date for each employee
    const employees = Object.keys(project[date]);
    employees.forEach(emp => {
      const totalHours = Object.values(project[date][emp]).reduce((total, empData) => total + empData.spentHours, 0);
      project[date][emp].expectedHours = totalHours;
    });
  
    return project;
  }
  
  


// const updateProjectSpent = (projectID)=>{
//     debugger;
//         let totalHoursSpentOnProject = 0;
//         let totalMoneySpentOnProject = 0;
//         let projectIndex = 0;
//         console.log("Type of: ",typeof(projectList),"projectList: ",projectList)
//         projectList.map((project,index) =>{
//             if(projectID === project.id){
//                 projectIndex = index
//                 project.data.dates.map((date) =>{
//                     if(date.spentHours !== null && date.spentHours !== undefined){
//                         totalHoursSpentOnProject += date.spentHours
//                     }
//                     if(date.spentMoney !== null && date.spentMoney !== undefined){
//                         totalMoneySpentOnProject += date.spentMoney
//                     }
//                 });
                
//                 const newData = {...project.data,
//                                     totalMoneySpent:totalMoneySpentOnProject,
//                                     totalHoursSpent:totalHoursSpentOnProject,
                                    
//                                 }
//                 console.log(newData);
//                 const updateProjectList = [...projectList];
//                 updateProjectList[projectIndex] = newData;
//                 setProjectList(updateProjectList);
//             console.log("Type of: ",typeof(projectList),"projectList: ",projectList)


//             }

//         })

// }

const updateProjectSpent = (projectID) => {
    let totalHoursSpentOnProject = 0;
    let totalMoneySpentOnProject = 0;
    let totalExpectedHours = 0; // Initialize total expected hours
  
    setProjectList((prevProjectList) =>
      prevProjectList.map((project, index) => {
        if (projectID === project.id) {
          const projectIndex = index;
          project.data.dates.forEach((date) => {
            if (date.spentHours !== null && date.spentHours !== undefined) {
              totalHoursSpentOnProject += date.spentHours;
            }
            if (date.spentMoney !== null && date.spentMoney !== undefined) {
              totalMoneySpentOnProject += date.spentMoney;
            }
          });
          debugger;
          // Calculate total expected hours
          totalExpectedHours = project.data.dates.reduce((total, date) => {
            const dateExpectedHours = date.employee.reduce(
              (dateTotal, employee) => dateTotal + parseInt(employee.expectedHours || 0),
              0
            );
            return total + dateExpectedHours;
          }, 0);
  
          const newData = {
            ...project.data,
            totalMoneySpent: totalMoneySpentOnProject,
            totalHoursSpent: totalHoursSpentOnProject,
            expectedHours: totalExpectedHours, // Set the total expected hours
          };
  
          return { ...project, data: newData };
        }
  
        return project;
      })
    );
  };



  return (
    <div>
        <div>
        {           
         projectList.map((project) => (
                <div key={project.id}
                    className='mx-4 my-4 px-4 py-4 bg-white'
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
                                        <EmployeeTable employee = {employee} calculate={(hours,money)=>updateDateSpent(project.id,date.date,hours,money)}/>
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
                            <p>Expected Hours: </p>
                                {`${project?.data?.totalHoursSpent}`}
                            </div>
                            <div className='flex flex-row'> 
                            <p>Expected Hours: </p>
                                {`${project?.data?.expectedHours}`}
                            </div>
                        </div>
                        <div className='flex flex-row'> 
                            <p>Expceted Budget: </p>
                            {project?.data?.expectedBudget}
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
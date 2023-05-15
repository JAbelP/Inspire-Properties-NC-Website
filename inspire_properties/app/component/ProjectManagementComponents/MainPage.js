"use client"
import React,{useState,useEffect} from 'react'
import ProjectDisplay from "../ProjectManagementComponents/ProjectDisplay"
import ManageHeader from "../ProjectManagementComponents/ManageHeader"

function MainPage() {
  const [ projectList, setProjectList ] = useState();
  const [ employeeList, setEmployeelist] = useState();

  /**
   * This use Effect gets the data from the database and populates the ProjectList
   */
  useEffect(() => {
    async function fetchProjectData(){
      const response = await fetch('/api/databaseProject');
      const data = await response.json();
      console.log(data, " Response from database")
      setProjectList(data);

    }

    async function fetchEmployeeData(){
      const response = await fetch('/api/databaseEmployee');
      const data = await response.json();
      console.log(data," :EmployeeList");
      setEmployeelist(data);

    }
    fetchProjectData();
    fetchEmployeeData();
  }, [])


  return (
    <div className='text-black'>
    {/* This is the header we are passing in the list and the ability to set the project list */}
    <ManageHeader projectList = {projectList} setProjectList={setProjectList} employeeList={employeeList} setEmployeelist={setEmployeelist}/>
    <ProjectDisplay projectList={projectList} setProjectList={setProjectList} employeeList={employeeList} setEmployeelist={setEmployeelist}/>
</div>
  )
}

export default MainPage
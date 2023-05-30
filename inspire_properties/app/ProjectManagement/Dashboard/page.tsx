"use client"
import ManageHeader from '@/app/component/ProjectManagementComponents/DashBoard/ManageHeader';
import ProjectDisplay from '@/app/component/ProjectManagementComponents/DashBoard/ProjectDisplay';
import React, {useState,useEffect} from 'react'


function DashboardPage() {
    const [projectList, setProjectList] = useState();
    const [employeeList, setEmployeeList] = useState();

    useEffect(() => {
        async function fetchProjectData(){
            const response = await fetch('/api/databaseProject');
            const data = await response.json();
            setProjectList(data);
        }

        async function fetchEmployeeData(){
            const response = await fetch('/api/databaseEmployee');
            const data = await response.json();
            setEmployeeList(data);
        }

        fetchProjectData();
        fetchEmployeeData();
    },
    []);


  
  return (
    <div>
        <ManageHeader projectList = {projectList} setProjectList={setProjectList} employeeList={employeeList} setEmployeelist={setEmployeeList}/>
        <ProjectDisplay projectList={projectList} setProjectList={setProjectList} employeeList={employeeList} setEmployeelist={setEmployeeList}/>

    </div>
  )
}

export default DashboardPage
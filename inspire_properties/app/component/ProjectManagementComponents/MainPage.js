"use client"
import React,{useState,useEffect} from 'react'
import ProjectDisplay from "../ProjectManagementComponents/ProjectDisplay"
import ManageHeader from "../ProjectManagementComponents/ManageHeader"

function MainPage() {
  const [ projectList, setProjectList ] = useState(
    // {"id":"8ohuYhPeL3H2BGEvnynK",
    // "data":{"projectLocation":"Inspire Properties","projectName":"Abel","expectedBudget":"36000",
    // "expectedHours":"1200000"}}
  );

  /**
   * This use Effect gets the data from the database and populates the ProjectList
   */
  useEffect(() => {
    async function fetchData(){
      const response = await fetch('/api/databaseProject');
      const data = await response.json();
      console.log(data, " Response from database")
      setProjectList(data);

    }
    fetchData();
  }, [])


  return (
    <div className='text-black'>
    {/* This is the header we are passing in the list and the ability to set the project list */}
    <ManageHeader projectList = {projectList} setProjectList={setProjectList}/>
    <ProjectDisplay projectList={projectList} setProjectList={setProjectList} />
</div>
  )
}

export default MainPage
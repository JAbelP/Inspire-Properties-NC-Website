"use client"
import React,{useState,useEffect} from 'react'
import ProjectDisplay from "../ProjectManagementComponents/ProjectDisplay"
import ManageHeader from "../ProjectManagementComponents/ManageHeader"
// I need to see if the user is logged in to firebase auth, the Auth is in "../../firebaseConfig"
import {Auth} from "../../firebaseConfig";
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import LogInPage from "../ProjectManagementComponents/LogInPage";

function MainPage() {
  const [ projectList, setProjectList ] = useState();
  const [ employeeList, setEmployeelist] = useState();
  const [ user, setUser ] = useState(null);
  const [ databaseUser, setdatabaseUser ] = useState([]);
  const [ isAuth, setIsAuth ] = useState(false);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      //if the user.uid is in databaseUser set isAuth to true
      databaseUser.forEach(element => {

        if (element.uid === user.uid) {

          setIsAuth(true);
          
        }
      })

      

    } else {
      //them signing out 
      setUser(null);
    }
  });

  /**
   * populates projectList with data from database Project
   */
  useEffect(() => {
    async function fetchProjectData(){
      const response = await fetch('/api/databaseProject');
      const data = await response.json();
      setProjectList(data);

    }

    /**
     * populates employee list with data from database employee
     */
    async function fetchEmployeeData(){
      const response = await fetch('/api/databaseEmployee');
      const data = await response.json();
      setEmployeelist(data);

    }

    /**
     * populates user list with data from database user
     */
    async function fetchUserData(){
      const response = await fetch('/api/databaseUsers');
      const data = await response.json();
      setdatabaseUser(data);
    }

    
    fetchProjectData();
    fetchEmployeeData();
    fetchUserData();
  }, [])


  return (
    <div>{isAuth ? 
      (    
        <div className='text-black'>
        {/* This is the header we are passing in the list and the ability to set the project list */}
          <ManageHeader projectList = {projectList} setProjectList={setProjectList} employeeList={employeeList} setEmployeelist={setEmployeelist}/>
          <ProjectDisplay projectList={projectList} setProjectList={setProjectList} employeeList={employeeList} setEmployeelist={setEmployeelist}/>
        </div>)
      :
      (
        <LogInPage />
      )
      
      }

</div>
  )
}

export default MainPage;
"use client"

//TODO: currently if the user is not authenticated it just stays at the login widget
//What needs to happen is a warning is shown to the user that they are not authenticated.
//a log out button should be shown so that someone else can log in.

import React, { useState, useEffect } from 'react';
import ProjectDisplay from "./DashBoard/ProjectDisplay";
import ManageHeader from "./DashBoard/ManageHeader";
import { Auth } from "../../firebaseConfig";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import LogInComponent from "./ProjectManagementComponentsLogIn/LogInComponent"

function LogInPage() {
  const [projectList, setProjectList] = useState();
  const [employeeList, setEmployeelist] = useState();
  const [databaseUser, setdatabaseUser] = useState([]);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchProjectData() {
      console.log("fetchProjectData")
      const response = await fetch('/api/databaseProject');
      const data = await response.json();
      setProjectList(data);
    }

    async function fetchEmployeeData() {
      console.log("fetchEmployeeData")
      const response = await fetch('/api/databaseEmployee');
      const data = await response.json();
      setEmployeelist(data);
    }

    fetchProjectData();
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch('/api/databaseUsers');
      const data = await response.json();
      setdatabaseUser(data);
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        //see if there is a matching user in databaseUser

        const foundUser = databaseUser.find((element) => (element.uid === user.uid))

        console.log("Found user:", foundUser);
        if(foundUser?.authenticated === true){
          console.log("pushing to dashboard");
          router.push('/ProjectManagement/Dashboard');
      }
    }
    });
  }, [databaseUser]);
  
  

  return <div>
    <LogInComponent />
  </div>;
}

export default LogInPage;

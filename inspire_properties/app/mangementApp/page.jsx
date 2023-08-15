"use client"
import React, { useEffect, useState } from 'react'
import Header from '../component/ProjectManagementComponents/Header/header'
import MainEmployeeComponent from '../component/ProjectManagementComponents/mainEmployeeComponent'
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from "../firebaseConfig"

function page() {

  const [projects, setProjects] = useState([

  ]);



  useEffect(() => {
    const q = query(collection(db, 'Projects'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setProjects(itemsArr);
      return () => unsubscribe();
    });
    console.log(projects);
  }, []);


  return (
    <div>
        <Header/>
        {projects.map((project) => (
        <MainEmployeeComponent
          key={project.id}
          projectKey={project.id}
          projectName={project.Name}
          projectLocation={project.Location}
          expectedCost={project['Expected Cost']}
        />
      ))}
    </div>
  )
}

export default page
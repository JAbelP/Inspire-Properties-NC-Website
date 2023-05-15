import React from 'react'
import ProjectHeader from '../component/ProjectManagementComponents/Header'
import ProjectDisplay from '../component/ProjectManagementComponents/ProjectDisplay'
import MainPage from "../component/ProjectManagementComponents/MainPage";

function ProjectManagementPage() {
  return (
    <body className='bg-gray-600 min-h-screen flex flex-col'>
        <main>
            <div className='text-black'>
                <MainPage/>
            </div>
        </main>
    </body>
  )
}

export default ProjectManagementPage
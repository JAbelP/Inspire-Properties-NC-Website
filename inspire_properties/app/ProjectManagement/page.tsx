import React from 'react'
import MainPage from "../component/ProjectManagementComponents/MainPage";

function ProjectManagementPage() {
  return (
    <div className='bg-gray-600 min-h-screen flex flex-col'>
        <main>
            <div className='text-black'>
                <MainPage/>
            </div>
        </main>
    </div>
  )
}

export default ProjectManagementPage
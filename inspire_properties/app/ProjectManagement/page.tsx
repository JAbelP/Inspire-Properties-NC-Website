import React from 'react'
import LogInPage from "../component/ProjectManagementComponents/LogInPage";

function ProjectManagementPage() {
  return (
    <div className='bg-gray-600 min-h-screen flex flex-col'>
        <main>
            <div className='text-black'>
                <LogInPage/>
            </div>
        </main>
    </div>
  )
}

export default ProjectManagementPage
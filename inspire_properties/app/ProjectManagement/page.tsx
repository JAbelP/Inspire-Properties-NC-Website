import React from 'react'
import ProjectHeader from '../component/ProjectManagementComponents/Header'

function ProjectManagementPage() {
  return (
    <body className='bg-gray-600 min-h-screen flex flex-col'>
        <main>
            <div className='text-black'>
                <ProjectHeader/>
                Hello World
            </div>
        </main>
    </body>
  )
}

export default ProjectManagementPage
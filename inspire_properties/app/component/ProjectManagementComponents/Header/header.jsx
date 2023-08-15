"use client"
import React, { useState } from 'react';
import HeaderButton from './HeaderButtons/headerButton';
import NewProjectModal from '../modals/newProjectModal';
import NewEmployeeModal from '../modals/newEmployeeModal';
function Header() {
  const [isNewProjectModalVisible, setIsNewProjectModalVisible] = useState(false);
  const [isNewEmployeeModalVisible, setIsNewEmployeeModalVisible] = useState(false);

  const openNewProjectModal = () => {
    console.log('open new project modal')
    setIsNewProjectModalVisible(true);
  };

  const openNewEmployeetModal = () => {
    console.log('open new project modal')
    setIsNewEmployeeModalVisible(true);
  };

  const closeNewProjectModal = () => {
    console.log('Close new project modal')
    setIsNewProjectModalVisible(false);
  };

  const closeNewEmployeeModal = () => {
    console.log('Close new project modal')
    setIsNewEmployeeModalVisible(false);
  };

  return (
    <div className='text-black'>
      <div className=" w-full h-[95px] px-[102px] py-3.5 bg-slate-400 justify-end items-start gap-[23px] inline-flex">
        <HeaderButton buttonText={'project'} click={openNewProjectModal} />
        <HeaderButton buttonText={'Employee'} click={openNewEmployeetModal}/>
      </div>
        { isNewProjectModalVisible && <NewProjectModal onClose = {closeNewProjectModal}/> }
         { isNewEmployeeModalVisible && <NewEmployeeModal onClose = {closeNewEmployeeModal}/> }
    </div>
  );
}

export default Header;

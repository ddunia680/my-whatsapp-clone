import React from 'react';
import "./userMenu.css";

function UserMenu(props) {
    const menuRowClasses = 'absolute bg-mainInput w-[12rem] top-[3rem] left-[20%] lg:left-[23%] xl:left-[40%] py-2 flex flex-col justify-start items-start'
    const menuClasses = [menuRowClasses, props.isVisible? 'open' : 'close'];
    
    return (
        <div className={menuClasses.join(' ')}>
            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Profile</div>
            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>New Group</div>
            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Catalog</div>
            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Starred messages</div>
            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Labels</div>
            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Settings</div>
            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Log out</div>
        </div>
    );
}

export default UserMenu;
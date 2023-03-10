import React from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../store/authenticate';
import { SHOWPROFILEEDITVIEW } from '../../store/uiStates';
import "./userMenu.css";

function UserMenu(props) {
    const dispatch = useDispatch();
    const menuRowClasses = 'absolute bg-mainInput w-[12rem] top-[3rem] left-[20%] lg:left-[23%] xl:left-[40%] py-2 flex flex-col justify-start items-start'
    const menuClasses = [menuRowClasses, props.isVisible? 'open' : 'close'];

    const logoutHandler = () => {
        props.menuVisibility(false);
        dispatch(LOGOUT());
    }

    const profileChangeHandler = () => {
        props.menuVisibility(false);
        dispatch(SHOWPROFILEEDITVIEW(true));
    }
    
    return (
        <div className={menuClasses.join(' ')}>

            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={profileChangeHandler}>Profile</div>

            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>New Group</div>

            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Catalog</div>

            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Starred messages</div>

            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Labels</div>

            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Settings</div>

            <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={logoutHandler}>Log out</div>
        </div>
    );
}

export default UserMenu;
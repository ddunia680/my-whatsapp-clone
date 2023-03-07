import React from 'react';

function ChatMenu(props) {
    const menuRowClasses = 'absolute bg-mainInput text-gray-200 w-[12rem] top-[3rem] right-[2rem] py-2 flex flex-col justify-start items-start z-10'
    const menuClasses = [menuRowClasses, props.isVisible? 'open' : 'close'];

    return (
        <div className={menuClasses.join(' ')}>
        <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Contact info</div>
        <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Close chat</div>
        <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Mute notifications</div>
        <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Disappearing messages</div>
        <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Clear messages</div>
        <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Delete chat</div>
        <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Report</div>
        <div className='w-[100%] h-[2rem] text-[15px] pl-3 py-5 flex justify-start items-center cursor-pointer hover:bg-primary' onClick={() => props.menuVisibility(false)}>Block</div>
    </div>
    );
}

export default ChatMenu;
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import './interView.css';

function InterlocutorView(props) {
    const viewClasses = ['absolute w-[20rem] top-[1rem] z-30 py-[1rem] bg-primary shadow-md shadow-iconsColor text-mainTextColor flex flex-col justify-start items-center space-y-2 rounded-md', props.theState ? 'showDetails' : 'hideDetails'];
    return (
        <div className={viewClasses.join(' ')}>
            <h2 className='text-lg font-bold'>Contact Info</h2>
            { !props.interlocutor.profileUrl ?
            <UserCircleIcon className='w-[7rem] text-black'/>
            :
            <div className='w-[6rem] h-[6rem] bg-iconsColor rounded-full overflow-hidden'>
                <img src={props.interlocutor.profileUrl} alt='a pic' className='w-[100%] h-[100%]'/>
            </div>
            }
            <h1 className='text-2xl font-semibold'>{props.interlocutor.username}</h1>
            <h4 className='text-slate-500 text-sm'>{props.interlocutor.email}</h4>
            <div className='w-[90%] bg-mainInput rounded-lg px-4 flex flex-col justify-start text-sm py-[2px]'>
                <p>{props.interlocutor.status}</p>
                <p className='text-gray-500'>Joined on 12 june 2022</p>
            </div>
        </div>
    );
}

export default InterlocutorView;
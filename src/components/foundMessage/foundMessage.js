import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { SETMESSAGEINTOVIEW } from '../../store/messages';

function FoundMessage(props) {
    const dispatch = useDispatch();
    return (
        <div className='w-[100%] h-[4rem] border-b-[1px] border-primary flex flex-col justify-center items-start px-[2rem] text-slate-500 hover:bg-primary cursor-pointer' title={props.message} onClick={() => {
            dispatch(SETMESSAGEINTOVIEW(props._id));
            props.setShowSearch(false);
        }}>
            <p className='text-[11px]'>
                {new Date(props.updatedAt).getDate()}/{new Date(props.updatedAt).getMonth()}/{new Date(props.updatedAt).getFullYear()}
            </p>
            <p className="text-gray-500 text-sm flex"><CheckIcon className='w-[1rem]' />{props.message}</p>
        </div>
    );
}

export default FoundMessage;
import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

function FoundMessage(props) {
    return (
        <div className='w-[100%] h-[4rem] border-b-[1px] border-primary flex flex-col justify-center items-start px-[2rem] text-slate-500 hover:bg-primary'>
            <p className='text-[11px]'>21/12/2022</p>
            <p className="text-gray-500 text-sm flex"><CheckIcon className='w-[1rem]' /> Thank you dear</p>
        </div>
    );
}

export default FoundMessage;
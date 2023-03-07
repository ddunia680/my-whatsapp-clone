import './searchMessage.css';
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import { XCircleIcon, ArrowLeftIcon} from '@heroicons/react/24/solid';

import React, { useState } from 'react';
// import Spinner from '../../UI/spinner/spinner';
import FoundMessage from '../foundMessage/foundMessage';

function SearchMessage(props) {
    const [inputvalue, setInputValue] = useState('');
    
    const mainClasses = ['absolute top-0 right-0 z-200 h-[100%] w-[70%] right-0 bg-darkSpecial', props.showSearch ? 'searchMVisible' : 'searchMInvisible']
    return (
        <div className={mainClasses.join(' ')}>
            <div className='w-[100%] px-5 flex justify-between items-center bg-primary'>
                <div className='w-[100%] h-[3.5rem] flex justify-start items-center '>
                    <XCircleIcon className="w-[3rem] text-iconsColor font-bold" onClick={() => props.setShowSearch(false)}/>
                    <h2 className='w-[90%] text-slate-200 text-md'>Search Messages</h2>
                </div>
            </div>
            {/* Search Bar */}
            <div className='flex justify-between items-center w-[100%] px-3'>
                <div className='flex justify-start items-center my-2 bg-primary h-[2rem] rounded-lg w-[100%]'>
                    {!inputvalue ? 
                    <MagnifyingGlassIcon className="w-[5.7rem] text-iconsColor px-[5%]"/> :
                    <ArrowLeftIcon className="w-[5.7rem] text-green-500 px-[5%]" onClick={() => setInputValue('')}/> }
                    <input type='text' placeholder="Search..." className='text-sm w-[85%] bg-transparent outline-none focus:text-iconsColor' value={inputvalue} onChange={event => setInputValue(event.target.value)}/>
                    <XCircleIcon className='text-iconsColor w-[1.5rem]' onClick={() => setInputValue('')}/>
                    {/* <Spinner/> */}
                </div>
            </div>

            {/* Found messages */}
            <div className='theList w-[100%] h-[87vh] overflow-y-scroll'>
                <FoundMessage/>
                <FoundMessage/>
                <FoundMessage/>
            </div>
            
        </div>
    );
}

export default SearchMessage;
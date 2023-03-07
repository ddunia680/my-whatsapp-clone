import { ChevronLeftIcon, FunnelIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline';

import React, { useState } from 'react';

function SearchBar(props) {
    const [inputvalue, setInputValue] = useState('');

    const searchBarClasses = ['flex justify-around items-center my-2 bg-primary h-[2rem] rounded-lg', props.filter ?'w-[90%]' : 'w-[100%]'];
    return (
        <div className='flex justify-between items-center w-[100%] px-3'>
            <div className={searchBarClasses.join(' ')}>
                {props.filter ? 
                    inputvalue ?
                        <ChevronLeftIcon className="w-[1.2rem] text-green-600" onClick={() => setInputValue('')}/>
                    : 
                    <MagnifyingGlassIcon className="w-[1rem] text-iconsColor"/>
                : 
                <ChevronLeftIcon className="w-[1.2rem] text-green-500"/>}
                <input type='text' placeholder={props.placeHolder} className='text-sm w-[70%] bg-transparent outline-none focus:text-iconsColor' value={inputvalue} onChange={event => setInputValue(event.target.value)}/>

            </div>
            {props.filter ? <FunnelIcon className="w-[1.5rem] text-iconsColor" title='Chat filters menu'/> : null}
            
        </div>
    );
}

export default SearchBar;
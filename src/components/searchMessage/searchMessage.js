import './searchMessage.css';
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import { XCircleIcon, ArrowLeftIcon} from '@heroicons/react/24/solid';

import React, { useState } from 'react';
import FoundMessage from '../foundMessage/foundMessage';
import { useSelector } from 'react-redux';

function SearchMessage(props) {
    const [inputvalue, setInputValue] = useState('');
    const [foundMessages, setFoundMessages] = useState([]);
    const myMessages = useSelector(state => state.messages.messagesArray);
    const mainClasses = ['absolute top-0 right-0 z-200 h-[100%] w-[70%] right-0 bg-darkSpecial', props.showSearch ? 'searchMVisible' : 'searchMInvisible'];

    let theMessages;
    if(foundMessages.length) {
        theMessages = foundMessages.map(mess => {
            return <FoundMessage _id={mess._id} message={mess.message} updatedAt={mess.updatedAt} setShowSearch={props.setShowSearch} />
        })
    } else if(!foundMessages.length) {
        theMessages = <p className='text-center text-sm text-iconsColor'>No Messages</p>
    }

    const searchForMessages = (input) => {
        // setLoading(true);
        const theMessages = myMessages.filter(mess => mess.message.includes(input) && mess.isText === true);
        if(!theMessages) {
            setFoundMessages([]);
        } else if(theMessages.length >= (myMessages.length)/2) {
            searchForMessages([]);
        } else {
            setFoundMessages(theMessages);
        }
    }


    return (
        <div className={mainClasses.join(' ')}>
            <div className='w-[100%] px-5 flex justify-between items-center bg-primary'>
                <div className='w-[100%] h-[3.5rem] flex justify-start items-center '>
                    <XCircleIcon className="w-[3rem] text-iconsColor font-bold hover:text-mainTextColor" onClick={() => props.setShowSearch(false)}/>
                    <h2 className='w-[90%] text-slate-200 text-md'>Search Messages</h2>
                </div>
            </div>
            {/* Search Bar */}
            <div className='flex justify-between items-center w-[100%] px-3'>
                <div className='flex justify-start items-center my-2 bg-primary h-[2rem] rounded-lg w-[100%]'>
                    {!inputvalue ? 
                    <MagnifyingGlassIcon className="w-[5.7rem] text-iconsColor px-[5%]"/> :
                    <ArrowLeftIcon className="w-[5.7rem] text-green-500 px-[5%]" onClick={() => {
                        setInputValue('')
                        searchForMessages(null);
                        }}/> }
                    <input type='text' placeholder="Search..." className='text-sm w-[85%] bg-transparent outline-none focus:text-iconsColor' value={inputvalue} onChange={event => {
                        setInputValue(event.target.value);
                        searchForMessages(event.target.value);
                        }}/>
                    <XCircleIcon className='text-iconsColor w-[1.5rem] hover:text-mainTextColor' onClick={() => setInputValue('')}/>
                    {/* <Spinner/> */}
                </div>
            </div>

            {/* Found messages */}
            <div className='theList w-[100%] h-[87vh] overflow-y-scroll'>
                {theMessages}
            </div>
            
        </div>
    );
}

export default SearchMessage;
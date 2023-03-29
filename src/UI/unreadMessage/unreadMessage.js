import React from 'react';

function unreadMessage(props) {
    return (
        <div className='py-[2px] px-[2px] flex justify-center items-center bg-green-600 text-[10px] text-primary rounded-full mr-4'>
            {props.number}
        </div>
    );
}

export default unreadMessage;
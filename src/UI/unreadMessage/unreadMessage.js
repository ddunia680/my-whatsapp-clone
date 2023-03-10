import React from 'react';

function unreadMessage(props) {
    return (
        <div className='py-[3px] px-[5px] flex justify-center items-center bg-green-600 text-sm text-primary rounded-full mr-4'>
            {props.number}
        </div>
    );
}

export default unreadMessage;
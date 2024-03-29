import React from 'react';

function unreadMessage(props) {
    return (
        <div className='py-[2px] px-[5px] flex justify-center items-center bg-green-600 text-[10px] text-primary rounded-full mx-auto'>
            {props.number}
        </div>
    );
}

export default unreadMessage;
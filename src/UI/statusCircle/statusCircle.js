import React from 'react';
import './statusCircle.css';

function statusCircle() {
    return (
    <div className="circle" title='status'>
        <div className="inside"></div>
        <div className="new"></div>
    </div>
    );
}

export default statusCircle;
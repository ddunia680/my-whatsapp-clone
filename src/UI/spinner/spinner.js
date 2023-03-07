import React from 'react';
import classes from './spinner.module.css';

function Spinner() {
    return (
        <div className={classes.ldsRing}><div></div><div></div><div></div><div></div></div>
    );
}

export default Spinner;
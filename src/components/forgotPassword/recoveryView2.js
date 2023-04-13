import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Spinner from '../../UI/spinner/spinner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SETFORGOTVIEW, SETNEWPASSWORD, SHOWSIGNINVIEW } from '../../store/uiStates';

function RecoveryView2(props) {
    const dispatch = useDispatch();
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confPassTouched, setConfPassTouched] = useState(false);

    const [passwordIsValid, setPasswordValidity] = useState(false);
    const [confPassIsValid, setCOnfPassValidity] = useState(false);

    const [formIsValid, setFormValidity] = useState(false);
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passswordError, setPasswordError] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');
    const [mainError, setMainError] = useState('');
    const tempUserId = useSelector(state => state.uiStates.tempUserId);

    const passwordInputClasses = ['bg-gray-900 bg-opacity-[0.5] flex justify-between items-center h-[2.5rem] md:h-[3rem] border-green-700 border-b-[2px]', passwordTouched && !passwordIsValid ? 'notValid' : null];

    const confPassInputClasses = ['bg-gray-900 bg-opacity-[0.5] flex justify-between items-center h-[2.5rem] md:h-[3rem] border-green-700 border-b-[2px]', confPassTouched && !confPassIsValid ? 'notValid' : null];

    useEffect(() => {
        if(
            (passwordTouched && passwordIsValid) &&
            (confPassTouched && confPassIsValid)
        ) {
            setFormValidity(true);
        } else {
            setFormValidity(false);
        }
    }, [ passwordTouched, passwordIsValid, confPassTouched, confPassIsValid]);

    const valideFormHandler = (type, value) => {
        switch(type) {
            case "password":
                setPasswordTouched(true);
                if(/[A-Z]/.test(value) && /^[A-Za-z0-9]*$/.test(value) && value.toString().length >= 5){
                    setPasswordValidity(true);
                } else {
                    setPasswordValidity(false);
                }
                break;
            case "confirmPass":
                setConfPassTouched(true);
                if(/[A-Z]/.test(value) && /^[A-Za-z0-9]*$/.test(value)  && value.toString().length >= 5){
                    setCOnfPassValidity(true);
                } else {
                    setCOnfPassValidity(false);
                }
                break;
            default:
                console.log('end of check');
        }
    }

    const savePassword = () => {
        setLoading(true);
        const data = {
            userId: tempUserId,
            password: password,
            confirmPass: confirmPass
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/updatePassword`, data)
        .then(res => {
            setLoading(false);
            dispatch(SHOWSIGNINVIEW(true));
            dispatch(SETFORGOTVIEW(false));
            dispatch(SETNEWPASSWORD(false));
        })
        .catch(err => {
            setLoading(false);
            const theErr = err.response.data.message;
            if(theErr === 'wrong password') {
                setPasswordError(theErr);
            } else if(theErr === 'wrong confirm password') {
                setConfirmPassError(theErr);
            } else {
                setMainError(theErr);
            }
        })
    }

    return (
        <div className='flex flex-col justify-start items-center py-[1rem] space-y-[1rem] w-[75%] md:w-[95%]'>
            <h1 className='text-xl text-green-700 font-bold font-sans'>SET NEW PASSWORD</h1>
            <p className='h-[1rem] text-sm text-red-600 px-[1rem]'>{mainError}</p>
            {/* password */}
            <div className='w-[80%]'>
                <label className='text-sm text-green-700'>New Password</label>
                <div className={passwordInputClasses.join(' ')}>
                    <input type='password' className='bg-transparent w-[90%] h-[100%] focus:outline-none px-[1rem] focus:text-iconsColor' placeholder='Your password' title='should have an uppercase and no special symbols' value={password} onChange={e => {
                        setPassword(e.target.value);
                        valideFormHandler('password', e.target.value);
                    }}/>

                    { password ? <XMarkIcon className='w-[1rem] text-red-600 mx-[0.3rem]' onClick={() => {
                        setPassword('');
                        valideFormHandler('password', null);
                        }}/> : null}
                </div>
                <p className='h-[1rem] text-xs text-red-600'>{passswordError}</p>
            </div>

            {/* confirm password */}
            <div className='w-[80%]'>
                <label className='text-sm text-green-700'>Confirm password</label>
                <div className={confPassInputClasses.join(' ')}>
                    <input type='password' className='bg-transparent w-[90%] h-[100%] focus:outline-none px-[1rem] focus:text-iconsColor' placeholder='Your password' title='should have an uppercase and no special symbols' value={confirmPass} onChange={e => {
                        setConfirmPass(e.target.value);
                        valideFormHandler('confirmPass', e.target.value);
                    }}/>

                    { confirmPass ? <XMarkIcon className='w-[1rem] text-red-600 mx-[0.3rem]' onClick={() => {
                        setConfirmPass('');
                        valideFormHandler('confirmPass', null);
                        }}/> : null}
                </div>
                <p className='h-[1rem] text-xs text-red-600'>{confirmPassError}</p>
            </div>
            {/* control */}
            <div>
                <button className='border-darkSpecial text-darkSpecial border-[2px] p-2 rounded-lg duration-300 hover:text-green-700 hover:bg-darkSpecial hover:duration-300 disabled:bg-gray-400 disabled:text-gray-500 disabled:border-gray-400 disabled:cursor-not-allowed' disabled={!formIsValid || loading} onClick={savePassword}>{!loading ? 'SAVE' : <Spinner/>}</button>
            </div>
        </div>
    );
}

export default RecoveryView2;
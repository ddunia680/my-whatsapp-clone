import React, { useEffect, useRef, useState } from 'react';
import { UserCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

import './signUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { SHOWSIGNINVIEW } from '../../store/uiStates';

function SignUp(props) {
    const profileInput = useRef();
    const dispatch = useDispatch();
    const signInUI = useSelector(state => state.uiStates.signInUI);

    const [usernameTouched, setUsernameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confPassTouched, setConfPassTouched] = useState(false);

    const [usernameIsValid, setUsernameValidity] = useState(false);
    const [emailIsValid, setEmailValidity] = useState(false);
    const [passwordIsValid, setPasswordValidity] = useState(false);
    const [confPassIsValid, setCOnfPassValidity] = useState(false);

    const [formIsValid, setFormValidity] = useState(false);

    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    // console.log(username.length);

    const usernameInputClasses = ['bg-gray-900 bg-opacity-[0.5] flex justify-between items-center h-[2.5rem] md:h-[3rem] border-green-700 border-b-[2px]', usernameTouched && !usernameIsValid ? 'notValid' : null];

    const emailInputClasses = ['bg-gray-900 bg-opacity-[0.5] flex justify-between items-center h-[2.5rem] md:h-[3rem] border-green-700 border-b-[2px]', emailTouched && !emailIsValid ? 'notValid' : null];

    const passwordInputClasses = ['bg-gray-900 bg-opacity-[0.5] flex justify-between items-center h-[2.5rem] md:h-[3rem] border-green-700 border-b-[2px]', passwordTouched && !passwordIsValid ? 'notValid' : null];

    const confPassInputClasses = ['bg-gray-900 bg-opacity-[0.5] flex justify-between items-center h-[2.5rem] md:h-[3rem] border-green-700 border-b-[2px]', confPassTouched && !confPassIsValid ? 'notValid' : null];

    useEffect(() => {
        if(
            (usernameTouched && usernameIsValid) &&
            (emailTouched && emailIsValid) &&
            (passwordTouched && passwordIsValid) &&
            (confPassTouched && confPassIsValid)
        ) {
            setFormValidity(true);
        } else {
            setFormValidity(false);
        }
    }, [usernameIsValid, usernameTouched, emailTouched, emailIsValid, passwordTouched, passwordIsValid, confPassTouched, confPassIsValid]);

    const valideFormHandler = (type, value) => {
        switch(type) {
            case "username":
                setUsernameTouched(true);
                if(value.length >= 5){
                    setUsernameValidity(true);
                } else {
                    setUsernameValidity(false);
                }
                break;
            
            case "email":
                setEmailTouched(true);
                if(value.includes('@') && value.length >= 5){
                    setEmailValidity(true);
                } else {
                    setEmailValidity(false);
                }
                break;
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

    return (
        <div className='flex flex-col justify-start items-center py-[1rem] space-y-[1rem] w-[75%] md:w-[95%]'>
            <h1 className='text-xl text-green-700 font-semibold font-mono'>SIGN UP</h1>
            {/* profile picture */}
            { !profile ? 
            <UserCircleIcon className=' w-[7rem] md:w-[10rem] text-darkSpecial hover:text-primary duration-300 hover:duration-300' title='Click to upload profile pic' onClick={() => profileInput.current.click()}/> : 
            <div className='w-[7rem] h-[7rem] md:w-[9rem] md:h-[9rem] bg-slate-300 rounded-full overflow-hidden'>
                <img src={URL.createObjectURL(profile)} alt='profile' className='w-[100%] h-[100%]'/>
                <XCircleIcon className='w-[2rem] absolute top-[13rem] left-[15rem] text-red-300' title='reject picture' onClick={() => setProfile(null)} />
            </div>
            }
            
            <input type='file' className='hidden' ref={profileInput} onChange={e => setProfile(e.target.files[0])}/>

            {/* username */}
            <div className='w-[80%]'>
                <label className='text-sm text-green-700'>Username</label>
                <div className={usernameInputClasses.join(' ')}>
                    <input type='text' className='bg-transparent w-[90%] h-[100%] focus:outline-none px-[1rem] focus:text-iconsColor' placeholder='Your username' value={username} onChange={e => {
                        setUsername(e.target.value);
                        valideFormHandler('username', e.target.value);
                    }}/>

                    { username ? <XMarkIcon className='w-[1rem] text-red-600 mx-[0.3rem]' onClick={() => {
                        setUsername('');
                        valideFormHandler('username', '');
                }} title="clear"/>: null}
                </div>
            </div>

            {/* email address */}
            <div className='w-[80%]'>
                <label className='text-sm text-green-700'>Email address</label>
                <div className={emailInputClasses.join(' ')}>
                    <input type='email' className='bg-transparent w-[90%] h-[100%] focus:outline-none px-[1rem] focus:text-iconsColor' placeholder='Your email' value={email} onChange={e => {
                        setEmail(e.target.value);
                        valideFormHandler('email', e.target.value);
                    }}/>

                    { email ? <XMarkIcon className='w-[1rem] text-red-600 mx-[0.3rem]' onClick={() => {
                        setEmail('');
                        valideFormHandler('email', '');
                }}/> : null}
                </div>
            </div>

            {/* password */}
            <div className='w-[80%]'>
                <label className='text-sm text-green-700'>Password</label>
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
            </div>

            <div>
                <button className='border-darkSpecial text-darkSpecial border-[2px] p-2 rounded-lg duration-300 hover:text-green-700 hover:bg-darkSpecial hover:duration-300 disabled:bg-gray-400 disabled:text-gray-500 disabled:border-gray-400 disabled:cursor-not-allowed' disabled={!formIsValid} onClick={() => dispatch(SHOWSIGNINVIEW(!signInUI))}>SIGN UP</button>
            </div>
        </div>
    );
}

export default SignUp;
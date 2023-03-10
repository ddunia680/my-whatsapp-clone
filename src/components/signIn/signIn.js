import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import Spinner from '../../UI/spinner/spinner';
import axios from 'axios';
import { LOGIN, moreSigninInfo } from '../../store/authenticate';

import cat from '../../gifs/cat.json';
import Lottie from 'lottie-react';

function SignIn(props) {
    const dispatch = useDispatch();

    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [emailIsValid, setEmailValidity] = useState(false);
    const [passwordIsValid, setPasswordValidity] = useState(false);

    const [formIsValid, setFormValidity] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passswordError, setPasswordError] = useState('');

    
    const emailInputClasses = ['bg-gray-900 bg-opacity-[0.5] flex justify-between items-center h-[2.5rem] md:h-[3rem] border-green-700 border-b-[2px]', emailTouched && !emailIsValid ? 'notValid' : null];

    const passwordInputClasses = ['bg-gray-900 bg-opacity-[0.5] flex justify-between items-center h-[2.5rem] md:h-[3rem] border-green-700 border-b-[2px]', passwordTouched && !passwordIsValid ? 'notValid' : null];

    useEffect(() => {
        if(
            (emailTouched && emailIsValid) &&
            (passwordTouched && passwordIsValid)
        ) {
            setFormValidity(true);
        } else {
            setFormValidity(false);
        }
    }, [emailTouched, emailIsValid, passwordTouched, passwordIsValid]);

    const valideFormHandler = (type, value) => {
        switch(type) {            
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
            default:
                console.log('end of check');
        }
    }

    const signInHandler = () => {
        setLoading(false);
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);

        axios.post('http://localhost:8080/auth/login', data)
        .then(res => {
            setLoading(false);
            // console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());

            const info = {
                method: 'GET',
                url: `http://localhost:8080/auth/moreLoginInfo/${res.data.userId}`
            }
            dispatch(LOGIN({token: res.data.token, userId: res.data.userId}));
            dispatch(moreSigninInfo(info));
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            const errMessage = err.response.data.message;
            if(errMessage === 'invalid email address') {
                setEmailValidity(false);
                setEmailError(errMessage);
            } else if(errMessage === 'Email address not found') {
                setEmailValidity(false);
                setEmailError(errMessage);
            } else if(errMessage === 'wrong password') {
                setPasswordValidity(false);
                setPasswordError(errMessage);
            }
        })
    }

    return (
        <div className='flex flex-col justify-start items-center py-[1rem] space-y-[1rem] w-[75%] md:w-[95%] self-center'>
            <div className='w-[7rem] h-[7rem]'>
                <Lottie animationData={cat} className="w-[100%] h-[100%]"/>
            </div>
            <h1 className='text-xl text-green-700 font-bold font-sans'>SIGN IN</h1>
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
                <p className='h-[1rem] text-xs text-red-600'>{emailError}</p>
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
                <p className='h-[1rem] text-xs text-red-600'>{passswordError}</p>
            </div>

            <div>
                <button className='border-darkSpecial text-darkSpecial border-[2px] p-2 rounded-lg duration-300 hover:text-green-700 hover:bg-darkSpecial hover:duration-300 disabled:bg-gray-400 disabled:text-gray-500 disabled:border-gray-400 disabled:cursor-not-allowed' disabled={!formIsValid || loading} onClick={signInHandler}>{!loading ? 'SIGNIN' : <Spinner/>}</button>
            </div>
        </div>
    );
}

export default SignIn;
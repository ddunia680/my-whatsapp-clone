import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Spinner from '../../UI/spinner/spinner';
import axios from 'axios';
import { useRef } from 'react';
import trying from '../../gifs/trying.json';
import Lottie from 'lottie-react';
import { useDispatch } from 'react-redux';
import { SETFORGOTVIEW, SETNEWPASSWORD } from '../../store/uiStates';

function RecoveryView1() {
    const [emailTouched, setEmailTouched] = useState(false);
    const [emailIsValid, setEmailValidity] = useState(false);
    const [formIsValid, setFormValidity] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [networkError, setNetworkErr] = useState('');
    const [code, setCode] = useState('');
    const [realCode, setRealCode] = useState('');
    const [foundUser, setFoundUser] = useState('');

    const dispatch = useDispatch();

    const emailInputClasses = ['bg-gray-900 bg-opacity-[0.5] flex justify-between items-center h-[2.5rem] md:h-[3rem] border-green-700 border-b-[2px]', emailTouched && !emailIsValid ? 'notValid' : null];

    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();

    const refs = [ input1, input2, input3, input4 ];

    useEffect(() => {
        if(foundUser) {
            refs[0].current.focus();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foundUser]);

    useEffect(() => {
        if(code.length > 3) {
            confirmCodeHandler();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    useEffect(() => {
        if(
            (emailTouched && emailIsValid)
        ) {
            setFormValidity(true);
        } else {
            setFormValidity(false);
        }
    }, [emailTouched, emailIsValid]);

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
            default:
                console.log('end of check');
        }
    }

     const sendMailHandler = () => {
        setLoading(true);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/forgotPassword`, {email: email})
        .then(res => {
            setLoading(false);
            setRealCode(res.data.code);
            setFoundUser(res.data.userId);
        })
        .catch(err => {
            setLoading(false);
            if(err.response.data.message === 'invalid email address') {
                 setEmailError(err.response.data.message);
            } else {
                setNetworkErr('Oops, something went wrong...');
            }
           
            console.log(err);
        })
     }

     const confirmCodeHandler = () => {
        if(realCode === code) {
            dispatch(SETNEWPASSWORD({userId: foundUser, newPass: true}));
            dispatch(SETFORGOTVIEW(false));
        } else {
            setNetworkErr('Wrong code entered!')
            setCode('');
            refs.map(oneRef => (
                oneRef.current.value = ''
            ))
            refs[0].current.focus();
        }

     }

    return (
        <div className='flex flex-col justify-start items-center space-y-3 py-3'>
            <Lottie animationData={trying} className='w-[10rem]'/>
            <h1 className='text-xl text-green-700 font-bold font-sans'>RECOVERING ACCOUNT</h1>
            <p className='h-[1rem] text-sm text-red-600 px-[1rem]'>{networkError}</p>
            { !foundUser ?
                <div className='w-[90%]'>
                    <label className='text-sm text-green-700'>enter your emal address</label>
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
            :
            <>
                <p className='px-[1rem] text-iconsColor'>An email with an account recovery code was sent to <span className='font-bold text-gray-50'>{email}</span>, Enter code below</p>
                <div className='w-[80%] flex justify-center items-center space-x-2'>
                    <input className='w-[2rem] h-[2rem] rounded-lg text-center text-lg text-black border-2px' ref={refs[0]} onChange={(e) => {
                        setCode(code + e.target.value);
                        refs[1].current.focus();
                    }}/>
                    <input className='w-[2rem] h-[2rem] rounded-lg text-center text-lg text-black border-2px' ref={refs[1]} onChange={(e) => {
                        setCode(code + e.target.value);
                        refs[2].current.focus();

                    }}/>
                    <input className='w-[2rem] h-[2rem] rounded-lg text-center text-lg text-black border-2px' ref={refs[2]} onChange={(e) => {
                        setCode(code + e.target.value);
                        refs[3].current.focus();

                    }}/>
                    <input className='w-[2rem] h-[2rem] rounded-lg text-center text-lg text-black border-2px' ref={refs[3]} onChange={(e) => {
                        setCode(code + e.target.value);
                    }}/>
                </div>
            </>
            }

            <div>
                { !foundUser ? 
                    <button className='border-darkSpecial text-darkSpecial border-[2px] p-2 rounded-lg duration-300 hover:text-green-700 hover:bg-darkSpecial hover:duration-300 disabled:bg-gray-400 disabled:text-gray-500 disabled:border-gray-400 disabled:cursor-not-allowed' disabled={!formIsValid || loading} onClick={sendMailHandler}>{!loading ? 'SEND EMAIL' : <Spinner/>}</button>
                : 
                    null}
            </div>
        </div>
    );
}

export default RecoveryView1;
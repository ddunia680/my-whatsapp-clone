import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function SignIn(props) {
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [emailIsValid, setEmailValidity] = useState(false);
    const [passwordIsValid, setPasswordValidity] = useState(false);

    const [formIsValid, setFormValidity] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
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
        console.log('is running');
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

    return (
        <div className='flex flex-col justify-start items-center py-[1rem] space-y-[1rem] w-[75%] md:w-[95%]'>
            <h1 className='text-xl text-green-700 font-semibold font-mono'>SIGN IN</h1>
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

            <div>
                <button className='border-darkSpecial text-darkSpecial border-[2px] p-2 rounded-lg duration-300 hover:text-green-700 hover:bg-darkSpecial hover:duration-300 disabled:bg-gray-400 disabled:text-gray-500 disabled:border-gray-400 disabled:cursor-not-allowed' disabled={!formIsValid}>SIGNIN</button>
            </div>
        </div>
    );
}

export default SignIn;
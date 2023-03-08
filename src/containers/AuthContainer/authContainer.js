import React from 'react';
import SignUp from '../../components/signUp/signUp';
import SignIn from '../../components/signIn/signIn';
import './authContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import { SHOWSIGNINVIEW } from '../../store/uiStates';

function AuthContainer(props) {
    const dispatch = useDispatch();
    const signInUI = useSelector(state => state.uiStates.signInUI);
    return (
        <div className='relative w-[100%] bg-gradient-to-br from-primary to-green-900 min-w-[20rem] md:w-[30%] h-[100vh] flex flex-col justify-center items-center py-[2rem] overflow-y-scroll'>
            { signInUI ? <SignIn/> :
            <SignUp/>}
            <div className='flex justify-center items-center space-x-3'>
                <p className='text-green-700 hover:text-green-400 text-md md:text-md cursor-pointer' onClick={() => dispatch(SHOWSIGNINVIEW(!signInUI))}>{ signInUI ? 'SignUp ?' : 'Login ?'}</p>
                <p className='text-red-300 hover:text-red-500 text-md md:text-md cursor-pointer'>Forgot password?</p>
            </div>
        </div>        
    );
}

export default AuthContainer;
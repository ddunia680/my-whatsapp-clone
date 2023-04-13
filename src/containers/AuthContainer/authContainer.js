import React from 'react';
import SignUp from '../../components/signUp/signUp';
import SignIn from '../../components/signIn/signIn';
import RecoveryView1 from '../../components/forgotPassword/recoveryView1';
import RecoveryView2 from '../../components/forgotPassword/recoveryView2';
import './authContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import { SHOWSIGNINVIEW, SETFORGOTVIEW, SETNEWPASSWORD } from '../../store/uiStates';

function AuthContainer() {
    const dispatch = useDispatch();
    const signInUI = useSelector(state => state.uiStates.signInUI);
    const forgotPassView = useSelector(state => state.uiStates.forgotPassView);
    const newPasswordView = useSelector(state => state.uiStates.newPasswordView);
    return (
        <div className='relative w-[100%] bg-gradient-to-br from-primary to-green-900 min-w-[20rem] md:w-[30%] h-[100vh] flex flex-col justify-center items-center py-[2rem] overflow-y-scroll'>
            { forgotPassView ? <RecoveryView1/> : newPasswordView ? <RecoveryView2/> :  signInUI ? <SignIn/> :
            <SignUp/>}
            <div className='flex justify-center items-center space-x-3'>
                <p className='text-green-700 hover:text-green-400 text-md md:text-md cursor-pointer' onClick={() => {
                    dispatch(SHOWSIGNINVIEW(!signInUI));
                    dispatch(SETFORGOTVIEW(false));
                    dispatch(SETNEWPASSWORD(false));
                    }}>{ signInUI ? 'SignUp ?' : 'Login ?'}</p>
                { !forgotPassView && !newPasswordView ? 
                    <p className='text-red-300 hover:text-red-500 text-md md:text-md cursor-pointer' onClick={() => dispatch(SETFORGOTVIEW(true))}>Forgot password?</p>
                :null}
                
            </div>
        </div>        
    );
}

export default AuthContainer;
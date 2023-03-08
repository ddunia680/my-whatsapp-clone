import React from 'react';
import frog from '../../gifs/Frogy.json';
import Lottie from 'lottie-react';
import './welcome.css';

function WelcomeRightVIew(props) {
    return (
        <div className='relative w-[100%] md:w-[70%] h-[100vh] flex flex-col justify-between items-center space-y-[7rem] py-[3rem]'>
            <h2 className='text-mainTextColor text-xl font-sans drop-shadow-lg'>My Whatsapp Clone</h2>

            <div className='w-[30%] h-[30%] bg-primary rounded-full welcomeWrapper flex justify-center items-center'>
                <Lottie animationData={frog} className="w-[100%] h-[100%]"/>
            </div>

            <div className='text-mainTextColor slider flex flex-col items-center h-[2rem] space-y-[0.3rem] py-[0.3rem] overflow-hidden font-sans'>
                <div className='line'>Welcome to the App...</div>
                <div className='line'>Chat with friends instantly...</div>
                <div className='line'>Video Call and Audio Call included...</div>
                <div className='line'>We care about your privacy!</div>
            </div>
            
        </div>
    );
}

export default WelcomeRightVIew;
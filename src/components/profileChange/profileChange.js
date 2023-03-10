import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../UI/spinner/spinner';

import { UserCircleIcon, XCircleIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/solid';
import './profileChange.css';
import { SHOWPROFILEEDITVIEW } from '../../store/uiStates';
import { moreUserInfoLocally } from '../../store/authenticate';

function ProfileChange(props) {
    const dispatch = useDispatch();
    const uploadedProfileInput = useRef();
    const token = useSelector(state => state.authenticate.token);
    const profileEditView = useSelector(state => state.uiStates.profileEditView);
    const username = useSelector(state => state.authenticate.username);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const status = useSelector(state => state.authenticate.status)

    const [loading, setLoading] = useState(false);
    const [uploadedProfile, setUploadedProfile] = useState(null);

    const [newUsername, setnewUsername] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const [editingUsername, setEditingUsername] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);

    const [usernameisValid, setUsernameisValid] = useState(false);
    const [statusIsValid, setStatusIsValid] = useState(false);

    const [newDataValid, setNewDataValidity] = useState(false);

    const menuRowClasses = 'absolute bg-mainInput text-gray-200 w-[19rem] top-[3rem] left-[-5%] md:left-[1rem] py-2 flex flex-col justify-center items-center z-10 rounded-2xl'
    const menuClasses = [menuRowClasses, profileEditView? 'openProfile' : 'closeProfile'];

    const inputRowClasses = 'bg-transparent w-[80%] outline-none p-1 text-sm';
    const userNInputClasses = [inputRowClasses, usernameisValid ? 'text-mainTextColor' : 'text-red-600'];
    const statusInputClasses = [inputRowClasses, statusIsValid ? 'text-mainTextColor' : 'text-red-600'];

    useEffect(() => {
        if(usernameisValid || statusIsValid || uploadedProfile) {
            setNewDataValidity(true);
        } else {
            setNewDataValidity(false);
        }
    }, [usernameisValid, statusIsValid, uploadedProfile]);

    const valideFormHandler = (type, value) => {
        switch(type) {            
            case "status":
                if(value.length >= 5){
                    setStatusIsValid(true);
                } else {
                    setStatusIsValid(false);
                }
                break;
            case "username":
                if(value.length >= 5){
                    setUsernameisValid(true);
                } else {
                    setUsernameisValid(false);
                }
                break;
            default:
                console.log('end of check');
        }
    }

    const updateProfileHandler = () => {
        setLoading(true);
        const data = new FormData();
        uploadedProfile ? 
            data.append('image', uploadedProfile) : 
            console.log("Image didn't change");

        newUsername ? 
            data.append('username', newUsername) :
            console.log("username didn't change");

        newStatus ? 
            data.append('status', newStatus) : 
            console.log("status didn't change");
        
        axios.put('http://localhost:8080/list/updateuser', data, {
            headers: {
                Authorization: 'bearer '+ token
            }
        })
        .then(res => {
            dispatch(moreUserInfoLocally({
                profileUrl: res.data.profileUrl,
                username: res.data.username,
                status: res.data.status
            }));
            setLoading(false);
            dispatch(SHOWPROFILEEDITVIEW(false));
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        })
    }

    return (
        <div className={menuClasses.join(' ')}>
            <XCircleIcon className='w-[2rem] absolute top-[0.4rem] left-[16.5rem] text-darkSpecial cursor-pointer duration-300 hover:duration-300 hover:text-mainTextColor' title='cancel' onClick={() => dispatch(SHOWPROFILEEDITVIEW(false))} />

            {/* profilePic */}
            { !profileUrl && !uploadedProfile ? 
                <UserCircleIcon className=' w-[7rem] md:w-[10rem] text-darkSpecial hover:text-primary duration-300 hover:duration-300 cursor-pointer' title='Click to upload profile pic' onClick={() => uploadedProfileInput.current.click()} disabled={loading}/> : 
                <div className='w-[7rem] h-[7rem] md:w-[9rem] md:h-[9rem] bg-slate-300 rounded-full overflow-hidden' title='Click to upload profile pic'>
                <img src={ uploadedProfile ? URL.createObjectURL(uploadedProfile) : profileUrl} alt='profile' className='w-[100%] h-[100%]' onClick={() => uploadedProfileInput.current.click()} disabled={loading}/>
            </div>
            }
            <p className='text-sm'>Click on the profile pic to choose a new one</p>

            {/* username */}
            <p className='text-xs text-darkSpecial font-bold'>username</p>
            <div className='bg-darkSpecial font-mono w-[70%] flex justify-between items-center rounded-xl px-1 mb-[0.5rem]'>
                { !editingUsername ? 
                    <p className='text-sm p-1'>{ newUsername ? newUsername : username}</p> : 
                    <input type='text' placeholder='Enter text' className={userNInputClasses.join(' ')} onChange={e => {
                        valideFormHandler('username', e.target.value);
                        setnewUsername(e.target.value);
                        }}/>}
                { loading ? null : !editingUsername ? 
                    <PencilIcon className='w-[1.5rem] p-[0.3rem] text-red-600 hover:bg-mainInput rounded-full cursor-pointer' title='edit username' onClick={() => setEditingUsername(true)}/> : 
                     usernameisValid ? <CheckIcon className='w-[1.5rem] p-[0.3rem] text-greenSpecial hover:bg-mainInput rounded-full cursor-pointer' title='Save' onClick={() => {
                        if(usernameisValid) {
                            setEditingUsername(false);
                        }
                    }}/>
                : null}
            </div>

            {/* status */}
            <p className='text-xs text-darkSpecial font-bold'>status</p>
            <div className='bg-darkSpecial font-mono w-[70%] flex justify-between items-center rounded-xl px-1 text-sm mb-[0.5rem]'>
                { !editingStatus ? 
                    <p className=' p-1'>{ newStatus ? newStatus : status}</p> : 
                    <input type='text' placeholder='Enter text' className={statusInputClasses.join(' ')} onChange={e => {
                        valideFormHandler('status', e.target.value);
                        setNewStatus(e.target.value);
                        }}/>}
                { loading ? null : !editingStatus ? 
                    <PencilIcon className='w-[1.5rem] p-[0.3rem] text-red-600 hover:bg-mainInput rounded-full cursor-pointer' title='edit username' onClick={() => setEditingStatus(true)}/> : 
                     statusIsValid ? <CheckIcon className='w-[1.5rem] p-[0.3rem] text-greenSpecial hover:bg-mainInput rounded-full cursor-pointer' title='Save' onClick={() => {
                        if(statusIsValid) {
                            setEditingStatus(false);
                        }
                    }}/>
                : null}
            </div>
            <div className='w-[90%] flex justify-around items-center'>
                <button className='bg-primary px-[1rem] py-[0.3rem] rounded-xl text-md my-2 duration-300 hover:duration-300 hover:bg-darkSpecial' onClick={() => dispatch(SHOWPROFILEEDITVIEW(false))}>Cancel</button>

                <button className='bg-myMessage px-[1rem] py-[0.3rem] rounded-xl text-md my-2 duration-300 hover:duration-300 hover:bg-greenSpecial disabled:bg-gray-500 disabled:text-gray-600 disabled:cursor-not-allowed'disabled={!newDataValid} onClick={updateProfileHandler}>{loading ? <Spinner/> : 'Update'}</button>
            </div>
            
            <input type='file' className='hidden' ref={uploadedProfileInput} onChange={e => setUploadedProfile(e.target.files[0])}/>
        </div>
    );
}

export default ProfileChange;
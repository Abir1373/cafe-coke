import React from 'react';
import useProfile from '../../shared/utils/useProfile';
import Navbar from '../../shared/Navbar';

const Profile = () => {
    const [profile] = useProfile()
    if (!profile || profile.length === 0) return <span className="loading loading-spinner text-secondary"></span>
    // console.log(profile[0])
    return (
        <div>
            <span className='text-4xl font-bold uppercase flex items-center justify-center m-9 text-rose-400'>user info</span>
            <div className='flex items-center justify-center m-9'><Navbar></Navbar></div>
            <div className='flex flex-row'>
                <div className='w-1/2'>
                    <img src={profile[0].photoURL} alt="image" />
                </div>
                <div className='w-1/2 ml-5'>
                    <div className='flex flex-col justify-center'>
                        {/* name */}
                        <div className='flex flex-row'>
                            <span className='text-2xl font-bold p-4 uppercase text-blue-400'>Name : </span>
                            <span className='text-2xl font-bold p-4 uppercase'> {profile[0].name} </span>
                        </div>
                        {/* email */}
                        <div className='flex flex-row'>
                            <span className='text-2xl font-bold p-4 uppercase text-blue-400'>Email : </span>
                            <span className='text-2xl font-bold p-4 '> {profile[0].email} </span>
                        </div>
                        {/* user role */}
                        <div className='flex flex-row'>
                            <span className='text-2xl font-bold p-4 uppercase text-blue-400'>User Role : </span>
                            <span className='text-2xl font-bold p-4 uppercase'> {profile[0].user_role} </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
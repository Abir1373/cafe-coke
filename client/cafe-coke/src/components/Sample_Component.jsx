import React from 'react';

import Navbar from '../shared/Navbar';

const Sample_Component = () => {

    const styleDiv = {
        backgroundImage: 'url("https://i.ibb.co/Pm4p8kP/23987058-6855706.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
    return (
        <div className='flex flex-col items-center justify-center w-full h-screen space-y-5' >

            <span className='text-4xl font-bold text-orange-400' style={{fontStyle:'italic'}}>Welcome to Cafe-Coke!! Enjoy Our Service!!!</span>

            <div className='text-green-600'><Navbar></Navbar></div>

            <div className='flex  justify-start w-full h-4/5 ' style={styleDiv}>
                
            </div>
        </div>
    );
};

export default Sample_Component;

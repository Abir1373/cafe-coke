import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth-provider/AuthProvider';
import axios from 'axios';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    let check = 0;
    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate()
    if (!user) <span className="loading loading-spinner text-secondary"></span>
    if (!check && user) {
        // console.log('yupp')
        axios.get(`http://localhost:5000/users?email=${user.email}`)
            .then(data => setUserRole(data.data[0].user_role))
    }
    const handleLogOut = () => {
        logOut()
        navigate('/login')
    }
    return (
        <div className='flex md:flex-col  sm:flex-col  md:m-4  lg:flex-row space-x-20 font-bold mt-9 ml-9'>
            <Link to='/'><div className='uppercase text-2xl'>coffee house</div></Link>

            {
                userRole === 'user' && <Link to='/menu'><div className='uppercase text-2xl'>menu</div></Link>
            }

            {
                userRole === 'user' && <Link to='/cart'><div className='uppercase text-2xl'>Cart</div></Link>
            }

            {
                user ? <div onClick={handleLogOut} className='uppercase text-2xl'>Log Out</div> : <Link to='/login'><div className='uppercase text-2xl'>Log in</div></Link>
            }

            {
                user && <Link to='/profile'><div className='uppercase text-2xl'>Profile</div></Link>
            }

        </div>
    );
};

export default Navbar;
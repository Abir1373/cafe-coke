import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../auth-provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../../shared/Navbar';
const Registration = () => {

    const { createUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const imgStyle = {
        objectFit: 'content',
        width: '600px',
        height: '760px'
    }
    const handleRegistration = (event) => {
        event.preventDefault()
        Swal.fire({
            title: "Registration Completed !!!",
            text: "Welcome To Cafe-Coke......",
            imageUrl: "https://i.ibb.co/7gPVBNN/Registration-Success.jpg",
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: "Custom image"
        });
        const form = event.target
        const name = form.name.value
        const photoURL = form.photoURL.value
        const email = form.email.value
        const password = form.password.value
        const UserRole = 'user'
        // console.log(name,photoURL,email,password)
        const UserInfo = {
            'name': name,
            'photoURL': photoURL,
            'email': email,
            'password': password,
            'user_role': UserRole
        }
        // console.log(UserInfo)
        createUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(res.user);
                axios.post(`http://localhost:5000/users`, UserInfo)
                    .then((res) => {
                        console.log(res)
                    })
            })
            navigate('/menu')
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <span className='text-2xl font-bold text-orange-500 mt-5'>SIGN UP!</span>
            <div className='m-5 text-rose-500'><Navbar></Navbar></div>
            <div className='flex sm:flex-col md:flex-col lg:flex-row h-18'>
                <div className='lg:w-1/2'>
                    <img src="https://i.ibb.co/Bsj7FzQ/9319844-4141223.jpg" alt="img" />
                </div>
                <div className='lg:w-1/2'>
                    <form className='p-5' onSubmit={handleRegistration}>
                        <label className='text-3xl'>Name</label>
                        <br />
                        <input name='name' type="text" placeholder="Name" className="text-2xl input input-bordered input w-4/5 mb-5 mt-5 h-16" required />
                        <br />
                        <label className='text-3xl'>Photo URL</label>
                        <br />
                        <input name='photoURL' type="text" placeholder="Photo URL" className="text-2xl input input-bordered input w-4/5 mb-5 mt-5 h-16" required />
                        <br />
                        <label className='text-3xl'>Email</label>
                        <br />
                        <input name='email' type="email" placeholder="Email" className="text-2xl input input-bordered input w-4/5 mb-5 mt-5 h-16" required />
                        <br />
                        <label className='text-3xl'>Password</label>
                        <br />
                        <input name='password' type="password" placeholder="Password" className="text-2xl input input-bordered input w-4/5 mb-5 mt-5 h-16" required />
                        <br />
                        <span>Already have an account ? <Link to='/login' className='text-orange-700'>Log In</Link> </span>
                        <input type="submit" value="Submit" className='text-2xl text-white btn btn-error w-2/5 flex mx-auto mt-5 px-2 py-2' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;



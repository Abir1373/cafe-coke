import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../auth-provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../shared/Navbar';

const Login = () => {

    const { signIn } = useContext(AuthContext)

    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const navigate = useNavigate();

    const imgStyle = {
        objectFit: 'content',
        width: '600px',
        height: '760px'
    }
    const handleLogin = (event) => {
        event.preventDefault()
        Swal.fire({
            title: "Registration Completed !!!",
            text: "Welcome To Cafe-Coke......",
            imageUrl: "https://i.ibb.co/k1x9tNX/Login-Success.jpg",
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: "Custom image"
        });
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const cpassword = form.cpassword.value
        console.log(email, password, cpassword)

        signIn(email, password)
            .then(res => {
                console.log(res);
                const user = res.user;
                navigate(from, { replace: true })
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <span className='text-2xl font-bold text-orange-500 mt-5'>LOG IN!</span>
            <div className='m-5 text-rose-500'><Navbar></Navbar></div>
            <div className='flex sm:flex-col md:flex-col lg:flex-row h-16'>
                <div className='lg:w-1/2'>
                    <img src="https://i.ibb.co/dQKgwGT/20602853-6300959.jpg" alt="img" />
                </div>
                <div className='lg:w-1/2'>
                    <form className='p-5' onSubmit={handleLogin}>
                        <label className='text-3xl'>Email</label>
                        <br />
                        <input name='email' type="email" placeholder="Email" className="text-2xl input input-bordered input w-4/5 mb-6 mt-5 h-16" required />
                        <br />
                        <label className='text-3xl'>Password</label>
                        <br />
                        <input name='password' type="password" placeholder="Password" className="text-2xl input input-bordered input w-4/5 mb-6 mt-5 h-16" required />
                        <br />
                        <label className='text-3xl'>Confirm Password</label>
                        <br />
                        <input name='cpassword' type="password" placeholder="Password" className="text-2xl input input-bordered input w-4/5 mb-6 mt-5 h-16" required />
                        <br />
                        <span>Don't have an account ? <Link to='/registration' className='text-orange-700'>Create Account</Link> </span>
                        <input type="submit" value="Log In" className='text-2xl text-white btn btn-error w-1/5 flex mx-auto mt-5' />
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;
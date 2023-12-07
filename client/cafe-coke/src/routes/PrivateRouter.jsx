import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth-provider/AuthProvider';


const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext) ; 
    const location = useLocation();
    if(loading)
    {
        return <span className="loading loading-spinner text-secondary"></span> ; 
    }
    if(user?.email)
    {
        return children ; 
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRouter;
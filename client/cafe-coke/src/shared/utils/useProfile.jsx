import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../../auth-provider/AuthProvider'

const useProfile = () => {
    const { user } = useContext(AuthContext)
    const { refetch , data: userdata = [] } = useQuery({
        queryKey: ['userdatas', user?.email],
        queryFn: async () => {
            
            const res = await fetch(`http://localhost:5000/users?email=${user.email}`)
            return res.json()
        },
    })
    if(userdata)return [userdata,refetch]

}

export default useProfile;
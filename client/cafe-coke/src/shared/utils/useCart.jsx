import { useContext } from 'react';
import { AuthContext } from '../../auth-provider/AuthProvider';
import { useQuery } from '@tanstack/react-query'

const useCart = () => {
    const { user } = useContext(AuthContext)
    const token = localStorage.getItem('access-token')
    const { refetch , data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {        
            const res = await fetch(`http://localhost:5000/carts?email=${user.email}`,{
                headers : {Authorization : `Bearer ${token}`}
            })
            return res.json()
        },
    })
    if(cart)return [cart,refetch]

}

export default useCart;
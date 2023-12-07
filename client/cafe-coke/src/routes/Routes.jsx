import { createBrowserRouter } from 'react-router-dom'
import CoffeeHouse from '../pages/coffee-house/CoffeeHouse';
import Menu from '../pages/menu/Menu';
import Cart from '../pages/cart/Cart';
import Login from '../pages/login/Login';
import Registration from '../pages/registration/Registration';
import PrivateRouter from './PrivateRouter';
import Profile from '../pages/profile/Profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <CoffeeHouse></CoffeeHouse>
    },
    {
        path: '/menu',
        element: <Menu></Menu>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/registration',
        element: <Registration></Registration>
    },
    {
        path: '/profile',
        element: <Profile></Profile>
    },
    {
        path: '/cart',
        element: <PrivateRouter> <Cart> </Cart> </PrivateRouter>
    }

])

export default router;
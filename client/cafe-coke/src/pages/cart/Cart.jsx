import React from 'react';
import Navbar from '../../shared/Navbar';
import useCart from '../../shared/utils/useCart';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';


const Cart = () => {
    let cartItem = []
    let [cart,refetch] = useCart();
    let totalPrice = 0;
    if (!cart) return <span className="loading loading-spinner text-success"></span>
    const handleDeleteItem = (name) => {
        axios.delete(`http://localhost:5000/carts?email=abirm3177@gmail.com&itemName=${name}`)
            .then(response => {
                console.log(response.data)
                refetch()
            }).catch(error => {
                console.error(error)
            });
    }
    if (cart.length === 0) return (
        <div className='flex flex-col'>
            <span className='flex items-center justify-center text-4xl font-bold uppercase m-9 text-rose-400'>
                cart!!!
            </span>
            <div className='items-center justify-center flex mb-9'>
                <Navbar></Navbar>
            </div>

            <span className='flex items-center justify-center text-2xl font-bold uppercase m-9 text-yellow-400'>
                Your cart is empty !! try to add items ??
            </span>
        </div>
    )

    for (let i = 0; i < cart.length; i++) {
        let check = 0
        totalPrice += cart[i].price
        for (let j = 0; j < cartItem.length; j++) {
            if (cart[i].name === cartItem[j].name) {
                cartItem[j].quantity++;
                check = 1
            }
        }
        if (check === 0) {
            let cartItemObject = cart[i]
            cartItemObject['quantity'] = 1
            cartItem.push(cartItemObject)
        }
    }
    if (cartItem.length === 0) return <span className="loading loading-spinner text-success"></span>
    return (
        <div className="overflow-x-auto mt-5">

            <span className='flex items-center justify-center text-4xl font-bold uppercase m-9 text-rose-400'>
                cart!!!
            </span>

            <div className='items-center justify-center flex mb-9'>
                <Navbar></Navbar>
            </div>

            <div className='items-center justify-center flex text-2xl font-bold '> <span className='text-yellow-400 pr-2'>Total Price</span> : <span className='text-yellow-400 ml-2'>$</span> <span className='text-orange-500 pl-2'>  {totalPrice} </span> </div>

            <table className="table text-center items-center mt-5">
                {/* head */}
                <thead>
                    <tr>
                        <th className='uppercase text-2xl'>item name</th>
                        <th className='uppercase text-2xl'>description</th>
                        <th className='uppercase text-2xl'>price</th>
                        <th className='uppercase text-2xl'>quantity</th>
                        <th className='uppercase text-2xl'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        cartItem.map((item, index) => (
                            <tr key={index}>
                                <td >
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-2xl">{item.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className='uppercase text-2xl font-bold'> {item.description} </td>
                                <td className='uppercase text-2xl font-bold text-orange-400'>$ {item.price}</td>
                                <td className='uppercase text-2xl font-bold'>{item.quantity}</td>
                                <td className='uppercase text-2xl font-bold'> <span className='text-2xl text-rose-500 justify-center flex' onClick={() => handleDeleteItem(item.name)}> <FaTrashAlt /> </span> </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

            <div className='flex items-center justify-center m-9'>
                <button className="btn btn-outline btn-accent text-2xl pt-2 pb-2 pl-9 pr-9F"> Pay Bill </button>
            </div>

        </div>
    )
};

export default Cart;
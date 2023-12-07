import axios from 'axios';
import React, { useContext } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../auth-provider/AuthProvider';
const CategoryCard = ({ data }) => {
  const { user } = useContext(AuthContext)
  if (!user) <span className="loading loading-spinner loading-lg"></span>
  const { description, name, _id, price, img } = data;
  const imgStyle = {
    width: '600px',
    height: '500px',
    size: 'cover'
  }
  const handleAddToCart = () => {
    if (user) {
      Swal.fire({
        title: "Want to add the item?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add item!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Added",
            text: "Your file has been added.",
            icon: "success"
          });
          //TODO: POST CART ITEM TO DATABASE
          const dataObject = {
            name: name,
            description: description,
            price: price,
            img: img,
            email: user.email
          }
          axios.post(`http://localhost:5000/carts?email=${user.email}`, dataObject)
          console.log(dataObject)
        }
      });
    }
    else {
      let timerInterval;
      Swal.fire({
        title: "PLEASE TRY TO LOGIN!",
        html: "AUTO CLOSE IN <b></b> SECONDS.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    }

  }
  return <div className="card w-96 bg-base-100 shadow-xl font-bold">
    <figure><img src={img} alt={name} style={imgStyle} /></figure>
    <div className="card-body">
      <div className='flex flex-row justify-between'>
        <h2 className="card-title  text-2xl text-orange-600">{name}!</h2>
        <h2 className='text-2xl'> Price: <span className='text-orange-600'>${price}</span> </h2>
      </div>
      <p> {description} </p>
      <div className="card-actions justify-end">
        <button onClick={handleAddToCart} className="btn btn-warning text-xl font-bold">Add To Cart</button>
      </div>
    </div>
  </div>
};

export default CategoryCard;

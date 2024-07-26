import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import CartItem from '../CartItem/CartItem'

const Cart = () => {

    const [cartData, setCartData] = useState([]);

    const API_CART_URL = 'http://localhost:5000/api/cart/view'

    const getToken = () => {
        return Cookies.get('jwtToken');
    };

    const fetchCartItems = async () => {
        try {
            const token = getToken();
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(
                API_CART_URL,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.data) {
                setCartData(response.data.data);
            } else {
                toast.error(response.data.message || 'Failed to fetch cart items');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error('Error fetching cart items:', error);
        }
    };

    const rerender =()=>{
        fetchCartItems();
    }



    useEffect(() => {
        fetchCartItems();

    }, [])

    console.log(cartData)

    return (
        <div>
            <div>
                <Header />
                <hr className='mt-0' />
            </div>
            <div className="cart-list d-flex flex-wrap justify-content-center gap-5">
               
                {cartData.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cartData.map(item => (
                        <CartItem
                            key={item._id}
                            item={item}
                            rerender ={rerender}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
export default Cart
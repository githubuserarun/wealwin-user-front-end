import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import CartItem from "../CartItem/CartItem";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = ({cartLen,callbackCart }) => {
  const [cartData, setCartData] = useState([]);

  const API_CART_URL = "http://localhost:5000/api/cart/view";

  const navigate = useNavigate();

  const getToken = () => {
    return Cookies.get("jwtToken");
  };

  const fetchCartItems = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        API_CART_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.data) {
        setCartData(response.data.data.reverse());
      } else {
        toast.error(response.data.message || "Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Error fetching cart items:", error);
    }
  };

  const rerender = () => {
    fetchCartItems();
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <div>
        <Header cartLength={cartLen}/>
        <hr className="mt-0" />
      </div>
      <div className="cart-list d-flex flex-wrap justify-content-center gap-5">
        {cartData.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png?f=webp"
              alt="empty cart"
            />
            <h1>Your cart is empty</h1>
            <Button onClick={()=>navigate('/')}>continue to Shopping</Button>
          </div>
        ) : (
          cartData.map((item) => (
            <CartItem
              className="d-flex"
              key={item._id}
              item={item}
              rerender={rerender}
              callbackCart={callbackCart} 
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Cart;

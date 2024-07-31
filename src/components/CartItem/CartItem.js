import React from "react";
import "./CartItem.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item, rerender, callbackCart }) => {
  const API_DEL_CART_URL = `http://localhost:5000/api/cart/del/${item._id}`;
  const API_UPD_CART_URL = "http://localhost:5000/api/cart/update";
  const API_SOLD_URL = `http://localhost:5000/api/cart/buy/${item._id}`;

  const navigate = useNavigate();
  const getToken = () => {
    return Cookies.get("jwtToken");
  };

  const handleremove = () => {
    if (window.confirm("Are you sure you want to remove?")) {
      deleteCartItem();
    }
  };

  const deleteCartItem = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.delete(API_DEL_CART_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        toast.success(response.data.message);

        rerender();
        callbackCart();
      } else {
        toast.error(response.data.message || "Failed to delete item from cart");
      }
    } catch (error) {
      toast.error("Error deleting item from cart:", error);
    }
  };

  const updateCart = async (id, operation) => {
    try {
      const response = await axios.put(API_UPD_CART_URL, {
        id,
        operation,
      });

      if (response.data.status) {
        toast.success(response.data.message);
        rerender();
      } else {
        toast.error(response.data.message);
        console.error("Failed to update cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const placeOrder = () => {
    if (window.confirm("Are you sure you want to buy the item?")) {
      buyFun();
    }
  };

  const buyFun = async () => {
    try {
      const response = await axios.put(API_SOLD_URL);
      if (response.data.status) {
        toast.success(response.data.message);
        console.log(response)
        rerender();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Price: ₹{item.price}</p>
        <p>Total: ₹{item.total}</p>
        <div className="quantity-control">
          <button
            onClick={() => updateCart(item._id, "dec")}
            disabled={item.cartQuantity < 2}
          >
            -
          </button>
          <span>{item.cartQuantity}</span>
          <button onClick={() => updateCart(item._id, "inc")}>+</button>
        </div>
        <div className="cart-item-actions">
          <button className="remove-btn" onClick={handleremove}>
            Remove
          </button>
          <button className="buy-btn" onClick={placeOrder}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

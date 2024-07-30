import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product ,callbackCart}) => {
  const navigate = useNavigate();

  const API_ADD_CART_URL = "http://localhost:5000/api/cart/add";

  const getToken = () => {
    return Cookies.get("jwtToken");
  };

  const addToCart = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(API_ADD_CART_URL, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        toast.success(response.data.message);
        callbackCart();
        navigate("/cart");
      } else {
        toast.error(response.data.message || "Failed to add item to cart");
      }
    } catch (error) {
      toast.error("Error adding item to cart:", error);
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={`http://localhost:5000/${product.image}`}
          alt={product.productName}
          className="product-image "
        />
      </div>

      <h3 className="product-name">{product.productName}</h3>
      <p className="product-description">
        {truncateDescription(product.description, 40)}
      </p>
      <p className="product-price">₹{product.price.toLocaleString()}</p>
      <button className="add-to-cart-btn" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

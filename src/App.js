import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/Login';
import HomePage from './components/Home/Home';
import SignupPage from './components/SignUp/Signup';
import Cart from './components/Cart/Cart';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
  const [cartLength,setCartLength] = useState('')

  const token = Cookies.get("jwtToken");


  const fetchCartLength = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/cart-len",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status) {
        setCartLength(response.data.data);
        console.log(response.data.data)
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(()=>{
    fetchCartLength();
  },[])


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}  />
          <Route path="/signup" element={<SignupPage />}  />
          <Route path="/" element={<ProtectedRoute element={<HomePage cartLen={cartLength} callbackCart={fetchCartLength}/>} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart cartLen={cartLength} callbackCart={fetchCartLength} />} />} />
        </Routes>
      </Router>
      <ToastContainer />

    </div>
  );
}

export default App;

import React from 'react';
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
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}  />
          <Route path="/signup" element={<SignupPage />}  />
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          
        </Routes>
      </Router>
      <ToastContainer />

    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
// import './Login.css';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPassShow, setIsPassShow] = useState(false);

    const navigate = useNavigate();
    const token = Cookies.get('jwtToken');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.msg);
                return;
            }

            const data = await response.json();
            console.log('Login successful, JWT token:', data.token);
            toast.success("Login successful")
            navigate('/')

            const jwtToken = data.token;
            if (data.admin) {
                Cookies.set('jwtToken', jwtToken, { expires: 3 });
            }
            else {
                Cookies.set('jwtToken', jwtToken, { expires: 3 });
            }


            setUsername('');
            setPassword('');


        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    const navToSignup = () => {
        navigate('/signup')
    }
    const togglePassword = () => {
        setIsPassShow(!isPassShow);
    }

    useEffect(() => {
        if(token!==undefined){
            navigate('/')
        }
    }, [navigate]);

    return (
        <div className='container mt-5'>
  <div className='row justify-content-center'>
    <div className='col-md-6'>
      <div className='card'>
        <div className='card-body'>
          <h2 className='card-title text-center mb-4'>Login</h2>
          <form onSubmit={handleLogin}>
            <div className='mb-3'>
              <input
                type="text"
                className='form-control'
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className='mb-3 position-relative'>
              <input
                type={isPassShow ? 'text' : 'password'}
                className='form-control'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type='button' 
                className='btn btn-link position-absolute end-0 top-50 translate-middle-y' 
                onClick={togglePassword}
              >
                {isPassShow ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <div className='mb-3 text-end'>
              <Link className='text-decoration-none' to='/request'>Forgot password?</Link>
            </div>

            <div className='d-grid gap-2'>
              <button type="submit" className='btn btn-primary'>Login</button>
              <button 
                type="button" 
                className='btn btn-warning'
                onClick={navToSignup}
              >
                Are you a new user?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default LoginPage;

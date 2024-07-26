import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            Cookies.remove('jwtToken');
            navigate('/login');
        }
    };
    return (
        <header className="header">
            <div className="left-section">
                <span className="company-name">shoppingZone</span>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/cart">Cart</a></li>
                    </ul>
                </nav>
            </div>
            <div className="right-section">
                <a href="/profile" className="profile-link">Profile</a>
                <button className="logout-button btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Header;
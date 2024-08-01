import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { validateUsername, validateEmail } from "../validators";
import "./Header.css";
import axios from "axios";

const Header = ({ cartLength }) => {
  const token = Cookies.get("jwtToken");
  const [show, setShow] = useState(false);
  const [modelName, setModelName] = useState("");
  const [modelEmail, setModelEmail] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookies.remove("jwtToken");
      navigate("/login");
    }
  };

  const updateUser = async () => {
    const checkUserName = validateUsername(modelName);
    const checkUserEmail = validateEmail(modelEmail);
    try {
      if (checkUserEmail === null && checkUserName === null) {
        const response = await axios.put(
          "http://localhost:5000/api/auth/update",
          {
            userName: modelName,
            userEmail: modelEmail,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          toast.success(response.data.message);
          setShow(false);
        } else {
          toast.error(response.data.error);
        }
      } else {
        console.log("given data is not valid");
      }
    } catch (err) {
      toast.error(err);
    }

    console.log(modelName);
  };

  const onclickProfile = async () => {
    setShow(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setModelName(response.data.userName);
        setModelEmail(response.data.email);
        console.log(response.data);
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <header className="header">
      <div className="left-section">
        <img
          src="https://shopzones.in/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-19-at-2.10.56-PM.jpeg"
          className="w-25"
          alt="shopping zone"
          onClick={() => navigate("/")}
        />
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cart" className="cart-link">
                Cart
                {cartLength > 0 && (
                  <span className="cart-count">{cartLength}</span>
                )}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="right-section">
        <button className="profile-link" onClick={onclickProfile}>
          Profile
        </button>
        <button
          className="logout-button btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="model-div">
            <label>user name</label>
            <input
              className="ml-3"
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>
          <div className="model-div">
            <label>user email</label>
            <input
              className="ml-3"
              type="text"
              value={modelEmail}
              onChange={(e) => setModelEmail(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;

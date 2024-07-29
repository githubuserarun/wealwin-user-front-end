import React, { useState } from "react";
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "../validators";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [isPassShow, setIsPassShow] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      retypePassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const mismatchCheck = formData.password === formData.retypePassword;

    if (formData.password !== formData.retypePassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      if (
        usernameError === null &&
        emailError === null &&
        passwordError === null &&
        mismatchCheck
      ) {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.status) {
          toast.success(response.data.msg);
          resetForm();
          navigate("/");
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const togglePassword = () => {
    setIsPassShow(!isPassShow);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border-1">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 d-flex flex-row align-items-end">
                  <div className="flex-grow-1">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type={isPassShow ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="button"
                    className="icon h-25 border-0"
                    onClick={togglePassword}
                  >
                    {isPassShow ? (
                      <FaRegEyeSlash size={20} />
                    ) : (
                      <FaRegEye size={20} />
                    )}
                  </button>
                </div>
                <div className="mb-3  d-flex flex-row align-items-end ">
                  <div className="flex-grow-1">
                    <label htmlFor="retypePassword" className="form-label">
                      confirm Password:
                    </label>
                    <input
                      type={isPassShow ? "text" : "password"}
                      className="form-control"
                      id="retypePassword"
                      name="retypePassword"
                      value={formData.retypePassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="button"
                    className="icon h-25 border-0"
                    onClick={togglePassword}
                  >
                    {isPassShow ? (
                      <FaRegEyeSlash size={20} />
                    ) : (
                      <FaRegEye size={20} />
                    )}
                  </button>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      navigate('/login')
                    }}
                  >
                    Login
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

export default SignupPage;

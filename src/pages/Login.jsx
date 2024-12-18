import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSuccess, signupSuccess } from "../features/auth/authSlice";
import { authService } from "../services/authService";

const Login = () => {
  // toggle between Login and Signup modes
  const [currentState, setCurrentState] = useState("Sign Up");
  
  // form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // validation error messages state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // name validation (only for signup)
    if (currentState === "Sign Up" && !formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // email validation with regex
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // return if validation fails
    if (!validateForm()) {
      return;
    }

    try {
      if (currentState === "Login") {
        // handle login
        const { user } = await authService.login({
          email: formData.email,
          password: formData.password,
        });

        // update Redux state with user data
        dispatch(loginSuccess(user));
        toast.success("Login successful!");
        navigate("/"); // Go to home page
      } else {
        // handle signup
        const { user } = await authService.signup(formData);

        // Update Redux state with new user data
        dispatch(signupSuccess(user));
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      // show error message if login/signup fails
      toast.error(error.message);
    }
  };

  // switch between login and signup modes
  const switchMode = () => {
    setCurrentState(currentState === "Login" ? "Sign Up" : "Login");
    // reset form data and errors
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setErrors({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="text-center mb-8">
            <h2 className="prata-regular text-3xl text-gray-900">
              {currentState === "Login" ? "Sign In" : "Create Account"}
            </h2>
          </div>

          {/* name field, only for Sign Up */}
          {currentState === "Sign Up" && (
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 
                  ${errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                placeholder="Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 
                ${errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 
                ${errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transition-colors duration-200"
            >
              {currentState === "Login" ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {/* toggle between Login and Sign Up */}
          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              className="text-blue-600 hover:text-blue-800 text-sm focus:outline-none"
            >
              {currentState === "Login"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
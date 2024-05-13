import React, { useState } from 'react';
import Header from './Header';
import { base_url } from '../baseurl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    let errors = {};
  
    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email.";
    }
  
    if (typeof email !== "undefined") {
      var pattern = new RegExp(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/);
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
  
    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    } else if (password.length < 8) {
      isValid = false;
      errors["password"] = "Password must be at least 8 characters long.";
      delete errors['other'];

    }
  
    if (password !== confirmPassword) {
      isValid = false;
      errors["password"] = "Passwords don't match.";
      errors["other"] = "";
      delete errors['other'];

    }
  
    setErrors(errors);
    return isValid;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      // Handle your signup logic here
      console.log('Form is not ready:', { email, password });
      return;
    }
    try {
      const response = await axios.post(base_url + 'signup', {
        user: {
          email: email,
          password: password,
        }
      });
      if(response.status === 201){
        navigate('/');
      }
    } catch (error) {
        if(error.code === "ERR_BAD_REQUEST"){
            errors["other"] = "Email is already in use";
            setErrors(errors);
        }

    }
  }

  return (
    <React.Fragment>
        <Header />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-red-500 text-sm text-center mt-1">{errors.other}</div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
            <div className="text-red-500 text-xs mt-1">{errors.email}</div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
            <div className="text-red-500 text-xs mt-1">{errors.password}</div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm your password"
            />
          </div>
            <div  className='flex'>
          <button
            type="submit"
            className="w-full mx-2 flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          <button
            
            className="w-full mx-2 flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
                navigate('/');
            }}
          >
            Login
          </button>
          </div>
        </form>
      </div>
    </div>
    </React.Fragment>
  );
}

export default SignUp;

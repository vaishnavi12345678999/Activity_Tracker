import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation after login
import axios from 'axios'; // for API requests
import Header from './Header';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors = { email: '', password: '' };

    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', { email, password });
        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token); // Store the token
          navigate('/dashboard'); // Navigate to dashboard or desired route
          
        }
      } catch (error) {
        if (error.response) {
          // Handle HTTP errors
          setErrors({ ...errors, form: error.response.data.error });
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Log In to Your Account</h2>
          <p className="mb-4 text-gray-600">Manage your web activities effectively.</p>
          {errors.form && <p className="text-center text-red-500 text-sm">{errors.form}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Log In
            </button>
            <p className="mt-4">
              Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LoginPage;

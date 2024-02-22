import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginSignup = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error for the changed input
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const isFormValid = () => {
    const errors = {};

    // Add your validation logic here
    if (action === 'Sign Up') {
      if (!formData.name.trim()) {
        errors.name = 'Name is required';
      }
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignUp = () => {
    if (isFormValid()) {
      // Store data in local storage
      localStorage.setItem('user', JSON.stringify(formData));

      // Display sweet alert on sign up
      Swal.fire('Sign Up Successful!', 'Account created successfully.', 'success').then(() => {
        // Clear input fields
        setFormData({ name: '', email: '', password: '' });

        // Redirect to login page
        setAction('Login'); // Change action to 'Login'
      });
    }
  };

  const handleLogin = () => {
    if (isFormValid()) {
      // Retrieve data from local storage
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        // Display sweet alert on successful login
        Swal.fire('Login Successful!', 'Welcome back!', 'success').then(() => {
          // Redirect to home page
          navigate('/');
        });
      } else {
        // Display sweet alert on unsuccessful login
        Swal.fire('Login Failed!', 'Invalid email or password', 'error');
      }
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{action}</h1>
        <hr className='underline' />
        <div className='loginsignup-fields'>
          {action === 'Login' ? (
            ''
          ) : (
            <div>
              <input
                type='text'
                name='name'
                placeholder='Your Name'
                value={formData.name}
                onChange={handleInputChange}
              />
              {validationErrors.name && <p className='error-message'>{validationErrors.name}</p>}
            </div>
          )}
          <div>
            <input
              type='email'
              name='email'
              placeholder='Email Address'
              value={formData.email}
              onChange={handleInputChange}
            />
            {validationErrors.email && <p className='error-message'>{validationErrors.email}</p>}
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleInputChange}
            />
            {validationErrors.password && (
              <p className='error-message'>{validationErrors.password}</p>
            )}
          </div>
        </div>
        {action === 'Sign Up' ? (
          <button className='submit' onClick={handleSignUp}>
            Continue
          </button>
        ) : (
          <button className='submit' onClick={handleLogin}>
            Login
          </button>
        )}
        {action === 'Sign Up' ? (
          <p className='loginsignup-login'>
            Already have an account?{' '}
            <span
              className='submit'
              onClick={() => {
                setAction('Login');
              }}
              style={{ cursor: 'pointer' }}
            >
              Login here
            </span>
          </p>
        ) : (
          ''
        )}
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of user & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;


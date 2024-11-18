"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Footer from '@/components/Footer';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/auth/signup', {
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        if (response.status === 200) {
            router.push('/profile');
        }
    } catch (error) {
        if (error.response) {
            const errorMsg = error.response.data.message || "An error occurred";
            setErrorMessage(typeof errorMsg === 'string' ? errorMsg : 'An unknown error occurred');
        } else {
            setErrorMessage("Failed to connect to the server");
        }
    }
  };

  // Handle Google OAuth sign-up success
  const handleGoogleSuccess = async (response) => {
    const tokenId = response.credential;

    try {
      const res = await axios.post('http://localhost:5000/auth/google-signup', { tokenId }, {
        withCredentials: true,
      });
      router.push('/profile'); // Redirect after successful sign-up
    } catch (error) {
      setErrorMessage('Google sign-up failed. Please try again.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="941517684758-st1nc53ac5llhnbu45tldjv28125hut9.apps.googleusercontent.com">
      <div className="min-h-screen bg-black text-white flex flex-col">
        <header className="p-5">
          <img 
            src="/logo.png" 
            alt="Arts Khonnect logo" 
            className="w-1/5 h-full"
          />
        </header>
        
        <main className="flex-1 flex items-center justify-center p-10">
          <div className="flex-1 max-w-2xl">
            <img 
              src="/hex-image.png" 
              alt="Arts Khonnect Collage" 
              className="w-auto h-auto"
            />
          </div>
          
          <div className="bg-white text-black p-10 w-80">
            <h2 className="text-center text-2xl mb-6">
              Create Your <span className="text-pink-500">Account!</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                className="w-full p-2 mb-4 bg-black text-white border border-gray-300"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="w-full p-2 mb-4 bg-black text-white border border-gray-300"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                className="w-full p-2 mb-4 bg-black text-white border border-gray-300"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                className="w-full p-2 mb-4 bg-black text-white border border-gray-300"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="submit" className="w-full p-2 bg-pink-500 text-white font-bold">
                Sign Up
              </button>
            </form>
            {errorMessage && (
              <div className="text-red-500 mt-4 text-center">
                {errorMessage}
              </div>
            )}
            <div className="text-center my-4 relative">
              <span className="bg-white px-2 relative z-10">OR</span>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-10"></div>
            </div>

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setErrorMessage('Google sign-up failed.')}
            />

            <div className="text-center mt-4">
              <a href="/login" className="text-pink-500 no-underline">
                Already have an account? Log in
              </a>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;

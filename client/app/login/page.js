"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Regular login submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };

    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      window.location.href = '/dashboard'; // Redirect after login
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  // Handle Google OAuth login success
  const handleGoogleSuccess = async (response) => {
    const tokenId = response.credential; // Get Google ID token

    try {
      // Send Google token to backend for verification and login
      const res = await axios.post('http://localhost:5000/auth/google-signup', { tokenId }, {
        withCredentials: true,
      });
      window.location.href = '/dashboard'; // Redirect after Google login
    } catch (error) {
      setErrorMessage('Google login failed. Please try again.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="941517684758-st1nc53ac5llhnbu45tldjv28125hut9.apps.googleusercontent.com">
      <div className="min-h-screen bg-black text-white flex flex-col">
        <header className="p-5">
          <img src="/logo.png" alt="Arts Khonnect logo" className="w-1/5 h-full" />
        </header>

        <main className="flex-1 flex items-center justify-center p-10">
          <div className="flex-1 max-w-2xl">
            <img src="/hex-image.png" alt="Arts Khonnect Collage" className="w-auto h-auto" />
          </div>

          <div className="bg-white text-black p-10 w-80 ml-5">
            <h2 className="text-center text-2xl mb-6">
              Join The <span className="text-pink-500">Community!</span>
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email"
                className="w-full p-2 mb-4 bg-black text-white border border-gray-300 placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-4 bg-black text-white border border-gray-300 placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="w-full p-2 bg-pink-500 text-white font-bold">
                Log In
              </button>
            </form>

            {errorMessage && (
              <div className="text-red-500 text-center mt-4">
                {errorMessage}
              </div>
            )}

            <div className="text-center my-4 relative">
              <span className="bg-white px-2 relative z-10">OR</span>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-10"></div>
            </div>

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setErrorMessage('Google login failed.')}
            />

            <div className="text-center mt-4">
              <a href="/signup" className="text-pink-500 no-underline">
                Don't have an account? Sign up
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;

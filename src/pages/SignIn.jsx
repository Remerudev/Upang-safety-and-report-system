import React from 'react';
import { FaUser, FaEyeSlash } from 'react-icons/fa';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-full lg:w-1/2 bg-gray-50 p-8 flex flex-col justify-center items-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/images/decorative-shapes.png')",
          }}
        ></div>

        <div className="relative z-10 text-center max-w-md">
          <img
            src="/images/upang-logo.png"
            alt="UPANG Logo"
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h1 className="text-xl font-bold text-gray-800 mb-2">University of Pangasinan</h1>
          <p className="text-sm text-gray-600">
            28WV+R2R, Arellano St, Downtown District, Dagupan, 2400 Pangasinan, Philippines
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center mb-6">
            <img
              src="/images/phinma-logo.png"
              alt="PHINMA Education"
              className="h-10 mr-4"
            />
            <div>
              <h3 className="font-bold text-gray-800 text-sm">PHINMA EDUCATION</h3>
              <p className="text-xs text-gray-600">MAKING LIVES BETTER THROUGH EDUCATION</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">Sign In</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className='text-red-800'>*</span>Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
              <FaUser className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className='text-red-800'>*</span>Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
              <FaEyeSlash className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-md">
            Sign In
          </button>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
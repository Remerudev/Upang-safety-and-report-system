import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Icon = ({ path, className = "w-5 h-5 text-gray-400" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const DecorativeShape = ({ className }) => (
  <div className={`absolute ${className}`}>
    <div className="w-24 h-40 bg-green-200 opacity-50 transform -rotate-45"></div>
    <div className="w-32 h-48 bg-[#2E5945] transform -rotate-45 -ml-12 mt-4"></div>
  </div>
);

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // ✅ Simulate successful login by saving token
    localStorage.setItem("adminToken", "demo_token_123");
    // Navigate to Admin Dashboard
    navigate("/AdminDashboard");
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Panel */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12 relative overflow-hidden">
        <DecorativeShape className="top-10 left-10" />
        <DecorativeShape className="top-10 right-10" />

        <div className="z-10 text-center">
          <img src="/upang_logo.png" alt="University of Pangasinan Logo" className="w-40 h-40 mx-auto mb-6"/>
          <h1 className="text-4xl font-bold text-gray-800">University of Pangasinan</h1>
          <p className="text-gray-500 mt-2">28WV+R2R, Arellano St, Downtown District, Dagupan, 2400 Pangasinan, Philippines</p>
        </div>

        <DecorativeShape className="bottom-10 left-10" />
        <DecorativeShape className="bottom-10 right-10" />
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/PHINMAEd_Logo.png" alt="PHINMA Education Logo" className="w-48 mx-auto mb-4"/>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
              <span className="ml-3 bg-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">ADMIN</span>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                  <span className="text-red-500">*</span> Username
                </label>
                <input id="username" type="text" placeholder="Enter Username" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  <span className="text-red-500">*</span> Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon
                      path={
                        showPassword
                          ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5..."
                          : "M2.036 12.322a1.012 1.012 0 010-.639C3.423..."
                      }
                    />
                  </button>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2E5945] text-white font-bold py-2 px-4 rounded-md hover:bg-[#4A7C65] transition duration-200"
              >
                Sign In
              </button>

              <div className="text-center mt-4">
                <a href="#" className="text-sm text-blue-600 hover:underline">Create Admin Account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

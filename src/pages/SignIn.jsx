import React, { useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom'; // ✅ added Link import

export default function SignIn({ setIsAuthenticated, setUserEmail }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@phinmaed.com')) {
      setError('Please use your official PHINMA email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);
      console.log('Login response', response.status, data);

      if (response.ok) {
        const emailFromResponse = data?.user?.email ?? data?.email;

        if (emailFromResponse) {
          setUserEmail(emailFromResponse);
          localStorage.setItem('userEmail', emailFromResponse);

          setIsAuthenticated(true);
          navigate('/dashboard');
          return;
        }

        if (data?.token) {
          localStorage.setItem('token', data.token);
          try {
            const profileRes = await fetch('http://localhost:5000/user/profile', {
              headers: { Authorization: `Bearer ${data.token}` },
            });
            if (profileRes.ok) {
              const profile = await profileRes.json();
              const profileEmail = profile?.email;
              if (profileEmail) {
                setUserEmail(profileEmail);
                localStorage.setItem('userEmail', profileEmail);
              }
            }
          } catch (e) {
            console.warn('Profile fetch failed', e);
          }

          setIsAuthenticated(true);
          navigate('/dashboard');
          return;
        }

        setError('Unexpected login response from server. Check console for details.');
      } else {
        const serverMessage = data?.message || data?.error;
        setError(serverMessage || 'Login Failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login request error', err);
      setError(err.message || 'Network error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none">
        {[
          { src: '/images/rectangle-1.png', top: '5%', left: '5%', width: '90px', rotate: '2deg' },
          { src: '/images/rectangle-2.png', top: '6%', left: '17.5%', width: '75px', rotate: '2deg' },
          { src: '/images/rectangle-3.png', top: '14%', left: '60%', width: '60px', rotate: '2deg' },
          { src: '/images/rectangle-4.png', top: '4%', left: '70%', width: '90px', rotate: '2deg' },
          { src: '/images/rectangle-3.png', top: '73%', left: '5%', width: '60px', rotate: '2deg' },
          { src: '/images/rectangle-4.png', top: '67.5%', left: '15%', width: '90px', rotate: '2deg' },
          { src: '/images/rectangle-3.png', top: '73%', left: '60%', width: '60px', rotate: '2deg' },
          { src: '/images/rectangle-4.png', top: '65%', left: '70%', width: '90px', rotate: '2deg' },
        ].map((rect, i) => (
          <img
            key={i}
            src={rect.src}
            alt={`Decorative Rectangle ${i + 1}`}
            className="absolute"
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              transform: `rotate(${rect.rotate})`,
              zIndex: 1000,
              opacity: 1,
            }}
          />
        ))}
      </div>

      {/* Left Side */}
      <div className="w-full lg:w-1/2 bg-gray-50 p-8 flex flex-col justify-center items-center relative z-10">
        <div className="text-center max-w-md">
          <img
            src="/images/upang-logo.png"
            alt="UPANG Logo"
            className="w-32 h-32 mx-auto mb-4 rounded-full"
          />
          <h1 className="text-xl font-bold text-gray-800 mb-2">University of Pangasinan</h1>
          <p className="text-sm text-gray-600">
            28WV+R2R, Arellano St, Downtown District, Dagupan, 2400 Pangasinan, Philippines
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-start p-8 relative">
        <div className="flex items-center mb-8 w-full max-w-md">
          <img src="/images/phinma-logo.png" alt="PHINMA Education" className="h-24 mr-8" />
          <div>
            <h3 className="font-bold text-gray-800 text-sm">PHINMA EDUCATION</h3>
            <p className="text-xs text-gray-600">MAKING LIVES BETTER THROUGH EDUCATION</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 inline-block pb-2">
            Sign In
          </h2>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-800">*</span>Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@phinmaed.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <FaUser className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-800">*</span>Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-2 px-4 rounded-lg transition shadow-md ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* ✅ Working Forgot Password Link */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

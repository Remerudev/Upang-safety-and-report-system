// SettingsPage.jsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Sidebar from './Sidebar'; // ✅ Import your Sidebar component

const SettingsPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [profile, setProfile] = useState({
        fullName: 'Admin Name', // Replace with actual admin name
        email: 'admin@phinmaed.com', // Replace with actual admin email
        password: '', // Leave empty for security
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        console.log("Saving profile changes:", profile);
        alert("Profile changes saved!");
        setProfile(prev => ({ ...prev, password: '' }));
    };

    return (
        <div className="flex bg-gray-100 font-sans">
            {/* ✅ Sidebar stays fixed on the left */}
            <Sidebar />

            {/* ✅ Main content area */}
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500 mt-1">Review system and profile settings</p>
                </header>

                {/* Admin Profile Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Profile Settings</h2>
                    <form onSubmit={handleSaveProfile} className="space-y-6 max-w-lg">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={profile.fullName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter full name"
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter email address"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={profile.password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 font-medium"
                        >
                            Save Profile Changes
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;

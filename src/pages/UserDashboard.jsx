import React from 'react';
import { FaFileAlt, FaClock, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ReportCard from '../components/ReportCard';

export default function UserDashboard() {
  const navigate = useNavigate();

   const handleNewReport = () => {
    navigate('/report');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center space-x-2">
            <img 
              src="/images/upang-logo.png" 
              alt="UPANG Logo" 
              className="h-8 w-8 rounded-full"
            />
            <h1 className="text-xl font-bold text-gray-800">UPANG Safety</h1>
          </div>
          <div className="flex flex-wrap justify-start sm:justify-end gap-6 w-full sm:w-auto">
            <button className="text-gray-700 hover:text-green-600 font-medium">Track Reports</button>
            <button className="text-gray-700 hover:text-green-600 font-medium">Profile</button>
            <button onClick={handleNewReport} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition shadow-sm">
              + New Report</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-9 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
          <p className="text-gray-600">Track and manage your safety reports</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Reports" 
            value="15" 
            icon={<FaFileAlt className="text-gray-500" />} 
          />
          <StatCard 
            title="Pending Reports" 
            value="10" 
            valueColor="text-yellow-500" 
            icon={<FaClock className="text-yellow-500" />} 
          />
          <StatCard 
            title="Resolved" 
            value="5" 
            valueColor="text-green-500" 
            icon={<FaCheck className="text-green-500" />} 
          />
        </div>

        {/* my Reports Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">My Reports</h2>
          <p className="text-gray-600 mb-6">View and track all your submitted reports</p>

          <div className="space-y-4">
            <ReportCard 
              title="Broken Window in Library" 
              location="Main Library, 2nd Floor" 
              date="2024-01-15" 
              status="Reported" 
              statusColor="bg-gray-700" 
            />
            <ReportCard 
              title="Harassment Incident" 
              location="Student Cafeteria" 
              date="2024-01-14" 
              status="Pending" 
              statusColor="bg-yellow-500" 
            />
            <ReportCard 
              title="Slip and Fall" 
              location="Main Hallway" 
              date="2024-01-12" 
              status="Under Review" 
              statusColor="bg-green-600" 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
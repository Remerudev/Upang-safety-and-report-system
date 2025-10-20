import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaClock, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ReportCard from '../components/ReportCard';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNewReport = () => {
    navigate('/report');
  };

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/Incidents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setIncidents(data);
      } catch (err) {
        console.error('Failed to fetch incidents:', err);
        setError('Failed to load reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const totalReports = incidents.length;
  const pendingReports = incidents.filter(i => i.status === 'Pending').length;
  const resolvedReports = incidents.filter(i => i.status === 'Resolved').length;

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
            <button onClick={() => navigate ('/track-reports')} className="text-gray-700 hover:text-green-600 font-medium">Track Reports</button>
            <button className="text-gray-700 hover:text-green-600 font-medium">Profile</button>
            <button 
              onClick={handleNewReport} 
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition shadow-sm"
            >
              + New Report
            </button>
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
            value={totalReports} 
            icon={<FaFileAlt className="text-gray-500" />} 
          />
          <StatCard 
            title="Pending Reports" 
            value={pendingReports} 
            valueColor="text-yellow-500" 
            icon={<FaClock className="text-yellow-500" />} 
          />
          <StatCard 
            title="Resolved" 
            value={resolvedReports} 
            valueColor="text-green-500" 
            icon={<FaCheck className="text-green-500" />} 
          />
        </div>

        {/* My Reports Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">My Reports</h2>
          <p className="text-gray-600 mb-6">View and track all your submitted reports</p>

          {loading ? (
            <p className="text-gray-500">Loading reports...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : incidents.length === 0 ? (
            <p className="text-gray-500">No reports submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <ReportCard
                  key={incident._id}
                  title={incident.title}
                  location={incident.location}
                  date={incident.date ? new Date(incident.date).toLocaleDateString() : 'N/A'}
                  status={incident.status || 'Reported'}
                  statusColor={
                    incident.status === 'Resolved' ? 'bg-green-600' :
                    incident.status === 'Pending' ? 'bg-yellow-500' :
                    incident.status === 'Submitted' ? 'bg-gray-800' :
                    'bg-gray-700'
                  }
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
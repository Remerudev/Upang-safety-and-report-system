import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEye, FaClock, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useUser } from '../UserContext';

export default function TrackReports() {
  const navigate = useNavigate();
  const { userEmail } = useUser();
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      if (!userEmail) {
        console.log('User Email:', userEmail);
        setError('Please sign in to track your reports.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch('http://localhost:5000/incidents');
        if (!response.ok) throw new Error('Failed to fetch reports');
        const data = await response.json();

        const userReports = userEmail
          ? data.filter((r) => {
              const owner = (r.UserEmail || r.Username || r.username || r.email || '').toString();
              const emailLower = userEmail.toLowerCase();
              const localPart = emailLower.split('@')[0];
              if (!owner) return false;
              const ownerLower = owner.toLowerCase();
              return ownerLower === emailLower || ownerLower === localPart;
            })
          : data;

        setReports(userReports);
      } catch (err) {
        console.error('Fetch reports error:', err);
        setError(err.message || 'Failed to load reports.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [userEmail]);

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reportnumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500';
      case 'Submitted': return 'bg-gray-800';
      case 'Under Review': return 'bg-blue-600';
      case 'Resolved': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'Pending': return 25;
      case 'Submitted': return 0;
      case 'Under Review': return 75;
      case 'Resolved': return 100;
      default: return 0;
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'Submitted': return 'bg-gray-400';
      case 'Pending': return 'bg-yellow-500';
      case 'Under Review': return 'bg-blue-600';
      case 'Resolved': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <img src="/images/upang-logo.png" alt="UPANG Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-gray-800">UPANG Safety</h1>
        </div>
        <div className="space-x-6 text-sm">
          <button className="text-gray-600 hover:text-green-600">Report Incident</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">Track Reports</button>
          <button className="text-gray-600 hover:text-green-600">Profile</button>
        </div>
      </header>

      <main className="container mx-auto px-9 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Track Your Reports</h1>
          <p className="text-gray-600">Monitor the progress of your incident reports and receive real-time updates</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Find Your Report</h2>
          <p className="text-sm text-gray-600 mb-4">Enter your report ID or search by title to track progress</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Report ID (e.g., RPT-001) or title..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={() => {}}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Reports List */}
        {loading ? (
          <div className="text-center py-10">Loading reports...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            No reports found.
            {searchTerm && <span> Try a different search term.</span>}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <div key={report._id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{report.category}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{report.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/report/${report._id}`)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    View Details →
                  </button>
                </div>

                {/* Progress Bar (only show for Pending) */}
                {(report.status === 'Pending' || report.status === 'Submitted') && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{getProgressPercentage(report.status)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(report.status)}`}
                        style={{ width: `${getProgressPercentage(report.status)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Report Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Submitted:</div>
                    <div className="text-sm text-gray-600">{new Date(report.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Assigned to:</div>
                    <div className="text-sm text-gray-600">Maintenance Team</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Est. Completion:</div>
                    <div className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
          <p className="text-sm text-gray-600">
            If you have questions about your report or need to provide additional information, please contact our support team.
          </p>
        </div>
      </main>
    </div>
  );
}
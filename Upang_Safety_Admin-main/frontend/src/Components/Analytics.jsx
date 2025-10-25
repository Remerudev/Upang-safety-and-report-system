import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, LineChart, Line, Cell
} from 'recharts';
import Sidebar from './Sidebar';

// --- MAIN PAGE ---
const AnalyticsPage = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/incidents/admin/all');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setIncidents(data);
            } catch (err) {
                console.error('Failed to fetch incidents:', err);
                setError('Failed to load analytics data. Please check if backend is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    // Incident Hotspot Locations
    const getHotspotLocations = () => {
        const locationCounts = {};
        incidents.forEach(incident => {
            const location = incident.location || 'Unknown Location';
            locationCounts[location] = (locationCounts[location] || 0) + 1;
        });
        
        return Object.entries(locationCounts)
            .map(([name, reports]) => ({ name, reports }))
            .sort((a, b) => a.reports - b.reports); // Sort for better visualization
    };

    // Monthly Report Trend
    const getMonthlyData = () => {
        const monthlyCounts = {};
        incidents.forEach(incident => {
            if (incident.createdAt) {
                const date = new Date(incident.createdAt);
                const month = date.toLocaleString('en-US', { month: 'short' });
                const year = date.getFullYear();
                const key = `${month} ${year}`;
                monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
            }
        });
        
        return Object.entries(monthlyCounts)
            .map(([name, reports]) => ({ name, reports }))
            .sort((a, b) => {
                const [monthA, yearA] = a.name.split(' ');
                const [monthB, yearB] = b.name.split(' ');
                const dateA = new Date(`${monthA} 1, ${yearA}`);
                const dateB = new Date(`${monthB} 1, ${yearB}`);
                return dateA - dateB;
            });
    };

    // Reports by Category
    const getCategoryData = () => {
        const categoryCounts = {};
        incidents.forEach(incident => {
            const category = incident.category || 'Others';
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        
        return Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));
    };

    const HotspotTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border rounded-lg shadow-md">
                    <p className="font-semibold">{`${label}`}</p>
                    <p className="text-sm text-gray-600">{`Reports: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    if (loading) return (
        <div className="flex bg-gray-100 font-sans">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div>Loading analytics data...</div>
            </main>
        </div>
    );

    if (error) return (
        <div className="flex bg-gray-100 font-sans">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div className="text-red-600">{error}</div>
            </main>
        </div>
    );

    const hotspotLocations = getHotspotLocations();
    const monthlyData = getMonthlyData();
    const categoryData = getCategoryData();

    return (
        <div className="flex bg-gray-100 font-sans">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analytics and Incident Hotspot</h1>
                        <p className="text-gray-500 mt-1">Data visualization for trend analysis.</p>
                    </div>
                </header>

                {/* HOTSPOT BAR CHART SECTION */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Incident Hotspot Areas</h2>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart
                                layout="vertical"
                                data={hotspotLocations}
                                margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" tick={{ fontSize: 12 }} />
                                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                                <Tooltip content={<HotspotTooltip />} cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }} />
                                <Bar dataKey="reports" radius={[0, 4, 4, 0]}>
                                    {hotspotLocations.map((entry, index) => {
                                        let color;
                                        if (entry.reports >= 1 && entry.reports <= 3) {
                                            color = '#22c55e'; // green-500
                                        } else if (entry.reports >= 4 && entry.reports <= 7) {
                                            color = '#eab308'; // yellow-500
                                        } else {
                                            color = '#ef4444'; // red-500
                                        }
                                        return <Cell key={`cell-${index}`} fill={color} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CHARTS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Report Trend</h2>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="reports"
                                        stroke="#16a34a"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Reports by Category</h2>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={categoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fontSize: 12, angle: -25, textAnchor: 'end' }}
                                        interval={0}
                                        height={50}
                                    />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnalyticsPage;
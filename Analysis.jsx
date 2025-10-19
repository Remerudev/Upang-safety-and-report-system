import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ===== Constants =====
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const AUTO_REFRESH_INTERVAL = 3000; // in milliseconds

// ===== Main Component =====
export default function AnalysisTest() {
  // ===== State Hooks =====
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // ===== Fetch Reports from Backend =====
  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:3000/incident/admin/all", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      const result = await response.json();
      const reportsArray = result.data || [];
      console.log("Fetched reports:", reportsArray);

      const sortedReports = sortReportsByDate(reportsArray);
      setReports(sortedReports);

      setStats(calculateStats(sortedReports));
      setChartData(generateChartData(sortedReports));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("❌ Error fetching reports:", error);
    }
  };

  // ===== Helper: Sort Reports by updatedAt Desc =====
  const sortReportsByDate = (data) =>
    [...data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // ===== Helper: Calculate Summary Stats =====
  const calculateStats = (data) => {
    return {
      total: data.length,
      pending: data.filter(r => r.status === "Pending").length,
      underReview: data.filter(r => r.status === "Under Review").length,
      resolved: data.filter(r => r.status === "Resolved").length,
    };
  };

  // ===== Helper: Generate Chart Data =====
  const generateChartData = (data) =>
    MONTHS.map((month) => ({
      month,
      total: data.filter(
        r => new Date(r.createdAt).toLocaleString("default", { month: "short" }) === month
      ).length,
      resolved: data.filter(
        r =>
          new Date(r.createdAt).toLocaleString("default", { month: "short" }) === month &&
          r.status === "Resolved"
      ).length,
    }));

  // ===== Auto Refresh Reports =====
  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, AUTO_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // ===== Render =====
  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <Header />
      <AlertBanner />
      <StatsGrid stats={stats} />
      <IncidentChart chartData={chartData} lastUpdated={lastUpdated} />
    </div>
  );
}

// ===== Sub-Components =====
function Header() {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-green-600">
        Safety & Incident Dashboard
      </h1>
      <p className="text-gray-500">
        Monitor and manage campus safety reports in real-time
      </p>
    </div>
  );
}

function AlertBanner() {
  return (
    <div className="border border-yellow-200 bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-6">
      ⚠️ Increased Report Activity — Submissions have increased by{" "}
      <span className="font-bold">45%</span> in the past week.
    </div>
  );
}

function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard title="Total Reports" value={stats.total || 0} color="green" />
      <StatCard title="Pending" value={stats.pending || 0} color="yellow" />
      <StatCard title="Under Investigation" value={stats.underReview || 0} color="orange" />
      <StatCard title="Resolved" value={stats.resolved || 0} color="green" />
    </div>
  );
}

function IncidentChart({ chartData, lastUpdated }) {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Incident Trend Analysis</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month" stroke="#333" />
          <YAxis
            domain={[0, 12]}
            ticks={[0, 2, 4, 6, 8, 10, 12]}
            stroke="#333"
          />
          <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd", color: "#000" }} />
          <Legend />
          <Bar dataKey="total" fill="#2563eb" name="Total Reports" />
          <Bar dataKey="resolved" fill="#16a34a" name="Resolved" />
        </BarChart>
      </ResponsiveContainer>

      {lastUpdated && (
        <p className="text-sm text-gray-500 mt-2">
          Last auto-refresh: {lastUpdated}
        </p>
      )}
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorClasses = {
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
  }[color];

  return (
    <div className={`p-4 border rounded-lg shadow-sm ${colorClasses}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

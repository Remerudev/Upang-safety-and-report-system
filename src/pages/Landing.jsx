import React from 'react';
import { FaCheckCircle, FaClock, FaUsers, FaShieldAlt, FaExclamationTriangle, FaMapMarkerAlt, FaChartLine, FaFileAlt, FaChartBar } from 'react-icons/fa';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className='bg-white shadow-sm sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
                <img src='/images/upang-logo.png' alt='UPANG Logo' className='h-10 w-10 rounded-full'/>
                <h1 className='text-xl font-bold text-green-800'>UPANG Safety</h1>
            </div>
            <div className='flex space-x-6'>
                <button className='text-grey-700 hover:text-green-600 font-medium'>Report Incident</button>
                <button className='text-grey-700 hover:text-green-600 font-medium'>Track Reports</button>
                <button className='text-grey-700 hover:text-green-600 font-medium'>Report Incident</button>
                <button className='bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition shadow-sm'>Sign In</button>
            </div>
        </div>
      </header>

    <section className='relative bg-cover bg-center h-[60vh] flex items-center justify-center text-white'
        style={{backgroundImage: "url('/images/upang-bg.png')",}}
    >
        <div className='container mx-auto px-5 text-center max-w-4xl'>
            <h1 className='text-4xl md:text-5xl mb-8 font-extrabold '>
                UPANG Safety &<br /> <span className='text-upang-green'> Incident Reporting </span>
            </h1>
            <p className='text-lg md:text-xl mb-10 max-w-3xl mx-auto'>
                    Empowering the UPANG community to report, track, and resolve safety concerns through our comprehensive incident management sytstem.
            </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg shadow-md flex items-center gap-2 transition transform hover:scale-105">
              <FaFileAlt size={20} />
              Report an Incident →
            </button>
              <button className="border-2 border-white-600 text-white-400 px-8 py-2 rounded-lg flex items-center gap-2 transition transform hover:scale-105">
              <FaChartBar size={20} />
                Track Reports
            </button>
          </div>
        </div>
      </section>

    {/* Stats Bar */}
       <section className="py-8 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex justify-center text-green-600 text-3xl mb-2">
                <FaCheckCircle />
              </div>
              <p className="font-bold text-xl text-gray-800">98%</p>
              <p className="text-sm text-gray-600">Reports Resolved</p>
            </div>
            <div>
              <div className="flex justify-center text-orange-500 text-3xl mb-2">
                <FaClock />
              </div>
              <p className="font-bold text-xl text-gray-800">2.4h</p>
              <p className="text-sm text-gray-600">Average Response</p>
            </div>
            <div>
              <div className="flex justify-center text-green-600 text-3xl mb-2">
                <FaUsers />
              </div>
              <p className="font-bold text-xl text-gray-800">1,247</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div>
              <div className="flex justify-center text-green-600 text-3xl mb-2">
                <FaShieldAlt />
              </div>
              <p className="font-bold text-xl text-gray-800">A+</p>
              <p className="text-sm text-gray-600">Safety Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Comprehensive Safety Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to maintain a safe and secure campus environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-amber-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <FaFileAlt size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Reporting</h3>
              <p className="text-gray-600 text-sm">Submit incidents in seconds with our intuitive form.</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <FaChartBar size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Tracking</h3>
              <p className="text-gray-600 text-sm">Follow your report status from submission to resolution.</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <FaMapMarkerAlt size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hotspot Analysis</h3>
              <p className="text-gray-600 text-sm">Identify high-risk areas using location-based data.</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <FaChartLine size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Trend Monitoring</h3>
              <p className="text-gray-600 text-sm">Spot patterns and prevent future incidents.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make Campus Safer?</h2>
          <p className="text-green-100 mb-8 text-lg">
            Join the UPANG community in creating a safer environment for everyone. Report incidents, track progress. and help us build a better campus.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-700 font-bold px-8 py-2 rounded-xl text-lg shadow-lg hover:bg-gray-100 transition flex items-center justify-center gap-2">
              <FaExclamationTriangle /> Report Incident Now
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-2 rounded-xl text-lg hover:bg-green-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Paa */}
      <footer className="bg-white-900 text-gray-700 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-5 mb-5">
                <img 
                  src="/images/upang-logo.png" 
                  alt="UPANG Logo" 
                  className="h-10 w-10 rounded-full"
                />
                <h3 className="text-grey text-lg font-bold">UPANG Safety</h3>
              </div>
              <p className="text-sm">
                Join the UPANG community in creating a safer environment for everyone. Report incidents, track progress, and help us build a better campus.
              </p>
            </div>
            <div>
              <h4 className="text-gray font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="">Home</a></li>
                <li><a href="#" className="">Report Incident</a></li>
                <li><a href="#" className="">Track Reports</a></li>
                <li><a href="#" className="">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="">Help Center</a></li>
                <li><a href="#" className="">Contact Us</a></li>
                <li><a href="#" className="">Privacy Policy</a></li>
                <li><a href="#" className="">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray font-semibold mb-3">Contact</h4>
              <p className="text-sm">safety@upang.edu.ph</p>
              <p className="text-sm">+63 (2) 1234-5678</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
            &copy; {new Date().getFullYear()} UPANG Safety & Report Tracking. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
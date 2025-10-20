import React, { useState } from 'react';
import { FaCamera, FaCheck, FaExclamationTriangle, FaArrowLeft, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ReportIncident({ userEmail }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    priority: '',
    description: '',
    date: '',
    files: []
  });
  const [fileError, setFileError] = useState('');
  const [errors, setErrors] = useState({});
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, files });
    if (files.length > 0) setFileError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFileError('');

    if (formData.files.length === 0) {
      setFileError('Please upload at least one photo.');
      return;
    }

    try {
      setLoading(true);

      const categoryMap = {
        'Harassment': 'harassment',
        'Environment': 'environment',
        'Safety': 'safety',
        'Security Issues': 'security issues',
        'Property Damage': 'property damage',
        'Equipment Malfunction': 'equipment malfunction',
        'Others': 'others'
      };

      const priorityMap = {
        'Low': 'low',
        'Medium': 'medium',
        'High': 'high'
      };

  const category = categoryMap[formData.category] || formData.category;
  const priority = priorityMap[formData.priority] || formData.priority;

  const status = 'Submitted';

  const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('category', category);
      formDataToSend.append('priority', priority);
      formDataToSend.append('status', status);

  formDataToSend.append('UserEmail', userEmail || 'Anonymous');

      formData.files.forEach(file => {
        formDataToSend.append('files', file);
      });

      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      const response = await fetch('http://localhost:5000/incidents', {
        method: 'POST',
        headers,
        body: formDataToSend
      });

      if (response.ok) {
        const data = await response.json();
        const trackingId = data.reportNumber || `RPT-${Date.now().toString().slice(-6)}`;
        setTrackingId(trackingId);
        setStep(3);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Incident submit failed', { status: response.status, body: errorData });
        const backendMessage = errorData.message || errorData.error || (errorData.errors ? JSON.stringify(errorData.errors) : null);
        setFileError(backendMessage || 'Failed to submit incident.');
      }
    } catch (err) {
      setFileError('Network error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const goToStep2 = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Please enter an incident title.';
    if (!formData.category) newErrors.category = 'Please select a category.';
    if (!formData.location.trim()) newErrors.location = 'Please enter a location.';
    if (!formData.priority) newErrors.priority = 'Please select a priority level.';
    if (!formData.description.trim()) newErrors.description = 'Please enter a description.';
    if (!formData.date) newErrors.date = 'Please select a date.';
    if (formData.files.length === 0) newErrors.files = 'Please upload at least one photo.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const goToStep1 = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <img src="/images/upang-logo.png" alt="UPANG Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-gray-800">UPANG Safety</h1>
        </div>
        <div className="space-x-6 text-sm">
          <button className="text-gray-600 hover:text-green-600">Track Reports</button>
          <button className="text-gray-600 hover:text-green-600">Profile</button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <FaArrowLeft 
          className="text-gray-600 cursor-pointer text-xl mb-4" 
          onClick={() => {
            if (step === 1) {
              navigate('/dashboard');
            } else if (step === 2) {
              setStep(1);
            }
          }} 
        />

        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Report an Incident</h3>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Help us maintain a safe campus environment by reporting any safety concerns, incidents, or hazards you encounter.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
              }`}>1</div>
              <span className={`ml-2 text-sm font-medium ${
                step >= 1 ? 'text-green-600' : 'text-gray-500'
              }`}>Report Details</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
              }`}>2</div>
              <span className={`ml-2 text-sm font-medium ${
                step >= 2 ? 'text-green-600' : 'text-gray-500'
              }`}>Review & Submit</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
              }`}>3</div>
              <span className={`ml-2 text-sm font-medium ${
                step >= 3 ? 'text-green-600' : 'text-gray-500'
              }`}>Track Progress</span>
            </div>
          </div>
        </div>

        {/* Step 1: Report Details */}
        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Incident Report Form</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Please provide as much detail as possible to help us address your concern effectively.
            </p>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Incident Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Brief description of the incident"
                    className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  >
                    <option value="">Select Incident Category</option>
                    <option value="Harassment">Harassment</option>
                    <option value="Environment">Environment</option>
                    <option value="Safety">Safety</option>
                    <option value="Security Issues">Security Issues</option>
                    <option value="Property Damage">Property Damage</option>
                    <option value="Equipment Malfunction">Equipment Malfunction</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Building, room number, or area"
                    className={`w-full px-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  >
                  <option value="">Select Location</option>
                  <option value="PTC Building">PTC Building</option>
                  <option value="CHS Building">CHS Building</option>
                  <option value="BASIC ED Building">BASIC ED Building</option>
                  <option value="Student Plaza">Student Plaza</option>
                  <option value="Gymnasium">Gymnasium</option>
                  <option value="Phinma Garden">Phinma Garden</option>
                  <option value="CMA Building">CMA Building</option>
                  <option value="FVR Building">FVR Building</option>
                  <option value="MBA Building">MBA Building</option>
                  <option value="River Side Building">River Side Building</option>
                  <option value="Parking Lot">Parking Lot</option>
                  <option value="Others">Others</option>
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority Level <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.priority ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className={`w-full px-4 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Please provide a detailed description of what happened, when it occurred, and any other relevant information..."
                  rows="4"
                  className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Photos Related to the Incident
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  errors.files ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}>
                  <FaCamera className="mx-auto text-gray-400 text-4xl mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Upload photos related to the incident.</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-700 transition"
                  >
                    Choose Files
                  </label>
                  {fileError && (
                    <p className="mt-2 text-sm text-red-600">{fileError}</p>
                  )}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2"><FaCheck className='inline'/> What happens next?</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Your report will be assigned a tracking ID.</li>
                  <li>Expected response time: 2-4 hours during business hours.</li>
                  <li>Track the progress of your report in your profile.</li>
                </ul>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={goToStep2}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
                >
                  Next →
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <FaExclamationTriangle className="text-red-600 mt-0.5 mr-3" />
                <div>
                  <h5 className="font-semibold text-red-800">Emergency Situations</h5>
                  <p className="text-sm text-red-700">
                    For immediate emergencies requiring urgent attention, please call:<br/>
                    Campus Security: (555) 123-4567 or Emergency Services: 911
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Review & Submit */}
        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Review Incident Report Form</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Incident Title</label>
                <p className="font-medium">{formData.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <p className="font-medium">{formData.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="font-medium">{formData.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                <p className="font-medium">{formData.priority} - Needs attention</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <p className="font-medium">{formData.date}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <p className="whitespace-pre-wrap">{formData.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo Evidence</label>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                {formData.files.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.files.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-32 h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No photos uploaded</p>
                )}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">
                <FaClock className='inline'/> What happens next?
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Your report will be assigned a tracking ID.</li>
                <li>Expected response time: 2-4 hours during business hours.</li>
                <li>Track the progress of your report in your profile.</li>
              </ul>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaCheck className="inline mr-2" /> {loading ? 'Submitting...' : 'Submit your report'}
              </button>
            </div>

            {fileError && (
              <div className="mt-4 text-center text-red-600">
                {fileError}
              </div>
            )}

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <FaExclamationTriangle className="text-red-600 mt-0.5 mr-3" />
                <div>
                  <h5 className="font-semibold text-red-800">Emergency Situations</h5>
                  <p className="text-sm text-red-700">
                    For immediate emergencies requiring urgent attention, please call:<br/>
                    Campus Security: (555) 123-4567 or Emergency Services: 911
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 text-center">
            <button
              onClick={goToStep1}
              className="text-gray-600 hover:text-green-600 text-sm"
            >
              ← Edit Report Details
            </button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheck className="text-green-600 text-xl" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">Your safety concern ({trackingId}) is now with our team.</h3>
            <p className="text-gray-600 mb-6">Expect an update within 2–4 hours.</p>

            <button
              onClick={() => navigate('/dashboard')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
            >
              Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
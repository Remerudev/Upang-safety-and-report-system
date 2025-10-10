import React, { useState } from 'react';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';

export default function ReportIncident() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    priority: '',
    description: '',
    files: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Incident reported successfully!');
    console.log(formData); // For debugging
    // Here you'd send formData to backend
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <FaArrowLeft className="text-gray-600 cursor-pointer" />
          <img src="/images/upang-logo.png" alt="UPANG Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-gray-800">UPANG Safety</h1>
        </div>
        <div className="space-x-6 text-sm">
          <button className="text-gray-600 hover:text-green-600">Track Reports</button>
          <button className="text-gray-600 hover:text-green-600">Profile</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Report an Incident</h2>
          <p className="text-gray-600">
            Help us maintain a safe campus environment by reporting any safety concerns, incidents, or hazards you encounter.
          </p>
        </div>

        {/* progress bar */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">

            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">1</div>
              <span className="ml-2 text-sm font-medium text-green-600">Report Details</span>
            </div>
            <div className="w-8 h-0.5 bg-green-600"></div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">2</div>
              <span className="ml-2 text-sm text-gray-500">Review & Submit</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">3</div>
              <span className="ml-2 text-sm text-gray-500">Track Progress</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Incident Report Form</h3>
          <p className="text-sm text-gray-600 mb-6">
            Please provide as much detail as possible to help us address your concern effectively.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Incident Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Incident Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief description of the incident"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-600">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Incident Category</option>
                  <option value="Slip and Fall">Slip and Fall</option>
                  <option value="Equipment Malfunction">Equipment Malfunction</option>
                  <option value="Fire Hazard">Fire Hazard</option>
                  <option value="Near Miss">Near Miss</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Building, room number, or area"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                  required
                />
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority Level <span className="text-red-600">*</span>
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Description <span className="text-red-600">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide a detailed description of what happened, when it occurred, and any other relevant information..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                required
              ></textarea>
            </div>

            {/* Upload Files */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Photos Related to the Incident
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">💡 What happens next?</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Your report will be reviewed by our safety team.</li>
                <li>You'll receive a confirmation email with a tracking ID.</li>
                <li>Our team will investigate and take necessary actions.</li>
                <li>You can track the progress of your report in your profile.</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
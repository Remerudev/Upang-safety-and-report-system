import React, { useState } from 'react';
import { FaCamera, FaCheck, FaExclamationTriangle, FaArrowLeft, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ReportIncident() {
  const Navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    priority: '',
    description: '',
    files: []
  });
  const [fileError, setFileError] = useState('');
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, files });
    if (files.length > 0) setFileError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFileError('');

    if (formData.files.length === 0) {
      setFileError('Please upload at least one photo.');
      return;
    }

    alert('Incident reported successfully!');
    console.log(formData);
  };

 const goToStep2 = () => {
  const newErrors = {};

  if (!formData.title.trim()) newErrors.title = 'Please enter an incident title.';
  if (!formData.category) newErrors.category = 'Please select a category.';
  if (!formData.location.trim()) newErrors.location = 'Please enter a location.';
  if (!formData.priority) newErrors.priority = 'Please select a priority level.';
  if (!formData.description.trim()) newErrors.description = 'Please enter a description.';
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <FaArrowLeft className="text-gray-600 cursor-pointer text-xl" onClick={() =>{
          if (step === 1){
            Navigate('/dashboard')
          } else if (step === 2){
            setStep(1);
          }
        }} />
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
                step >= 3 ? 'bg-gray-300 text-gray-700' : 'bg-gray-300 text-gray-700'
              }`}>3</div>
              <span className="ml-2 text-sm text-gray-500">Track Progress</span>
            </div>
          </div>
        </div>

        {/* Step 1 repotr details */}
        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Incident Report Form</h3>
            <p className="text-sm text-gray-600 mb-6">
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
                  <option value="Slip and Fall">Slip and Fall</option>
                  <option value="Equipment Malfunction">Equipment Malfunction</option>
                  <option value="Fire Hazard">Fire Hazard</option>
                  <option value="Near Miss">Near Miss</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Building, room number, or area"
                    className={`w-full px-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
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

        {/* Step 2 review and submit */}
        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Incident Report Form</h3>

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
                <FaClock className='inline'/> What happens next?</h4>
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
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
              >
                <FaCheck className="inline mr-2" /> Submit your report
              </button>
            </div>

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
      </div>
    </div>
  );
}
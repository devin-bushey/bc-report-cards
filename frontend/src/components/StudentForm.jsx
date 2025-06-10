import { useState } from 'react';

const StudentForm = ({ onSubmit, isLoading }) => {
  const [originalFeedback, setOriginalFeedback] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [formData, setFormData] = useState({
    subject: 'math',
    grade_level: 'elementary',
    tone: 'student-friendly',
    length: 'medium',
    customPrompt: '',
    focusAreas: []
  });

  const subjects = [
    { value: 'math', label: 'Math' },
    { value: 'english', label: 'English' },
    { value: 'science', label: 'Science' },
    { value: 'social_studies', label: 'Social Studies' },
    { value: 'art', label: 'Art' },
    { value: 'music', label: 'Music' },
    { value: 'pe', label: 'PE' },
    { value: 'other', label: 'Other' }
  ];

  const gradeLevels = [
    { value: 'general', label: 'General' },
    { value: 'kindergarten', label: 'Kindergarten' },
    { value: 'elementary-school', label: 'Elementary School' },
    { value: 'middle-school', label: 'Middle School' },
    { value: 'high-school', label: 'High School' }
  ];

  const focusAreaOptions = [
    { value: 'strengths', label: 'Highlight Strengths' },
    { value: 'improvements', label: 'Areas for Improvement' },
    { value: 'examples', label: 'Specific Examples' },
    { value: 'next_steps', label: 'Next Steps/Goals' },
    { value: 'behavior', label: 'Behavior & Attitude' },
    { value: 'participation', label: 'Class Participation' },
    { value: 'growth', label: 'Growth & Progress' },
    { value: 'effort', label: 'Effort & Work Habits' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFocusAreaChange = (focusAreaValue) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(focusAreaValue)
        ? prev.focusAreas.filter(area => area !== focusAreaValue)
        : [...prev.focusAreas, focusAreaValue]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      originalFeedback,
      ...formData
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      {/* Main Input */}
      <div>
        <label htmlFor="originalFeedback" className="block text-sm font-medium text-gray-200 mb-2">
          Original Feedback *
        </label>
        <textarea
          id="originalFeedback"
          value={originalFeedback}
          onChange={(e) => setOriginalFeedback(e.target.value)}
          required
          rows={6}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
          placeholder="Paste your original feedback here for AI improvement..."
        />
      </div>

      {/* Options Toggle */}
      <div className="border-t border-gray-600 pt-4">
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium"
        >
          <svg 
            className={`w-5 h-5 transform transition-transform ${showOptions ? 'rotate-90' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>{showOptions ? 'Hide Options' : 'Show Options'}</span>
        </button>
      </div>

      {/* Collapsible Options */}
      {showOptions && (
        <div className="bg-gray-900 p-4 rounded-lg space-y-4 border border-gray-600">
          <h3 className="text-lg font-medium text-gray-200 mb-4">Customization Options</h3>
          
          {/* Option Toggle */}
          <div className="mb-4">
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="optionType"
                  value="standard"
                  checked={!showCustomPrompt}
                  onChange={() => setShowCustomPrompt(false)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-500 bg-gray-700"
                />
                <span className="ml-2 text-sm font-medium text-gray-200">Use Standard Options</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="optionType"
                  value="custom"
                  checked={showCustomPrompt}
                  onChange={() => setShowCustomPrompt(true)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-500 bg-gray-700"
                />
                <span className="ml-2 text-sm font-medium text-gray-200">Use Custom Prompt</span>
              </label>
            </div>
          </div>

          {!showCustomPrompt ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  {subjects.map(subject => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grade Level */}
              <div>
                <label htmlFor="grade_level" className="block text-sm font-medium text-gray-200 mb-2">
                  Grade Level
                </label>
                <select
                  id="grade_level"
                  name="grade_level"
                  value={formData.grade_level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  {gradeLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-200 mb-2">
                  Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="professional">Professional</option>
                  <option value="encouraging">Encouraging</option>
                  <option value="direct">Direct</option>
                  <option value="warm">Warm</option>
                  <option value="student-friendly">Student-Friendly</option>
                  <option value="parent-friendly ">Parent-Friendly</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-200 mb-2">
                  Length
                </label>
                <select
                  id="length"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="short">Short (1-2 sentences)</option>
                  <option value="medium">Medium (3-4 sentences)</option>
                  <option value="long">Long (5+ sentences)</option>
                </select>
              </div>
            </div>

            {/* Focus Areas */}
            <div className="border-t border-gray-600 pt-4 mt-4">
              <h4 className="text-sm font-medium text-gray-200 mb-3">Focus Areas</h4>
              <p className="text-xs text-gray-400 mb-3">Select areas you want the AI to emphasize:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {focusAreaOptions.map(option => (
                  <label key={option.value} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.focusAreas.includes(option.value)}
                      onChange={() => handleFocusAreaChange(option.value)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-500 bg-gray-700 rounded"
                    />
                    <span className="text-gray-200">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>      
            </>      
          ) : (
            /* Custom Prompt Section */
            <div>
              <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-200 mb-2">
                Custom Prompt
              </label>
              <textarea
                id="customPrompt"
                name="customPrompt"
                value={formData.customPrompt}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your custom prompt for AI improvement. Be specific about how you want the feedback to be improved (e.g., 'Make it more encouraging and specific', 'Add concrete examples', 'Focus on growth mindset', etc.)..."
              />
              <p className="text-xs text-gray-400 mt-1">
                This custom prompt will be used instead of the standard options above.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-3 px-8 rounded-md transition duration-200 flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Comment...
            </>
          ) : (
            <span>Improve Feedback</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
import { useState } from 'react';
import StudentForm from './components/StudentForm';
import CommentDisplay from './components/CommentDisplay';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function App() {
  const [generatedComment, setGeneratedComment] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateComment = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/improve-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_feedback: formData.originalFeedback,
          subject: formData.subject,
          grade_level: formData.grade_level,
          tone: formData.tone,
          length: formData.length,
          custom_prompt: formData.customPrompt || null,
          focus_areas: formData.focusAreas.length > 0 ? formData.focusAreas : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setGeneratedComment(data.data);
        setSuggestions([]);
      } else {
        throw new Error(data.error || 'Failed to improve feedback');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while improving the feedback');
      console.error('Error improving feedback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    setGeneratedComment(null);
    setSuggestions([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">
                  Report Card Helper
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-white mb-2">
                Feedback Input
              </h2>
              <p className="text-sm text-gray-300">
                Paste your original feedback below to have AI improve it.
              </p>
            </div>
            
            <StudentForm onSubmit={generateComment} isLoading={isLoading} />

            {/* Error Display */}
            {error && (
              <div className="bg-red-900/50 border border-red-600 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-200">
                      Error Improving Feedback
                    </h3>
                    <div className="mt-2 text-sm text-red-100">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comment Display Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-white mb-2">
                Improved Feedback
              </h2>
              <p className="text-sm text-gray-300">
                Your AI-improved feedback will appear here.
              </p>
            </div>

            {generatedComment ? (
              <CommentDisplay
                comment={generatedComment}
                suggestions={suggestions}
                onRegenerate={handleRegenerate}
              />
            ) : (
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-dashed border-gray-600">
                <div className="text-center">
                  <h3 className="mt-2 text-sm font-medium text-gray-200">No feedback improved yet</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Paste your original feedback and click "Improve Feedback" to get started.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

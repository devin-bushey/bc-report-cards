import { useState, useEffect } from 'react';

const CommentDisplay = ({ comment, suggestions, onEdit, onRegenerate }) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [editedComment, setEditedComment] = useState(comment?.comment || '');

  // Update editedComment when a new comment is received
  useEffect(() => {
    if (comment?.comment) {
      setEditedComment(comment.comment);
    }
  }, [comment?.comment]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editedComment);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCommentChange = (e) => {
    setEditedComment(e.target.value);
    if (onEdit) {
      onEdit(e.target.value);
    }
  };

  if (!comment) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Generated Comment</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded">
            {comment.word_count} words
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded capitalize">
            {comment.tone}
          </span>
        </div>
      </div>

      {/* Comment Text Area */}
      <div className="space-y-2">
        <label htmlFor="comment-text" className="block text-sm font-medium text-gray-700">
          Report Card Comment
        </label>
        <textarea
          id="comment-text"
          value={editedComment}
          onChange={handleCommentChange}
          rows={15}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          placeholder="Your generated comment will appear here..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          {copiedToClipboard ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy to Clipboard</span>
            </>
          )}
        </button>
      </div>

      {/* Teaching Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Teaching Suggestions</h3>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-800 mb-3">
              Here are some strategies to help this student improve:
            </p>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-blue-800">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};

export default CommentDisplay;
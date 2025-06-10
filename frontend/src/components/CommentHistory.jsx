import { useState, useEffect } from 'react';

const CommentHistory = ({ onRestoreComment }) => {
  const [commentHistory, setCommentHistory] = useState([]);

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('commentHistory');
    if (savedHistory) {
      setCommentHistory(JSON.parse(savedHistory));
    } else {
      setCommentHistory([]);
    }
  };

  useEffect(() => {
    loadHistory();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadHistory();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('commentHistoryUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('commentHistoryUpdated', handleStorageChange);
    };
  }, []);

  const deleteFromHistory = (historyId) => {
    const updatedHistory = commentHistory.filter(item => item.id !== historyId);
    setCommentHistory(updatedHistory);
    localStorage.setItem('commentHistory', JSON.stringify(updatedHistory));
  };

  const restoreFromHistory = (historyItem) => {
    onRestoreComment(historyItem.comment);
  };

  const clearAllHistory = () => {
    setCommentHistory([]);
    localStorage.removeItem('commentHistory');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-white mb-2">
            Comment History
          </h2>
          <p className="text-sm text-gray-300">
            Your previously generated comments ({commentHistory.length} saved)
          </p>
          <p className="text-xs text-gray-300">
            History will be lost when you refresh the page
          </p>
        </div>
        {commentHistory.length > 0 && (
          <button
            onClick={clearAllHistory}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {commentHistory.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-dashed border-gray-600">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-200">No history yet</h3>
            <p className="mt-1 text-sm text-gray-400">
              Generate some comments to see them saved here for later use.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-96 overflow-y-auto">
          <div className="divide-y divide-gray-600">
            {commentHistory.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-700 group">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-xs text-gray-400">
                    {item.timestamp}
                  </div>
                  <button
                    onClick={() => deleteFromHistory(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                    title="Delete this comment"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-200">
                    {item.word_count} words
                  </span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded capitalize text-gray-200">
                    {item.tone}
                  </span>
                </div>
                
                <div className="text-sm text-gray-200 mb-3 overflow-hidden"
                     style={{
                       display: '-webkit-box',
                       WebkitLineClamp: 3,
                       WebkitBoxOrient: 'vertical',
                       maxHeight: '4.5rem'
                     }}>
                  {item.comment}
                </div>
                
                <button
                  onClick={() => restoreFromHistory(item)}
                  className="bg-gray-600 hover:bg-gray-500 text-white text-xs px-2 py-1 rounded transition duration-200"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentHistory;
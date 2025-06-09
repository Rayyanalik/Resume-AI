import { useEffect, useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const Footer = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Show chatbot after a short delay when the page loads
    const timer = setTimeout(() => {
      setShowChatbot(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseChatbot = () => {
    // Clear conversation history when closing
    try {
      localStorage.removeItem('chatbase_conversation_history');
    } catch (error) {
      console.error('Error clearing conversation history:', error);
    }
    setShowChatbot(false);
  };

  const handleOpenChatbot = () => {
    // Clear any existing conversation history when opening
    try {
      localStorage.removeItem('chatbase_conversation_history');
    } catch (error) {
      console.error('Error clearing conversation history:', error);
    }
    setShowChatbot(true);
  };

  return (
    <footer className="relative w-full py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Resume AI. All rights reserved.</p>
        </div>
      </div>
      
      {/* Persistent Chatbot Button */}
      <button
        onClick={handleOpenChatbot}
        className="fixed bottom-4 right-4 z-40 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-bounce"
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-7 h-7 text-gray-600 animate-pulse" />
      </button>

      {/* Chatbot iframe */}
      {showChatbot && (
        <div className="fixed bottom-4 right-4 z-50 w-96 h-[700px] shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <button
              onClick={handleCloseChatbot}
              className="absolute top-2 right-2 z-50 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Close chatbot"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/XBPQv-A8lpAWFyKsjN571"
              width="100%"
              style={{ height: '100%', minHeight: '700px' }}
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer; 
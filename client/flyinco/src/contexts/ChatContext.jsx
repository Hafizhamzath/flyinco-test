import React from 'react';
import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Wilson',
      message: 'Hello! I need help with a flight booking.',
      time: '10:30 AM',
      role: 'Agent'
    },
    {
      id: 2,
      sender: 'Mike Johnson',
      message: 'Can you help me with visa application?',
      time: '11:15 AM',
      role: 'Customer'
    }
  ]);

  const [onlineUsers] = useState([
    { id: 1, name: 'Sarah Wilson', role: 'Agent', status: 'online' },
    { id: 2, name: 'Mike Johnson', role: 'Customer', status: 'online' },
    { id: 3, name: 'Emily Davis', role: 'Manager', status: 'away' },
    { id: 4, name: 'David Brown', role: 'Agent', status: 'online' }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (message) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: 'Admin'
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <ChatContext.Provider value={{
      isOpen,
      messages,
      onlineUsers,
      toggleChat,
      sendMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
};
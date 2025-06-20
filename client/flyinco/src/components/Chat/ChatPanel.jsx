import React, { useState } from 'react';
import { FiX, FiSend, FiUsers } from 'react-icons/fi';
import { useChat } from '../../contexts/ChatContext';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/ChatPanel.css'; // import the CSS

const ChatPanel = () => {
  const { isOpen, messages, onlineUsers, toggleChat, sendMessage } = useChat();
  const { t } = useLanguage();
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('messages');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h3>{t('chat')}</h3>
        <button onClick={toggleChat} className="chat-close-btn">
          <FiX />
        </button>
      </div>

      <div className="chat-tabs">
        <button
          className={`chat-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
        <button
          className={`chat-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FiUsers className="icon" />
          {t('onlineUsers')} ({onlineUsers.filter(u => u.status === 'online').length})
        </button>
      </div>

      <div className="chat-body">
        {activeTab === 'messages' ? (
          <>
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className="message-block">
                  <div className="message-meta">
                    <span className="sender">{message.sender}</span>
                    <span className="time">{message.time}</span>
                  </div>
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t('typeMessage')}
                className="chat-input"
              />
              <button type="submit" className="chat-send-btn">
                <FiSend />
              </button>
            </form>
          </>
        ) : (
          <div className="chat-users">
            {onlineUsers.map((user) => (
              <div key={user.id} className="user-entry">
                <div className="avatar">
                  <span>{user.name.charAt(0)}</span>
                  <div
                    className={`status ${user.status === 'online' ? 'online' : 'offline'}`}
                  ></div>
                </div>
                <div className="user-info">
                  <p className="name">{user.name}</p>
                  <p className="role">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;

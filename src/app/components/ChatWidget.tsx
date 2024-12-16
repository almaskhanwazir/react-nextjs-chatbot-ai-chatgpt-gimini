'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatWidget.module.css';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const suggestions = [
  { text: 'What are your business hours?', answer: 'Our business hours are 9 AM to 5 PM, Monday to Friday.' },
  { text: 'How can I track my order?', answer: 'You can track your order using the tracking ID provided in your confirmation email.' },
  { text: 'What is your refund policy?', answer: 'Our refund policy allows you to return items within 30 days of purchase.' },
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [availableSuggestions, setAvailableSuggestions] = useState(suggestions);
  const [isBotTyping, setIsBotTyping] = useState(false); // State for typing indicator
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (message: string, suggestionPicked = false) => {
    const newMessage: Message = { sender: 'user', text: message };
    setMessages((prev) => [...prev, newMessage]);

    // Set the bot typing indicator
    setIsBotTyping(true);

    // Check if a suggestion was picked and provide an answer directly
    if (suggestionPicked) {
      const suggestionAnswer = availableSuggestions.find(suggestion => suggestion.text === message)?.answer;
      if (suggestionAnswer) {
        setMessages((prev) => [...prev, { sender: 'bot', text: suggestionAnswer }]);
        setIsBotTyping(false);
        return;
      }
    }

    // Make an API call if no suggestion or custom message
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, suggestionPicked }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
      setIsBotTyping(false); // Hide typing indicator after response
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Something went wrong. Please try again.' }]);
      setIsBotTyping(false); // Hide typing indicator on error
    }
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      sendMessage(userMessage);
      setUserMessage('');
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    sendMessage(suggestionText, true);
    // Remove the suggestion that was picked
    setAvailableSuggestions(prev => prev.filter(suggestion => suggestion.text !== suggestionText));
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.chatWidget}>
      {!isOpen && <div
        className={styles.icon}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        💬
      </div>}

      {isOpen && (
        <div className={styles.chatBox}>

          <div className={styles.header}>Chat with us!  <div className={styles.close} onClick={() => setIsOpen((prev) => !prev)}>

            <div className={`${styles.line} ${styles.lineone}`}></div>
            <div className={`${styles.line} ${styles.linetwo}`}></div>
          </div></div>
          <div className={styles.body}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
              >
                {msg.text}
              </div>
            ))}
            {isBotTyping && (
              <div className={styles.botTyping}>...typing</div> // Typing indicator
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.suggestions}>
            {availableSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                className={styles.suggestion}
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                {suggestion.text}
              </button>
            ))}
          </div>
          <div className={styles.footer}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

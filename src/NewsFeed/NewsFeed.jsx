import React, { useState, useEffect, useRef } from 'react';
import StatusIndicator from '../StatusIndicator';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import ActionButtons from '../ActionButtons';

const NewsFeed = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('disconnected');
  const [warning, setWarning] = useState('');

  const ws = useRef(null);

  const connectWebSocket = () => {
    const socket = new WebSocket('ws://echo.websocket.events');

    socket.onopen = () => {
      setStatus('connected');
      setWarning('');
    };

    socket.onmessage = (event) => {
      const newMessage = {
        text: event.data,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [newMessage, ...prev]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      setStatus('disconnected');
    };

    ws.current = socket;
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleSend = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      setWarning('⚠️ Reconnect to re-establish connection');
      return;
    }
    if (input.trim()) {
      ws.current.send(input.trim());
      setInput('');
      setWarning('');
    }
  };

  const clearMessages = () => setMessages([]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-4'>
      <div className='flex gap-6 flex-col sm:flex-row w-full max-w-5xl'>
        <div className='flex flex-col justify-center w-full sm:w-1/2'>
          <h1 className='text-2xl font-bold mb-4'>Real-Time Newsfeed</h1>

          <StatusIndicator status={status} />

          <MessageInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
          />

          {warning && (
            <div className='text-yellow-600 bg-yellow-100 border border-yellow-400 p-2 rounded mb-4'>
              {warning}
            </div>
          )}

          <div className='flex gap-2 mb-2'>
            <ActionButtons action='clear' onClick={clearMessages} />
            <ActionButtons action='reconnect' onClick={connectWebSocket} />
          </div>
        </div>

        <div className='flex items-center justify-center w-full sm:w-1/2'>
        <MessageList messages={messages} />

        </div>
      </div>
    </div>
  );
};

export default NewsFeed;

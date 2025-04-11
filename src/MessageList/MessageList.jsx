import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className='min-w-[300px] max-w-[400px]'>
      {messages.length === 0 ? (
        <div className='bg-gray-100 p-2 rounded shadow-sm text-sm text-center'>
          No messages yet. Send something!
        </div>
      ) : (
        <ul className='space-y-2'>
          {messages.map((msg, index) => (
            <li key={index} className='bg-gray-100 p-2 rounded shadow-sm'>
              <div className='text-sm'>{msg.text}</div>
              <div className='text-xs text-gray-500'>{msg.timestamp}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;

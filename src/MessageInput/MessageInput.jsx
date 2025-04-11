import React from 'react';
import ActionButtons from '../ActionButtons';

const MessageInput = ({ input, setInput, handleSend }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='flex items-center gap-2 mb-2'>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className='flex-1 border rounded px-3 py-2'
        placeholder='Type a message...'
      />
      <ActionButtons action='echo' onClick={handleSend}>
        Echo Message
      </ActionButtons>
    </div>
  );
};

export default MessageInput;

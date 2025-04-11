import React from 'react';

const StatusIndicator = ({ status }) => {
  return (
    <div className='mb-4'>
      Status:{' '}
      <span
        className={
          status === 'connected'
            ? 'text-green-600 font-semibold'
            : 'text-red-500 font-semibold'
        }
      >
        {status === 'connected' ? '🟢 Connected' : '🔴 Disconnected'}
      </span>
    </div>
  );
};

export default StatusIndicator;

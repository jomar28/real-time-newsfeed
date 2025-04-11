import React from 'react';

const actionStyles = {
  clear: 'bg-red-500 text-white',
  reconnect: 'bg-green-600 text-white',
  echo: 'bg-blue-500 text-white',
  default: 'bg-gray-400 text-white',
};

const ActionButton = ({ action, onClick }) => {
  const style = actionStyles[action] || actionStyles.default;
  const label = action.charAt(0).toUpperCase() + action.slice(1);

  return (
    <button onClick={onClick} className={`${style} px-3 py-2 rounded min-w-24 cursor-pointer`}>
      {label}
    </button>
  );
};

export default ActionButton;

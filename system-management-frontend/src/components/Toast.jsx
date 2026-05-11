import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const config = {
    success: {
      icon: '✅',
      border: 'border-blue-600',
      bg: 'bg-white',
      textColor: 'text-gray-800'
    },
    error: {
      icon: '❌',
      border: 'border-red-500',
      bg: 'bg-white',
      textColor: 'text-gray-800'
    }
  };

  const { icon, border, bg, textColor } = config[type] || config.success;

  return (
    <div className="fixed top-5 right-5 z-[150] animate-in fade-in slide-in-from-right duration-500">
      <div className={`${bg} ${border} border-l-4 shadow-2xl rounded-2xl p-4 flex items-center gap-4 min-w-[300px] border border-gray-100`}>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Notificación</p>
          <p className={`text-sm font-bold ${textColor}`}>{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-auto text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
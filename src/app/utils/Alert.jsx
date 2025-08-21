'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Alert = ({ type = 'success', message, onClose }) => {
  const alertConfig = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <XCircle className="w-5 h-5 text-red-400" />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertCircle className="w-5 h-5 text-yellow-400" />
    }
  };

  const config = alertConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-lg border ${config.bg} ${config.border} ${config.text} relative`}
    >
      <div className="flex items-center">
        {config.icon}
        <p className="ml-3 text-sm font-medium">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-gray-50"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Alert;
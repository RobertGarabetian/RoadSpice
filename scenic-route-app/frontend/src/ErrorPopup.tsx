// ErrorPopup.tsx
import React from "react";

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Error</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;

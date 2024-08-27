import React from 'react';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

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

// Explanation:
// ConfirmationDialog Component: A reusable dialog box that appears when the user attempts to delete a task. It asks for confirmation with "Cancel" and "Delete" buttons.

// State Management:

// isDialogOpen: This state determines whether the confirmation dialog is visible.
// setIsDialogOpen(true): This function is triggered when the user clicks the delete icon (HiTrash), showing the confirmation dialog.
// onClose(): This function hides the confirmation dialog without taking any action.
// onConfirm(): This function is called when the user confirms the deletion, triggering the handleDelete function.
// Deleting a Task:

// If the user confirms, the handleDelete function is executed, which removes the task from the list and closes the confirmation dialog.
// This setup ensures that tasks are not deleted accidentally, providing a more user-friendly and secure interface.
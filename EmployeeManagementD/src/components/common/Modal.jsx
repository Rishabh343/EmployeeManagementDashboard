import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button onClick={onClose} className="text-xl">
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="w-[400px] md:w-[600px] p-6 rounded-lg relative shadow-lg backdrop-blur-sm"
        style={{
        background: "linear-gradient(to bottom right, rgba(29, 78, 216, 0.5), rgba(6, 182, 212, 0.5))",
        }}
    >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-cyan-200 hover:text-white transition-colors p-2"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}

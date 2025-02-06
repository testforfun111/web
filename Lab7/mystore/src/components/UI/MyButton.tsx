import React from 'react'

export interface ButtonProps {
  name: string;
  onClick: () => void;
  disabled?: boolean;
  height?: string;
  width?: string;
  className?: string;
}

export const MyButton: React.FC<ButtonProps> = ({ 
  name, 
  onClick, 
  disabled, 
  height = "auto", 
  width = "auto",
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ height, width }}
      className={`bg-[#A06945] gap-40 hover:bg-[#A06945]/80 text-white px-6 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <span className="text-center">{name}</span>
    </button>
  );
};

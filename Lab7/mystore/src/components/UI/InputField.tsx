import React from 'react';

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    labelWidth?: string;
    inputWidth?: string;
    inputHeight?: string;
    disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ 
    label, 
    value, 
    onChange, 
    type = "text",
    labelWidth = "100px",
    inputWidth = "200px", 
    inputHeight = "40px",
    disabled = false
}) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <label 
                className="text-gray-700 text-[20px] font-sans"
                style={{ minWidth: labelWidth }}
            >
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                style={{
                    width: inputWidth,
                    height: inputHeight
                }}
                className="bg-[#D9D9D9] px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </div>
    );
};
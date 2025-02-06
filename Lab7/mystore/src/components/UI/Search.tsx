import React from 'react'
import searchIcon from '../../assets/search.svg';

export interface SearchProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClick: () => void;
	placeholder?: string;
}

export const Search: React.FC<SearchProps> = ({value, onChange, onClick, placeholder = "Search..."}) => {
  return (
    <div className="relative flex items-center w-[32rem]">
      <input 
        type="text"
        className="w-[32rem] px-4 py-2 pl-4 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button 
        className="right-2 p-2 bg-[#F56F18] hover:bg-[#F56F18]/80 rounded-full transition-colors"
        onClick={onClick}
      >
        <img src={searchIcon} alt="Search" className="w-5 h-5"/>
      </button>
    </div>
  );
};
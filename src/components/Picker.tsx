import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface PickerProps {
  label: string;
  options: { key: string; label: string }[];
  onChange?: (selectedKey: string) => void;
}

const Picker: React.FC<PickerProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: { key: string; label: string }) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.key);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-between w-full px-4 py-2 text-sm text-turq-3 border border-gray-500 shadow-sm cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </div>
      {isOpen ? (
        <div className="fixed inset-0 z-10" onClick={handleClickOutside}>
          <div className="absolute inset-0 bg-gray-800 bg-opacity-70" />
          <div
            className="absolute bottom-0 inset-x-0 w-full shadow-lg text-gray-300 bg-turq-5"
            ref={dropdownRef}
          >
            {options.map((option) => (
              <div
                key={option.key}
                className="px-4 py-4 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Picker;

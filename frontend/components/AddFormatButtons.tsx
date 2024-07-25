"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddFormatButtons: React.FC<{
    onClickPlus: () => void;
    dropdownItems: any[];
    onSelectFormat: (format: any) => void;
}> = ({ onClickPlus, dropdownItems, onSelectFormat }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState<any | null>(null);
    const dropdownRef = useRef(null);

    const handleSelectFormat = (format: any) => {
        setSelectedFormat(format);
        onSelectFormat(format);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={() => {
                    onClickPlus();
                    closeDropdown();
                }}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-green-600 transition duration-300"
            >
                <FaPlus />
                <span> Nuevo Formato</span>
            </button>

            <div ref={dropdownRef} className="relative inline-block text-left">
                <button
                    onClick={handleDropdownToggle}
                    type="button"
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black-100 hover:bg-black-100 focus:outline-none focus:ring focus:ring-gray-300-200 active:bg-gray-500-800"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                >
                    Seleccionar Formato
                </button>

                {isDropdownOpen && (
                    <div
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <div className="py-1" role="none">
                            {dropdownItems.map((item, index) => (
                                <button
                                    key={index}
                                    className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                                        selectedFormat && selectedFormat.id === item.id ? 'bg-gray-200' : ''
                                    } text-left`}
                                    role="menuitem"
                                    onClick={() => {
                                        handleSelectFormat(item);
                                        closeDropdown();
                                    }}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddFormatButtons;


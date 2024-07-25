"use client"
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAmountUp, faSortNumericDown } from '@fortawesome/free-solid-svg-icons';

const SortingFilters = ({ onSortChange, onUnitChange }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onSortChange('name-asc')}>
                    <span>Nombre</span>
                    <FontAwesomeIcon icon={faSortAlphaDown} />
                </div>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onSortChange('weighable-asc')}>
                    <span>Peso</span>
                    <FontAwesomeIcon icon={faSortNumericDown} />
                </div>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onSortChange('pvp-asc')}>
                    <span>Precio</span>
                    <FontAwesomeIcon icon={faSortAmountUp} />
                </div>
            </div>
            <div className="flex items-center space-x-4 sm:mt-0">
                <span>Unidad:</span>
                <select
                    onChange={(e) => onUnitChange(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                >
                    <option value="">All</option>
                    <option value="kg">kg</option>
                    <option value="gr">gr</option>
                    <option value="ml">ml</option>
                </select>
            </div>
        </div>
    );
};

export default SortingFilters;


"use client"

import React from 'react';
import {CustomButtonProps} from "@/types";

const CustomButton = ({title, containerStyles, handleClick, btnType, disabled}:CustomButtonProps) => {
    return (
        <button
            disabled={disabled}
            type={btnType || 'button'}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className="flex-1">
                {title}
            </span>

        </button>
    );
};

export default CustomButton;
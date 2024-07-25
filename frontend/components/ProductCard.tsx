"use client";
import React, { useState } from 'react';
import { ProductCardProps } from "@/types";
import ContactDetailsPopUp from "@/components/ContactDetailsPopUp";

const ProductCard = ({ name, description_short, description_long, image, pvp, unit, providerName, contacts }: ProductCardProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    console.log(contacts);
    const handleMoreDetails = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className="w-full bg-white shadow-md rounded-xl overflow-hidden mb-4 relative border border-gray-300 transition duration-300 transform hover:scale-105">
            <a href="#" className="flex flex-col sm:flex-row items-center">
                <img
                    src={image}
                    alt={name}
                    className="h-40 w-full sm:w-1/3 object-cover rounded-l-xl ml-6 mr-6 sm:rounded-t-xl"
                />
                <div className="p-4 w-2/3">
                    <p className="text-lg font-bold text-black mb-2">{name}</p>
                    <p className="text-lg font-bold text-black mb-2">{providerName}</p>
                    <p className="text-gray-600 mb-4">{description_short}</p>
                    <p className="text-gray-800">{description_long}</p>
                    <div className="mt-4 flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto">Unit: {unit}</p>
                    </div>
                    <div className="mt-4 flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto">{pvp} €</p>
                    </div>
                </div>
            </a>
            <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                <button
                    onClick={handleMoreDetails}
                    className="bg-black text-white p-2 rounded-lg ml-2"
                >
                    Informacion del proveedor
                </button>
            </div>
            <ContactDetailsPopUp isOpen={isPopupOpen} onClose={handleMoreDetails} contacts={contacts} />
        </div>
    );
};

export default ProductCard;

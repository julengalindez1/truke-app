"use client"
import React, { useEffect } from 'react';

const ContactDetailsPopup = ({ isOpen, onClose, contacts }) => {

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && !event.target.closest('.popup-content')) {
                onClose();
            }
        };

        document.body.addEventListener('click', handleOutsideClick);

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md max-w-md popup-content">
                {contacts.map((contact, index) => (
                    <div key={contact.id} className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-bold">{index+1}. Contact Details</h2>
                            <button className="text-gray-500" onClick={onClose}>
                                &times;
                            </button>
                        </div>
                        <div className="mb-2">
                            <strong>{contact.type}: </strong>
                            {contact.name}
                        </div>
                        <div>
                            <strong>Disponibilidad: </strong>
                            {contact.schedule}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactDetailsPopup;

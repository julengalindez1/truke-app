"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/hooks/auth";
import { fecthAllContacts } from "@/utils";
import ContactsTable from "@/components/ContactsTable";
import {ContactDetailsForm} from "@/components/index";

const ContactDashboard = () => {
    const { user } = useAuth({ middleware: 'guest' });
    const [activeTab, setActiveTab] = useState('home');
    const [allContacts, setAllContacts] = useState([]);
    const [error, setError] = useState(null);
    const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
    const providerId = user?.provider_id;
    const hasContacts = allContacts.some(contact => contact.provider_id === providerId);
    const filteredContacts = allContacts.filter(contact => contact.provider_id === providerId);
    const numberOfContacts = getNumberOfContacts(filteredContacts);

    const triggerFetchAllContacts = async () => {
        try {
            const allContacts = await fecthAllContacts();
            console.log(allContacts);
            setAllContacts(allContacts);
            setError(null);
        } catch (error) {
            console.error('Error fetching all contacts:', error);
            setError('Error while fetching contacts');
        }
    };

    useEffect(() => {
        triggerFetchAllContacts();
    }, [activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedContactId(null);
    };

    const handleContactSelect = (contactId) => {
        setSelectedContactId(contactId);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">
                            {hasContacts ? `Dispones del siguiente número de contactos: ${numberOfContacts}` : 'Todavia no disponemos de tu informacion de contacto.'}
                        </h2>
                    </div>
                );
            case 'edit':
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">Edita los contactos disponibles</h2>
                        {selectedContactId ? (
                            <ContactDetailsForm contactId={selectedContactId} />
                        ) : (
                            <ContactsTable onContactSelect={handleContactSelect} showDropdown={activeTab === 'edit'} />
                        )}
                    </div>
                );
            case 'add':
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">Añade contactos</h2>
                        <ContactDetailsForm />
                    </div>
                );
            case 'contact':
            default:
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                        {providerId ? (
                            <ContactsTable showDropdown={false} onContactSelect={() => {}} />
                        ) : (
                            <p>Todavia no disponemos de tu informacion de contacto.</p>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <div className="flex bg-gray-200 p-4 mb-4 rounded">
                <button onClick={() => handleTabChange('home')} className={`flex-1 px-4 py-2 text-center cursor-pointer ${activeTab === 'home' ? 'bg-black-100 text-white' : ''}`}>
                    Home
                </button>
                <button onClick={() => handleTabChange('contact')} className={`flex-1 px-4 py-2 text-center cursor-pointer ${activeTab === 'contact' ? 'bg-black-100 text-white' : ''}`}>
                    Contacts
                </button>
                <button onClick={() => handleTabChange('add')} className={`flex-1 px-4 py-2 text-center cursor-pointer ${activeTab === 'add' ? 'bg-black-100 text-white' : ''}`}>
                    Add
                </button>
                <button onClick={() => handleTabChange('edit')} className={`flex-1 px-4 py-2 text-center cursor-pointer ${activeTab === 'edit' ? 'bg-black-100 text-white' : ''}`}>
                    Edit
                </button>
            </div>
            <div className="bg-white border rounded p-4">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default ContactDashboard;

const getNumberOfContacts = (contacts) => {
    return contacts.length;
};


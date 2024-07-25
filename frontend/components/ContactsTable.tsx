"use client"

import React, {useEffect, useState} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {fecthAllContacts} from "@/utils";
import {useAuth} from "@/hooks/auth";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'schedule', headerName: 'Disponibilidad', width: 150 },
];

interface ContactsTableProps {
    onContactSelect: (contactId: number) => void;
    showDropdown: boolean;
}

const ContactsTable: React.FC<ContactsTableProps> = ({ onContactSelect, showDropdown }) => {
    const { user } = useAuth({ middleware: 'guest' });
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContactId, setSelectedContactId] = useState<number | string>('');
    const providerId = user?.provider_id;

    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);

    const fetchAllContacts = async () => {
        try {
            const allContacts = await fecthAllContacts();
            setAllContacts(allContacts);
            const contactsByProviderId = allContacts.filter((contact) => contact.provider_id === providerId);
            const rows = contactsByProviderId.map((item, index) => ({
                id: index + 1,
                name: item.name,
                type: item.type,
                schedule: item.schedule
            }));
            setRows(rows);
            setError(null);
        } catch (error) {
            console.error('Error fetching all products:', error);
            setError('Error while fetching products');
        }
    };

    useEffect(() => {
        fetchAllContacts();
    }, []);

    const handleContactSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        const contactId = event.target.value as number;
        setSelectedContactId(contactId);
        onContactSelect(contactId);
    };

    return (
        <div>
            {showDropdown && (
                <Select value={selectedContactId || ''} onChange={handleContactSelect} displayEmpty>
                    <MenuItem value="" disabled>
                        Select a contact
                    </MenuItem>
                    {rows.map((contact) => (
                        <MenuItem key={contact.id} value={contact.id}>
                            {contact.name}
                        </MenuItem>
                    ))}
                </Select>
            )}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100]}
                    checkboxSelection
                    disableColumnMenu
                />
            </div>
        </div>
    );
};

export default ContactsTable;

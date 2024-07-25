"use client"

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSearchParams } from 'next/navigation';
import { fecthProducts } from '@/utils';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description_short', headerName: 'Description', width: 200 },
    { field: 'image', headerName: 'Image', width: 90 },
];

interface ProductsTableProps {
    onProductSelect: (productId: number) => void;
    showDropdown: boolean;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ onProductSelect, showDropdown }) => {
    const searchParams = useSearchParams();
    const providerIdString = searchParams.get('providerId');
    const providerId: number = parseInt(providerIdString, 10);

    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState<number | string>('');


    const fetchAllProducts = async () => {
        try {
            const allProducts = await fecthProducts();
            const productsByProviderId = allProducts.filter((product) => product.provider_id === providerId);
            const rows = productsByProviderId.map((item, index) => ({
                id: index + 1,
                name: item.name,
                description_short: item.description_short,
                image: item.image,
                productId: item.id,
            }));
            setRows(rows);
            setError(null);
        } catch (error) {
            console.error('Error fetching all products:', error);
            setError('Error while fetching products');
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const handleProductSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        const productId = event.target.value as number;
        setSelectedProductId(productId);
        onProductSelect(productId);
    };

    return (
        <div>
            {showDropdown && (
                <Select value={selectedProductId || ''} onChange={handleProductSelect} displayEmpty>
                    <MenuItem value="" disabled>
                        Select a product
                    </MenuItem>
                    {rows.map((product) => (
                        <MenuItem key={product.productId} value={product.productId}>
                            {product.name}
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

export default ProductsTable;

"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {fecthAllProviders, fecthProducts} from '@/utils';

const Statsbar = () => {
    const [products, setProducts] = useState([]);
    const [numberOfProducts, setNumberOfProducts] = useState(null);
    const [numberOfProvider, setNumberOfProviders] = useState(null);
    const [numberOfUsers, setNumberOfUsers] = useState(null);
    const [error, setError] = useState(null);

    const fetchAllProducts = async () => {
        try {
            const allProducts = await fecthProducts();
            setProducts(allProducts);
            setNumberOfProducts(allProducts.length);
            setError(null);
        } catch (error) {
            console.error('Error fetching all products:', error);
            setError('Error while fetching products');
        }
    };
    const fetchAllProviders = async () => {
        try {
            const allProviders = await fecthAllProviders();
            setNumberOfProviders(allProviders.length);
            setError(null);
        } catch (error) {
            console.error('Error fetching all products:', error);
            setError('Error while fetching products');
        }
    };


/*    const fetchAllUsers = async () => {
        try {
            const allUsers = await fetchUsers();
            setNumberOfUsers(allUsers.length);
            setError(null);
        } catch (error) {
            console.error('Error fetching all users:', error);
            setError('Error while fetching users');
        }
    };*/

    useEffect(() => {
        fetchAllProducts();
        fetchAllProviders();
        /*fetchAllUsers();*/
    }, []);


    const categoryStyle =
        'basis-1/4 flex flex-col items-center p-4 transition-transform transform-gpu hover:scale-105 hover:bg-gray-100 shadow-md';

    return (
        <div className="flex flex-row mt-10 ml-2 pb-10">
            <div className={categoryStyle}>
                <Image
                    src="/consumidores-icon.svg"
                    alt="consumidores-icon"
                    width={50}
                    height={50}
                />
                <span className="mt-2 text-lg font-bold">Users</span>
                <span className="text-sm">Total: {numberOfUsers}</span>
            </div>
            <div className={categoryStyle}>
                <Image
                    src="/products-icon.svg"
                    alt="products-icon"
                    width={50}
                    height={50}
                />
                <span className="mt-2 text-lg font-bold">Products</span>
                <span className="text-sm">Total: {numberOfProducts}</span>
            </div>
            <div className={categoryStyle}>
                <Image
                    src="/proveedores-icon.svg"
                    alt="providers-icon"
                    width={50}
                    height={50}
                />
                <span className="mt-2 text-lg font-bold">Providers</span>
                <span className="text-sm">Total: {numberOfProvider}</span>
            </div>
            <div className={categoryStyle}>
                <Image
                    src="/location-icon.svg"
                    alt="locations-icon"
                    width={50}
                    height={50}
                />
                <span className="mt-2 text-lg font-bold">Locations</span>
                <span className="text-sm">Total: </span>
            </div>
        </div>
    );
};

export default Statsbar;
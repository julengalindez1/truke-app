"use client";
import React, { Fragment, useState, useEffect } from 'react';
import CustomButton from "@/components/CustomButton";
import { Combobox, Transition } from '@headlessui/react';
import {fecthProducts, fecthProductByName} from "@/utils";
import { useRouter } from 'next/navigation';

const Searchbar = () => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);

    const fetchAllProducts = async () => {
        try {
            const allProducts = await fecthProducts();
            setProducts(allProducts);
            setError(null);
        } catch (error) {
            console.error('Error fetching all products:', error);
            setError('Error while fetching products');
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const filteredProducts =
        query === ""
            ? products
            : products?.filter((product) =>
                product.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            );

    const handleSearch = async () => {
        let categoryId = null;
        try {
            const productByName = await fecthProductByName(searchInput);
            categoryId = productByName[0].category_id;
        }
        catch (error) {
            console.error('Error fetching product by name:', error);
        }
        const url = `/searchResults?${encodeURIComponent('categoryId')}=${encodeURIComponent(categoryId)}${encodeURIComponent('search')}=${encodeURIComponent(searchInput)}&`;
        router.push(url);
    };

    return (
        <div className="mb-3 pb-10">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <Combobox
                    value={selectedProduct}
                    onChange={(selected) => {
                        setSelectedProduct(selected);
                        setSearchInput(selected ? selected.name : "");
                        setQuery("");
                    }}>
                    <Combobox.Input
                        value={searchInput}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setSearchInput(event.target.value);
                        }}
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-black focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        displayValue={query != null ? query : ""}
                    />
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options
                            className="absolute w-full top-10 mt-2 space-y-1 overflow-auto text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[9999]"
                        >
                            {filteredProducts?.map((product) => (
                                <Combobox.Option
                                    key={product.id}
                                    className={({ active }) =>
                                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                            active ? "text-black bg-gray-100" : "text-gray-900"}`
                                    }
                                    value={product}>
                                    {({ selected, active }) => (
                                        <>
                                      <span
                                          className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                                      >
                                        {product.name}
                                      </span>
                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-black" : "text-white"}`}></span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>

                    </Transition>
                </Combobox>
                <CustomButton
                    title="Buscar"
                    containerStyles="bg-black text-white relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:text-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                    btnType="button"
                    handleClick={handleSearch}
                    disabled={false}
                />
            </div>
        </div>
    );
};

export default Searchbar;

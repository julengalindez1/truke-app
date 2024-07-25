"use client";
import React, {useEffect, useState} from 'react';
import {
    applySortingFilters,
    fecthAllFormats, fecthAllVariants,
    fecthProductByCategoryId, mergeProductsAndFormatsByVariants,
    searchProducts,
    sortProductsDefault
} from "@/utils";
import { useRouter, useSearchParams} from 'next/navigation';
import ProductCard from "@/components/ProductCard";
import SortingFilters from "@/components/SortingFilters";

const SearchResults = () => {

    const [products, setProducts] = useState([]);
    const [formats, setFormats] = useState([]);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [unitMeasureFilter, setUnitMeasureFilter] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');

    const fetchAndPrepareProductsToShow = async () => {
        try {
            let sortedProducts;
            const additionalProducts = await fecthProductByCategoryId(categoryId);
            console.log("additional: " + additionalProducts);
            const allProducts = [...additionalProducts, ...await searchProducts(search)];
            //const allProducts = await searchProducts(search);
            // const allProducts = await fecthProductByCategoryId(categoryId);

            const allFormats = await fecthAllFormats();
            const allVariants = await fecthAllVariants();
    
            const allProductsWithCompleteInfo= mergeProductsAndFormatsByVariants(allProducts, allFormats, allVariants);

            const filteredProducts = allProductsWithCompleteInfo.filter(product => {
                return unitMeasureFilter === null || unitMeasureFilter === "" || product.unit_measure === unitMeasureFilter
            });

            if(sortBy !== null)
            {
                console.log("Sorted by applying user filter: " + sortBy);
                sortedProducts = applySortingFilters(filteredProducts, sortBy);
            } else {
                sortedProducts = filteredProducts;
            }

            console.log("complete sorted products" + sortedProducts);
            setProducts(sortedProducts);
            setFormats(allFormats);
            setError(null);

        } catch (error) {
            console.error('Error fetching:', error);
            setError('Error while fetching products');
        }
    };

    useEffect(() => {
        fetchAndPrepareProductsToShow();
    }, [sortBy, unitMeasureFilter]); // Re-fetch when the sorting changes

    return (
        <div className="mt-10 pb-10 flex justify-center items-center min-h-screen">
            <div className="xl:max-w-[1250px] lg:max-w-[750px] sm:w-full sm:px-8 px-6 py-4 border border-gray-300 rounded-md bg-white bg-opacity-80 shadow-xl">
                <SortingFilters
                    onSortChange={(sortOption) => setSortBy(sortOption)}
                    onUnitChange={(unitMeasure) => setUnitMeasureFilter(unitMeasure)}
                />
                {error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    products.map((productData) => {
                        console.log(productData.provider);
                        console.log(productData.provider.contacts);
                        return (
                            <ProductCard
                                key={productData.id}
                                name={productData.name}
                                description_short={productData.description_short}
                                description_long={productData.description_long}
                                image={productData.image}
                                provider_id={productData.provider_id}
                                pvp={productData.pvp}
                                unit={productData.unit_measure}
                                providerName={productData.provider.name}
                                contacts={productData.provider.contacts}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default SearchResults;

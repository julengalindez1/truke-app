"use client";

import React, { useEffect, useState } from 'react';
import ProductDetailsForm from "@/components/ProductDetailsForm";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { fecthAllFormats, fecthProducts, saveNewVariant } from "@/utils";
import ProductsTable from "@/components/ProductsTable";
import {FormatDetailsForm, SuccessWindow} from "@/components/index";
import AddFormatButtons from "@/components/AddFormatButtons";
import CustomButton from "@/components/CustomButton";
import {Alert} from "@mui/material";

const ProviderDashboard = () => {
    const { user } = useAuth({ middleware: 'guest' });

    const providerName = user?.name;
    const searchParams = useSearchParams();
    const providerIdString = searchParams.get('providerId');
    const providerId: number = parseInt(providerIdString, 10);

    const [activeTab, setActiveTab] = useState('home');
    const [providerProducts, setProviderProducts] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [selectedProductIdFormat, setSelectedProductIdFormat] = useState<number | null>(null);
    const [isNewFormat, setIsNewFormat] = useState(false);
    const [isExistingFormat, setIsExistingFormat] = useState(false);
    const [existingFormats, setExistingFormats] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState<any | null>(null);
    const [pvpInputVisible, setPvpInputVisible] = useState(false);
    const [pvpValue, setPvpValue] = useState('');

    const getAllProducts = async () => {
        try {
            const allProducts = await fecthProducts();
            const productsByProviderId = allProducts.filter(product => product.provider_id === providerId);
            setProviderProducts(productsByProviderId);
            setError(null);
        } catch (error) {
            console.error('Error fetching all products:', error);
            setError('Error while fetching products');
        }
    };

    const getAllFormats = async () => {
        try {
            const allFormats = await fecthAllFormats();
            setExistingFormats(allFormats);
        } catch (error) {
            console.error('Error fetching all formats:', error);
            setError('Error while fetching formats');
        }
    };

    useEffect(() => {
        getAllProducts();
        getAllFormats();
    }, [activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedProductId(null);
        setSelectedProductIdFormat(null);
        setIsNewFormat(false);
        setPvpInputVisible(false);
        setIsSuccess(false);
        setPvpValue('');
    };

    const onClickPlus = () => {
        setIsNewFormat(true);
        setPvpInputVisible(false);
        setIsSuccess(false);
        setPvpValue('');
    };

    const handlePvpInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPvpValue(event.target.value);
    };

    const handleProductSelect = (productId) => {
        setSelectedProductId(productId);
    };

    const handleProductSelectFormat = (productId) => {
        setSelectedProductIdFormat(productId);
    };

    const handleSelectFormat = async (format: any) => {
        setIsNewFormat(false);
        setIsExistingFormat(true);
        setSelectedFormat(format);
        setPvpInputVisible(true);
    };

    const handleSaveNewVariant = async () => {
        console.log(selectedProductIdFormat);
        if (pvpValue.trim() === '' || !selectedProductIdFormat || !selectedFormat) {
            return;
        }

        const variantRequest = {
            product_id: selectedProductIdFormat,
            format_id: selectedFormat.id,
            pvp: pvpValue,
        };

        console.log('Variant Request:', variantRequest);

        try {
            const response = await saveNewVariant(variantRequest);
            console.log(response.status);
            if (response.status === 201) {
                setIsSuccess(true);
                setError(false);
                setPvpValue('');
            } else {
                throw new Error("Failed to submit the data. Please try again.");
            }
        } catch (error) {
            setError(true);
            setIsSuccess(false);
            console.error('Error saving new variant:', error);
        }
    };

    const renderSuccessMessage = () => {
        return (
            <SuccessWindow message={'El formato se ha introducido correctamente'} />
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'createProduct':
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">Introduce un nuevo producto</h2>
                        <ProductDetailsForm />
                    </div>
                );
            case 'updateProduct':
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-10">Modifica un producto existente</h2>
                        {selectedProductId ? (
                            <ProductDetailsForm productId={selectedProductId} />
                        ) : (
                            <ProductsTable onProductSelect={handleProductSelect} showDropdown={activeTab === 'updateProduct'} />
                        )}
                    </div>
                );
            case 'addFormat':
                return (
                    <div>
                        {selectedProductIdFormat ? (
                            <div>
                                <AddFormatButtons
                                    onClickPlus={onClickPlus}
                                    dropdownItems={existingFormats}
                                    onSelectFormat={handleSelectFormat}
                                />
                                {isNewFormat ? <FormatDetailsForm productId={selectedProductIdFormat} /> : null}
                                {isSuccess && renderSuccessMessage()}
                                {error && <Alert severity="error">An error has occurred. Please review the entered values and try again.</Alert>}
                                {isExistingFormat && pvpInputVisible ? (
                                    <div>
                                        {!isSuccess && (
                                            <div>
                                                <label htmlFor="pvpInput" className="block m-2 text-sm font-medium text-gray-700">
                                                    PVP:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="pvpInput"
                                                    name="pvpInput"
                                                    value={pvpValue}
                                                    onChange={handlePvpInputChange}
                                                    className="w-full p-2 border rounded-md"
                                                />
                                                <CustomButton
                                                    title="Guardar"
                                                    btnType="submit"
                                                    containerStyles="!py-2 !px-2 text-black border-2 border-black rounded-lg"
                                                    handleClick={handleSaveNewVariant}
                                                    disabled={false}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        ) : (
                            <ProductsTable onProductSelect={handleProductSelectFormat} showDropdown={activeTab === 'addFormat'} />
                        )}
                    </div>
                );
            default:
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">Bienvenido a tu administrador de productos, {providerName} !</h2>
                        <p className="mb-5">Número de productos: {providerProducts.length} </p>
                        <ProductsTable onProductSelect={handleProductSelect} showDropdown={activeTab === 'updateProduct'} />
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
                <button onClick={() => handleTabChange('createProduct')} className={`flex-1 px-4 py-2 text-center cursor-pointer ${activeTab === 'createProduct' ? 'bg-black-100 text-white' : ''}`}>
                    Introducir producto
                </button>
                <button onClick={() => handleTabChange('addFormat')} className={`flex-1 px-4 py-2 text-center cursor-pointer ${activeTab === 'addFormat' ? 'bg-black-100 text-white' : ''}`}>
                    Introducir formato
                </button>
                <button onClick={() => handleTabChange('updateProduct')} className={`flex-1 px-4 py-2 text-center cursor-pointer ${activeTab === 'updateProduct' ? 'bg-black-100 text-white' : ''}`}>
                    Actualizar producto
                </button>
            </div>
            <div className="bg-white border rounded p-4">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default ProviderDashboard;

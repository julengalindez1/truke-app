"use client";

import { Formik, FormikHelpers, useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import { Alert, createTheme, TextField, ThemeProvider} from "@mui/material";
import CustomButton from "@/components/CustomButton";
import {fecthCategories, saveNewProduct, updateProductById} from "@/utils";
import {useAuth} from "@/hooks/auth";
import MenuItem from '@mui/material/MenuItem';
import {SuccessWindow} from "@/components/index";


interface FormData {
    name: string;
    description_short: string;
    description_long: string;
    image: string;
    category_id: string;
}

let validationSchema = Yup.object({
    name: Yup.string().required("Product name is required").max(100),
    description_short: Yup.string().required("Short description is required").max(100),
    description_long: Yup.string().required("Long description is required").max(500),
    image: Yup.string().required("Image is required"),
    category_id: Yup.string().required("Category is required").max(100)
});

const theme = createTheme({
    palette: {
        primary: {
            light: "#4caf50",
            main: "#2e7d32",
            dark: "#1b5e20",
            contrastText: "#000000",
        },
        secondary: {
            light: "#c8e6c9",
            main: "#388e3c",
            dark: "#1b5e20",
            contrastText: "#ffffff",
        },
        error: {
            light: "#ef9a9a",
            main: "#f44336",
            dark: "#d32f2f",
            contrastText: "#ffffff",
        },
    },
});

interface ProductDetailsFormProps {
    productId?: number | null;
}

const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({ productId }) => {
    const initialValues: FormData = {
        name: "",
        description_short: "",
        description_long: "",
        image: "",
        category_id: "",
    };

    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        ...initialValues
    });

    useEffect(() => {
        const fetchCategoriesData = async () => {
            const fetchedCategories = await fecthCategories();
            if (fetchedCategories) {
                setCategories(fetchedCategories);
            }
        };

        fetchCategoriesData();
        return () => {
            setIsSuccess(false);
            setIsUpdateSuccess(false);
        };
    }, [productId]);

    const handleSubmit = async (values: FormData, { setSubmitting }: FormikHelpers<FormData>) => {
        setError(false);
        setSubmitting(false);
        const updatedFormData = {
            ...values,
            provider_id: user?.provider_id || 0,
        };
        try {
            if (productId) {
                await updateProduct(productId, updatedFormData);
            } else {
                const response = await saveNewProduct(updatedFormData);
                console.log(response);
                if (response.status === 201) {
                    setIsSuccess(true);
                    setFormData(initialValues);
                } else {
                    throw new Error("Failed to submit the data. Please try again.");
                }
            }
        } catch (error) {
            setError(true);
            console.log(error);
        }
    };

    const updateProduct = async (productId: number, data: FormData) => {
        try {
            const formDataFilteredByNullValues = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ""));
            const response = await updateProductById(productId, formDataFilteredByNullValues);
            console.log("update response: " + response);
            if (response.status === 200) {
                setIsUpdateSuccess(true);
                setIsSuccess(true);
                setFormData(initialValues);
            } else {
                throw new Error("Failed to submit the data. Please try again.");
            }
        } catch (error) {
            setError(true);
            console.error("Error updating product:", error);
        }
    };

    // If updating a product, make all fields optional
    if (productId) {
        validationSchema = validationSchema.shape({
            name: Yup.string().max(100),
            description_short: Yup.string().max(100),
            description_long: Yup.string().max(500),
            image: Yup.string().max(100),
            category_id: Yup.string().max(100),
        });
    }


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, formikHelpers) => {
            handleSubmit(values, formikHelpers);
        },
    });


    const styles = {
        productForm:'flex flex-col',
        productFormContainer: 'pl-32 pt-16 pb-16 pr-32',
        productFormTitle: 'font-bold text-left bold py-8',
        productFormRow: 'flex justify-between flex-row flex-wrap',
        productFormItem: 'w-full sm:w-47%',
        productFormLastRow: 'block',
        productFormInput: 'w-full outline-none border-b-2 border-0 border-b-2 border-accent-primary focus:border-black font-inherit text-base',
        productFormButtonContainer: 'mt-4 font-medium text-black hover:text-grey',
        productFormButton: 'text-white border-none rounded-md px-5 py-3 text-lg cursor-pointer transition duration-300 ease-in-out',
        errorMessage: 'text-red-500 text-left text-sm mt-[-24px]',
        submitSuccessContainer: 'text-center bg-white border border-black-hover border-t-4 shadow-md p-8 mt-4 flex flex-col items-center',
        successIconLink: 'text-decoration-none',
        successIconContainer: 'mb-2',
        successIcon: 'max-w-100px mb-2',
        successMessage: 'text-18px',
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.productFormContainer}>
                {error && <Alert severity="error">An error has occurred. Please review the entered values and try again.</Alert>}
                {isSuccess || isUpdateSuccess ? (
                    <SuccessWindow message={isSuccess ? 'El producto se ha guardado correctamente. El siguiente paso es introducir un formato para este producto.' : 'El producto se ha actualizado correctamente.'} />
                ) : (
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <form className={styles.productForm} onSubmit={formik.handleSubmit}>
                                <div className={styles.productFormTitle}>
                                    <h1>Introduce los datos del nuevo producto que desea añadir.</h1>
                                </div>
                                <div className={styles["productFormRow"]}>
                                    <div className={styles["productFormItem"]}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            margin="normal"
                                            id="name"
                                            name="name"
                                            label="Product Name"
                                            color="primary"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                            className={styles.productFormInput}
                                        />
                                    </div>
                                    <div className={styles["productFormItem"]}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            margin="normal"
                                            id="description_short"
                                            name="description_short"
                                            label="Short description"
                                            value={formik.values.description_short}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.description_short && Boolean(formik.errors.description_short)}
                                            helperText={formik.touched.description_short && formik.errors.description_short}
                                            className={styles.productFormInput}
                                        />
                                    </div>
                                </div>
                                <div className={styles["productFormRow"]}>
                                    <div className={styles["productFormItem"]}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            margin="normal"
                                            id="image"
                                            name="image"
                                            label="Image"
                                            value={formik.values.image}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.image && Boolean(formik.errors.image)}
                                            helperText={formik.touched.image && formik.errors.image}
                                            className={styles.productFormInput}
                                        />
                                    </div>
                                </div>
                                <div className={styles["productFormRow"]}>
                                    <div className={styles["productFormItem"]}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            margin="normal"
                                            id="category_id"
                                            name="category_id"
                                            label="Category"
                                            select
                                            value={formik.values.category_id}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                                            helperText={formik.touched.category_id && formik.errors.category_id}
                                            className={styles.productFormInput}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                                <div className={styles["productFormLastRow"]}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        required
                                        margin="normal"
                                        multiline
                                        rows={4}
                                        id="description_long"
                                        name="description_long"
                                        label="Long description"
                                        value={formik.values.description_long}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.description_long && Boolean(formik.errors.description_long)}
                                        helperText={formik.touched.description_long && formik.errors.description_long}
                                        className={styles.productFormInput}
                                    />
                                </div>
                                <div className={styles["productFormButtonContainer"]}>
                                    <CustomButton
                                        title={isSubmitting ? "Procesando..." : "Guardar"}
                                        btnType="submit"
                                        containerStyles="!py-2 !px-2 text-black border-2 border-black rounded-lg"
                                        handleClick={formik.handleSubmit}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </form>
                        )}
                    </Formik>
                )}
            </div>
        </ThemeProvider>
    );
};

export default ProductDetailsForm;

"use client";

import { Formik, FormikHelpers, useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import { Alert, createTheme, TextField, ThemeProvider} from "@mui/material";
import CustomButton from "@/components/CustomButton";
import { saveNewFormat, saveNewVariant} from "@/utils";
import {useAuth} from "@/hooks/auth";
import { Select, MenuItem } from '@mui/material';
import {SuccessWindow} from "@/components/index";


interface FormData {
    name: string;
    size: number;
    weighable: number;
    is_divisible: boolean;
    unit_measure: string;
    pvp : string;
}

let validationSchema = Yup.object({
    name: Yup.string().required("Format name is required").max(100),
    size: Yup.string().required("Size is required").max(100),
    weighable: Yup.string().required("Weight is required").max(500),
    is_divisible: Yup.string().required("Divisible is required").max(100),
    unit_measure: Yup.string().required("Unit is required").max(100),
    pvp: Yup.string().required("Pvp is required").max(100)
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

interface FormaDetailsFormProps {
    productId?: number | null;
}

const FormatDetailsForm: React.FC<FormaDetailsFormProps> = ({ productId }) => {
    const initialValues: FormData = {
        name: "",
        size: "",
        weighable: "",
        is_divisible: "",
        unit_measure: "",
        pvp: "",
    };

    const [error, setError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [requestedPvp, setRequestedPvp] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        ...initialValues
    });

    useEffect(() => {
    }, []);

    const handleSubmit = async (values: FormData, { setSubmitting }: FormikHelpers<FormData>) => {
        setError(false);
        setSubmitting(false);

        try {
            if (productId) {
                const { pvp: requestedPvp, ...formatValues } = values;
                const data = await saveNewFormat(values);
                console.log(data);
                if (data !== null) {
                    setIsSuccess(true);
                    setFormData(initialValues);

                    const formatId = data.id;
                    const variantRequest = {
                        product_id: productId,
                        format_id: formatId,
                        pvp: requestedPvp,
                    };
                    console.log(variantRequest);
                    const variantResponse = await saveNewVariant(variantRequest);
                    console.log(variantResponse);

                } else {
                    throw new Error("Failed to submit the data. Please try again.");
                }
            }
        } catch (error) {
            setError(true);
            console.log(error);
        }
    };


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, formikHelpers) => {
            handleSubmit(values, formikHelpers);
        },
    });


    const styles = {
        formatForm:'flex flex-col',
        formatFormContainer: 'pl-32 pt-16 pb-16 pr-32',
        formatFormTitle: 'font-bold text-left bold py-8',
        formatFormRow: 'flex justify-between flex-row flex-wrap',
        formatFormItem: 'w-full sm:w-47%',
        formatFormLastRow: 'block',
        formatFormInput: 'w-full outline-none border-b-2 border-0 border-b-2 border-accent-primary focus:border-black font-inherit text-base',
        formatFormButtonContainer: 'mt-4 font-medium text-black hover:text-grey',
        formatFormButton: 'text-white border-none rounded-md px-5 py-3 text-lg cursor-pointer transition duration-300 ease-in-out',
        errorMessage: 'text-red-500 text-left text-sm mt-[-24px]',
        submitSuccessContainer: 'text-center bg-white border border-black-hover border-t-4 shadow-md p-8 mt-4 flex flex-col items-center',
        successIconLink: 'text-decoration-none',
        successIconContainer: 'mb-2',
        successIcon: 'max-w-100px mb-2',
        successMessage: 'text-18px',
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.formatFormContainer}>
                {error && <Alert severity="error">An error has occurred. Please review the entered values and try again.</Alert>}
                {isSuccess ? (
                    <SuccessWindow message={'El formato se ha guardado correctamente.'} />
                ) : (
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <form className={styles.formatForm} onSubmit={formik.handleSubmit}>
                                <div className={styles.formatFormTitle}>
                                    <h1>Nuevo formato.</h1>
                                </div>
                                <div className={styles["formatFormRow"]}>
                                    <div className={styles["formatFormItem"]}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            margin="normal"
                                            id="name"
                                            name="name"
                                            label="Format Name"
                                            color="primary"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                            className={styles.formatFormInput}
                                        />
                                    </div>
                                    <div className={styles["formatFormItem"]}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            margin="normal"
                                            id="size"
                                            name="size"
                                            label="Size"
                                            value={formik.values.size}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.size && Boolean(formik.errors.size)}
                                            helperText={formik.touched.size && formik.errors.size}
                                            className={styles.formatFormInput}
                                        />
                                    </div>
                                </div>
                                <div className={styles["formatFormRow"]}>
                                    <div className={styles["formatFormItem"]}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            margin="normal"
                                            id="weighable"
                                            name="weighable"
                                            label="Weighable"
                                            value={formik.values.weighable}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.weighable && Boolean(formik.errors.weighable)}
                                            helperText={formik.touched.weighable && formik.errors.weighable}
                                            className={styles.formatFormInput}
                                        />
                                    </div>
                                </div>
                                <div className={styles["formatFormRow"]}>
                                    <div className={styles["formatFormItem"]}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            margin="normal"
                                            id="is_divisible"
                                            name="is_divisible"
                                            label="Divisible"
                                            select
                                            value={formik.values.is_divisible}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.is_divisible && Boolean(formik.errors.is_divisible)}
                                            helperText={formik.touched.is_divisible && formik.errors.is_divisible}
                                            className={styles.formatFormInput}
                                        >
                                            <MenuItem value={1}>Yes</MenuItem>
                                            <MenuItem value={0}>No</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                                <div className={styles["formatFormRow"]}>
                                    <div className={styles["formatFormItem"]}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            margin="normal"
                                            id="pvp"
                                            name="pvp"
                                            label="pvp"
                                            value={formik.values.pvp}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.pvp && Boolean(formik.errors.pvp)}
                                            helperText={formik.touched.pvp && formik.errors.pvp}
                                            className={styles.formatFormInput}
                                        />
                                    </div>
                                </div>
                                <div className={styles["formatFormLastRow"]}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        required
                                        margin="normal"
                                        multiline
                                        rows={4}
                                        id="unit_measure"
                                        name="unit_measure"
                                        label="Unit"
                                        select
                                        value={formik.values.unit_measure}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.unit_measure && Boolean(formik.errors.unit_measure)}
                                        helperText={formik.touched.unit_measure && formik.errors.unit_measure}
                                        className={styles.formatFormInput}
                                    >
                                        <MenuItem value="kg">kg</MenuItem>
                                        <MenuItem value="gr">gr</MenuItem>
                                        <MenuItem value="ml">ml</MenuItem>
                                    </TextField>
                                </div>
                                <div className={styles["formatFormButtonContainer"]}>
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

export default FormatDetailsForm;

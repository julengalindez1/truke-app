"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/hooks/auth";
import { Alert, createTheme, TextField, ThemeProvider } from "@mui/material";
import CustomButton from "@/components/CustomButton";
import {saveNewContact, updateContactById} from "@/utils";
import { SuccessWindow } from "@/components/index";
import {FormikHelpers, useFormik} from "formik";
import * as Yup from "yup";
import { Select, MenuItem } from '@mui/material';

interface FormData {
    name: string;
    type: string;
    schedule: string;
}

let validationSchema = Yup.object({
    name: Yup.string().required("A contact is required"),
    type: Yup.string().required("type number").max(100),
    schedule: Yup.string().required("Availability is required").max(500)
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

interface ContactDetailsFormProps {
    contactId?: number | null;
}

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({ contactId }) => {
    const initialValues: FormData = {
        name: "",
        type: "",
        schedule: "",
    };

    const { user } = useAuth();
    const [error, setError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({ ...initialValues});

    const handleSubmit = async (values: FormData, { setSubmitting }: FormikHelpers<FormData>) => {
        setError(false);
        setSubmitting(false);
        const updatedFormData = {
            ...values,
            provider_id: user?.provider_id || 0,
        };
        try {
            if (contactId) {
                await updateContact(contactId, updatedFormData);
            } else {
                const response = await saveNewContact(updatedFormData);
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

    const updateContact = async (contactId: number, data: FormData) => {
        try {
            const formDataFilteredByNullValues = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ""));
            const response = await updateContactById(contactId, formDataFilteredByNullValues);
            console.log("update response: " + response);
            if (response.status === 200) {
                setIsUpdateSuccess(true);
                setIsSuccess(false);
                setFormData(initialValues);
            } else {
                throw new Error("Failed to submit the data. Please try again.");
            }
        } catch (error) {
            setError(true);
            console.error("Error updating product:", error);
        }
    };

    // If updating a contact, make all fields optional
    if (contactId) {
        validationSchema = validationSchema.shape({
            name: Yup.string(),
            type: Yup.string().max(100),
            schedule: Yup.string().max(100)
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
        contactForm:'flex flex-col',
        contactFormContainer: 'pl-32 pt-16 pb-16 pr-32',
        contactFormTitle: 'font-bold text-left bold py-8',
        contactFormRow: 'flex justify-between flex-row flex-wrap',
        contactFormItem: 'w-full sm:w-47%',
        contactFormLastRow: 'block',
        contactFormInput: 'w-full outline-none border-b-2 border-0 border-b-2 border-accent-primary focus:border-black font-inherit text-base',
        contactFormButtonContainer: 'mt-4 font-medium text-black hover:text-grey',
        contactFormButton: 'text-white border-none rounded-md px-5 py-3 text-lg cursor-pointer transition duration-300 ease-in-out',
        errorMessage: 'text-red-500 text-left text-sm mt-[-24px]',
        submitSuccessContainer: 'text-center bg-white border border-black-hover border-t-4 shadow-md p-8 mt-4 flex flex-col items-center',
        successIconLink: 'text-decoration-none',
        successIconContainer: 'mb-2',
        successIcon: 'max-w-100px mb-2',
        successMessage: 'text-18px',
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.contactFormContainer}>
                {error && <Alert severity="error">An error has occurred. Please review the entered values and try again.</Alert>}
                {isSuccess || isUpdateSuccess ? (
                    <SuccessWindow message={isSuccess ? 'Contacto guardado correctamente' : 'Contacto actualizado correctamente'} />
                ) : (
                    <form className={styles.contactForm} onSubmit={formik.handleSubmit}>
                        <div className={styles.contactFormRow}>
                            <div className={styles.contactFormItem}>
                                <Select
                                    fullWidth
                                    variant="standard"
                                    required
                                    margin="normal"
                                    id="type"
                                    name="type"
                                    label="Tipo de contacto"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    className={styles.contactFormInput}
                                >
                                    <MenuItem value="Phone">Phone</MenuItem>
                                    <MenuItem value="Email">Email</MenuItem>
                                </Select>
                            </div>
                            <div className={styles.contactFormItem}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    required
                                    margin="normal"
                                    id="name"
                                    name="name"
                                    label="Contacto"
                                    color="primary"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    className={styles.contactFormInput}
                                />
                            </div>
                        </div>
                        <div className={styles["contactFormLastRow"]}>
                            <TextField
                                fullWidth
                                variant="standard"
                                required
                                margin="normal"
                                id="schedule"
                                name="schedule"
                                label="Contact Schedule"
                                value={formik.values.schedule}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.schedule && Boolean(formik.errors.schedule)}
                                helperText={formik.touched.schedule && formik.errors.schedule}
                                className={styles.contactFormInput}
                            />
                        </div>
                        <div className={styles["contactFormButtonContainer"]}>
                            <CustomButton
                                title={formik.isSubmitting ? "Procesando..." : "Guardar"}
                                btnType="submit"
                                containerStyles="!py-2 !px-2 text-black border-2 border-black rounded-lg"
                                handleClick={formik.handleSubmit}
                                disabled={formik.isSubmitting}
                            />
                        </div>
                    </form>
                )}
            </div>
        </ThemeProvider>
    );
};

export default ContactDetailsForm;

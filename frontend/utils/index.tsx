
// FUNCTIONS FOR CALLING API ENDPOINTS

const BASE_URL = "http://192.168.1.2:8000/api/v1";
export async function fecthProducts()
{
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response =  await fetch(BASE_URL + `/products`, requestOptions);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('Products API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call:', error.message || 'An error occurred');
    }
}

export async function fecthProductByName(name:string)
{
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response =  await fetch(BASE_URL + `/products?name=${name}`, requestOptions);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('Products by name API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call products by name:', error.message || 'An error occurred');
    }
}

export async function fecthProductByCategoryId(id:number)
{
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response =  await fetch(BASE_URL + `/products?category_id=${id}`, requestOptions);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('Products by category id API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call products by name:', error.message || 'An error occurred');
    }
}

export async function fecthCategoryById(categoryId:number)
{
    console.log("Requested category id: " + categoryId);
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response =  await fetch(BASE_URL + `/categories/${categoryId}`, requestOptions);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('Category by id API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call:', error.message || 'An error occurred');
    }
}

export async function fecthAllContacts()
{
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response =  await fetch(BASE_URL + `/contacts`, requestOptions);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('Contacts API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call:', error.message || 'An error occurred');
    }
}

export async function fecthCategories()
{
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response =  await fetch(BASE_URL + `/categories`, requestOptions);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('All categories API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call:', error.message || 'An error occurred');
    }
}

export async function fecthProduct(searchInput:string)
{
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response = await fetch(BASE_URL + `/products/${searchInput}`, requestOptions);
        console.log(`http://localhost:8000/api/v1/products/${searchInput}`);

        if(response.status === 400) {
            return null;
        }
        if (response.ok){
            const data = await response.json();
            console.log('API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call:', error.message || 'An error occurred');
    }
}

export async function registerUser(userData) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        const response = await fetch(BASE_URL + `/register`, requestOptions);

        if (!response.ok) {
            throw new Error(`Registration failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('User registration response:', data);

        return data;

    } catch (error) {
        console.error('Error during user registration:', error.message || 'An error occurred');
        throw error;
    }
}

export async function fecthAllFormats()
{
    console.log("Requested formats table");
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response =  await fetch(BASE_URL + `/formats`, requestOptions);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('Formats API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call:', error.message || 'An error occurred');
    }
}

export async function fecthAllProviders()
{
    console.log("Requested providers table");
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response =  await fetch(BASE_URL + `/providers`, requestOptions);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('Providers API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call:', error.message || 'An error occurred');
    }
}


export async function fecthAllVariants()
{
    console.log("Requested variants table");
    try {
        const requestOptions = {
            method: 'GET'
        };

        const response =  await fetch(BASE_URL + `/variants`, requestOptions);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('Variants API response:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during API call:', error.message || 'An error occurred');
    }
}

export async function saveNewProduct(product)
{
    console.log("Save new product");
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        };

        const response =  await fetch(BASE_URL + `/products`, requestOptions);
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log('The following product has been successfully saved:', data.data);
            return response;
        }

    } catch (error) {
        console.error('Error during save new product API call:', error.message || 'An error occurred');
    }
}

export async function saveNewVariant(variant)
{
    console.log("Save new variant");
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(variant),
        };

        const response =  await fetch(BASE_URL + `/variants`, requestOptions);
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log('The following variant has been successfully saved:', data.data);
            return response;
        }

    } catch (error) {
        console.error('Error during save new variant API call:', error.message || 'An error occurred');
    }
}

export async function saveNewFormat(format)
{
    console.log("Save new format");
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(format),
        };

        const response =  await fetch(BASE_URL + `/formats`, requestOptions);
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log('The following format has been successfully saved:', data.data);
            return data.data;
        }

    } catch (error) {
        console.error('Error during save new format API call:', error.message || 'An error occurred');
    }
}
export async function saveNewContact(contact)
{
    console.log("Save new contact");
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        };

        const response =  await fetch(BASE_URL + `/contacts`, requestOptions);
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log('The following contact has been successfully saved:', data.data);
            return response;
        }

    } catch (error) {
        console.error('Error during save new contact API call:', error.message || 'An error occurred');
    }
}

export async function searchProducts(searchInput: string)
{
    try {
        const requestOptions = {
            method: 'GET',
        };

        const response =  await fetch(BASE_URL + `/search?input=${searchInput}`, requestOptions);
        console.log(response);

        if (!response.ok) {
            return null;
        }

        if (response.ok){
            const data = await response.json();
            console.log('Search API response:', data);
            return data;
        }

    } catch (error) {
        console.error('Error during API call:', error.message || 'An error occurred');
    }
}

export async function updateProductById(productId, productUpdate)
{
    console.log("Update product: " + productId);
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productUpdate),
        };
        const response =  await fetch(BASE_URL + `/products/${productId}`, requestOptions);
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log('The following product has been successfully updated:', data.data);
            return response;
        }

    } catch (error) {
        console.error('Error during update product API call:', error.message || 'An error occurred');
    }
}
export async function updateContactById(contactId, contactUpdate)
{
    console.log("Update contact: " + contactId);
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactUpdate),
        };
        const response =  await fetch(BASE_URL + `/contacts/${contactId}`, requestOptions);
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log('The following contact has been successfully updated:', data.data);
            return response;
        }

    } catch (error) {
        console.error('Error during update contact API call:', error.message || 'An error occurred');
    }
}


// UTILS FUNCTIONS

export const sortProductsDefault = (products, productName) => {
    return products.sort((a, b) => {
        const nameMatchA = a.name.toLowerCase().includes(productName.toLowerCase());
        const nameMatchB = b.name.toLowerCase().includes(productName.toLowerCase());

        if (nameMatchA && !nameMatchB) {
            return -1;
        } else if (!nameMatchA && nameMatchB) {
            return 1;
        }
        return 0;
    });
};


export const applySortingFilters = (products, sortOption) => {
    console.log("Utils function: applySortingFilters");
    console.log("Sort option " + sortOption);

    const [field, order] = sortOption.split('-');

    return products.slice().sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            return order === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
    });
};

export const mergeProductsAndFormats = (products, formats) => {
    return products.map((product) => {
        const format = formats.find((f) => f.product_id === product.id);

        if (format) {
            const { name, ...formatWithoutName } = format;
            return {
                ...product,
                ...formatWithoutName,
            };
        }
        return { ...product };
    });
};

export const mergeProductsAndFormatsByVariants = (products, formats, variants) => {
    return products.map((product) => {
        const variant = variants.find((v) => v.product_id === product.id);
        const format = formats.find((f) => f.id === (variant ? variant.format_id : null));

        if (variant && format) {
            const { id: variantId, ...variantWithoutIds } = variant;
            const { id: formatId, name, ...formatWithoutIds } = format;

            return {
                ...product,
                format_id: formatId,
                variant_id: variantId,
                ...variantWithoutIds,
                ...formatWithoutIds,
            };
        }

        return { ...product };
    });
};





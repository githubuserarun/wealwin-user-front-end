import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './Home.css'


const HomePage = () => {
    const [categoriesData, setCategoriesData] = useState([])
    const [subCategoriesData, setSubCategoriesData] = useState([])
    const [openCategory, setOpenCategory] = useState(null);
    const [sidebarValue, setSidebarValue] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const API_CAT_URL = 'http://localhost:5000/api/category/view-cat';
    const API_SUBCAT_URL = 'http://localhost:5000/api/category/view-subcat';
    const API_FILTER_URL = `http://localhost:5000/api/product/filter?search=${sidebarValue}`;

    const fetchCategories = async () => {
        try {
            const response = await axios.get(API_CAT_URL);

            if (response.data.status) {
                setCategoriesData(response.data.data);

            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error(error);
        }
    };

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get(API_SUBCAT_URL);

            if (response.data.status) {
                setSubCategoriesData(response.data.data);

            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error(error);
        }
    };

    const fetchFilteredProducts = async () => {
        try {
            const response = await axios.get(API_FILTER_URL);

            if (response.data.status) {
                setFilteredData(response.data.data);
            } else {
                toast.error('Failed to fetch filtered products');
            }
        } catch (error) {
            console.error('Error fetching filtered products:', error);
            toast.error(error)
        }
    };

    const toggleCategory = (categoryId) => {
        setOpenCategory(openCategory === categoryId ? null : categoryId);
    };

    const getSubcategoriesForCategory = (categoryId) => {
        return subCategoriesData.filter(subcat => subcat.categoryId._id === categoryId);
    };




    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, [])

    useEffect(() => {
        fetchFilteredProducts();
    }, [sidebarValue])

    console.log(categoriesData);
    console.log(subCategoriesData);
    console.log(filteredData)
    console.log(sidebarValue)

    return (
        <div>
            <div>
                <Header />
                <hr className='mt-0' />
            </div>

            <div className='d-flex'>
                <div className="sidebar">

                    <ul className="category-list">
                        {categoriesData.map((category) => (
                            <li key={category._id}>
                                <button onClick={() => { toggleCategory(category._id); setSidebarValue(category.category) }}>
                                    {category.category}
                                </button>
                                {openCategory === category._id && (
                                    <ul className="subcategory-list">
                                        {getSubcategoriesForCategory(category._id).map((subcat) => (
                                            <li key={subcat._id} onClick={() => setSidebarValue(subcat.subcategory)}>{subcat.subcategory}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="product-list d-flex flex-wrap">
                    {filteredData.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default HomePage
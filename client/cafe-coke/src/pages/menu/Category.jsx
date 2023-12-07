import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard';

const Category = ({ category }) => {
    const [categoryData, setData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/${category}`)
            .then(res => setData(res.data))
    }, [])
    if (categoryData.length == 0) return <span className="h-screen text-4xl loading loading-spinner loading-lg"></span>
    else {
        return <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6'>
            {
                categoryData.map((data, key) => <CategoryCard key={key} data={data}></CategoryCard>)
            }
        </div>
    }
};

export default Category;
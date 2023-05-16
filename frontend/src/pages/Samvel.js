import React, { useState } from 'react';
import MyPagination from '../components/MyPagination';
import AddProduct from '../components/addingComponents/AddProduct';
import AddCategory from '../components/addingComponents/AddCategory';
import AddBrand from '../components/addingComponents/AddBrand';
import AddColor from '../components/addingComponents/AddColor';
import AddClient from '../components/addingComponents/AddClient';

const Samvel = () => {

    return (
        <>
            {/* <MyPagination count={154}/> */}
            {/* <AddProduct/> */}
            {/* <AddCategory/>
            <AddBrand/>
            <AddColor/> */}
            <AddClient/>
        </>
    );
};

export default Samvel;
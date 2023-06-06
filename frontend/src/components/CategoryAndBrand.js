import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../CSS/CategoryAndBrand.css';

const CategoryAndBrand = ({ categories, brands, onChange }) => {
    const [selectedCategory, setSelectedCategory] = useState({ id: '', name: '' });
    const [selectedBrand, setSelectedBrand] = useState({ id: '', name: '' });


    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.options[e.target.selectedIndex].getAttribute('data-id');
        setSelectedCategory({ id: selectedCategoryId, name: e.target.value });
    };

    const handleBrandChange = (e) => {
        const selectedBrandId = e.target.options[e.target.selectedIndex].getAttribute('data-id');
        setSelectedBrand({ id: selectedBrandId, name: e.target.value });
    };

    const handleResetSelected = () => {
        setSelectedCategory({ id: '', name: '' });
        setSelectedBrand({ id: '', name: '' });
    }

    useEffect(() => {
        // Call the onChange function when the selected category or brand changes
        onChange(selectedCategory, selectedBrand);
    }, [selectedCategory, selectedBrand, onChange]);

    return (
        <Form className="form-category-brand w-25">
            <Form.Group>
                <Form.Control
                    as="select"
                    value={selectedCategory.name}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            data-id={category.id}
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    ))}
                </Form.Control>
                <Form.Control
                    as="select"
                    value={selectedBrand.name}
                    onChange={handleBrandChange}
                >
                    <option value="">Select a brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} data-id={brand.id} value={brand.name}>
                            {brand.name}
                        </option>
                    ))}
                </Form.Control>
                <Button onClick={handleResetSelected}>
                    Reset
                </Button>
            </Form.Group>
        </Form>
    );
};


export default CategoryAndBrand;
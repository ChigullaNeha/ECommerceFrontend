import './index.css';
import React from 'react';
import { MdOutlineStar } from "react-icons/md";
import { Link } from 'react-router-dom';

interface Product {
    brand: string;
    imageUrl: string;
    price: number;
    productId: string;
    rating: number;
    title: string;
}

const ProductCard: React.FC<{ productDetails: Product }> = ({ productDetails }) => {
    const { brand, imageUrl, price, rating, title, productId } = productDetails;

    return (
        <div className='product-card-container'>
            <ul className='ul-products-container'>
                <Link to={`/products/${productId}`}>
                    <img src={imageUrl} alt={title} className='product-img' />
                    <li>{title}</li>
                    <li>by {brand}</li>
                    <div className='price-rating-container'>
                        <p>{price}</p>
                        <div className='rating-container'>
                            <p>{rating}</p>
                            <MdOutlineStar className='star' />
                        </div>
                    </div>
                </Link>
            </ul>
        </div>
    );
};

export default ProductCard;

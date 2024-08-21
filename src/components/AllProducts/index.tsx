import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import Cookies from 'js-cookie'
import Header from '../Header';
import './index.css';

interface Product {
    brand: string;
    imageUrl: string;
    price: number;
    productId: string;
    rating: number;
    title: string;
}

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const AllProducts = () => {
    const [productsList, setProducts] = useState<Product[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState('');

    const changeCategoryId = activeCategoryId => {
        setActiveCategoryId(activeCategoryId);
    }
    useEffect(() => {
       
        fetchedData();
    }, []);

    const fetchedData = async () => {
        const jwtToken = Cookies.get('jwt-token')
        const options = {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
          }
        const response = await fetch('http://localhost:8080/products', options);
        const data = await response.json();
        console.log(data, "data")

        const updatedData = data.map((each: any) => ({
            brand: each.brand,
            imageUrl: each.image_url,
            price: each.price,
            productId: each.product_id,
            rating: each.rating,
            title: each.title
        }));

        setProducts(updatedData);
    }
    return (
        <div>
        <Header />
        <div className='all-products-container'>
            <div className='products-container'>
            <h2>All Products</h2>
            <div className='product-list'>
                {productsList.map(product => (
                    <ProductCard key={product.productId} productDetails={product} />
                ))}
            </div>
            </div>
            </div>
            </div>
    );
}

export default AllProducts;

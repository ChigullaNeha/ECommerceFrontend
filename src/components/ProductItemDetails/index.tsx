import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineStar } from "react-icons/md";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import Cookies from 'js-cookie';
import Header from '../Header';
import CartContext from '../../context/CartContext';
import SimilarProductItem from '../SimilarProductItem';
import {Oval} from 'react-loader-spinner'
import './index.css';

interface ProductData {
  brand: string;
  imageUrl: string;
  price: number;
  productId: string;
  rating: number;
  title: string;
  description: string;
  availability: string;
}
interface SimilarProductItemProps {
    productDetails: {
      availability: string;
      brand: string;
      description: string;
      imageUrl: string;
      price: number;
      rating: number;
      style: string;
      title: string;
      totalReviews: number;
    };
  }

const ProductItemDetails: React.FC = () => {
  const [productData, setProductData] = useState<ProductData | null>(null); 
  const [count, setCount] = useState<number>(1);
  const { id } = useParams<{ id: string }>();
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addCartItem } = useContext(CartContext); 
  const [loading, isLoading] = useState(false)

  useEffect(() => {
    isLoading(true)
    const fetchProductData = async () => {
      const jwtToken = Cookies.get('jwt-token');
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };

      const response = await fetch(`https://ecommerce-23dd.onrender.com/products/${id}`, options);
      const data = await response.json();

      const updatedData: ProductData = {
        brand: data.brand,
        imageUrl: data.image_url,
        price: data.price,
        productId: data.product_id,
        rating: data.rating,
        title: data.title,
        description: data.description,
        availability: data.availability,
      };
      const formattedSimilarProductsData = data.similarProducts.map((each) => ({
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        style: each.style,
        title: each.title,
        totalReviews: each.total_reviews,
        id: each.id
      }));
      
      // console.log(formattedSimilarProductsData)
      setSimilarProducts(formattedSimilarProductsData)
       setProductData(updatedData);
    };

    fetchProductData();
    isLoading(false)
  }, [id]);

  const onIncrementQuantity = () => {
    setCount(prevCount => prevCount + 1);
  };

  const onDecrementQuantity = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const onClickAddToCart = () => {
    if (productData) {
      addCartItem({ ...productData, quantity: count });
    }
  };
  

  if (!productData) {
    return (
      <div className="products-loader-container">
        <Oval color="#0b69ff" height="50" width="50" />
      </div>
    )
  }

  const { brand, imageUrl, price, rating, title, description, availability } = productData;
  
  const renderProductDetails = () => (
    <div>
      <div className='product-item-details-container'>
        <div>
          <img src={imageUrl} alt={title} className='product-detail-img' />
        </div>
        <div className='product-details-container'>
          <h1 className='title'>{title}</h1>
          <h2 className='price'>Rs. {price}</h2>
          <div className='rating-container'>
            <p>{rating}</p>
            <MdOutlineStar />
          </div>
          <p className='description'>{description}</p>
          <h3 className='avail'>Availability: {availability}</h3>
          <h3 className='brand'>Brand: {brand}</h3>
          <hr />
          <div className='btn-container'>
            <button type='button' onClick={onDecrementQuantity}><CiSquareMinus /></button>
            <p>{count}</p>
            <button type='button' onClick={onIncrementQuantity}><CiSquarePlus /></button>
          </div>
          <button type='button' onClick={onClickAddToCart} className='add'>ADD TO CART</button>
        </div>
      </div>
      <ul className='ul-container'>
      {similarProducts.map(eachSimilarProduct => (
                <SimilarProductItem
                  productDetails={eachSimilarProduct}
                  key={eachSimilarProduct.id}
                />
              ))}
      </ul>
    </div>
  )
  const renderLoader = () => (
    <div className="products-loader-container">
        <Oval color="#0b69ff" height="50" width="50" />
      </div>
  )
    
  return (
    <div>
      <Header />
      {loading ? renderLoader() : renderProductDetails()}
    </div>
  );
};

export default ProductItemDetails;

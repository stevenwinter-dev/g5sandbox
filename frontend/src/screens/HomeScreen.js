import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen (props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
    
    return () => {
    }
  }, [category])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  }

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

    return <>
    <div className='hero'>
      <div className='hero-text'>
            <h1>Your source for the games that changed everything</h1>
            <p>Find old favorites or discover new ones</p>
            <div className='hero-buttons'>
              <button><Link to='/category/Nintendo64'>Nintendo 64</Link></button>
              <button><Link to='/category/Playstation'>Playstation</Link></button>
            </div>
      </div>
    </div>
      {category && 
      <h2>{category}</h2>}
      <ul className='filter'>
        <li>
          <form onSubmit={submitHandler}>
            <input type='search' name='searchKeyword' onChange={(e) => setSearchKeyword(e.target.value)} />
            <button type='submit'>Search</button>
          </form>
        </li>
        <li>
          Sort By {' '}
          <select name='sortOrder' onChange={sortHandler}>
            <option value=''>Newest</option>
            <option value='highest'>Lowest Rated</option>
            <option value='lowest'>Highest Rated</option>
          </select>
        </li>
      </ul>
      {loading? <div>Loading...</div> :
    error? <div>{error}</div> :
    <ul className='products'>
    {
      products.map(product => 
        <li key={product._id}>
        <Link to={'/product/' + product._id}>
        <div className='product'>
            <Link to={'/product/' + product._id} className='product-image-container'>
                <img className='product-image' src={product.image} alt={product.name} />
            </Link>
            <div className='product-name'>
                <Link to={'/product/' + product._id}>{product.name} </Link>
            </div>
            <div className='product-brand'>{product.brand}</div>
            <div className='product-price'>${product.price}</div>
            <div className='product-rating'>
              <Rating 
                value={product.rating} 
                text={product.numReviews + ' reviews'} 
              />
            </div>
        </div>
        </Link>
    </li>)
    }
  </ul>
      }
    </>
  }

export default HomeScreen;
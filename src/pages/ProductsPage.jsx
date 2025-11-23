import { useState, useEffect } from 'react';
import styles from './ProductsPage.module.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  return (
    <div className={styles.productsPage}>
      <h1>Product Catalog</h1>
      <p className={styles.subtitle}>Browse our collection of premium tech accessories</p>
      
      <div className={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            {/* BUG: Broken Image - Intentional for QA testing */}
            <img 
              src={product.image} 
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p className={styles.description}>{product.description}</p>
              {/* BUG: Visual Bug - Misaligned price element overlaps button */}
              <div className={styles.priceContainer}>
                <span className={styles.price}>${product.price}</span>
              </div>
              <button className={styles.addToCartButton}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;

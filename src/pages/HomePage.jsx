import { useEffect } from 'react';
import styles from './HomePage.module.css';

function HomePage() {
  useEffect(() => {
    // BUG: Console Error - Intentional for QA testing
    console.error('Tracking failed: Unable to connect to analytics service');
  }, []);

  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <h1>Welcome to Buggy Vibe</h1>
        <p className={styles.tagline}>Your one-stop shop for tech accessories</p>
        <p className={styles.description}>
          Discover our curated collection of high-quality tech accessories designed to enhance your digital lifestyle.
          From wireless peripherals to ergonomic solutions, we've got everything you need.
        </p>
        <a href="/products" className={styles.ctaButton}>
          Browse Products
        </a>
      </div>
      
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>🚀 Fast Shipping</h3>
          <p>Get your orders delivered within 2-3 business days</p>
        </div>
        <div className={styles.feature}>
          <h3>💯 Quality Guaranteed</h3>
          <p>All products come with a 1-year warranty</p>
        </div>
        <div className={styles.feature}>
          <h3>🔒 Secure Checkout</h3>
          <p>Your payment information is always protected</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

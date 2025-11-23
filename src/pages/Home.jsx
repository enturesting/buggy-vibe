import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  useEffect(() => {
    // BUG: Intentional console error on Home Page
    console.error("Tracking failed: Unable to initialize analytics module");
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to BuggyVibe</h1>
        <p className="hero-subtitle">Your testing playground for AI QA systems</p>
        {/* BUG: Broken image source */}
        <img 
          src="/images/hero-banner-missing.jpg" 
          alt="Welcome banner featuring our products"
          className="hero-image"
        />
        <div className="hero-cta">
          <Link to="/products" className="cta-button">
            Browse Products
          </Link>
          <Link to="/contact" className="cta-button secondary">
            Contact Us
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose BuggyVibe?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Quality Products</h3>
            <p>We offer a wide range of products for all your testing needs.</p>
          </div>
          <div className="feature-card">
            <h3>Fast Shipping</h3>
            <p>Get your orders delivered quickly and reliably.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Our team is always here to help you with any questions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

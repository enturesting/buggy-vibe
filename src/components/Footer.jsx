import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3>Buggy Vibe</h3>
          <p>Your trusted source for quality tech accessories.</p>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact</a></li>
            {/* BUG: Another broken link in footer */}
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Support</h4>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#shipping">Shipping</a></li>
            <li><a href="#returns">Returns</a></li>
            <li><a href="#warranty">Warranty</a></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Connect</h4>
          <p>📧 support@buggyvibe.com</p>
          <p>📞 +1 (555) 123-4567</p>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; 2024 Buggy Vibe. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

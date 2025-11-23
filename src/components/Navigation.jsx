import styles from './Navigation.module.css';

function Navigation({ currentPage, onNavigate }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🐛</span>
          <span className={styles.logoText}>Buggy Vibe</span>
        </div>
        
        <ul className={styles.navLinks}>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className={currentPage === 'home' ? styles.active : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('products'); }}
              className={currentPage === 'products' ? styles.active : ''}
            >
              Products
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
              className={currentPage === 'contact' ? styles.active : ''}
            >
              Contact
            </a>
          </li>
          {/* BUG: Broken Link - leads to nowhere */}
          <li>
            <a href="/about-us">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

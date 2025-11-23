import { useState } from 'react';
import styles from './ContactPage.module.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // BUG: Functional Bug - No validation, allows empty submission
    // Also, button occasionally "fails" on every 3rd submit
    setSubmitCount(prev => prev + 1);
    
    // BUG: Every 3rd submit, the button fails to trigger the success action
    if (submitCount % 3 === 2) {
      console.log('Submit action failed - please try again');
      return;
    }
    
    // Send to mock API
    fetch('http://localhost:3001/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Contact form submitted:', data);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    })
    .catch(error => {
      console.error('Error submitting form:', error);
    });
  };

  return (
    <div className={styles.contactPage}>
      <h1>Contact Us</h1>
      <p className={styles.subtitle}>Have a question? We'd love to hear from you!</p>
      
      <div className={styles.contactContainer}>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              rows="5"
            />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
          
          {submitted && (
            <div className={styles.successMessage}>
              Thank you! Your message has been sent.
            </div>
          )}
        </form>
        
        <div className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <p>We typically respond within 24 hours.</p>
          
          <div className={styles.infoItem}>
            <strong>📧 Email:</strong>
            <p>support@buggyvibe.com</p>
          </div>
          
          <div className={styles.infoItem}>
            <strong>📞 Phone:</strong>
            <p>+1 (555) 123-4567</p>
          </div>
          
          <div className={styles.infoItem}>
            <strong>🏢 Address:</strong>
            <p>123 Tech Street<br />San Francisco, CA 94105</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

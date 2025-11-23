# Buggy Vibe 🐛

A React application intentionally designed with bugs for AI QA testing purposes. This site simulates a tech accessories e-commerce MVP with various intentional issues for testing automated QA systems.

## Features

- **Home Page**: Welcome section with call-to-action
- **Products Page**: Dynamic product catalog fetched from mock database
- **Contact Page**: Form for user inquiries
- **Mock Database**: JSON Server for simulating backend API

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: CSS Modules
- **Mock Backend**: json-server
- **Data Storage**: db.json

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/enturesting/buggy-vibe.git
cd buggy-vibe
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

You need to run both the frontend and the mock database server:

#### Terminal 1 - Frontend (Vite Dev Server)
```bash
npm run dev
```
The frontend will be available at: `http://localhost:5173`

#### Terminal 2 - Mock Database (JSON Server)
```bash
npm run server
```
The API will be available at: `http://localhost:3001`

### Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start json-server on port 3001
- `npm run lint` - Run ESLint

## Intentional Bugs for QA Testing 🪲

This application contains the following intentional bugs for testing purposes:

### 1. **Console Error** (Home Page)
- **Location**: Home Page
- **Description**: A tracking error is logged to the console on page load
- **How to verify**: Open browser console on the Home page

### 2. **Broken Links** (Navigation & Footer)
- **Location**: Navigation "About" link and Footer "Careers" link
- **Description**: Links that lead to non-existent pages (404)
- **How to verify**: Click on "About" in navigation or "Careers" in footer

### 3. **Visual Bug** (Products Page)
- **Location**: Product cards on Products page
- **Description**: Price badge overlaps the "Add to Cart" button
- **How to verify**: Navigate to Products page and observe the product cards

### 4. **Broken Images** (Products Page)
- **Location**: Product images
- **Description**: Image URLs are broken, showing broken image icons
- **How to verify**: Check product images on the Products page

### 5. **Form Validation Bug** (Contact Page)
- **Location**: Contact form
- **Description**: Form allows submission with empty fields (no validation)
- **How to verify**: Try submitting the contact form without filling any fields

### 6. **Intermittent Submission Failure** (Contact Page)
- **Location**: Contact form submit button
- **Description**: Every 3rd submission fails to trigger the success action
- **How to verify**: Submit the form multiple times and observe that every 3rd attempt fails

## Project Structure

```
buggy-vibe/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Navigation.module.css
│   │   ├── Footer.jsx
│   │   └── Footer.module.css
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HomePage.module.css
│   │   ├── ProductsPage.jsx
│   │   ├── ProductsPage.module.css
│   │   ├── ContactPage.jsx
│   │   └── ContactPage.module.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── db.json (Mock database)
├── package.json
├── vite.config.js
└── README.md
```

## API Endpoints (JSON Server)

- `GET /products` - Fetch all products
- `POST /contacts` - Submit contact form
- `GET /contacts` - Fetch all contact submissions

## Development Notes

This is a demonstration project created for testing AI-powered QA tools. The bugs are intentional and documented for educational and testing purposes.

## License

MIT

# BuggyVibe 🐛

A React-based web application intentionally designed with bugs for AI QA testing purposes.

## 🎯 Purpose

BuggyVibe is a testing playground for AI-powered QA systems. The application contains intentional bugs across different categories to help test and train automated testing tools.

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router DOM
- **Mock Backend**: json-server
- **Styling**: Custom CSS

## 📋 Features

- **Home Page**: Welcome section with hero banner and feature highlights
- **Products Page**: Product catalog fetched from mock database
- **Contact Page**: Contact form with submission handling
- **Responsive Design**: Mobile-friendly layouts

## 🐞 Intentional Bugs (For QA Testing)

This application contains the following intentional bugs:

1. **Broken Links**: 
   - "About" link in navbar leads to 404
   - "Privacy Policy" link in footer leads to 404

2. **Visual Bug**:
   - Product page subtitle overlaps with the product grid due to negative margin

3. **Functional Bugs**:
   - Contact form accepts empty submissions (no validation)
   - Submit button has 30% random failure rate

4. **Media Bug**:
   - Home page contains broken image URL displaying alt text

5. **Console Error**:
   - Home page logs tracking error to console

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd buggy-vibe
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

You need to run both the frontend and the mock backend server:

#### Terminal 1 - Frontend (React App)
```bash
npm run dev
```
The app will be available at: `http://localhost:5173`

#### Terminal 2 - Backend (json-server)
```bash
npm run server
```
The API will be available at: `http://localhost:3001`

**Important**: Both servers must be running simultaneously for the application to work properly.

## 📁 Project Structure

```
buggy-vibe/
├── src/
│   ├── components/       # Reusable components (Navbar, Footer)
│   ├── pages/           # Page components (Home, Products, Contact, NotFound)
│   ├── App.jsx          # Main app component with routing
│   ├── App.css          # Global app styles
│   ├── index.css        # Base styles
│   └── main.jsx         # App entry point
├── db.json              # Mock database for json-server
├── package.json         # Project dependencies and scripts
└── README.md           # This file
```

## 🧪 Testing the Bugs

### Test Case 1: Broken Links
1. Navigate to any page
2. Click "About" in navbar or "Privacy Policy" in footer
3. Expected: 404 page appears

### Test Case 2: Visual Overlap Bug
1. Navigate to Products page
2. Expected: Subtitle overlaps with first row of products

### Test Case 3: Form Validation Bug
1. Navigate to Contact page
2. Click "Send Message" without filling any fields
3. Expected: Form submits successfully with empty data

### Test Case 4: Random Submit Failure
1. Navigate to Contact page
2. Fill out form and submit multiple times
3. Expected: Approximately 30% of submissions fail randomly

### Test Case 5: Broken Image
1. Navigate to Home page
2. Expected: Broken image icon/alt text visible in hero section

### Test Case 6: Console Error
1. Open browser console
2. Navigate to Home page
3. Expected: Red error message about tracking failure

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start json-server mock backend

## 🎨 Styling Approach

The application uses vanilla CSS with a modular approach:
- Component-specific CSS files
- Consistent color scheme
- Responsive design patterns
- Modern flexbox/grid layouts

## 📝 API Endpoints (json-server)

- `GET /products` - Fetch all products
- `POST /contacts` - Submit contact form

## 🤝 Contributing

This is a testing application with intentional bugs. If you find bugs not listed in the documentation, they might be unintentional! Feel free to report them.

## 📄 License

MIT License - Feel free to use this for testing and educational purposes.

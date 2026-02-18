# ShopNest 🛒

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Role-Based Access**: Separate permissions for Consumers and Retailers
- **Product Management**: Retailers can add, edit, and manage products
- **Shopping Cart**: Add items, view cart, and manage quantities
- **Search**: Search products by name and description
- **Reviews & Ratings**: Users can leave reviews and ratings on products
- **Email Notifications**: Order confirmations and updates via email

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing
- multer for file uploads
- helmet, compression, express-rate-limit for security

### Frontend
- React 19
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fullstack-with-PALAK/ShopNest.git
   cd ShopNest
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend && npm install

   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Environment Setup**
   
   Backend (`backend/.env`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shopnest
   JWT_SECRET=your_jwt_secret
   REACT_APP_FRONTEND_URL=http://localhost:3000
   EMAIL=your_email@gmail.com
   APP_PASSWORD=your_gmail_app_password
   ```

   Frontend (`frontend/.env`):
   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. **Run the application**
   ```bash
   # Start backend (from backend folder)
   npm start

   # Start frontend (from frontend folder)
   npm start
   ```

## API Endpoints

### Authentication
- `POST /signup` - Register a new user
- `POST /login` - Login user

### Products
- `GET /products` - Get all products
- `POST /products` - Add new product (Retailer only)
- `POST /searchProducts` - Search products

### Cart
- `GET /cart` - Get user's cart
- `POST /cart` - Add item to cart
- `DELETE /cart/:id` - Remove item from cart

### Reviews
- `GET /reviews` - Get product reviews
- `POST /reviews` - Add a review

## Project Structure

```
ShopNest/
├── backend/
│   ├── handlers/       # Route handlers
│   ├── schemas/        # Mongoose schemas
│   ├── server.js       # Express server
│   └── connect.js      # Database connection
├── frontend/
│   ├── public/         # Static files
│   └── src/
│       ├── Components/ # React components
│       └── App.js      # Main app component
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

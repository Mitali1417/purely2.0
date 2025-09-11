# Purely 2.0 - Beauty & Skincare E-commerce Platform

A modern, full-stack e-commerce platform built for beauty and skincare products, featuring AI-powered product recommendations and personalized shopping experiences.

## 🚀 Features

- **Modern UI/UX**: Built with React 19, TypeScript, and Tailwind CSS
- **AI Assistant**: Personalized product recommendations based on skin type and preferences
- **Shopping Cart & Wishlist**: Full e-commerce functionality
- **User Authentication**: Secure login/signup with JWT tokens
- **Product Management**: Comprehensive product catalog with categories and brands
- **Responsive Design**: Mobile-first approach with beautiful animations
- **State Management**: Centralized state with Zustand
- **API Integration**: RESTful API with Express.js and MongoDB

## 🏗️ Architecture

```
purely2.0/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API layer
│   │   ├── auth/          # Authentication components
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layouts/       # Layout components
│   │   ├── lib/           # Utilities and store
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Routing configuration
│   │   └── store/         # State management
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database and service configs
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Custom middlewares
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── server.js          # Entry point
└── package.json           # Workspace configuration
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Query** - Server state management
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Stripe** - Payment processing

## 🚀 Getting Started

### Prerequisites
- Node.js (>=18.0.0)
- npm (>=8.0.0)
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd purely2.0
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp client/env.example client/.env
   cp server/.env.example server/.env
   
   # Edit the environment variables as needed
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the client (http://localhost:5173) and server (http://localhost:5003) concurrently.

### Individual Commands

- **Client only**: `npm run dev:client`
- **Server only**: `npm run dev:server`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## 📁 Project Structure

### Client Structure
```
client/src/
├── api/                   # API layer with typed endpoints
├── auth/                  # Authentication components and validation
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (buttons, inputs, etc.)
│   ├── Product/          # Product-related components
│   ├── Cart/             # Shopping cart components
│   └── Wishlist/         # Wishlist components
├── hooks/                # Custom React hooks
├── layouts/              # Layout components (Auth, User, Root)
├── lib/                  # Utilities, store, and configuration
├── pages/                # Page components
├── routes/               # Routing configuration
└── store/                # State management (re-exports from lib)
```

### Server Structure
```
server/
├── config/               # Database and service configurations
├── controllers/          # Route controllers
├── middlewares/          # Custom middlewares (auth, validation)
├── models/               # Database models
├── routes/               # API route definitions
└── server.js             # Application entry point
```

## 🔧 Configuration

### Environment Variables

**Client (.env)**
```env
VITE_API_URL=http://localhost:5003/api
VITE_APP_NAME=Purely
VITE_APP_VERSION=2.0.0
```

**Server (.env)**
```env
PORT=5003
MONGODB_URI=mongodb://localhost:27017/purely
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
STRIPE_SECRET_KEY=your-stripe-secret
```

## 🎨 UI Components

The project uses a comprehensive design system with:
- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- **Custom components** for specific use cases
- **Consistent theming** throughout the application

## 🔐 Authentication

- JWT-based authentication
- Protected routes with automatic token validation
- Guest user support
- Secure password hashing with bcrypt

## 🛒 E-commerce Features

- Product catalog with filtering and search
- Shopping cart with persistent storage
- Wishlist functionality
- User profiles and preferences
- AI-powered product recommendations

## 📱 Responsive Design

- Mobile-first approach
- Responsive breakpoints
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

### Client (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the dist folder
```

### Server (Railway/Heroku)
```bash
cd server
# Deploy with environment variables configured
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

Built with ❤️ by the Purely Team

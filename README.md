# Thiya's Boutique E-Commerce

## Overview

Thiya's Boutique is a fully-featured boutique e-commerce platform built with modern web technologies. The application offers a rich shopping experience with a clean, responsive design and all the essential features of a professional online store.

## Features

### Core Functionality

- **Product Catalog**: Browse products with detailed information, images, pricing
- **Product Categories**: Shop by category with intuitive navigation
- **Advanced Search**: Search products by keyword across names, descriptions, and tags
- **Product Filtering**: Filter products by category, price range, colors, and sizes
- **Shopping Cart**: Add, remove, and update product quantities
- **User Authentication**: Register and login functionality with profile management
- **Checkout Process**: Multi-step checkout with shipping and payment information
- **Order Confirmation**: Detailed order success page with reference number

### User Experience

- **Responsive Design**: Fully mobile-responsive interface that works on all devices
- **Product Image Gallery**: Multiple images with hover effects
- **Quick Product Views**: Thumbnail image navigation
- **Sale Badges**: Visual indicators for discounted items
- **Real-time Cart Updates**: Instantly update cart totals when adding or modifying items
- **Persistent Shopping Cart**: Cart contents saved in local storage
- **Form Validation**: Comprehensive validation for all user inputs

### Design & UI

- **Modern Aesthetics**: Clean, minimalist design with sophisticated color palette
- **Micro-interactions**: Subtle animations and transitions for an engaging experience
- **Accessible Components**: Built with accessibility in mind
- **Toast Notifications**: Informative feedback for user actions

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: Shadcn UI
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Context API + localStorage
- **Icons**: Lucide React

## Future Integrations

### Payment Gateway

- **Razorpay Integration**: The application is designed for easy integration with Razorpay payment gateway. The checkout flow includes placeholder components that will be connected to the Razorpay API in future updates.

## Project Structure

- `src/components/`: Reusable UI components
  - `layout/`: Header, footer, and main layout components
  - `products/`: Product cards, grids, and filters
  - `home/`: Homepage-specific components
  - `ui/`: Basic UI elements and shadcn components
- `src/context/`: React Context providers for global state
- `src/data/`: Mock data and helper functions
- `src/pages/`: Page components corresponding to routes
- `src/types/`: TypeScript type definitions
- `src/lib/`: Utility functions

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Customization

The project is built with customization in mind:

- Modify the color scheme in `tailwind.config.ts`
- Update product data in `src/data/products.ts`
- Customize UI components as needed

## Deployment

The application can be built for production using:

```bash
npm run build
```

This generates optimized assets in the `dist` directory that can be deployed to any static hosting service.

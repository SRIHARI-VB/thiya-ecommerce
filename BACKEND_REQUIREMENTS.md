# Thiya's Boutique E-Commerce - Backend Requirements

This document outlines the necessary backend APIs, data structures, and integration points required to support the Thiya's Boutique E-Commerce frontend.

## Technology Stack Recommendations

- **API Framework**: Node.js with Express/NestJS or Python with FastAPI
- **Database**: PostgreSQL for relational data with JSON support
- **Authentication**: JWT-based with refresh tokens
- **Image Storage**: AWS S3 or similar cloud storage
- **Caching**: Redis for high-traffic data (product listings, etc.)
- **Payment Processing**: Razorpay API integration
- **Hosting**: Containerized with Docker, deployed on AWS/GCP/Azure

## Core API Endpoints

### Authentication

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "Full Name",
    "phone": "+919876543210" // Optional
  }
  ```
- **Response (200)**:
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "Full Name",
      "createdAt": "2023-04-30T12:00:00Z"
    },
    "token": "jwt-access-token",
    "refreshToken": "refresh-token"
  }
  ```
- **Error Responses**:
  - `400`: Validation error (missing fields, invalid email format)
  - `409`: Email already exists

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response (200)**:
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "Full Name"
    },
    "token": "jwt-access-token",
    "refreshToken": "refresh-token"
  }
  ```
- **Error Responses**:
  - `400`: Invalid credentials
  - `404`: User not found

#### Refresh Token
- **Endpoint**: `POST /api/auth/refresh`
- **Payload**:
  ```json
  {
    "refreshToken": "refresh-token"
  }
  ```
- **Response (200)**:
  ```json
  {
    "token": "new-jwt-access-token",
    "refreshToken": "new-refresh-token"
  }
  ```
- **Error Responses**:
  - `401`: Invalid refresh token

#### Logout
- **Endpoint**: `POST /api/auth/logout`
- **Headers**: `Authorization: Bearer {token}`
- **Response (204)**: No content

### Products

#### Get All Products
- **Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)
  - `category`: Filter by category
  - `search`: Search term
  - `sort`: Sort by (price_asc, price_desc, newest, featured)
  - `minPrice`: Minimum price
  - `maxPrice`: Maximum price
  - `colors[]`: Filter by colors
  - `sizes[]`: Filter by sizes
  - `tags[]`: Filter by tags
- **Response (200)**:
  ```json
  {
    "products": [
      {
        "id": "uuid",
        "name": "Product Name",
        "description": "Product description",
        "price": 39.99,
        "images": ["url1", "url2"],
        "category": "category-slug",
        "tags": ["tag1", "tag2"],
        "stock": 10,
        "discount": 20,
        "rating": 4.5,
        "sizes": ["S", "M", "L"],
        "colors": ["Red", "Blue"],
        "featured": true,
        "new": true,
        "bestSeller": false
      }
    ],
    "pagination": {
      "total": 100,
      "pages": 5,
      "currentPage": 1,
      "hasNext": true,
      "hasPrev": false
    }
  }
  ```

#### Search Products with Autocomplete
- **Endpoint**: `GET /api/products/search`
- **Query Parameters**:
  - `q`: Search query
  - `limit`: Maximum number of results (default: 5)
- **Response (200)**:
  ```json
  {
    "products": [
      {
        "id": "uuid",
        "name": "Product Name",
        "price": 39.99,
        "image": "url1",
        "category": "category-slug"
      }
    ],
    "total": 20
  }
  ```

#### Get Product by ID
- **Endpoint**: `GET /api/products/{id}`
- **Response (200)**:
  ```json
  {
    "id": "uuid",
    "name": "Product Name",
    "description": "Product description",
    "price": 39.99,
    "images": ["url1", "url2"],
    "category": "category-slug",
    "tags": ["tag1", "tag2"],
    "stock": 10,
    "discount": 20,
    "rating": 4.5,
    "reviews": [
      {
        "id": "uuid",
        "userId": "user-uuid",
        "userName": "User Name",
        "rating": 5,
        "comment": "Great product!",
        "date": "2023-04-30T12:00:00Z"
      }
    ],
    "sizes": ["S", "M", "L"],
    "colors": ["Red", "Blue"],
    "featured": true,
    "new": true,
    "bestSeller": false,
    "relatedProducts": ["product-id1", "product-id2"]
  }
  ```
- **Error Responses**:
  - `404`: Product not found

#### Get Categories
- **Endpoint**: `GET /api/categories`
- **Response (200)**:
  ```json
  [
    {
      "id": "uuid",
      "name": "Category Name",
      "description": "Category description",
      "image": "category-image-url",
      "slug": "category-slug",
      "productCount": 42
    }
  ]
  ```

### Shopping Cart

#### Get User Cart
- **Endpoint**: `GET /api/cart`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
  ```json
  {
    "id": "cart-uuid",
    "items": [
      {
        "productId": "product-uuid",
        "name": "Product Name",
        "price": 39.99,
        "image": "product-image-url",
        "quantity": 2,
        "size": "M",
        "color": "Blue",
        "subtotal": 79.98
      }
    ],
    "subtotal": 79.98,
    "taxes": 7.99,
    "shipping": 4.99,
    "discount": 0,
    "total": 92.96
  }
  ```

#### Add Item to Cart
- **Endpoint**: `POST /api/cart/items`
- **Headers**: `Authorization: Bearer {token}`
- **Payload**:
  ```json
  {
    "productId": "product-uuid",
    "quantity": 1,
    "size": "M",
    "color": "Blue"
  }
  ```
- **Response (200)**:
  ```json
  {
    "message": "Item added to cart",
    "cartItems": 3,
    "cart": { /* Full cart object as shown above */ }
  }
  ```
- **Error Responses**:
  - `400`: Invalid product
  - `400`: Insufficient stock

#### Update Cart Item
- **Endpoint**: `PUT /api/cart/items/{itemId}`
- **Headers**: `Authorization: Bearer {token}`
- **Payload**:
  ```json
  {
    "quantity": 3,
    "size": "L",
    "color": "Red"
  }
  ```
- **Response (200)**:
  ```json
  {
    "message": "Cart updated",
    "cart": { /* Full cart object */ }
  }
  ```

#### Remove Cart Item
- **Endpoint**: `DELETE /api/cart/items/{itemId}`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
  ```json
  {
    "message": "Item removed",
    "cart": { /* Full cart object */ }
  }
  ```

### Checkout & Orders

#### Create Order
- **Endpoint**: `POST /api/orders`
- **Headers**: `Authorization: Bearer {token}`
- **Payload**:
  ```json
  {
    "shippingAddress": {
      "name": "Full Name",
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India",
      "phone": "+919876543210"
    },
    "paymentMethod": "razorpay"
  }
  ```
- **Response (201)**:
  ```json
  {
    "orderId": "order-uuid",
    "paymentDetails": {
      "provider": "razorpay",
      "orderId": "razorpay-order-id",
      "amount": 9296,  // in smallest currency unit (paise)
      "currency": "INR",
      "keyId": "razorpay_key_id"
    },
    "orderSummary": {
      "subtotal": 79.98,
      "taxes": 7.99,
      "shipping": 4.99,
      "discount": 0,
      "total": 92.96
    }
  }
  ```

#### Confirm Payment
- **Endpoint**: `POST /api/orders/{orderId}/payment`
- **Headers**: `Authorization: Bearer {token}`
- **Payload**:
  ```json
  {
    "paymentId": "razorpay-payment-id",
    "signature": "razorpay-signature"
  }
  ```
- **Response (200)**:
  ```json
  {
    "success": true,
    "message": "Payment confirmed",
    "orderStatus": "processing",
    "orderNumber": "LX12345"
  }
  ```

#### Get User Orders
- **Endpoint**: `GET /api/orders`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
  - `status`: Filter by status
- **Response (200)**:
  ```json
  {
    "orders": [
      {
        "id": "order-uuid",
        "orderNumber": "LX12345",
        "date": "2023-04-30T12:00:00Z",
        "status": "processing",
        "total": 92.96,
        "itemsCount": 3
      }
    ],
    "pagination": {
      "total": 5,
      "pages": 1,
      "currentPage": 1
    }
  }
  ```

#### Get Order Details
- **Endpoint**: `GET /api/orders/{orderId}`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
  ```json
  {
    "id": "order-uuid",
    "orderNumber": "LX12345",
    "date": "2023-04-30T12:00:00Z",
    "status": "processing",
    "items": [
      {
        "productId": "product-uuid",
        "name": "Product Name",
        "price": 39.99,
        "image": "product-image-url",
        "quantity": 2,
        "size": "M",
        "color": "Blue",
        "subtotal": 79.98
      }
    ],
    "shippingAddress": {
      "name": "Full Name",
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India",
      "phone": "+919876543210"
    },
    "paymentMethod": "razorpay",
    "subtotal": 79.98,
    "taxes": 7.99,
    "shipping": 4.99,
    "discount": 0,
    "total": 92.96
  }
  ```

### User Profile

#### Get User Profile
- **Endpoint**: `GET /api/user/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
  ```json
  {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "Full Name",
    "phone": "+919876543210",
    "addresses": [
      {
        "id": "address-uuid",
        "name": "Home",
        "street": "123 Main St",
        "city": "Mumbai",
        "state": "Maharashtra",
        "zipCode": "400001",
        "country": "India",
        "phone": "+919876543210",
        "isDefault": true
      }
    ],
    "wishlist": [
      {
        "productId": "product-uuid",
        "name": "Product Name",
        "price": 29.99,
        "image": "product-image-url"
      }
    ]
  }
  ```

#### Update User Profile
- **Endpoint**: `PUT /api/user/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Payload**:
  ```json
  {
    "name": "Updated Name",
    "phone": "+919876543210"
  }
  ```
- **Response (200)**:
  ```json
  {
    "message": "Profile updated successfully",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "Updated Name",
      "phone": "+919876543210"
    }
  }
  ```

#### Change Password
- **Endpoint**: `PUT /api/user/password`
- **Headers**: `Authorization: Bearer {token}`
- **Payload**:
  ```json
  {
    "currentPassword": "currentPassword123",
    "newPassword": "newPassword123",
    "confirmPassword": "newPassword123"
  }
  ```
- **Response (200)**:
  ```json
  {
    "message": "Password changed successfully"
  }
  ```
- **Error Responses**:
  - `400`: Passwords don't match
  - `401`: Current password is incorrect

### User Addresses

#### Get User Addresses
- **Endpoint**: `GET /api/user/addresses`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
  ```json
  {
    "addresses": [
      {
        "id": "address-uuid",
        "name": "Home",
        "street": "123 Main St",
        "city": "Mumbai",
        "state": "Maharashtra",
        "zipCode": "400001",
        "country": "India",
        "phone": "+919876543210",
        "isDefault": true
      }
    ]
  }
  ```

#### Add Address
- **Endpoint**: `POST /api/user/addresses`
- **Headers**: `Authorization: Bearer {token}`
- **Payload**:
  ```json
  {
    "name": "Office",
    "street": "456 Business Ave",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400002",
    "country": "India",
    "phone": "+919876543210",
    "isDefault": false
  }
  ```
- **Response (201)**:
  ```json
  {
    "message": "Address added successfully",
    "address": {
      "id": "new-address-uuid",
      "name": "Office",
      "street": "456 Business Ave",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400002",
      "country": "India",
      "phone": "+919876543210",
      "isDefault": false
    }
  }
  ```

#### Update Address
- **Endpoint**: `PUT /api/user/addresses/{addressId}`
- **Headers**: `Authorization: Bearer {token}`
- **Payload**: (Same as Add Address)
- **Response (200)**:
  ```json
  {
    "message": "Address updated successfully",
    "address": {
      "id": "address-uuid",
      "name": "Updated Office",
      "street": "789 New Ave",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400002",
      "country": "India",
      "phone": "+919876543210",
      "isDefault": false
    }
  }
  ```

#### Delete Address
- **Endpoint**: `DELETE /api/user/addresses/{addressId}`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
  ```json
  {
    "message": "Address deleted successfully"
  }
  ```

### Wishlist

#### Get Wishlist
- **Endpoint**: `GET /api/wishlist`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
  ```json
  {
    "items": [
      {
        "productId": "product-uuid",
        "name": "Product Name",
        "price": 39.99,
        "image": "product-image-url",
        "stock": 10,
        "discount": 20
      }
    ]
  }
  ```

#### Add to Wishlist
- **Endpoint**: `POST /api/wishlist`
- **Headers**: `Authorization: Bearer {token}`
- **Payload**:
  ```json
  {
    "productId": "product-uuid"
  }
  ```
- **Response (200)**:
  ```json
  {
    "message": "Product added to wishlist"
  }
  ```

#### Remove from Wishlist
- **Endpoint**: `DELETE /api/wishlist/{productId}`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
  ```json
  {
    "message": "Product removed from wishlist"
  }
  ```

### Contact Form

#### Submit Contact Form
- **Endpoint**: `POST /api/contact`
- **Payload**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Product Inquiry",
    "message": "I have a question about your product..."
  }
  ```
- **Response (201)**:
  ```json
  {
    "message": "Your message has been received. We'll get back to you soon.",
    "reference": "CONTACT12345"
  }
  ```
- **Error Responses**:
  - `400`: Validation error (missing fields, invalid email)

## Error Handling

All API endpoints should follow a consistent error response format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional information
  }
}
```

### Common Error Codes

- `INVALID_REQUEST`: Missing or invalid parameters
- `AUTHENTICATION_REQUIRED`: User is not authenticated
- `PERMISSION_DENIED`: User does not have required permissions
- `RESOURCE_NOT_FOUND`: Requested resource does not exist
- `DUPLICATE_ENTRY`: Resource already exists
- `VALIDATION_ERROR`: Input validation failed
- `PAYMENT_ERROR`: Payment processing failed
- `INSUFFICIENT_STOCK`: Product stock is insufficient
- `SERVER_ERROR`: Internal server error

## Razorpay Integration

### Payment Flow

1. Frontend initiates checkout, backend creates order in Razorpay
2. Backend returns Razorpay order ID and key to frontend
3. Frontend shows Razorpay payment form
4. User completes payment
5. Frontend sends payment ID and signature to backend
6. Backend verifies payment with Razorpay
7. Backend updates order status

### Required Razorpay API Integration

- **Create Order**: `POST https://api.razorpay.com/v1/orders`
- **Verify Payment**: Using signature verification with Razorpay webhook/callback

### Configuration Requirements

The backend will need:

- Razorpay API Key ID
- Razorpay API Key Secret
- Webhook Secret for payment verification

## Database Schema

The following core database tables are recommended:

- Users
- Products
- Categories
- ProductVariants (for size/color combinations)
- Orders
- OrderItems
- Addresses
- Carts
- CartItems
- Wishlists
- Reviews
- ProductTags
- ContactMessages

## Logging & Monitoring

Implement comprehensive logging for:

- API request/response
- Authentication events
- Payment processing
- Order status changes
- Inventory updates

Use structured logging format compatible with log aggregation tools.

## Security Considerations

- Implement rate limiting for authentication endpoints
- Add CORS configuration for allowed frontend domains
- Use prepared statements for all database queries
- Encrypt sensitive user data
- Implement robust input validation
- Use secure HTTP headers
- Store passwords with strong hashing (bcrypt/Argon2)
- Implement request throttling for sensitive operations

## Deployment Recommendations

- Use containerization with Docker
- Implement CI/CD pipeline
- Maintain separate environments (development, staging, production)
- Automate database migrations
- Use environment variables for configuration
- Implement health check endpoints
- Consider serverless functions for sporadic workloads

## Performance Considerations

- Implement caching strategy for product data
- Use database indexing for frequently queried fields
- Consider CDN for static assets and product images
- Implement pagination for all list endpoints
- Use database connection pooling
- Consider read replicas for high-traffic scenarios

## Development Workflow

- Use version control for API specification (OpenAPI/Swagger)
- Implement automated tests (unit, integration, end-to-end)
- Document API changes and versioning strategy
- Maintain a changelog

This document serves as a comprehensive guide for developing the backend services required by the Thiya's Boutique E-Commerce frontend. It outlines the necessary API endpoints, data structures, and integration points, with a specific focus on the future Razorpay payment integration.

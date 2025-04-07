# 🚀 my-first-backend

A feature-rich backend API built with Node.js, Express, and MongoDB that handles user authentication, product management, and order processing.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## ✨ Features

<<<<<<< HEAD
-   👤 User authentication with JWT
-   🔒 Password hashing with Argon2id
-   🛍️ Product management
-   🛒 Order processing
-   👮 Admin and customer roles with different permissions
-   🚫 User banning functionality

## 📋 Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Environment Setup](#environment-setup)
-   [API Documentation](#api-documentation)
    -   [User Endpoints](#user-endpoints)
    -   [Product Endpoints](#product-endpoints)
    -   [Order Endpoints](#order-endpoints)
-   [Authentication](#authentication)
-   [Testing with Postman](#testing-with-postman)
-   [Data Models](#data-models)
=======
- 👤 User authentication with JWT
- 🔒 Password hashing with Argon2id
- 🛍️ Product management 
- 🛒 Order processing
- 👮 Admin and customer roles with different permissions
- 🚫 User banning functionality

## 📋 Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Product Endpoints](#product-endpoints)
  - [Order Endpoints](#order-endpoints)
- [Authentication](#authentication)
- [Testing with Postman](#testing-with-postman)
- [Data Models](#data-models)
>>>>>>> f6869082ce27f3d931ccd5c5c2107a75d7793030

## 🚀 Getting Started

### Prerequisites

<<<<<<< HEAD
-   Node.js (v14 or higher)
-   MongoDB (local or cloud instance)
-   Postman (for testing the API)
=======
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Postman (for testing the API)
>>>>>>> f6869082ce27f3d931ccd5c5c2107a75d7793030

### Installation

1. Clone the repository:
<<<<<<< HEAD

    ```bash
    git clone https://github.com/yourusername/my-first-backend.git
    cd my-first-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

### Environment Setup

=======
   ```bash
   git clone https://github.com/yourusername/my-first-backend.git
   cd my-first-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Setup

>>>>>>> f6869082ce27f3d931ccd5c5c2107a75d7793030
Create a `.env` file in the root directory with the following variables:

```
MONGO_DB_CONN_STRING=mongodb://localhost:27017/my-first-backend
PEPPER=thisIsATestPepperSentence123
JWT_SECRET_KEY=thisIsATestSecretKeyForJWT123
```

## 📡 API Documentation

The API runs on `http://localhost:5000` by default.

### User Endpoints
<<<<<<< HEAD
=======

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|:-------------:|:----------:|
| POST | `/user/signin` | Register a new user | No* | No |
| POST | `/user/login` | Log in a user | No | No |
| DELETE | `/user/delete` | Delete a user account | Yes | No |
| PUT | `/user/banuser` | Ban/unban a user | Yes | Yes |
| GET | `/user/` | Get all users | Yes | Yes |

> *Admin creation requires admin authentication

#### POST `/user/signin` - Create a new user

Request body:
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123",
  "role": "customer" 
}
```

> Note: To create an admin user, set `"role": "admin"` (requires admin authentication)

Response (201 Created):
```json
{
  "success": true,
  "message": "User saved Successfully"
}
```

#### POST `/user/login` - Log in a user

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200 OK):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer"
  },
  "message": "Logged in successfully"
}
```

#### DELETE `/user/delete` - Delete a user account

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "User removed successfully"
}
```

#### PUT `/user/banuser` - Ban/unban a user (Admin only)

Request body:
```json
{
  "email": "user@example.com",
  "banned": true
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Operation successfull"
}
```

#### GET `/user/` - Get all users (Admin only)

Response (200 OK):
```json
{
  "success": true,
  "users": [
    {
      "_id": "609d9ecb38c7d912345abcde",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "customer",
      "banned": false
    },
    // ...more users
  ],
  "message": "operation successful"
}
```

### Product Endpoints

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|:-------------:|:----------:|
| GET | `/products/` | Get all products | No | No |
| GET | `/products/filter` | Filter products | No | No |
| POST | `/products/add` | Add a new product | Yes | Yes |
| DELETE | `/products/delete` | Delete a product | Yes | Yes |
| PUT | `/products/update` | Update a product | Yes | Yes |

#### GET `/products/` - Get all products

Response (200 OK):
```json
{
  "success": true,
  "products": [
    {
      "_id": "609d9ecb38c7d912345abcdf",
      "name": "Product Name",
      "priceCents": 9999,
      "description": "Product description",
      "stock": 10,
      "gender": "mensware",
      "category": "casual Wear",
      "brand": "ExampleBrand"
    },
    // ...more products
  ],
  "message": "operation successful"
}
```

#### GET `/products/filter` - Filter products

Query parameters:
- `category`: Product category
- `gender`: Product gender
- `maxprice`: Maximum price in cents
- `minprice`: Minimum price in cents
- `brand`: Product brand

Example: `/products/filter?category=casual%20Wear&gender=mensware&minprice=1000&maxprice=5000&brand=ExampleBrand`

Response (200 OK):
```json
{
  "success": true,
  "products": [
    // Filtered products
  ],
  "message": "operation successful"
}
```

#### POST `/products/add` - Add a new product (Admin only)

Request body:
```json
{
  "name": "New Product",
  "priceCents": 4999,
  "description": "Product description",
  "stock": 25,
  "gender": "mensware",
  "category": "casual Wear",
  "brand": "ExampleBrand"
}
```

Response (201 Created):
```json
{
  "success": true,
  "productDetails": {
    // Product details including generated _id
  },
  "message": "Product saved successfully"
}
```

#### DELETE `/products/delete` - Delete a product (Admin only)

Request body:
```json
{
  "_id": "609d9ecb38c7d912345abcdf"
}
```

Response (204 No Content or 200 OK):
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "deletionData": {
    // Deletion details
  }
}
```

#### PUT `/products/update` - Update a product (Admin only)

Request body:
```json
{
  "_id": "609d9ecb38c7d912345abcdf",
  "update": {
    "priceCents": 3999,
    "stock": 15
  }
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Product updated successfully",
  "updateStatus": {
    // Update details
  }
}
```

### Order Endpoints

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|:-------------:|:----------:|
| GET | `/order/admin/all` | Get all orders | Yes | Yes |
| GET | `/order/` | Get user's orders | Yes | No |
| PUT | `/order/update` | Update order status | Yes | Yes |
| POST | `/order/place` | Place a new order | Yes | No |

#### GET `/order/admin/all` - Get all orders (Admin only)

Response (200 OK):
```json
{
  "success": true,
  "message": "Product loaded successfully",
  "orderDetails": [
    {
      "_id": "609d9ecb38c7d912345abcdg",
      "customerEmail": "user@example.com",
      "shippingAddress": "123 Example St",
      "paymentMethod": "card",
      "status": "pending",
      "products": [
        // Product details
      ],
      "customer": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "2023-05-10T12:00:00.000Z",
      "updatedAt": "2023-05-10T12:00:00.000Z"
    },
    // ...more orders
  ]
}
```

#### GET `/order/` - Get user's orders

Request body:
```json
{
  "email": "user@example.com"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Product loaded successfully",
  "orderDetails": [
    // User's orders with details
  ]
}
```

#### PUT `/order/update` - Update order status

Request body:
```json
{
  "orderID": "609d9ecb38c7d912345abcdg",
  "status": "confirmed"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Operation successful",
  "updateStatus": {
    // Update details
  }
}
```

#### POST `/order/place` - Place a new order

Request body:
```json
{
  "customerEmail": "user@example.com",
  "shippingAddress": "123 Example St, City, Country",
  "paymentMethod": "card",
  "status": "pending",
  "products": [
    {
      "productId": "609d9ecb38c7d912345abcdf",
      "priceCents": 4999,
      "qty": 2
    }
  ]
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Operation successful",
  "saveStatus": {
    // Order details including generated _id
  }
}
```
>>>>>>> f6869082ce27f3d931ccd5c5c2107a75d7793030

| Method | Endpoint        | Description           | Auth Required | Admin Only |
| ------ | --------------- | --------------------- | :-----------: | :--------: |
| POST   | `/user/signin`  | Register a new user   |     No\*      |     No     |
| POST   | `/user/login`   | Log in a user         |      No       |     No     |
| DELETE | `/user/delete`  | Delete a user account |      Yes      |     No     |
| PUT    | `/user/banuser` | Ban/unban a user      |      Yes      |    Yes     |
| GET    | `/user/`        | Get all users         |      Yes      |    Yes     |

<<<<<<< HEAD
> \*Admin creation requires admin authentication

#### POST `/user/signin` - Create a new user

Request body:

```json
{
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "password123",
    "role": "customer"
=======
The API uses JWT (JSON Web Token) for authentication. When a user logs in, they receive a token that should be included in subsequent requests.

In Postman, add the token to the Authorization tab:
1. Select "Bearer Token" from the Type dropdown
2. Paste the token value in the Token field

Customer and admin accounts have different permissions:
- Admin tokens provide access to all endpoints
- Customer tokens are limited to specific operations

## 🧪 Testing with Postman

1. **First, create an admin user**:
   - Send a POST request to `/user/signin` with admin credentials
   - For initial admin creation, you may need to temporarily modify your code

2. **Login with admin credentials**:
   - Send a POST request to `/user/login`
   - Save the returned token

3. **Set the token in Postman**:
   - In the Authorization tab, select "Bearer Token"
   - Paste your admin token

4. **Test admin endpoints**:
   - Create products
   - View all users
   - Ban/unban users
   - View all orders

5. **Create a customer account and test customer flows**:
   - User registration
   - Product browsing
   - Order placement
   - Order status checking

## 📝 Data Models

### User Model

```javascript
{
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
  banned: { type: Boolean, required: true, default: false }
>>>>>>> f6869082ce27f3d931ccd5c5c2107a75d7793030
}
```

> Note: To create an admin user, set `"role": "admin"` (requires admin authentication)

<<<<<<< HEAD
Response (201 Created):

```json
{
    "success": true,
    "message": "User saved Successfully"
}
```

#### POST `/user/login` - Log in a user

Request body:

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

Response (200 OK):

```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "customer"
    },
    "message": "Logged in successfully"
}
```

#### DELETE `/user/delete` - Delete a user account

Request body:

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

Response (200 OK):

```json
{
    "success": true,
    "message": "User removed successfully"
}
```

#### PUT `/user/banuser` - Ban/unban a user (Admin only)

Request body:

```json
{
    "email": "user@example.com",
    "banned": true
}
```

Response (201 Created):

```json
{
    "success": true,
    "message": "Operation successfull"
}
```

#### GET `/user/` - Get all users (Admin only)

Response (200 OK):

```json
{
    "success": true,
    "users": [
        {
            "_id": "609d9ecb38c7d912345abcde",
            "email": "user@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "role": "customer",
            "banned": false
        }
        // ...more users
    ],
    "message": "operation successful"
}
```

### Product Endpoints

| Method | Endpoint           | Description       | Auth Required | Admin Only |
| ------ | ------------------ | ----------------- | :-----------: | :--------: |
| GET    | `/products/`       | Get all products  |      No       |     No     |
| GET    | `/products/filter` | Filter products   |      No       |     No     |
| POST   | `/products/add`    | Add a new product |      Yes      |    Yes     |
| DELETE | `/products/delete` | Delete a product  |      Yes      |    Yes     |
| PUT    | `/products/update` | Update a product  |      Yes      |    Yes     |

#### GET `/products/` - Get all products

Response (200 OK):

```json
{
    "success": true,
    "products": [
        {
            "_id": "609d9ecb38c7d912345abcdf",
            "name": "Product Name",
            "priceCents": 9999,
            "description": "Product description",
            "stock": 10,
            "gender": "mensware",
            "category": "casual Wear",
            "brand": "ExampleBrand"
        }
        // ...more products
    ],
    "message": "operation successful"
}
```

#### GET `/products/filter` - Filter products

Query parameters:

-   `category`: Product category
-   `gender`: Product gender
-   `maxprice`: Maximum price in cents
-   `minprice`: Minimum price in cents
-   `brand`: Product brand

Example: `/products/filter?category=casual%20Wear&gender=mensware&minprice=1000&maxprice=5000&brand=ExampleBrand`

Response (200 OK):

```json
{
    "success": true,
    "products": [
        // Filtered products
    ],
    "message": "operation successful"
}
```

#### POST `/products/add` - Add a new product (Admin only)

Request body:

```json
{
    "name": "New Product",
    "priceCents": 4999,
    "description": "Product description",
    "stock": 25,
    "gender": "mensware",
    "category": "casual Wear",
    "brand": "ExampleBrand"
}
```

Response (201 Created):

```json
{
    "success": true,
    "productDetails": {
        // Product details including generated _id
    },
    "message": "Product saved successfully"
}
```

#### DELETE `/products/delete` - Delete a product (Admin only)

Request body:

```json
{
    "_id": "609d9ecb38c7d912345abcdf"
}
```

Response (204 No Content or 200 OK):

```json
{
    "success": true,
    "message": "Product deleted successfully",
    "deletionData": {
        // Deletion details
    }
}
```

#### PUT `/products/update` - Update a product (Admin only)

Request body:

```json
{
    "_id": "609d9ecb38c7d912345abcdf",
    "update": {
        "priceCents": 3999,
        "stock": 15
    }
}
```

Response (200 OK):

```json
{
    "success": true,
    "message": "Product updated successfully",
    "updateStatus": {
        // Update details
    }
}
```

### Order Endpoints

| Method | Endpoint           | Description         | Auth Required | Admin Only |
| ------ | ------------------ | ------------------- | :-----------: | :--------: |
| GET    | `/order/admin/all` | Get all orders      |      Yes      |    Yes     |
| GET    | `/order/`          | Get user's orders   |      Yes      |     No     |
| PUT    | `/order/update`    | Update order status |      Yes      |     No     |
| POST   | `/order/place`     | Place a new order   |      Yes      |     No     |

#### GET `/order/admin/all` - Get all orders (Admin only)

Response (200 OK):

```json
{
    "success": true,
    "message": "Product loaded successfully",
    "orderDetails": [
        {
            "_id": "609d9ecb38c7d912345abcdg",
            "customerEmail": "user@example.com",
            "shippingAddress": "123 Example St",
            "paymentMethod": "card",
            "status": "pending",
            "products": [
                // Product details
            ],
            "customer": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "createdAt": "2023-05-10T12:00:00.000Z",
            "updatedAt": "2023-05-10T12:00:00.000Z"
        }
        // ...more orders
    ]
}
```

#### GET `/order/` - Get user's orders

Request body:

```json
{
    "email": "user@example.com"
}
```

Response (200 OK):

```json
{
    "success": true,
    "message": "Product loaded successfully",
    "orderDetails": [
        // User's orders with details
    ]
}
```

#### PUT `/order/update` - Update order status

Request body:

```json
{
    "orderID": "609d9ecb38c7d912345abcdg",
    "status": "confirmed"
}
```

Response (200 OK):

```json
{
    "success": true,
    "message": "Operation successful",
    "updateStatus": {
        // Update details
    }
}
```

#### POST `/order/place` - Place a new order

Request body:

```json
{
    "customerEmail": "user@example.com",
    "shippingAddress": "123 Example St, City, Country",
    "paymentMethod": "card",
    "status": "pending",
    "products": [
        {
            "productId": "609d9ecb38c7d912345abcdf",
            "priceCents": 4999,
            "qty": 2
        }
    ]
}
```

Response (201 Created):

```json
{
    "success": true,
    "message": "Operation successful",
    "saveStatus": {
        // Order details including generated _id
    }
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Token) for authentication. When a user logs in, they receive a token that should be included in subsequent requests.

In Postman, add the token to the Authorization tab:

1. Select "Bearer Token" from the Type dropdown
2. Paste the token value in the Token field

Customer and admin accounts have different permissions:

-   Admin tokens provide access to all endpoints
-   Customer tokens are limited to specific operations

## 🧪 Testing with Postman

1. **First, create an admin user**:

    - Send a POST request to `/user/signin` with admin credentials
    - For initial admin creation, you may need to temporarily modify your code

2. **Login with admin credentials**:

    - Send a POST request to `/user/login`
    - Save the returned token

3. **Set the token in Postman**:

    - In the Authorization tab, select "Bearer Token"
    - Paste your admin token

4. **Test admin endpoints**:

    - Create products
    - View all users
    - Ban/unban users
    - View all orders

5. **Create a customer account and test customer flows**:
    - User registration
    - Product browsing
    - Order placement
    - Order status checking

## 📝 Data Models

### User Model

```javascript
{
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
  banned: { type: Boolean, required: true, default: false }
}
```

### Product Model

=======
>>>>>>> f6869082ce27f3d931ccd5c5c2107a75d7793030
```javascript
{
  name: { type: String, required: true },
  priceCents: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true, default: 1 },
  gender: { type: String, enum: ["mensware", "womensware"], required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "casual Wear",
      "formal Wear",
      "sportsware",
      "outerwear",
      "footwear",
      "accessories"
    ]
  },
  brand: { type: String, required: true }
}
```

### Order Model

```javascript
{
  customerEmail: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["cod", "card"],
    default: "card"
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      priceCents: { type: Number, required: true },
      qty: { type: Number, required: true, default: 1 }
    }
  ],
  timestamps: true
}
```

---

## 🎉 Happy Coding!

Enjoy building with your new backend. For questions or issues, please open an issue on the GitHub repository.

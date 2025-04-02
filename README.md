# 🚀 My First Backend

Welcome to **my-first-backend** - an Express.js powered API with authentication, product management, and order processing capabilities! This project is perfect for e-commerce applications, learning backend development, or just showing off your Node.js skills.

## 📋 Table of Contents

-   [Getting Started](#getting-started)
-   [Environment Setup](#environment-setup)
-   [Authentication](#authentication)
-   [API Endpoints](#api-endpoints)
    -   [User Routes](#user-routes)
    -   [Product Routes](#product-routes)
    -   [Order Routes](#order-routes)
-   [Data Models](#data-models)
-   [Testing with Postman](#testing-with-postman)
-   [Common Errors & Solutions](#common-errors--solutions)
-   [Feature Expansion Ideas](#feature-expansion-ideas)

## 🚀 Getting Started

To get this project up and running on your local machine faster than you can say "Node.js is awesome":

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd my-first-backend

# Install dependencies
npm install

# Start the development server with nodemon
npm run dev
```

Once running, your server will be available at `http://localhost:5000` - ready to receive requests and make API dreams come true!

## 🔑 Environment Setup

Before starting the application, create a `.env` file in the root directory with the following variables:

```
MONGO_DB_CONN_STRING={YOU MONGODB LOCAL OR ATLAS CONNECTION STRING}
PEPPER=thisIsATestPepperSentence123
JWT_SECRET_KEY=thisIsATestSecretKeyForJWT123
```

These environment variables are essential for:

-   MongoDB database connection (where all your precious data lives)
-   Password hashing security with Argon2id (because nobody likes plain text passwords)
-   JWT token generation and validation (your digital VIP passes)

> 🔒 **Security Note**: In a production environment, use strong, unique values for PEPPER and JWT_SECRET_KEY. The values shown here are for demonstration only!

## 🔐 Authentication

This project uses:

-   **JWT (JSON Web Tokens)** for authorization - like digital ID cards for your users
-   **Argon2id** for secure password hashing - winner of the Password Hashing Competition!

There are two user roles with different permissions:

-   **Admin**: Full access to all features (the all-powerful overlords)
-   **Customer**: Limited access to user-specific features (the regular folks)

> 💡 **Tip**: For testing all features, login with an admin account to unlock full functionality. It's like getting the master key to the application!

## 📡 API Endpoints

### User Routes

| Method | Endpoint        | Description         | Auth Required | Admin Only | Request Body                                                                                                                   |
| ------ | --------------- | ------------------- | ------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/user/signin`  | Create a new user   | No            | No         | `{ "email": "user@example.com", "firstName": "John", "lastName": "Doe", "password": "securePassword123", "role": "customer" }` |
| POST   | `/user/login`   | Login to get token  | No            | No         | `{ "email": "user@example.com", "password": "securePassword123" }`                                                             |
| DELETE | `/user/delete`  | Delete user account | Yes           | No         | `{ "email": "user@example.com", "password": "securePassword123" }`                                                             |
| PUT    | `/user/banuser` | Ban/unban a user    | Yes           | Yes        | `{ "email": "user@example.com", "banned": true }`                                                                              |
| GET    | `/user/`        | Get all users       | Yes           | Yes        | None                                                                                                                           |

### Product Routes

| Method | Endpoint           | Description            | Auth Required | Admin Only | Request Body/Query                                                                                                                                                         |
| ------ | ------------------ | ---------------------- | ------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/products/`       | Get all products       | No            | No         | None                                                                                                                                                                       |
| GET    | `/products/filter` | Filter products        | No            | No         | Query params: `category`, `gender`, `maxprice`, `minprice`, `brand`                                                                                                        |
| POST   | `/products/add`    | Add a new product      | Yes           | Yes        | `{ "name": "Product Name", "priceCents": 2999, "description": "Product description", "stock": 10, "gender": "mensware", "category": "casual Wear", "brand": "BrandName" }` |
| DELETE | `/products/delete` | Delete a product       | Yes           | Yes        | `{ "_id": "productId" }`                                                                                                                                                   |
| PUT    | `/products/update` | Update product details | Yes           | Yes        | `{ "_id": "productId", "update": { "priceCents": 3999, "stock": 15 } }`                                                                                                    |

### Order Routes

| Method | Endpoint           | Description         | Auth Required | Admin Only | Request Body                                                                                                                                                                                             |
| ------ | ------------------ | ------------------- | ------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/order/admin/all` | Get all orders      | Yes           | Yes        | None                                                                                                                                                                                                     |
| GET    | `/order/`          | Get user orders     | Yes           | No         | `{ "email": "user@example.com" }`                                                                                                                                                                        |
| PUT    | `/order/update`    | Update order status | Yes           | No         | `{ "orderID": "orderId", "status": "confirmed" }`                                                                                                                                                        |
| POST   | `/order/place`     | Place a new order   | Yes           | No         | `{ "customerEmail": "user@example.com", "shippingAddress": "123 Street, City", "paymentMethod": "card", "status": "pending", "products": [{ "productId": "productId", "priceCents": 2999, "qty": 2 }] }` |

## 📊 Data Models

### User Model

```javascript
{
    email: String,          // Required, Unique - The user's digital identity
    firstName: String,      // Required - What their friends call them
    lastName: String,       // Required - What appears on their driver's license
    password: String,       // Required (stored as Argon2id hash) - Super secret stuff!
    role: String,           // "admin" or "customer" - Their level of power
    banned: Boolean         // Default: false - The naughty list
}
```

### Product Model

```javascript
{
    name: String,           // Required - What customers will see
    priceCents: Number,     // Required - Show me the money! (in cents)
    description: String,    // Required - Convince people to buy it
    stock: Number,          // Required, Default: 1 - How many you've got
    gender: String,         // Required: "mensware" or "womensware" - Who it's for
    category: String,       // Required: Options below - What kind of thing it is
    brand: String           // Required - Who made it
}
```

Valid product categories:

-   "casual Wear" - For Netflix and chill
-   "formal Wear" - For fancy occasions
-   "sportsware" - For getting sweaty
-   "outerwear" - For battling the elements
-   "footwear" - For your feet
-   "accessories" - For the finishing touch

### Order Model

```javascript
{
    customerEmail: String,  // Required - Who's buying
    shippingAddress: String,// Required - Where to send it
    paymentMethod: String,  // Required: "cod" or "card" - How they're paying
    status: String,         // Required: Options below - Where it's at in the process
    products: [             // Array of products in order - What they're buying
        {
            productId: ObjectId,  // Reference to Product - Which product
            priceCents: Number,   // Required - How much they're paying
            qty: Number           // Required, Default: 1 - How many they want
        }
    ],
    createdAt: Date,        // Auto-generated timestamp - When they ordered
    updatedAt: Date         // Auto-generated timestamp - When it was last updated
}
```

Valid order statuses:

-   "pending" - Just placed, awaiting processing
-   "confirmed" - We've seen it and it's good to go
-   "shipped" - It's on the way!
-   "delivered" - It's there! 🎉
-   "cancelled" - Something went wrong 😢

## 🧪 Testing with Postman

### Authentication Setup

1. **Create a user**:

    - Send a POST request to `http://localhost:5000/user/signin` with appropriate user details
    - Watch as your new digital identity springs to life!

2. **Login**:

    - Send a POST request to `http://localhost:5000/user/login` with email and password
    - Save the returned token - it's your golden ticket!

3. **Set Bearer Token**:
    - In Postman, go to Authorization tab
    - Select Type: Bearer Token
    - Paste your token in the Token field
    - Feel the power coursing through your veins!

> ⭐ **Pro tip**: Create both admin and customer accounts to test different permission levels. Switch between them to feel the difference between mere mortals and API gods!

### Example Workflow

1. Login as admin (put on your admin hat)
2. Add some awesome products to your store
3. Create a customer account (switch to your customer disguise)
4. Login as customer
5. Place an order with products (shop till you drop!)
6. Login as admin again to view all orders (back to business)

## 🌟 Response Examples

### Successful User Creation

```json
{
    "success": true,
    "message": "User saved Successfully"
}
```

### Successful Login

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

### Product List Response

```json
{
    "success": true,
    "products": [
        {
            "_id": "60d21b4667d0d8992e610c85",
            "name": "Cool T-Shirt",
            "priceCents": 1999,
            "description": "The coolest shirt you'll ever wear",
            "stock": 42,
            "gender": "mensware",
            "category": "casual Wear",
            "brand": "CoolBrand"
        }
    ],
    "message": "operation successful"
}
```

## 🐛 Common Errors & Solutions

| Error                               | Possible Cause                    | Solution                                              |
| ----------------------------------- | --------------------------------- | ----------------------------------------------------- |
| "Username already exists"           | Email is already registered       | Use a different email or recover the existing account |
| "User Unauthorized"                 | Missing or invalid JWT token      | Login again to get a fresh token                      |
| "User does not exists"              | Typo in email or user was deleted | Double-check email or create a new account            |
| "Password not match"                | Incorrect password                | Check for typos or reset password                     |
| "You are banned from this platform" | Account has been banned           | Contact an admin or create a new account              |

## 🚀 Feature Expansion Ideas

Want to take this project to the next level? Here are some cool features you could add:

1. **Password Reset Flow** - For when users inevitably forget their passwords
2. **Image Upload** - Add product images with Cloudinary or S3
3. **Review System** - Let customers leave reviews for products
4. **Discount Codes** - Everyone loves a good sale!
5. **Wishlists** - Let customers save products for later
6. **Email Notifications** - Keep customers updated about their orders
7. **Admin Dashboard** - Visual statistics for sales and inventory
8. **Payment Gateway Integration** - Connect to Stripe or PayPal

## 🛠️ Technical Stack

-   **Node.js**: JavaScript runtime (because JavaScript everywhere!)
-   **Express.js**: Web framework (lightweight and flexible)
-   **MongoDB**: NoSQL database (flexible document storage)
-   **Mongoose**: MongoDB object modeling (schemas in a schemaless world)
-   **JWT**: Authentication (secure, stateless tokens)
-   **Argon2id**: Password hashing (industry-leading security)
-   **Nodemon**: Development server (auto-reload magic)

## 📚 Middleware Magic

This project uses several custom middleware functions:

-   **Authentication middleware**: Verifies JWT tokens and sets user context
-   **Error handling middleware**: Catches and formats errors for consistent responses
-   **Logging middleware**: Tracks API requests and responses

## 🧠 Design Patterns Used

-   **MVC Pattern**: Routes, Controllers, and Models are separated
-   **Middleware Pattern**: Request processing pipeline
-   **Repository Pattern**: Data access is abstracted
-   **Singleton Pattern**: Database connection is managed as a singleton

---

### 🎉 Congratulations!

You now have a fully functional backend API ready to power your next big idea! Whether you're building an e-commerce store, a social platform, or just learning the ropes of backend development, this project has you covered with all the essential features.

Remember: With great API power comes great responsibility! Use your admin powers wisely. 😉

Happy coding! 🚀

Feel free to contribute to this project by submitting issues or pull requests. Let's make this backend even more awesome together!

---

_"The best way to predict the future is to implement it." - Adapted from Alan Kay_

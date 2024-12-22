# Library Book Management System

A comprehensive Library Book Management System designed to manage book inventory, user registrations, and borrowing requests efficiently. This system allows students to request books, while admins can manage users and book records.

## Features

- User registration and authentication (students and admins)
- CRUD operations for books (Add, Update, Delete, View)
- Request management for borrowing books
- Role-based access control (admin vs. student)
- Priority handling for book requests
- In-depth user profiles and request history

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: express-validator
- **Testing**: Postman for API testing

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v12 or higher)
- MongoDB (local or cloud instance)

### Steps to Install

1. Clone the repository:
    git clone https://github.com/akarsha895/Library_Management_System.git

2. Navigate to the project directory:
   cd Library_Management_System

3. Install dependencies:
  npm install


4. Create a `.env` file in the root directory and add your environment variables:
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>


5. Start the server:
   npm start

6. The server will be running at `http://localhost:5000`.

## Usage

### API Endpoints

#### User Endpoints

- **Register User**
- `POST /api/users/register`

- **Login User**
- `POST /api/users/login`

- **Get User Profile**
- `GET /api/users/profile` (Requires JWT)

#### Book Endpoints

- **Add Book** (Admin Only)
- `POST /api/books/add`

- **Get All Books**
- `GET /api/books`

- **Get Book by ID**
- `GET /api/books/:id`

- **Update Book** (Admin Only)
- `PUT /api/books/:id`

- **Delete Book** (Admin Only)
- `DELETE /api/books/:id`

#### Request Endpoints

- **Create Request**
- `POST /api/requests/create` (Requires JWT)

- **Get My Requests**
- `GET /api/requests/my-requests` (Requires JWT)

- **Update Request Status** (Admin Only)
- `PUT /api/requests/:requestId/status`

- **Process Pending Requests** (Admin Only)
- `POST /api/requests/process-pending`

### Testing with Postman

You can use Postman to test the API endpoints. Import the provided Postman collection to quickly set up your requests.




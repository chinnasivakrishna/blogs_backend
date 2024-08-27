Here's a detailed documentation for your Node.js backend application, which you can include in your `README.md` file:

---

# Blog API

## Overview

This project is a RESTful API built with Node.js, Express, and MongoDB. It provides functionality for managing blog posts, including creating, reading, updating, and deleting blog posts, as well as user authentication and comment management.

## Features

- **User Authentication**: Register new users, log in with email and password, and use JWT for secure access.
- **Blog Management**: Create, read, update, and delete blog posts.
- **Comment Management**: Add and view comments on blog posts.
- **User-Specific Blogs**: Fetch blogs created by the logged-in user.

## Technologies Used

- **Node.js**: Runtime for executing JavaScript code on the server-side.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and blog data.
- **JWT**: JSON Web Token for authentication.
- **CORS**: Middleware for handling Cross-Origin Resource Sharing.
- **Body-Parser**: Middleware for parsing request bodies.

## Setup and Installation

1. **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the root directory of the project and add the following environment variables:

    ```plaintext
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_uri
    ```

4. **Start the Server**

    ```bash
    npm start
    ```

    The server will run on `http://localhost:5000` or the port specified in your `.env` file.

## API Endpoints

### User Routes

- **POST /api/add**
  
  Registers a new user.

  **Request Body:**

  ```json
  {
    "Email": "user@example.com",
    "Password": "password123"
  }
  ```

  **Response:**

  ```json
  "Success"
  ```

- **POST /api/login**
  
  Authenticates a user and returns a JWT token.

  **Request Body:**

  ```json
  {
    "Email": "user@example.com",
    "Password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "token": "jwt_token",
    "user": {
      "email": "user@example.com",
      "id": "user_id"
    }
  }
  ```

### Blog Routes

- **POST /api/posts**
  
  Creates a new blog post. Requires authentication.

  **Request Body:**

  ```json
  {
    "title": "Blog Title",
    "image": "image_url",
    "contents": "Blog content",
    "conclusion": "Blog conclusion"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Blog created successfully",
    "blog": {
      "title": "Blog Title",
      "image": "image_url",
      "contents": "Blog content",
      "conclusion": "Blog conclusion",
      "author": "user_email"
    }
  }
  ```

- **GET /api/posts**
  
  Retrieves a list of all blog titles.

  **Response:**

  ```json
  [
    {
      "title": "Blog Title 1"
    },
    {
      "title": "Blog Title 2"
    }
  ]
  ```

- **GET /api/posts/my-blogs**
  
  Retrieves all blog posts authored by the logged-in user. Requires authentication.

  **Response:**

  ```json
  [
    {
      "title": "User's Blog Title",
      "image": "image_url",
      "contents": "Blog content",
      "conclusion": "Blog conclusion",
      "author": "user_email"
    }
  ]
  ```

- **GET /api/posts/:id**
  
  Retrieves a single blog post by ID.

  **Response:**

  ```json
  {
    "title": "Blog Title",
    "image": "image_url",
    "contents": "Blog content",
    "conclusion": "Blog conclusion",
    "author": "user_email"
  }
  ```

- **PUT /api/posts/:id**
  
  Updates a blog post by ID. Requires authentication.

  **Request Body:**

  ```json
  {
    "title": "Updated Blog Title",
    "image": "updated_image_url",
    "contents": "Updated blog content",
    "conclusion": "Updated blog conclusion"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Blog updated successfully",
    "blog": {
      "title": "Updated Blog Title",
      "image": "updated_image_url",
      "contents": "Updated blog content",
      "conclusion": "Updated blog conclusion",
      "author": "user_email"
    }
  }
  ```

- **DELETE /api/posts/:id**
  
  Deletes a blog post by ID. Requires authentication.

  **Response:**

  ```json
  {
    "message": "Blog deleted successfully"
  }
  ```

- **POST /api/posts/:blogId/comments**
  
  Adds a comment to a blog post. Requires authentication.

  **Request Body:**

  ```json
  {
    "content": "This is a comment"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Comment added successfully",
    "blog": {
      "title": "Blog Title",
      "comments": [
        {
          "user": "user_email",
          "content": "This is a comment",
          "date": "comment_date"
        }
      ]
    }
  }
  ```

- **GET /api/posts/:blogId/comments**
  
  Retrieves comments for a blog post.

  **Response:**

  ```json
  [
    {
      "name": "User Name",
      "content": "This is a comment",
      "date": "comment_date"
    }
  ]
  ```

## Middleware

- **verifyToken**

  Middleware for verifying JWT tokens. It ensures that requests to certain routes are authenticated.

  **Error Responses:**

  - `401`: No token provided or invalid token.

## Contributing

Feel free to submit issues or pull requests if you find bugs or have suggestions for improvements.



---

This documentation provides a comprehensive overview of the API, including setup instructions, endpoint details, and usage examples. Adjust the content according to any specific requirements or updates in your project.
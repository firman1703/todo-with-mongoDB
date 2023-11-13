install
npm install express mongoose bcrypt jsonwebtoken
npm install dotenv --save


#todo-with-mongoDB


# ToDoList API Documentation

## Authentication

- **Register**
  - Endpoint: `POST /auth/register`
  - Request Body: `{ "username": "your_username", "password": "your_password" }`
  - Response: `201 Created` or `400 Bad Request` if the username already exists.

- **Login**
  - Endpoint: `POST /auth/login`
  - Request Body: `{ "username": "your_username", "password": "your_password" }`
  - Response: `{ "token": "your_jwt_token" }` or `400 Bad Request` for invalid credentials.

## ToDoList Endpoints

- **Membuat Todo**
  - Endpoint: `POST /todos`
  - Headers: `auth-token` = `your_jwt_token`
  - Request Body: `{ "title": "Todo Title", "description": "Todo Description" }`
  - Response: `201 Created`

- **Menampilkan Semua Todo**
  - Endpoint: `GET /todos` 
  - Headers: `auth-token` = `your_jwt_token`
  - Response: Array of Todos

- **Menampilkan Todo Berdasarkan Id**
  - Endpoint: `GET /todos/:id`  
  - Headers: `auth-token` = `your_jwt_token`
  - Response: Single Todo or `404 Not Found` if not found

- **Update Todo**
  - Endpoint: `PUT /todos/:id`  
  - Headers: `auth-token` = `your_jwt_token`
  - Request Body: `{ "title": "Updated Title", "description": "Updated Description" }`
  - Response: Updated Todo or `404 Not Found` if not found

- **Delete Todo**
  - Endpoint: `DELETE /todos/:id`  
  - Headers: `auth-token` = `your_jwt_token`
  - Response: Deleted Todo or `404 Not Found` if not found

- **Delete semua Todos**
  - Endpoint: `DELETE /todos`   
  - Headers: `auth-token` = `your_jwt_token`
  - Response: Deleted Todos


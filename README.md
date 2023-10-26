
# REST API for User

This repository contains a Node.js-based REST API for Users to register, login, Update Profiles. It uses a MongoDB database for data storage and provides various endpoints for different functionalities.


## Features

- Installation
- Database Configuration
- API Endpoints


## Installation
To run this project on your local machine, follow these steps:
- Clone the repository:
```bash
  git clone https://github.com/Prateek043/NUTZEN.git

```
- Change into the project directory:
```bash
  cd NUTZEN

```

- Install dependencies:
```bash
  npm start

```
The API will be accessible at http://localhost:5000

## Database Configuration

This project uses a MongoDB database for data storage. You need to configure your database connection. Create a .env file in the project's root directory and add the following environment variables:

env
```
PORT=5000
MONGO_URL=Your MongoDB URL
SECRET_KEY=Your Secret Key
```
Make sure to replace the placeholders with your actual database connection details.
## API Reference

#### Register User

```http
  POST /api/auth/register
```
Register a user (accepts username, password, type of user - buyer or seller).
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Login User

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email,password`      | `string` | **Required**. email of item to fetch |





## Usage/Examples
Once the application is up and running, you can use tools like Postman or curl to interact with the API. Here are some sample requests:
#### Register a user :
```javascript
POST http://localhost:5000/api/auth/register
Body:
{
  "username": "prateek",
  "password": "password123",
}

```

#### Login and get an authentication token:
```javascript
POST http://localhost:5000/api/auth/login
Body:
{
  "username": "prateek",
  "password": "password123"
}
```
Please make sure to replace the sample data with actual data when making requests.
## Tech Stack

**Server:** Node, Express

**DataBase:** MongoDB


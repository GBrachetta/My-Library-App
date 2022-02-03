# Library Catalogue App

This app is designed to keep track of (music) books in libraries.

## Installation

After cloning the repository, run the following commands:

```bash
yarn
cd frontend
yarn
cd ..
yarn dev
```

The script will run both the frontend and backend in development mode.

## Frontend

The frontend is built with [React](https://reactjs.org/).

## Backend

The backend is built with [Node.js](https://nodejs.org/).

## Authentication

The app uses native authentication and validation, and is secured with [JWT](https://jwt.io/) tokens.

## Backend Dependencies

- bcryptjs: To hash the password
- colors: To print colored text in the terminal
- concurrently: To run both the frontend and backend in parallel
- dotenv: To load environment variables from a .env file
- express: To create the backend server
- jsonwebtoken: To create and verify JWT tokens
- mongoose: To connect to the MongoDB database
- validator: To validate user input

## Frontend Dependencies

- axios: To make HTTP requests
- daisyui: To complement the Tailwind CSS framework
- react: To create the frontend
- react-dom: To render the frontend
- react-icons: To render the icons
- react-modal: To create modal dialogs
- react-redux: To connect the frontend to the backend
- react-router-dom: To create the routing
- react-toastify: To create toast notifications

## Deployment

The app is ready to be deployed to Heroku and includes a `heroku:postbuild` hook that builds the frontend in production mode.

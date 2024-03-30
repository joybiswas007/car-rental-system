# Car Rental System

Welcome to our Car Rental System project, an application developed with the MERN Stack (MongoDB, Express.js, React, and Node.js).

## Getting Started

To get this project up and running on your local machine, follow these installation steps.

### Setting Up the Backend

1. **Clone the Repository**

   First, clone the project repository to your local machine. Open your terminal, navigate to the directory where you want the project to reside, and run the following command:

   ```
   git clone https://github.com/joybiswas007/car-rental-system.git
   cd car-rental-system
   npm install
   ```

   This command clones the repository and installs the necessary packages for the backend.

2. **Navigate to the Server Directory**

   Change into the server directory to set up the backend services:

   ```
   cd server
   ```

3. **Install Backend Dependencies**

   In the `server` directory, run the following command to install the backend dependencies:

   ```
   npm install
   ```

### Setting Up the Frontend

1. **Navigate to the Client Directory**

   Open a new terminal window or tab, and navigate to the `client` directory from the root of the project:

   ```
   cd client
   ```

2. **Install Frontend Dependencies**

   Run the following command to install the necessary dependencies for the frontend:

   ```
   npm install
   ```

### Configuration

- **Environment Variables**

  You need to create a `.env` file in the `server` directory to store your environment variables. Here's an example of what your `.env` file should look like:

  ```
  NODE_ENV=production
  PORT=21000
  CAR_DATA_API=https://ip:Port/carsList
  MONGODB_URI=mongodb+srv://username:password.ip/rentalDB
  ```

- **Concurrent Execution**

  To simplify the development process, you can run both the backend and frontend concurrently. From the root directory of the project, execute the following command:

  ```
  npm run start
  ```

  This command starts both the backend and frontend services simultaneously, eliminating the need to run them in separate terminal windows or tabs.

## How to Use

After completing the installation and setup, you can access the application by:

Opening your web browser and navigating to `http://localhost:5173`.


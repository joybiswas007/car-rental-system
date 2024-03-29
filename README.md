# Car Rental

This is a simple car rental system built using MERN Stack.

## Installation

### Backend

1. Clone the repository:

`cd car-rental`
and run `npm install`

2. Navigate to the `server` directory:

```
cd server
```

3. Install dependencies:

```
npm install
```

### Frontend

1. Navigate to the `client` directory:

```
cd client
```

2. Install dependencies:

```
npm install
```

Create a `.env` file inside the `server` directory and fill in all the details.

Example `.env` file:

```
NODE_ENV=production
PORT=21000
CAR_DATA_API=https://ip:Port/carsList
MONGODB_URI=mongodb+srv://username:password.ip/rentalDB
```

Or run concurrently from the cloned directory: `npm run start`
while running concurrently this fire up the backand and frontend at same time
so user don't have to run backand and front end separately.

## Usage

1. Open your web browser and go to `http://localhost:5173` to access the application.

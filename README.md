# Chat App

A real-time chat application built with React (Vite) for the frontend and Node.js/Express with Socket.IO and MongoDB for the backend.

## Features

-   User authentication (register/login)
-   Real-time messaging with Socket.IO
-   Online users indicator
-   Persistent chat history (MongoDB)
-   Responsive and modern UI

## Tech Stack

-   **Frontend:** React, Vite
-   **Backend:** Node.js, Express, Socket.IO
-   **Database:** MongoDB
-   **Other:** Cloudinary (for media), Vercel (deployment)

## Getting Started

### Prerequisites

-   Node.js (v16+ recommended)
-   npm or yarn
-   MongoDB instance (local or cloud)

### Installation

#### 1. Clone the repository

```bash
git clone <repo-url>
cd Chat-App
```

#### 2. Install dependencies

##### Backend

```bash
cd server
npm install
```

##### Frontend

```bash
cd ../client
npm install
```

#### 3. Environment Variables

Create a `.env` file in the `server` directory with the following:

```
MONGODB_URI=<your-mongodb-uri>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

#### 4. Run the app locally

##### Start Backend

```bash
cd server
npm run dev
```

##### Start Frontend

```bash
cd ../client
npm run dev
```

-   Frontend: http://localhost:5173
-   Backend: http://localhost:5000

## Deployment

-   Frontend is deployed on Vercel.
-   Backend can be deployed on Vercel or any Node.js hosting platform.

## Folder Structure

```
client/    # React frontend
server/    # Express backend
```

## License

MIT

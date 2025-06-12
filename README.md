# Chat App

[Live Demo](https://chat-app-deepansh.vercel.app/)

A real-time chat application built with React (Vite) for the frontend and Node.js/Express with Socket.IO and MongoDB for the backend.

## Features

-   User authentication (register/login)
-   Real-time messaging with Socket.IO
-   Online users indicator
-   Persistent chat history (MongoDB)
-   Responsive and modern UI
-   Sidebar users sorted by latest message (auto-updates in real-time)

> **Note:** If using free hosting (e.g., Render), the backend server may take a few seconds to start after a period of inactivity. The app will display a message during this time.

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

Create a `.env` file in the `client` directory with the following:

```
VITE_BACKEND_URL=<your-backend-url>
```

#### 4. Run the app locally

##### Start Backend

```bash
cd server
npm run server
```

##### Start Frontend

```bash
cd ../client
npm run dev
```

-   Frontend: http://localhost:5173 (default Vite port)
-   Backend: http://localhost:5000

## Deployment

-   Frontend is deployed on Vercel.
-   Backend can be deployed on Render, Railway, or any Node.js hosting platform. (Vercel is not recommended for persistent Node.js servers.)

## Folder Structure

```
client/    # React frontend
server/    # Express backend
```

## License

MIT

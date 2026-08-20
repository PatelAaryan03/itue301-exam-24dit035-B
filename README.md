# Library Book Management System

## 1. Project Name

Library Book Management System

## 2. Frontend Setup and Run Command

```bash
cd frontend
npm install
npm run dev
```

Open the frontend at `http://localhost:5173`.

## 3. Backend Setup and Run Command

```bash
cd backend
npm install
npm start
```

The backend runs at `http://localhost:5050`.

## 4. MongoDB Setup

1. Start MongoDB Community Server.
2. Open MongoDB Compass.
3. Connect using:

```text
mongodb://127.0.0.1:27017
```

4. Create or use the database named `library_management`.
5. The MongoDB connection is configured in `backend/.env`.

For MongoDB Atlas, use the connection string provided by Atlas in `MONGO_URI`.

## 5. Required Environment Variables

Create `backend/.env` with:

```env
MONGO_URI=mongodb://127.0.0.1:27017/library_management
PORT=5050
```

Do not commit `.env`. Use `.env.example` as the template.

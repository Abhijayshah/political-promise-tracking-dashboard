# MERN Stack Deployment Guide

This project is a MERN (MongoDB, Express, React, Node.js) stack application. Below are the steps and credentials required for deployment.

## Required Credentials & Services

To run this project in production, you will need the following:

1.  **MongoDB Database**:
    - **Service**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Recommended) or a self-hosted instance.
    - **Credential**: `MONGO_URI` (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname`).

2.  **Google OAuth Credentials**:
    - **Service**: [Google Cloud Console](https://console.cloud.google.com/).
    - **Credential**: `GOOGLE_CLIENT_ID` (and potentially `GOOGLE_CLIENT_SECRET` for some backend flows).
    - **Configuration**: Add your production domain to the "Authorized JavaScript origins" and "Authorized redirect URIs".

3.  **AI Service API Keys**:
    - **Gemini**: [Google AI Studio](https://aistudio.google.com/) for `GEMINI_API_KEY`.
    - **OpenRouter**: [OpenRouter](https://openrouter.ai/) for `OPENROUTER_API_KEY` (used for the chatbot).

4.  **JWT Secret**:
    - A strong, random string for signing JSON Web Tokens (`JWT_SECRET`).

---

## Deployment Steps

### Option 1: Vercel (Recommended for Frontend)

The root directory contains a `vercel.json` file which is configured for Vercel.

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Add all environment variables from `client/.env.example` (with `VITE_` prefix) and `server/.env.example` to the Vercel project settings.
4.  Vercel will automatically build and deploy.

### Option 2: Render / Heroku / Railway (Recommended for Backend)

1.  Create a new Web Service and connect your repository.
2.  Set the **Root Directory** to `server`.
3.  **Build Command**: `npm install`
4.  **Start Command**: `npm start`
5.  Add the environment variables listed in `server/.env.example`.
6.  Ensure `NODE_ENV` is set to `production`.

### Option 3: Manual Deployment (VPS/Docker)

1.  Install Node.js (v18+) and MongoDB on your server.
2.  Clone the repository.
3.  Run `npm run install-all` at the root.
4.  Build the client: `cd client && npm run build`.
5.  Configure the server to serve the client build (set `SERVE_CLIENT=true` and `NODE_ENV=production` in `server/.env`).
6.  Start the server: `cd server && npm start`.
7.  Use a process manager like **PM2** to keep the server running: `pm2 start src/server.js --name "promise-tracker"`.

---

## Environment Variables Summary

### Server Variables
| Variable | Description | Default (Dev) |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5001` |
| `MONGO_URI` | MongoDB Connection String | `in-memory` |
| `JWT_SECRET` | Secret for auth tokens | `dev_secret_key` |
| `GOOGLE_CLIENT_ID` | Google OAuth ID | Required |
| `GEMINI_API_KEY` | Google Gemini API Key | Required |
| `OPENROUTER_API_KEY` | OpenRouter API Key | Required |

### Client Variables
| Variable | Description | Default (Dev) |
| :--- | :--- | :--- |
| `VITE_API_URL` | Backend API URL | `http://localhost:5001` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth ID | Required |

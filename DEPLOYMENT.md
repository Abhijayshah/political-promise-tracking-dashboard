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

### Option 3: Docker Deployment (Containerization)

This project is fully containerized using Docker and Docker Compose. This is the recommended method for consistent production deployments.

#### 1. Build and Push Images to DockerHub
Before deploying to a server, you must build the images locally and push them to your registry:

```bash
# Build Backend
docker build -t abhijayshah/promise-backend:latest ./server

# Build Frontend (Multi-stage build with Nginx)
docker build -t abhijayshah/promise-frontend:latest ./client

# Login to DockerHub
docker login

# Push Images
docker push abhijayshah/promise-backend:latest
docker push abhijayshah/promise-frontend:latest
```

#### 2. Orchestration with Docker Compose
The `docker-compose.yml` file in the root directory manages the interaction between the Frontend, Backend, and MongoDB.

**To run the entire stack:**
```bash
docker compose up -d
```

**Service Configuration:**
- **Frontend**: Runs on Nginx, mapped to host port `5173`.
- **Backend**: Runs on Node.js, mapped to host port `5001`.
- **MongoDB**: Runs on the default port `27017` with a persistent volume (`mongo-data`).

#### 3. Production Environment Variables
When using Docker, ensure the following are set in the `environment` section of `docker-compose.yml`:
- `MONGO_URI`: `mongodb://mongodb:27017/political_db` (internal networking)
- `VITE_API_URL`: Should point to your production backend URL.
- `SITE_URL`: Should point to your production frontend URL.

---

## Docker & Team Collaboration FAQ

### **Q: Do I need to add real credentials (API keys, DB links) to the Docker images?**
**A:** **No.** Docker images should only contain the code and dependencies. Secrets should never be baked into images. Instead, use the `environment` section in `docker-compose.yml` or an `.env` file to pass these values at runtime.

### **Q: Should I hardcode real credentials in `docker-compose.yml` for my team?**
**A:** **No.** For a team project, use `${VARIABLE_NAME}` syntax in `docker-compose.yml`. Each team member should create their own local `.env` file based on `.env.example`. This prevents sensitive keys from being pushed to GitHub or DockerHub.

### **Q: Do I need to change the `MONGO_URI` in `docker-compose.yml`?**
**A:** It depends:
- To use the **Local Docker MongoDB**: Keep it as `mongodb://mongodb:27017/political_db`.
- To use **MongoDB Atlas**: Update it to your actual `mongodb+srv://...` connection string.

### **Q: When do I need to re-build and push images to DockerHub?**
**A:** Only when the **source code** (`.js`, `.jsx`, `.css`) or **dependencies** change. If you only change a value in your `.env` file or `docker-compose.yml`, you just need to run `docker compose up -d` again.

### **Q: Where do the Google OAuth credentials go?**
**A:** They belong in the `backend` environment variables. Ensure the `GOOGLE_CLIENT_ID` is available to the server at runtime via the `.env` file.

---

## Best Practices for Production
- **Use .dockerignore**: Always ensure `node_modules` and `.env` are ignored during build to keep images small and secure.
- **Multi-stage Builds**: Use multi-stage builds for the frontend to serve only static assets via Nginx.
- **Security**: Never push your `.env` file to version control (GitHub/GitLab).
- **Versioning**: Tag your images with version numbers (e.g., `v1.0.0`) instead of just `latest` for better tracking.

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




### Summary - docker steps and Q and A 
No, the docker-compose.yml file is not the Docker image .

Think of it like this:

### 1. The Dockerfile (The Recipe)
The Dockerfile is the recipe . It tells Docker how to install Node.js, copy your code, and build the application. You have one for the frontend and one for the backend.

### 2. The Docker Image (The Pre-cooked Meal)
The Image is the result of that recipe. It is the frozen package you created when you ran the docker build command. These are the files you pushed to DockerHub ( abhijayshah/promise-backend:latest ).

### 3. The docker-compose.yml (The Restaurant Manager)
This file is the Manager . It doesn't contain any code; it just tells Docker how to run multiple images together.

- It says: "Hey Docker, pull the backend image and the frontend image from DockerHub, and start a MongoDB image from the official library. Connect them all on the same network."
### Breakdown of your docker-compose.yml
- image: mongo:latest : This tells Docker to download the official MongoDB image.
- image: abhijayshah/promise-backend:latest : This tells Docker to use the image you built and pushed to DockerHub earlier.
- environment: : These are the instructions you give to the images at the moment they start running (like telling the chef how much salt to add to the pre-cooked meal).
### Summary
- Dockerfile = Recipe
- Docker Image = The pre-packaged result (on DockerHub)
- docker-compose.yml = The instructions on how to run everything together.
- Container = The actual app running on your computer.
You use this file to launch your images, but the images themselves are stored securely in your DockerHub repository!
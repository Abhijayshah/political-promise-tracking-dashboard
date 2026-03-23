# Political Promise Tracker - Q&A Log

This document tracks the technical questions asked during the development and dockerization of the Political Promise Tracker project, along with their solutions.

---

## 1. PROJECT ANALYSIS & SETUP

### **Q: How is the project structured and what is the tech stack?**
**A:** The project uses the **MERN stack**:
- **Frontend**: React 19 (Vite), Tailwind CSS, Framer Motion, GSAP, Three.js.
- **Backend**: Node.js, Express.js (ES Modules).
- **Database**: MongoDB (Mongoose).
- **AI**: Google Gemini AI (via OpenRouter and direct SDK).
- **Automation**: node-cron for news fetching.

### **Q: How do I run the project locally?**
**A:** Use the root command `npm run dev` to start both the client (port 5173) and server (port 5001) simultaneously using `concurrently`.

---

## 2. AUTHENTICATION & GOOGLE OAUTH

### **Q: Why was Google Login failing with "Wrong recipient, payload audience != requiredAudience"?**
**A:** This was caused by a **race condition** in environment variable loading. The backend was initializing the Google OAuth client before `dotenv.config()` had finished, resulting in an `undefined` Client ID.
**Fix**: Added `dotenv.config()` directly inside the `auth.js` route file to ensure variables are available immediately.

### **Q: My deployed Vercel site shows "Failed to fetch" when I try to login. How do I fix it?**
**A:** This usually happens due to **CORS policy** or **URL formatting**:
1. **CORS**: Ensure the backend explicitly allows your Vercel URL (without a trailing slash).
2. **Trailing Slashes**: If the `VITE_API_URL` has a trailing slash (e.g., `...onrender.com/`), it can cause double slashes in the API path.
**Fix**: Updated the backend CORS logic to be more robust and added normalization to the frontend API utility to strip trailing slashes.

---

## 3. DOCKER & CONTAINERIZATION

### **Q: Is the `docker-compose.yml` file the actual Docker image?**
**A:** **No.** 
- **Dockerfile**: The recipe (how to build).
- **Docker Image**: The pre-packaged result (stored on DockerHub).
- **docker-compose.yml**: The manager (how to run everything together).
- **Container**: The actual running application.

### **Q: How do I create and push images to DockerHub as a beginner?**
**A:** Follow these three steps:
1. **Build**: `docker build -t username/repo-name:latest ./folder`
2. **Login**: `docker login`
3. **Push**: `docker push username/repo-name:latest`

### **Q: Should I put my real MongoDB Atlas URI and API keys in the Docker image?**
**A:** **NO.** Never bake secrets into an image.
1. Use an **`.env` file** for your local secrets.
2. Use **`${VARIABLE_NAME}`** syntax in `docker-compose.yml`.
3. Share an **`.env.example`** with your team so they can fill in their own keys.

---

## 4. DEPLOYMENT & OPTIMIZATION

### **Q: How do I fix the Node.js version warning on Vercel?**
**A:** Vercel automatically upgrades Node.js if you use a range like `>=18`.
**Fix**: Pin the version to a specific major release in your `package.json` engines field: `"node": "22.x"`.

### **Q: How do I handle security vulnerabilities in my dependencies?**
**A:** Run `npm audit fix` in the root, client, and server directories. This automatically updates packages to the nearest secure version.

### **Q: Why does my Render backend take so long to respond the first time?**
**A:** Render's **Free Tier** puts instances to sleep after inactivity. The first request after a break triggers a "spin-up" process, which can take 50 seconds or more. This is normal behavior for the free tier.

---

## 5. TEAM COLLABORATION

### **Q: How should a new teammate start working on this project?**
**A:** I created a **Teammate Quick Start** guide:
1. Clone the repo.
2. Copy `.env.example` to `.env`.
3. Fill in the required API keys.
4. Run `docker compose up -d`.
5. If they change code, they should run `docker compose up --build`.

---

## 6. CREDENTIALS & SECRETS MANAGEMENT

### **Q: Which core credentials do I actually need to provide?**
**A:** You need 6 core credentials for full functionality:
1. **MONGO_URI**: Your MongoDB Atlas link (or local Docker DB).
2. **JWT_SECRET**: A random string for securing logins.
3. **GOOGLE_CLIENT_ID**: From Google Cloud Console.
4. **GEMINI_API_KEY**: From Google AI Studio.
5. **OPENROUTER_API_KEY**: From OpenRouter.
6. **VITE_API_URL**: Your production/local backend URL.

### **Q: How does Docker "fill in the blanks" from my `.env` file?**
**A:** When you run `docker compose up`, Docker:
1.  **Reads `.env`**: Looks for a `.env` file in the project root.
2.  **Maps Variables**: Replaces placeholders in `docker-compose.yml` (like `${MONGO_URI}`) with the values from your `.env`.
3.  **Injects to Container**: Passes these values into the running container so your app can use them.
This allows you to use your real credentials locally or on a server without ever hardcoding them into your files.
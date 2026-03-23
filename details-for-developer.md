# Project Documentation: Political Promise Tracker

**Last Updated**: 2026-03-23  
**Version**: 1.0.0

---

## 1. PROJECT OVERVIEW
- **Project Name**: Political Promise Tracker
- **Description**: A comprehensive platform designed to track, analyze, and visualize the performance of political leaders (ministers) based on their public promises.
- **Main Goal**: To enhance civic transparency and accountability by providing citizens with data-driven insights into ministerial performance and the status of government initiatives.
- **Target Audience**: Citizens, political researchers, journalists, and policy analysts interested in government accountability.

---

## 2. TECH STACK
- **Frontend**: React 19 (Vite)
- **Styling**: Tailwind CSS (v3), Framer Motion, GSAP, Three.js (React Three Fiber)
- **Backend**: Node.js / Express.js (ES Modules)
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens) & Google OAuth 2.0
- **State Management**: React Context API (`AuthContext`)
- **AI Integration**: Google Gemini AI (for news classification and chatbot)
- **Build Tools**: Vite (Frontend), Node.js (Backend)
- **Package Manager**: npm
- **Deployment**: Vercel (Client), Node-compatible hosting (Server)

---

## 3. FILE STRUCTURE

```text
political-promise-tracker-capstone/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Global state (AuthContext)
│   │   ├── hooks/              # Custom React hooks (useAuth)
│   │   ├── lib/                # API utilities and helpers
│   │   ├── pages/              # Main view components/routes
│   │   ├── App.jsx             # Main routing and layout
│   │   └── main.jsx            # Entry point
│   ├── tailwind.config.js      # Theme and color configuration
│   └── vite.config.js          # Build configuration
├── screenshots/                # Project screenshots for documentation
├── server/                     # Backend Node.js application
│   ├── scripts/                # Data seeding and utility scripts
│   ├── src/
│   │   ├── cron/               # Scheduled tasks (News fetching)
│   │   ├── data/               # Static/initial data
│   │   ├── middleware/         # Auth and validation middleware
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API endpoints
│   │   ├── services/           # AI and business logic
│   │   └── server.js           # Server entry point
├── package.json                # Root scripts for development
└── DEPLOYMENT.md               # Deployment instructions
```

---

## 4. KEY COMPONENTS

### **[StatsGrid](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/components/StatsGrid.jsx)**
- **Purpose**: Displays high-level national overview statistics.
- **Props**: `ministers` (Array), `promises` (Array).
- **Dependencies**: React `useMemo`.

### **[Chatbot](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/components/Chatbot.jsx)**
- **Purpose**: AI-powered assistant for user queries about promises.
- **Dependencies**: Google Gemini AI (via backend).

### **[Leaderboard](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/components/Leaderboard.jsx)**
- **Purpose**: Ranks ministers based on their promise completion performance.
- **Props**: `summary` (Array of performance metrics).

### **[Hero](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/components/Hero.jsx)**
- **Purpose**: Main landing section with 3D background animations.
- **Dependencies**: `framer-motion`, `three.js`.

---

## 5. ROUTING STRUCTURE

### **Public Routes**
- `/`: **[Dashboard](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/pages/Dashboard.jsx)** - Main analytics overview.
- `/ministers`: **[Ministers](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/pages/Ministers.jsx)** - List of all tracked ministers.
- `/ministers/:id`: **[MinisterDetail](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/pages/MinisterDetail.jsx)** - Individual performance profile.
- `/promises`: **[Promises](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/pages/Promises.jsx)** - Searchable promise database.
- `/news`: **[News](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/pages/News.jsx)** - Relevant updates and news feed.
- `/auth`: **[Auth](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/pages/Auth.jsx)** - Login and Registration.

### **Protected Routes**
- `/admin`: **[Admin](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/pages/Admin.jsx)** - Management dashboard (Requires Admin role).
- `/admin/queries`: **[AdminQueries](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/pages/AdminQueries.jsx)** - Handle user feedback/queries.
- `/my/queries`: **[MyQueries](file:///Volumes/VideoAPFS/projects-ssd/political-promise-tracker-capstone/client/src/pages/MyQueries.jsx)** - User-specific query history.

---

## 6. API ENDPOINTS

### **Authentication (`/api/auth`)**
- `POST /google`: Google OAuth login/signup.
- `POST /signup`: Manual email registration.
- `POST /login`: Manual email login.
- `GET /me`: Get current user profile (Auth required).

### **Ministers (`/api/ministers`)**
- `GET /`: List all ministers.
- `GET /:id`: Get specific minister details.

### **Promises (`/api/promises`)**
- `GET /`: Fetch promises with optional filtering and sorting.
- `GET /:id`: Fetch single promise details.

### **Performance (`/api/performance`)**
- `GET /summary`: Aggregated performance metrics for leaderboard and charts.

### **AI & Admin (`/api/admin`, `/api/chatbot`)**
- `POST /chatbot`: Interactive AI query endpoint.
- `POST /import`: Bulk import promises (Admin only).

---

## 7. STYLING SYSTEM
- **Methodology**: Utility-first CSS using **Tailwind CSS**.
- **Dark Mode**: Supported via class-based strategy (`darkMode: 'class'`).
- **Custom Theme**: Defined in `tailwind.config.js` using the `civic-` prefix.
  - `civic-blue`: Primary navy color (#0F213A).
  - `civic-teal`: Accent teal for interactive elements.
  - `civic-green/red`: Status indicators for completed/broken promises.
- **Typography**: Inter and Manrope font families.

---

## 8. ENVIRONMENT VARIABLES

### **Backend (`server/.env`)**
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing tokens.
- `GOOGLE_CLIENT_ID`: OAuth client ID for Google login.
- `GEMINI_API_KEY`: API key for Google Gemini AI services.
- `PORT`: Server port (default: 5001).

### **Frontend (`client/.env`)**
- `VITE_API_URL`: Base URL for backend API.
- `VITE_GOOGLE_CLIENT_ID`: Public Google client ID for OAuth.

---

## 9. SCRIPTS & COMMANDS

### **Root Directory**
- `npm run dev`: Runs both client and server in development mode.
- `npm run install-all`: Installs dependencies for root, client, and server.

### **Backend (`server/`)**
- `npm run dev`: Starts server with `nodemon`.
- `npm run seed`: Populates DB with initial demo data.
- `npm run fetch:news`: Triggers the news processing script.
- `npm run create:admin`: Script to elevate a user to admin role.

### **Frontend (`client/`)**
- `npm run dev`: Launches Vite dev server.
- `npm run build`: Generates production build in `/dist`.

---

## 10. DEPENDENCIES

### **Major Backend Deps**
- `mongoose`: Data modeling for MongoDB.
- `@google/generative-ai`: Google Gemini AI integration.
- `jsonwebtoken`: Secure token-based authentication.
- `node-cron`: Task scheduling for news updates.

### **Major Frontend Deps**
- `framer-motion`: Smooth UI transitions and animations.
- `three`: 3D rendering for the Hero section.
- `chart.js`: Data visualization for performance metrics.
- `aos`: Scroll-based animations.

---

## 11. DEPLOYMENT NOTES
- **Frontend**: Designed for Vercel/Netlify; requires `VITE_` prefix for env vars.
- **Backend**: Can be hosted on any Node.js environment (Railway, Render, AWS).
- **Database**: Requires a MongoDB instance (Atlas recommended).
- **Production Build**: Run `npm run build` in the client folder and serve the static files or use the integrated Express static server.

---

## 12. DOCKER & TEAM COLLABORATION FAQ

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

### Q: Where do the Google OAuth credentials go?
**A:** They belong in the `backend` environment variables. Ensure the `GOOGLE_CLIENT_ID` is available to the server at runtime via the `.env` file.

---

## 13. TEAMMATE QUICK START (DOCKER)

If you are a teammate starting work on this project for the first time, follow these steps:

1.  **Install Docker Desktop**: Ensure Docker is running on your machine.
2.  **Setup Environment**: 
    - Copy `.env.example` to a new file named `.env`.
    - Ask the team lead for the real API keys and DB links, or use your own.
3.  **Launch the Project**:
    ```bash
    docker compose up -d
    ```
4.  **Access the App**:
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend: [http://localhost:5001](http://localhost:5001)
5.  **Making Changes**:
    - If you edit the code, you must rebuild the local images to see changes in Docker:
      ```bash
      docker compose up --build
      ```

---

## 14. FUTURE SECTIONS (Placeholder)
- [TODO: Document specific AI prompt templates used in `geminiClassifier.js`]
- [TODO: Add detailed schema diagrams for Mongoose models]
- [TODO: Document API rate limiting and security headers implementation]



### Summary
- Dockerfile = Recipe
- Docker Image = The pre-packaged result (on DockerHub)
- docker-compose.yml = The instructions on how to run everything together.
- Container = The actual app running on your computer.


### 1. Which credentials do you actually need?
You need to provide 6 core credentials for the project to be fully functional:

1. MONGO_URI : Your MongoDB Atlas link (or use the local Docker one).
2. JWT_SECRET : Any long random string (used for securing user logins).
3. GOOGLE_CLIENT_ID : From your Google Cloud Console (for Google Login).
4. GEMINI_API_KEY : From Google AI Studio.
5. OPENROUTER_API_KEY : From OpenRouter (for the Chatbot).
6. VITE_API_URL : The link where your backend is running.
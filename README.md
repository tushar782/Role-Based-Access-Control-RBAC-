
```
production
├─ backend
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ config
│  │  │  └─ dbConnect.js
│  │  ├─ controller
│  │  │  └─ authController.js
│  │  ├─ index.js
│  │  ├─ middleware
│  │  │  ├─ authMiddleware.js
│  │  │  └─ roleMiddleware.js
│  │  ├─ model
│  │  │  └─ userModle.js
│  │  └─ routes
│  │     ├─ authRoutes.js
│  │     └─ userRoutes.js
│  └─ vercel.json
├─ frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ Login.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ ProtectedRoute.jsx
│  │  │  └─ Register.jsx
│  │  ├─ context
│  │  │  └─ AuthContext.jsx
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ AdminDashboard.jsx
│  │  │  ├─ ManagerDashboard.jsx
│  │  │  ├─ Register.jsx
│  │  │  └─ UserDashboard.jsx
│  │  └─ services
│  │     └─ api.js
│  ├─ tailwind.config.js
│  ├─ vercel.json
│  └─ vite.config.js
├─ package-lock.json
└─ package.json

```
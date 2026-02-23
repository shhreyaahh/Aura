# Aura Project File Structure

## Root Directory
```
Aura/
├── .qodo/
├── backend/
├── frontend/
├── node_modules/
├── .gitignore
├── notes.txt
├── package.json
├── package-lock.json
└── TODO.md
```

---

## Backend Structure

### backend/
```
backend/
├── .env                          (Environment variables)
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                     (Main server entry point)
├── config/
│   ├── cloudinary.js            (Cloudinary configuration)
│   └── db.js                    (Database configuration)
├── controllers/
│   ├── authController.js         (Authentication logic)
│   ├── chatController.js         (Chat functionality)
│   ├── circleController.js       (Circle management)
│   ├── friendController.js       (Friend requests & management)
│   ├── messageController.js      (Message handling)
│   ├── postController.js         (Post CRUD operations)
│   ├── profileController.js      (User profile)
│   └── userController.js         (User management)
├── middleware/
│   ├── authMiddleware.js         (JWT authentication)
│   └── uploadMiddleware.js       (File upload handling)
├── models/
│   ├── Chat.js                  (Chat schema)
│   ├── Circle.js                (Circle schema)
│   ├── Comment.js               (Comment schema)
│   ├── FriendRequest.js         (Friend request schema)
│   ├── Message.js               (Message schema)
│   ├── Post.js                  (Post schema)
│   └── User.js                  (User schema)
├── routes/
│   ├── authRoutes.js            (Auth endpoints)
│   ├── chatRoutes.js            (Chat endpoints)
│   ├── circleRoutes.js          (Circle endpoints)
│   ├── friendRoutes.js          (Friend endpoints)
│   ├── messageRoutes.js         (Message endpoints)
│   ├── postRoutes.js            (Post endpoints)
│   ├── profileRoutes.js         (Profile endpoints)
│   ├── ProtectedRoute.js        (Protected route wrapper)
│   └── userRoutes.js            (User endpoints)
└── node_modules/
```

---

## Frontend Structure

### frontend/
```
frontend/
├── index.html                    (HTML entry point)
├── .gitignore
├── eslint.config.js             (ESLint configuration)
├── package.json
├── package-lock.json
├── vite.config.js               (Vite configuration)
├── README.md
├── public/                       (Static assets)
├── src/
│   ├── App.jsx                  (Main app component)
│   ├── App.css
│   ├── main.jsx                 (React entry point)
│   ├── index.css
│   ├── assets/                  (Images, icons, etc.)
│   ├── components/              (Reusable components)
│   ├── Layouts/                 (Layout components)
│   ├── pages/                   (Page components)
│   ├── store/                   (State management)
│   └── utils/                   (Utility functions)
└── node_modules/
```

### frontend/src/components/
```
components/
├── CircleList.jsx               (Display & manage circles)
├── CreateCircle.jsx             (Create new circle)
├── CreatePost.jsx               (Create new post)
├── createPost.css
├── Friend Selector.jsx          (Select friends for circles)
├── FriendList.jsx               (Display friend list)
├── Layout.jsx                   (Main layout wrapper)
├── Navbar.jsx                   (Navigation bar)
├── Navbar.css
├── PostCard.jsx                 (Individual post display)
├── ProtectedRoute.jsx           (Auth-protected routes)
└── UsernameSetup.jsx            (Username setup component)
```

### frontend/src/pages/
```
pages/
├── Circle.jsx                   (Circles page)
├── FriendRequest.jsx            (Friend requests page)
├── Friends.jsx                  (Friends page)
├── Home.jsx                     (Home/feed page)
├── Messages.jsx                 (Messages page)
├── feed.css
└── auth/                        (Authentication pages)
    ├── Login.jsx
    ├── Register.jsx
    └── auth.css
```

### frontend/src/Layouts/
```
Layouts/
└── mainLayout.jsx               (Main layout wrapper)
```

### frontend/src/store/
```
store/
└── authStore.js                 (Authentication state)
```

### frontend/src/utils/
```
utils/
├── api.js                       (Axios API client)
└── socket.js                    (WebSocket configuration)
```

---

## Key Features by Component

### Authentication
- Login/Register flows
- JWT token management
- Protected routes

### Social Features
- Create and manage circles
- Add/remove friends
- Send friend requests
- View friend lists

### Communication
- Real-time chat
- Messages
- Friend requests

### Content
- Create posts
- Comment on posts
- View feed

### User Management
- User profiles
- Username setup
- Profile management

---

## Technologies Used

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary (file uploads)
- JWT (authentication)

**Frontend:**
- React
- Vite (build tool)
- Bootstrap (styling)
- Axios (HTTP client)
- WebSockets (real-time)
- Zustand/State management


# 🚀 Task Management Frontend

This is the **frontend** for the Task Management System — a responsive, user-friendly application to manage daily tasks with ease. Built with **React.js**, styled using **Tailwind CSS**, and authenticated via **Firebase** with secure JWT-based backend verification.

🔗 **Live Demo**: [Visit the Live App](https://task-management-client-weld.vercel.app)

Demo user
Mail: user1@gmail.com
Paasword: User123@

---

## ✨ Features

- 🔐 Firebase Authentication (Email/Password, Google Sign-In)
- 🛡 JWT-based secure routes
- 📋 Create, edit, delete, and update task status
- 🎨 Beautiful and modern UI using Tailwind CSS
- 💻 Dashboard view for managing personal tasks

---

## 🧩 Tech Stack

- React.js
- Tailwind CSS
- Firebase Authentication
- Axios
- React Router DOM
- Vite

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-management-frontend.git
cd task-management-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_API_BASE_URL=https://task-management-server-neon-nu.vercel.app
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Replace values with your Firebase project's config.

### 4. Run the App

```bash
npm run dev
```

---

## 🧑‍💻 Folder Structure

```
src/
│
├── components/         # Reusable UI components
├── pages/              # Route-based views
├── context/            # Auth & global context providers
├── routes/             # Protected & public route components
├── services/           # Axios configurations and API services
└── styles/             # Tailwind and custom CSS
```

---

## 📂 Deployment

The frontend is deployed using **Vercel**.


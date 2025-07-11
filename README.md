# 🚄 Train Management System

A modern web application for managing train schedules, platforms, and feedback. Built with a React frontend and Node.js/Express backend, it provides a clean, responsive UI for admins and users to manage and monitor train operations efficiently.

---

## ✨ Features
- User authentication (login/register)
- Add, edit, and delete trains (with Train Name, ID, and details)
- View all trains in a searchable, sortable table (with Train Name)
- Platform timeline visualization (shows Train Name)
- Delay and feedback management
- Responsive, modern UI with dark mode support
- Admin and user roles

---

## 🖥️ Tech Stack
- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Database:** (Add your DB, e.g., MongoDB)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd LocalTrain
```

### 2. Install dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Start the development servers
#### Backend
```bash
npm start
```
#### Frontend
```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000) by default.

---

## 📦 Project Structure
```
LocalTrain/
  backend/      # Express API, models, routes
  frontend/     # React app, components, pages
```

---

## 📝 Usage
- Register a new account or log in.
- Add, edit, or delete train schedules (admin). **Train Name is now required.**
- View train status, delays, and platform assignments (with Train Name).
- Submit and view feedback.

---

## 🤝 Contributing
1. Fork the repo and create your branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

---

## 📄 License
MIT

---

## 🙏 Acknowledgements
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- (Add any other libraries or inspirations)

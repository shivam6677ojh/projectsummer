# 🚉 Local Train Platform Allotment System

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT-Secure-orange?style=for-the-badge&logo=jsonwebtokens)  
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)  
![Contributions](https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge)  

---

An efficient **Local Train Platform Allotment System** built using **Interval Trees** and **Priority Queues**.  
The project simulates real-time train platform scheduling in metropolitan cities, with a full **backend + frontend integration**.  
It also demonstrates **Data Structures (DSA)** like **Priority Queue** and **Interval Tree** through interactive visualizations.  

---

## ✨ Features
- 🔐 **Authentication & Security**: Secure login/register with **JWT (JSON Web Token)** authentication.  
- ➕ **Add Trains**: Users can add new trains with details like ID, name, and timings.  
- ✏️ **Edit Trains**: Users can update train details and timings.  
- ❌ **Delete Trains**: Users can remove trains from the schedule.  
- ⏱️ **Smart Scheduling**: Uses Interval Trees to check overlapping schedules and Priority Queue for urgency handling.  
- 📊 **Visualization**: Timeline view of train schedules, delays, and platform allocations.  
- 💬 **Feedback System**: Users can submit and view feedback.  
- 🎨 **Modern UI**: Responsive React.js frontend with loader, search, sorting, and dark mode support.  
- ⚡ **Scalable Backend**: Built with Node.js, Express, and MongoDB.  

---

## 🛠️ Tech Stack
**Frontend**  
- React.js  
- CSS  

**Backend**  
- Node.js  
- Express.js  
- JWT Authentication  

**Database**  
- MongoDB  

**Other Tools**  
- Git & GitHub  
- Nodemon (for development)  

---

## 🏗️ Architecture

[ User ]
⬇
[ React Frontend ] → UI, Loader, Train Management
⬇
[ Express Backend ] → APIs, JWT Auth, Scheduling Logic
⬇
[ MongoDB Database ] → Train Data, Routes, Feedback

yaml
Copy code

---

## 📂 Folder Structure
projectsummer/
│
├── backend/ # Express + Node.js backend
│ ├── controllers/ # Business logic
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API routes
│ ├── middleware/ # JWT authentication
│ └── server.js # Entry point
│
├── frontend/ # React.js frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # React pages
│ │ ├── services/ # API calls (with JWT)
│ │ └── App.js
│ └── public/
│
└── README.md

yaml
Copy code

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/shivam6677ojh/projectsummer.git
cd projectsummer
2. Setup Backend
bash
Copy code
cd backend
npm install
Create a .env file inside backend/ with the following:

ini
Copy code
DB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
Start the backend:

bash
Copy code
npm run dev
3. Setup Frontend
bash
Copy code
cd ../frontend
npm install
npm start
🔐 Authentication (JWT)
Users login/register to get a JWT token.

JWT is stored on the client (localStorage or cookie).

For every API request, the token is sent in headers:

http
Copy code
Authorization: Bearer <your_token>
All train management features (Add/Edit/Delete) are only accessible to logged-in users.

📊 DSA Demonstrations
This project also includes interactive DSA visualizations:

Interval Trees → Detect overlapping train schedules.

Priority Queue → Assign higher priority to urgent/delayed trains.

📌 Example:
If two trains request the same platform at the same time:

The Interval Tree detects the clash.

The Priority Queue decides which train gets priority.

🖼️ Screenshots (Add after running)
🚀 Login / Register Page

📋 Train Management Dashboard (Add/Edit/Delete)

📊 Interval Tree & Priority Queue Demo

⏳ Loader Component

🚀 Future Scope
✅ Integration with real railway APIs for live updates.

✅ Extend to airports & bus terminals.

✅ Add analytics dashboards for performance monitoring.

✅ Deploy on cloud (AWS / Vercel / Railway).

🤝 Contributing
Contributions are welcome!

Fork the repo

Create a new branch

Commit changes

Open a Pull Request

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Developed by Shivam Ojha ✨
Role: Backend Development, Frontend Integration, JWT Authentication, MongoDB Setup, and Train Scheduling Logic.

yaml
Copy code

---


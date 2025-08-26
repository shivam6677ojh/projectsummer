# 🚀 Local Train System Setup Guide

## Quick Setup to Get Everything Working

### 1. **Backend Setup** 🔧

First, create a `.env` file in the `backend` folder:

```bash
cd backend
```

Create a file named `.env` with this content:
```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/localtrain

# JWT Secret Key
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-123456789

# Server Port
PORT=5000

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Node Environment
NODE_ENV=development
```

### 2. **Install Dependencies** 📦

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3. **Start MongoDB** 🗄️

Make sure MongoDB is running on your system:

**Windows:**
- Install MongoDB if not already installed
- Start MongoDB service

**Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 4. **Start the Backend** ⚡

```bash
cd backend
npm start
```

You should see:
```
🚀 Server running on port 5000
🌐 API available at http://localhost:5000
🔗 Frontend URL: http://localhost:3000
✅ MongoDB connected successfully
```

### 5. **Start the Frontend** 🌐

In a new terminal:
```bash
cd frontend
npm start
```

### 6. **Test the System** 🧪

1. Open http://localhost:3000
2. Click "Login" 
3. You should see the thunder login page with API status
4. Click "Test API Connection" to verify backend is working
5. Try registering a new user
6. Try logging in with the registered user

### 7. **Troubleshooting** 🔍

**If API Connection Fails:**
- Check if backend is running on port 5000
- Check if MongoDB is running
- Check browser console for errors

**If MongoDB Connection Fails:**
- Make sure MongoDB is installed and running
- Try using MongoDB Atlas (cloud) instead of local MongoDB

**If Frontend Won't Start:**
- Check if port 3000 is available
- Try `npm install` again in frontend folder

### 8. **Environment Variables** ⚙️

The backend now has default values, but for production, always use a proper `.env` file.

### 9. **Test Users** 👥

After setup, you can:
1. Register new users
2. Login with registered users
3. Add trains and manage the system

## 🎉 You're Ready!

Once everything is set up, you'll have:
- ✅ Beautiful thunder-themed login/register pages
- ✅ Secure JWT authentication
- ✅ Train management system
- ✅ Real-time API connectivity

Let me know if you encounter any issues! ⚡

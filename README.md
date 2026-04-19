# 🏙️ Mumbai Connect

Mumbai Connect is a full-stack web application designed to boost civic engagement. Citizens can use this platform to register accounts, view city metrics, and submit civic issue reports (like potholes, broken streetlights, or water leaks) directly to a centralized database.

## 📁 Project Structure

This project is separated into two distinct environments:
- **`frontend/`**: The React.js user interface (Runs on Port 3000)
- **`backend/`**: The Node.js, Express, and MySQL server (Runs on Port 5000)

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your computer:
1. **[Node.js](https://nodejs.org/)** (v14 or higher)
2. **MySQL Database** (and a GUI manager like MySQL Workbench or XAMPP)
3. **Git**

---

## 🚀 Step-by-Step Setup Guide

Follow these instructions exactly to get both the backend and frontend running on your local machine.

### 1. Clone the Repository
Open your terminal and run:
`git clone https://github.com/YOUR_USERNAME/wtproject.git`
`cd wtproject`

### 2. Database Setup (MySQL)
You must create the database and its tables before the backend server can start. We have included an automated script to make this easy:
1. Open **MySQL Workbench** and connect to your local server.
2. Open the `backend/database.sql` file included in this project.
3. Copy all the text inside `database.sql`, paste it into a new SQL query tab in Workbench.
4. Click the **Lightning Bolt** ⚡ (or press `Ctrl + Enter`) to execute the code.
5. *Verify:* Refresh your schemas. You should now see a database called `mumbai_connect` containing a `users` table and a `reports` table.

### 3. Backend Setup (The Server)
Open a terminal inside the main project folder and navigate to the backend:
`cd backend`

Install all the required backend dependencies:
`npm install`

**Configure Environment Variables:**
1. Inside the `backend` folder, locate the file named `.env.example`.
2. Duplicate this file and rename the copy to exactly `.env` (make sure there is no `.txt` extension).
3. Open your new `.env` file and update the `DB_PASSWORD` line with your personal local MySQL password. 
   *(Note: If you do not use a password for your local MySQL, leave it completely blank after the equals sign).*

**Start the Server:**
`node server.js`
*✅ Success looks like: `✅ Connected to MySQL Database: mumbai_connect` and `🚀 Server running on http://localhost:5000`*

### 4. Frontend Setup (The User Interface)
**Leave your backend terminal running!** Open a **second, new terminal window**, ensure you are in the main project folder, and navigate to the frontend:
`cd frontend`

Install all the required React dependencies:
`npm install`

**Start the React App:**
`npm start`

*✅ This will automatically open your default web browser to `http://localhost:3000`. The frontend is now successfully communicating with your backend!*

---

## 🐛 Common Troubleshooting

* **Error: "Access denied for user 'root'@'localhost'"** Your MySQL password in the `backend/.env` file is incorrect. Update it, save the file, and restart the backend server (`Ctrl + C` then `node server.js`).
* **Error: "Unknown database 'mumbai_connect'"** You skipped Step 2. Open MySQL Workbench and run the code inside the `database.sql` file.
* **Website shows "Failed to fetch" or "Network Error" when logging in** Your backend server is not running. Ensure you have **two** terminal windows open concurrently—one running `node server.js` in the backend folder, and one running `npm start` in the frontend folder.
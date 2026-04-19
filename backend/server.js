const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Allows Node to read JSON data

// Make the uploads folder public so React can display the images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── 1. DATABASE CONNECTION ───
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database: mumbai_connect');
});

// ─── 2. MULTER SETUP FOR FILE UPLOADS ───
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'photo') {
            cb(null, 'uploads/reports/');
        } else if (file.fieldname === 'profilePic') {
            cb(null, 'uploads/profiles/');
        } else {
            cb(null, 'uploads/documents/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// ─── 3. ROUTES ───

// [A] Register User
app.post('/api/register', async (req, res) => {
    const { name, email, password, area } = req.body;
    try {
        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = "INSERT INTO users (name, email, password, area) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, hashedPassword, area], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Email already exists' });
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// [B] Login User
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(400).json({ error: 'User not found' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) return res.status(400).json({ error: 'Incorrect password' });

        // Send user data back to React (minus the password)
        res.json({ 
            message: 'Login successful', 
            user: { id: user.id, name: user.name, email: user.email, profile_pic: user.profile_pic } 
        });
    });
});

// Profile Update Endpoint
app.post('/api/update-profile', upload.single('profilePic'), (req, res) => {
    const { userId, name } = req.body;
    let query = "UPDATE users SET name = ? WHERE id = ?";
    let params = [name, userId];

    // If a photo was uploaded, update that path too
    if (req.file) {
        query = "UPDATE users SET name = ?, profile_pic = ? WHERE id = ?";
        params = [name, req.file.path, userId];
    }

    db.query(query, params, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Fetch the updated user to send back to React
        db.query("SELECT id, name, email, profile_pic FROM users WHERE id = ?", [userId], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Profile updated", user: rows[0] });
        });
    });
});

// [C] Submit Citizen Report (Text + Image)
app.post('/api/reports', upload.single('photo'), (req, res) => {
    // Note: In a real app, you'd get user_id from a secure token. We'll pass it in the body for now.
    const { user_id, category, location, description } = req.body;
    const image_path = req.file ? req.file.path : null;

    // Combine location and description into the DB's description column
    const fullDescription = `Location: ${location} | Details: ${description}`;

    const sql = "INSERT INTO reports (user_id, category, description, image_path) VALUES (?, ?, ?, ?)";
    db.query(sql, [user_id || null, category, fullDescription, image_path], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to save report' });
        
        // Generate a random ticket number just like your React code did
        const ticketNum = 'BMC-' + (Math.floor(Math.random() * 90000) + 10000);
        res.json({ message: 'Report submitted', ticket: ticketNum });
    });
});

// ─── 4. START SERVER ───
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
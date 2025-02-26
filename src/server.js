const path = require('path');
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

const app = express();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
};

const pool = mysql.createPool(dbConfig);

app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);

        res.status(500).send('Error fetching users from the database');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// If server.js is in the same directory as the script you're running:
const serverPath = path.join(__dirname, 'server.js');
require(serverPath);

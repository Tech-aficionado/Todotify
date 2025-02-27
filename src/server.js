const path = require('path');
const express = require('express');
const mysql = require('mysql2/promise');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const { timeStamp } = require('console');
const app = express();
app.use(cors());
app.use(express.json());
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
};
function tokenGenerator() {
    const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 12; i++) {
      id += keys.charAt(Math.floor(Math.random() * keys.length));
    }
    return id;
  }
const pool = mysql.createPool(dbConfig);

app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);

        res.status(500).send('Error fetching users from the database');
    }
});

app.post('/createUser', async (req, res) => {
    try {

        const sqlsearch = "SELECT * FROM users WHERE email = ? ";
console.log( "SELECT * FROM users WHERE email = '" + req.body.email +"'")
        const query = pool.format(sqlsearch,[req.body.email]);
        const [user] = await pool.execute(query)

        


        if(user.length > 0){
            res.json({status_code: 202,user})
        }else{
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
        fullname: req.body.fullname,
        email:req.body.email,
        }

        const options = {
            expiresIn: '1h',
            issuer: 'Shivansh Goel',
            subject: 'Auth Token - Todotify',
            audience: req.body.fullname,
            header: { alg: 'HS256' }
        };

        const token = jwt.sign(data, jwtSecretKey,options);
        const sqlInsert = "INSERT INTO users VALUES (0,?,?,?,?,?)";

        const insert_query = mysql.format(sqlInsert, [
            tokenGenerator(),
          req.body.email,
          req.body.fullname,
          req.body.password,
          token
        ]);

        const response = await pool.execute(insert_query)

        console.log(req.body)
        res.json({status_code: 200,token,response})
        }

        
    } catch (error) {
        console.error('Error fetching users:', error);

        res.status(500).send('Error fetching users from the database');
    }
});

app.get('/checkUsers', async (req, res) => {
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

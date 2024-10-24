// Import our dependencies
const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv=require('dotenv')

// Setting some configs...
dotenv.config()

// Create a mysql connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Test connection.
db.connect(function(err){
    // if connection was not successful!
    if(err){
        return console.log(`Error! Could not connect to database due to: `, err)
    }
    // If connection was successful..
    console.log(`Successfully established link with database: `, db.threadId)
})

// Question 1
app.get('', function(req, res){
    let sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

// Question 2
app.get('/providers', (req, res) => {
    let sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(sql, function(err, data){
        if(err) throw err;
        res.send(data);
    })
});

// Question 3
app.get('/patients_firstname', function(req, res){
    let sql = 'SELECT first_name FROM patients';
    db.query(sql, (err, data)=>{
        if(err) throw err;
        res.send(data);
    })
});

// Question 4
app.get('/specialty_name', (req, res)=>{
    let sql = 'SELECT provider_specialty FROM providers';
    db.query(sql, function(err, data){
        if(err) throw err;
        res.send(data)
    })
});

// Listen to the server
const PORT = 3000
app.listen(PORT, function(){
    console.log(`App is listening on http://localhost:${PORT}`)
});
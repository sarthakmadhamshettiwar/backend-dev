const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));

//Create and Set Connection Configuration
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login" // Specify your database name here
});

//Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("connected with db");
});

// Serve the HTML file containing the login form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Handle form submission
app.post('/login', (req, res) => {
    //server will send any post request coming on 'localhost:3000/login' in this function
    const { username, password } = req.body;

    let sql = `SELECT password, name FROM users WHERE username = '${username}'`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        let db_result = JSON.parse(JSON.stringify(result));
        let db_password = db_result[0].password,
        db_name = db_result[0].name;
        if(db_password === password){
            res.send('Password authenticated Successfully! Welcome ' + db_name);
        }
        else{
            res.send('Incorrect username or password. Please try again');
        }
    })
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

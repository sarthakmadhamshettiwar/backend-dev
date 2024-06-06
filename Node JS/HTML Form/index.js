const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const app = express();
const port = 3000;


// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitialized: false
}));


// Create and Set Connection Configuration
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login" // Specify your database name here
});


// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("DB Connection Successful");
});


// Serve the signup page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});


// Process the login form data
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let sql = `SELECT name, password FROM users WHERE username = ?`;
    let query = db.query(sql, [username], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length == 0) {
            res.send('No such user found. Please re-enter the username.');
            return;
        }
        result = JSON.parse(JSON.stringify(result));
        let UserName = result[0]['name'], UserPassword = result[0]['password'];
        console.log(`Username: ${UserName}`);
        console.log(`Userpassword: ${UserPassword}`);
        if (UserPassword == password) {
            req.session.loggedin = true;
            req.session.cookie.maxAge = (1000 * 60 * 10); // 10 mins 
            req.session.username = UserName;
            console.log(`${UserName} has logged in`);
            res.redirect('/home');
        } else {
            res.send('Password or Username is wrong');
        }
    });
});


// Serve the login page
app.get('/login', (req, res) => {
    // Check whether user is already logged in or not
    if (req.session.loggedin) {
        res.redirect('/home');
        return;
    }
    res.sendFile(__dirname + '/login.html');
})


// Serve the home page
app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send(`Welcome to your Homepage, ${req.session.username}`);
    } else {
        res.send('Your session has expired. Please login again.');
    }
});


// Process the signup form data
app.post('/signup', (req, res) => {
    const { name, username, password } = req.body;
    let post = { name: name, username: username, password: password };
    let sql = "INSERT INTO users SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        else res.send(`Account Created. Welcome ${username}`);
        console.log(`${name} created New Account`);
    });
});


// Logout route
app.get('/logout', (req, res) => {
    let username = req.session.username;
    req.session.destroy((err) => {
        if (err) throw err;
        console.log(`${username} has logged out!`);
        res.redirect('/login');
    });
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;


// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));


// Create and Set Connection Configuration
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login" // Specify your database name here
});


// Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("DB Connection Successful");
});


// Serve the HTML file containing the login.html file which contains a form
app.get('/', (req, res) => {
    // res.send('')  
       res.send('Sorry but goto /getUserName or /addNewUser');
});

// Processing the data which was sent by any form with action="/getUserName" and method="post"
app.post('/getUserName', (req, res)=>{
    const {username, password} = req.body;
    let sql = `SELECT name, password FROM users WHERE username = '${username}'`;
    let query = db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        if(result.length == 0){
            res.send('No such user found. Please re-enter the username.');
            return;
        }
        result = JSON.parse(JSON.stringify(result));
        let UserName = result[0]['name'], UserPassword = result[0]['password'];

        if(UserPassword == password){
            res.send('User Authenticated Successfully');
            console.log(`${UserName} has logged in`);
        }
        else{
            res.send('Password or Username is wrong');
        }
    });
});


app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/login.html');
})


app.get('/signup', (req, res)=>{
    res.sendFile(__dirname + '/signup.html');
});


app.post('/addNewUser', (req, res)=>{
    const {name, username, password} = req.body;
    let post = {name: name, username: username, password: password};
    let sql = "INSERT INTO users SET ?";
    let query = db.query(sql, post, (err, result)=>{
        if(err) throw err;
        else res.send(`Account Created. Welcome ${username}`);
        console.log(`${name} created New Account`);
    });
});

app.listen(port, ()=>{
    setTimeout(()=>{
        console.log('Server is running at http://localhost:', port);
    }, 1000)
});

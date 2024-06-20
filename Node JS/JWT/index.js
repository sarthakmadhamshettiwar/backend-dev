const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const secret_key = 'SECRET_KEY';
const path = require('path');
const session = require('express-session');

mongoose.connect("mongodb://127.0.0.1:27017/TrialDB")
    .then(()=>{
        console.log('MongoDB Connected')
    });

//Making user Schema
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const User = mongoose.model('user', userSchema);
const PORT = 3000;
const app = express();
app.use(cookieParser());

app.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitialized: false
}));


app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ 
    storage: storage,
    //fileFilter: fileFilter
});

app.get('/',(req, res)=>{
    res.json({'message':'Welcome'});
});

app.post('/stats', upload.single('uploaded_file'), (req, res) => {
    console.log(req.file, req.body);
    res.redirect('/');
});

app.get('/signin', (req, res)=>{
    //validate for already logged in
    //if(already logged in){render homepage(email:email)}
    try{
        let user = jwt.verify(req.cookies.token, secret_key);
        if(user){
            res.render(__dirname + '/home.ejs', {email:user.email});
        }
    }
    catch(err){
        //console.log(err);
        res.sendFile(__dirname + '/signin.html');
    }
});

app.get('/signup', (req, res)=>{

    //validate for already logged in
    //if(already logged in){render homepage(email:email)}

    res.sendFile('C:/Users/DELL/Desktop/intro-to-node/Auth/signup.html');
});


app.get('/logout', (req, res)=>{
    // Delete the cookie
    //console.log(req.cookies.email + ' is trying to logout!');
    res.cookie('token', '', {maxAge:1});
    res.redirect('/');
});


app.post('/signin', async (req, res)=>{
    let {email, password} = req.body;
    //validation from mongoose
    let user = await User.findOne({email:email});
    if(!user){
        res.send('No such user exists!');
    }
    if(user.password === password){
        //create a JWT 
        let token = jwt.sign({
            email: email
        }, secret_key, {expiresIn:'60000'});
        //Now token can be set anywhere
        
        //give the token to someone signin in
        res.cookie('token', token, {maxAge:60*1000});
        res.render('C:/Users/DELL/Desktop/intro-to-node/Auth/home.ejs', {email:email}); //sending to homepage
    }
});


app.get('/restricted', (req, res)=>{
    let token = req.cookies.token;
    if(token){
        //check for token
        try{
            let user = jwt.verify(token, secret_key);
            console.log(`${user.email} has visited restricted page`);
            res.sendFile(__dirname + '/restricted.html');
        }
        catch(err){
            console.log(err);
            res.redirect(__dirname + '/signin');
        }
    }
    else{
        res.send('Please Login or Signup before visiting restricted area');
    }
});


app.post('/signup', async (req, res)=>{
    let {email, password} = req.body;
    //validation from mongoose
    let user = await User.findOne({email:email});
    if(!user){
        await User.create({email:email, password:password});
        //created token
        res.send('Signed up sucessfully!');
    }
    else{
        res.send('User already exist for the given email');
    }
});

app.get('/makeCookie', (req, res)=>{
    res.cookie('newUser', true, {maxAge: 60 * 1000});
    res.cookie('newAdmin', false, {maxAge : 60 * 1000});  //
    res.send('You got some cookies');
})


app.get('/readCookie', (req, res)=>{
    console.log(req.cookies);   //newAdmin and newUser will only get printed if makeCookie route is already visited before
})
app.listen(PORT, ()=>{
    console.log('Server is listening');
});

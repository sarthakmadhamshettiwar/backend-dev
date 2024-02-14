//express advanced server
const express = require('express');

app = express();

//how to respond to .get() request on the root directory.
app.get('/' , (req , res)=>{
    //console.log(req.url); parses only url (ignores the directory)
    return res.send('Welcome to the homepage !');
});

app.get('/about', (req, res)=>{
    return res.send(`Hello ${req.query.name}`);
})
app.listen(8000, ()=>{
    console.log('Server has started !');
});

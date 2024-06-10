const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;

let todoList = [];  //contains all the elements in the todo list

const app = express();

app.use(express.urlencoded({ extended: false })); //use body parser
app.set('view engine', 'ejs');  //copy it when using ejs

app.get('/', (req, res)=>{
    //we will arrive on this page after posting something or after choosing home route specifically
    var today = new Date();
    res.render('list', {currentDay: today.getDay() ,list:todoList});
});

app.post('/', (req, res)=>{
    let item = req.body.newItem;
    todoList.push(item);
    res.redirect('/');
});

app.get('/tasks', (req, res)=>{
    todoList.forEach(element => {
        res.write(element + ' ');
    });
    res.send();
});

app.listen(PORT, ()=>{
    console.log('Server is listening');
})

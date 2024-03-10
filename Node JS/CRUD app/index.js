const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const PORT = 9000;

app = express();

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'nodejs_db'
})
app.get('/', (req, res)=>{
    console.log('User has arrived on the server !');
    const html = "<h1>Welcome to the server</h1>\
    You can get all types of beers using /all\
    Any particular beer using /id \
    ";
    return res.send(html);
})


// Get all beers
app.get('/all', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from beers', (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            // if(err) throw err
            //console.log('The data from beer table are: \n', rows)
        })
    })
});

//get a particular beer's info
app.get('/:id', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log(`Connected as Id: ${connection.threadId}`);
        connection.query('SELECT * from beers where id=?',[req.params.id], (err, rows)=>{
            connection.release();
            if(!err){
                const html = "<h1>"+rows[0]['name']+"</h1> <h3>"+rows[0]['description']+"</h3>";
                res.send(html);
            }
            else{
                console.log(err);
            }
        })
    })
});


// Delete a beer
app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM beers WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`Beer with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from beer table are: \n', rows)
        })
    })
});

// Add beer
app.post('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO beers SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Beer with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from beer table are:11 \n', rows)

        })
    })
});
app.listen(PORT, ()=>{
    console.log('Server has started');
});

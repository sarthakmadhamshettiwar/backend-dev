//Hybrid Server
//performs all the CRUD operations on JSON data
const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

app = express();

//express middleware: without this post message body will be undefined
app.use(express.urlencoded({extended: false}));
app.get('/', (req, res)=>{
    const html = '<h1> Welcome to homepage !</h1>';
    return res.send(html);
});

app.get('/users', (req, res)=>{
    //get the list of all users 
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
`;

    return res.send(html);
});

//REST API FILES   
app.get('/api/users/:id', (req, res)=>{
// :id tells that the id is dynamic url section
// http://localhost:8000/api/users/4
    const id = Number(req.params.id);
    const user = users.find(user=>user.id === id);  //.find() function not specific to json

    return res.send(user);
});

app.post('/api/users', (req, res)=>{
    //TODO: create new user
    // console.log(req.query.name);
    // console.log(req.body.name);
    //Note: req.query.name is the one that is visible in url, and it has nothing to do with th body of the post.
    users.push({...req.body, id:users.length+1});   //useless if we are not pushing it along with id

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        if(err){
            return res.send('Error Occured !');
        }
        else{
            return res.json({status:'success', id:users.length});
        }
    });
});

app.patch('/api/users/:id', (req, res)=>{
    //update a particular user
    //TODO: Edit users with a given id
    let id = Number(req.params.id);
    let new_info = req.body;
    let reqIndex = users.findIndex(user=>user.id===id);
    
    if(reqIndex === -1){
        return res.send({status: 'User Not Found !'});
    }
    else{
        users[reqIndex].college = new_info.college;
        users[reqIndex].first_name = new_info.first_name;
        users[reqIndex].email = new_info.email;
        //Gender generally doesn't change, and id can't be changed as it is attached to user

        //patch the real database
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
            if(err){
                return res.send('Error Occured !');
            }
            else{
                return res.json({status:'success updated', id:users.length});
            }
        });
    }
});

app.delete('/api/users/:id', (req, res) => {
    let id = Number(req.params.id);
    let deleteUserIndex = users.findIndex(user=>user.id===id);
    
    if(deleteUserIndex !== -1){
        users.splice(deleteUserIndex, 1);
        //deleteing from the real data
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
            if(err){
                return res.send('Error Occured !');
            }
            else{
                return res.json({status:'user deleted', id:users.length});
            }
        });
    }
    else{
        return res.json({status:'user not found'});
    }
});

app.listen(8000, ()=>{
    console.log('Server has started');
})


//browsers by default make .get() requests

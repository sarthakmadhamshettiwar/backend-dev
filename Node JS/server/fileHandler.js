//1st nodejs server

// importing the modules
const http = require('http');

//Normal Server
// const myServer = http.createServer((req, res)=>{
//     //req and res both are required
//     console.log(req.httpVersion); //displayed in our terminal
//     res.end('Recieved the request from http version:'+ req.httpVersion);    //displated on the client side
//     //calling res.end() twice within the same callback function is incorrect because once res.end() is called, it ends the response and no further data can be sent in that response. So, the second call to res.end() will throw an error.
// });

// myServer.listen(8000, ()=>{
//     console.log("Server has started !");    //displayed on the server side, i.e. in our terminal
// });

//Log Server

const fs = require('fs');
const myServer = http.createServer((req, res)=>{
    datetime = new Date();
    // if(req){
    //     //add the datetime in log file whenever server is visited
    //     fs.appendFileSync("./log.txt", '\n'+datetime.toISOString()+'\n');
    //     //handling basic url
    // }
    fs.appendFile("./log.txt", '\n'+ datetime.toISOString(), (err)=>{

        switch(req.url){
            case "/":
                res.end("Welcome to the server !");
                break;
            case "/about":
                res.end("This is about page !");
                break;
            
            default:
                res.end("Error 404, Resource Not Found !");
        }
    });
    //res.end("Server Recieved the Request");
});

myServer.listen(8000, ()=>{
    console.log("Server has started !");
})

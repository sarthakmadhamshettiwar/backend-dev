//Server using url parser
const http = require('http');
const url = require('url');

const myServer = http.createServer((req, res)=>{
    if(req.url === '/favicon.ico'){
      //to avoid printing the same thing twice
        res.end();
    }
    else{
        const myUrl = url.parse(req.url, true);
        switch(myUrl.pathname){
            case "/":
                res.end('Welcome to tne server');
                break;
            case "/about":
                res.end('About '+myUrl.query.name);
                break;
            case "/college":
                res.end('You are studying in '+myUrl.query.college);
                break;
            default:
                res.end("Resource not found! ERROR 404 !");
        }
    }
});

myServer.listen(9000, ()=>{
    console.log('Server has started !');
});

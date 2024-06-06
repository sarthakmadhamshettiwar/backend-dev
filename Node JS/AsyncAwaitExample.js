<!DOCTYPE html>
<html>
    <head>
        <title>Async Await Example</title>
    </head>

    <body>
        <script>
            let a = 10, b = 20, result;
            result = a+b;
            //Note: 
            //1. 'await' must be used within 'async' function, otherwise no output will be shown
            //2. 



            //In console, 'result' will be printed before the data fetched from server
            //Method 1:
            // async function getData(){
            //     let serverResult = await fetch("https://jsonplaceholder.typicode.com/users");
            //     console.log(await serverResult.json());
            // }
            // getData();


            //Method 2:
            // fetch("https://jsonplaceholder.typicode.com/users")
            // .then((response)=>response.json())
            // .then((data)=>{
            //     console.log(data);
            // })
            // .catch((error)=>{
            //     console.log(error);
            // })            

            
            //Method 3: Access each name individually
            // async function getData(){
            //     let userName, jsonofiedUserName;
            //     for(let i=1; i<=10; i++){
            //         userName = await fetch(`https://jsonplaceholder.typicode.com/users/${i}`);
            //         jsonofiedUserName = await userName.json();
            //         console.log(jsonofiedUserName['name']);
            //     }
            // } 
            // getData();

            console.log(result);

        </script>
    </body>
</html>

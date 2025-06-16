const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.send("Hello from my first backend Server");
})
app.get('/login', (req,res) =>{
    res.send("Login page is still underconstruction");
})
// app.get('/greet?name=Vansh', (req,res) => { // this is wrong
//     res.send(`Hello ${req.query.name}`);// here i am also sending a query in the request variable which is being used in the result
//     //here '/login' is a route which is a request iam getting and then the api is sending some result
// })

app.get('/greet', (req, res) => {// here if i go to /greet?name = vansh then it will print hello vansh
    const name = req.query.name || "Guest";
    res.send(`Hello ${name}`);
});
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})
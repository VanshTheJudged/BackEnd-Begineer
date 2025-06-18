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
app.get('/api/user', (req,res) => {
    res.json({
        name: "Vansh",
        age: "20",
        isBackendDev: true
    })
})
app.get('/api/product', (req,res) => {
    res.json({
        name:"juicera orange juice",
        price: 99,
        inStock: true
    })
})
app.get('/api/square', (req,res) =>{
    const square = req.query.number*req.query.number;
    res.send(`The square of your number is ${req.query.number*req.query.number}`);
})
app.get('/greet', (req, res) => {// here if i go to /greet?name = vansh then it will print hello vansh
    const name = req.query.name || "Guest";
    res.send(`Hello ${name}`);
});
//Middleware
app.use(express.json());// very important.

app.post('/api/square', (req,res)=>{
    const {num} = req.body;
    res.json({
        "square": num*num
    })
})
app.post('/api/register', (req, res)=>{
    const {name, email} = req.body;//here we are doing object destructuring to extract name and email out.
    //Simulate saving to DB(for now just return the data)
    if(!name || !email){
        console.log("Bitch");
        return res.status(400).json("Email and name can't be left blank");
    }
    if(name.length <= 4){
        console.log("Bitch");
        return res.status(400).json("Enter name of valid length");
    }
    if(email.length < 4){
        return res.status(400).json("Enter email of valid length");
    }
    res.json({
        message: 'User registered successfully',
        user: {
            name,
            email
        }
    });
});
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})
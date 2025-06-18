//✅ 1. What is a POST request?
// POST is used when:
// A client sends data to a server
// Like submitting a form, registering a user, sending a message
// Until now, you’ve only used GET (for reading), now you’ll learn POST (for writing/creating).
// app.use(express.json()); // for parsing JSON body
// 💡 Meaning:
// ✅ express.json() is middleware
// It reads incoming requests that have JSON data in the body (like from Postman or a frontend form)
// And then it adds it to req.body so you can access it easily
const express = require('express');
const app = express();
const port = 8080;

app.listen(port,()=>{
    console.log("Server is connected");
})

//MiddleWare :- Middleware is just a function that runs between the request and the response.
app.use(express.json());

app.post('/api/register', (req, res)=>{
    const {name, email} = req.body;//here we are doing object destructuring to extract name and email out.
    //Simulate saving to DB(for now just return the data)
    res.json({
        message: 'User registered successfully',
        user: {
            name,
            email
        }
    });
});
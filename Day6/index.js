const { json } = require('body-parser');
const { error } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');//fs is a nodejs inbuild library used to 
//modify files and there in json format.
const port = 4000;

app.use(express.json());//Middleware used so that we can also accept data in json format.

app.listen(port,()=>{
    console.log("Server is running");
})

app.post("/api/todo", (req,res)=>{
    const {task} = req.body;
    if(!task){
        return res.status(400).json("Enter Task");
    }

    let todos = [];
    if(fs.existsSync("todos.json")){
        const data = fs.readFileSync("todos.json");
        todos = JSON.parse(data);
    }

    todos.push({task});
    fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
    res.json({message: "Todo Saved ", all: todos});
})

app.get("/api/todo", (req,res)=>{
    if(!fs.existsSync("todos.json")){
        return res.json({ todos: []});
    }
    const data = fs.readFileSync("todos.json");
    const todos = JSON.parse(data);
    res.send({todos});
})

// Sync = Synchronous: It means the code will wait for this operation to complete before moving forward.
// It's easy to use for small scripts (like ours), but not recommended for big apps — because it can block other things.
app.delete("/api/todo:index", (req,res)=>{
    const idx = parseInt(req.params.index);//here in delete we have params not queries like in post
    if(!fs.existsSync("todos.json")){
        return res.json("No Data");
    }
    let todos =JSON.parse(fs.readFileSync("todos.json"));//reading file
    if(idx>=todos.length){return res.status(400).json({error :"Invalid Index"})};

    todos.splice(idx,1);
    fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
    res.json({message:"Todo deleted", todos});
})
app.put("/api/todo/:index", (req,res)=>{
    const idx = parseInt(req.params.index);
    const {task} = req.body;
    if(!task){
        return res.status(400).json({error:"No task provided"});
    }
    if(!fs.existsSync("todos.json")){
        return res.json("No Data");
    }
    let todos = JSON.parse(fs.readFileSync("todos.json"));
    if(idx>=todos.length || idx < 0|| isNaN(idx)){return res.status(400).json({error:"Invalid Index"})};
    //isNan(number) is used to determine wheater the variable given is a number or not
    todos[idx].task = task;//here as its a json file it can have multiple variables as todos[idx] so we also specify which variable we will change here
    fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
    res.send({message: "Update Successfull", todos});
})
// JSON.stringify(todos, null, 2)
// This converts your JavaScript array/object into a JSON string.
// JSON.stringify(value, replacer, space)
//value → the thing you want to stringify (here: todos)
// null → no custom filtering (keep all data)
// 2 → indentation = 2 spaces (makes the JSON file look nice)
//importing
const express = require("express");
const morgan = require("morgan");
//
const app = new express();
app.use(morgan('dev'));
app.use(express.json());
//in memory storage for task
let tasks=[];
//route to get all tasks
app.get("/",(req,res)=>{
    res.json(tasks);
    })
//route to create a new task
app.post('/task',(req,res)=>{
    tasks.push(req.body);
    res.send({message:"task added",tasks})
})
//

app.get('/task/:id',(req,res)=>{

    const id = req.params.id;
    console.log(id)
    const task = tasks.find(task=>task.id===id);
    if(!task){
        res.send("task not found");
     }else{
        res.json(task)
     }
});


//update
app.put('/task/:id',(req,res)=>{
    const id = req.params.id;
    const updatedTask = req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("task not found")
    }else{
        tasks.splice(index,1,updatedTask);

    }
    res.send({message:"task updated",tasks})
})
//to delete a task
app.delete('/task/:id',(req, res)=>{
const id = req.params.id
const index = tasks.findIndex((task)=>task.id===id)
 if(index===-1){
res.send("specified is not present")
 } else{
tasks.splice(index,1);
res.send("element is deleted")
console.log("Deleted")
 }    
})
//
app.listen(3005,(req,res)=>{
    console.log("port is up")
})

// import express
const express = require("express"); // similar to import express from 'express';

// create a server
const server = express();

// middleware - to teach express new tricks
server.use(express.json()); // how to parse JSON from the body

let users = [
    {
        id: 1,
        name: "Raymond", 
        bio: "A cool cat.",  
      }

];

// a function to handle GET requests to /
server.get("/", (req, res) => {
  res.send("API");
});

server.get("/api/users", function (req, res) {
    if (users){res.status(200).json(users);}
    else {res.status(500).json({errorMessage: "The users information could not be retrieved." })}
  
});

server.post("/api/users", function (req, res) {
  // axios.post(url, data, options) -> the data is in the request body
 
    if (req.body.name == undefined || req.body.bio == undefined){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else{
        try{
            users.push(req.body);
            res.status(201).json(req.body)
        }catch{
            res.status(500).json({errorMessage: "There was an error while saving the user to the database" })
        }
    }
});

server.delete("api/users/:id", function (req, res) {
  const id = req.params.id;

  
if(users){users = users.filter(h => h.id !== Number(id));
    res.status(200).json(users);}
    else{
    res.status(404).json({message: "The user with the specified ID does not exist."})}
});

server.patch('/api/users/:id', (req,res) => {
    let user = users.find(user => user.id === req.params.id)
    const changes = req.body
    if (!req.body.name || !req.body.bio ) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (user) {
        Object.assign(user, changes)
        res.status(200).json({user})
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

})



// listen for incoming requests
const port = 8000;

server.listen(port, () => console.log(`\n == API running on port ${port} == \n`));
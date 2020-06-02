const express = require("express"); 

const server = express();

server.use(express.json());

let users = [
    {
        id: 1,
        name: "Raymond", 
        bio: "A cool cat.",  
      },
      {
        id: 2,
        name: "Bob", 
        bio: "A lazy cat.",  
      }

];

server.get("/", (req, res) => {
  res.send("API");
});

server.get("/api/users", function (req, res) {
    if (users){res.status(200).json(users);}
    else {res.status(500).json({errorMessage: "The users information could not be retrieved." })}
  
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    users = users.find(user => user.id === Number(id));

    if(!users.id){
        res.status(404).json({ message: "The user with the specified ID does not exist."})
    } else {
         res.status(200).json(users)
    }

})

server.post("/api/users", function (req, res) {
 
    if (req.body.name == undefined || req.body.bio == undefined){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else{
        try{
            users.push(req.body);
            res.status(201).json(req.body)
        }catch{
            res.status(500).json({errorMessage: "There was an error while saving the user to the database." })
        }
    }
});

server.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  let idfound = false;

    for (i=0; i<users.length; i++){
        if (users[i].id == Number(id)){
            idfound = true;
        }
    }

    if(idfound == true){
        try{
        users = users.filter(h => h.id !== Number(id));
        res.status(200).json(users);
        }catch{
            res.status(500).json({ errorMessage: "The user could not be removed"})
        }
    }
    else{
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
});

server.put('/api/users/:id', (req,res) => {
    if (req.body.name == undefined || req.body.bio == undefined){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }else{
    const id = req.params.id;
    let idfound = false;
    let idchange;
      for (i=0; i<users.length; i++){
          if (users[i].id == Number(id)){
              idfound = true;
              idchange = i;
              break;   
          }
      }

      if(idfound == true){
          try{
          users[idchange].name = req.body.name;
          users[idchange].bio= req.body.bio;
          res.status(200).json(users);
          }catch{
              res.status(500).json({errorMessage: "The user information could not be modified."})
          }
      }
      else{
          res.status(404).json({message: "The user with the specified ID does not exist."})
      }
    }
  });

// listen for incoming requests
const port = 8000;

server.listen(port, () => console.log(`\n == API running on port ${port} == \n`));
const express = require("express");
require("./db/mongoose"); // loads the file so it connects to the database
const User = require("./models/user");
const Task = require("./models/task");

const app = express();

app.use(express.json()); // parse the request to json object

app.post("/users", async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).send(user); 
    } catch(error){
        res.status(400).send(error);
    }   
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
});

app.get("/users", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);        
    } catch(error){
        console.log(error);
        res.status(500).send();
    }
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
});

app.get("/users/:id", async (req, res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);
        // to check if id is invalid so no users fond
        if(!user){
            // return res.status(404).send();
            return res.send({msg: "user not found"});
        }
        res.send(user);
    } catch(error){
        res.status(500).send();
    }
    // User.findById(_id).then((user) => {
    //     if(!user){
    //         return res.status(404).send();
    //     }

    //     res.send(user);
    // }).catch((error) => {
    //     console.log(error)
    //     res.status(500).send();
    // });
});

app.post("/tasks", (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get("/tasks", (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.listen(3000, () => {
    console.log("Server running on the post 3000");
})
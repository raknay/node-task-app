const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.post("/users", async (req, res) => {
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

router.get("/users", async (req, res) => {
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

router.get("/users/:id", async (req, res) => {
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

router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const validUpdates = ["name", "email", "passowrd", "age"];
    const isValidOperation = updates.every((update) => {
        return validUpdates.includes(update);
    });

    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates"});
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, useFindAndModify: false});
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch(error){
        res.status(404).send(error);
    }
});

router.delete("/users/:id", async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(error){
        res.status(500).send();
    }
});

module.exports = router;
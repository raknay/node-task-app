const express = require("express");
require("./db/mongoose"); // loads the file so it connects to the database
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

// middleware starts
app.use(express.json()); // parse the request to json object
app.use(userRouter);
app.use(taskRouter);
//middleware ends

app.listen(3000, () => {
    console.log("Server running on the post 3000");
});
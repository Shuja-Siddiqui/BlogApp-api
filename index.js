const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./modals/User");
const bcrypt = require("bcryptjs");
const app = express();
const jwt =require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
const secret = "hgyiuewgbhekjbciuew";

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://webbyzar:z8KMGDsRJ5lcCduA@cluster0.qiybgku.mongodb.net/blog?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = new User({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    const response = await userDoc.save();
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk){
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            // if
        });
    } else{
        res.status(400).json('wrong cradentials');
    }
  });

app.listen(4000); 

// mongodb+srv://webbyzar:z8KMGDsRJ5lcCduA@cluster0.qiybgku.mongodb.net/blog?retryWrites=true&w=majority

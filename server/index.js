require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require("./config/db")

app.use(cors({origin:'*'}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes/userRoutes'))

app.get('/',(req,res)=>{
    res.send("BACKEND")
})
// connect to DB
connectDB();
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Listening on port " + port);
})
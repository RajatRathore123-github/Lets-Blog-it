import express from "express";
import connection from "./db.js"

import cors from "cors";
import bodyParser from "body-parser";


import Router from "./routes/route.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use("/",Router);

app.use(express.static("client/build"));
app.get("/*", function(req,res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT , () => console.log(`Server is running successfully on port ${PORT}`));
connection();
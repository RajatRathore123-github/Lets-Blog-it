import express from "express";
import connection from "./db.js"
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import cors from "cors";
import bodyParser from "body-parser";


import Router from "./routes/route.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use("/",Router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,"client/build")));
app.get("/*", function(req,res){
    res.sendFile(path.join(__dirname ,'client/build', 'index.html'));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT , () => console.log(`Server is running successfully on port ${PORT}`));
connection();
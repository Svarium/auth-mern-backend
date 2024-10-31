import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDb from "./src/db/connect.js"; //agregar la extensión js sino falla
import cookieParser from "cookie-parser";
import fs from "node:fs";

dotenv.config();

const port = process.env.PORT || 3003;

const app = express();

//middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}));
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

//routes
const routeFiles = fs.readdirSync("./src/routes");
routeFiles.forEach((file) => {
    //uso importaciones dinamicas

import(`./src/routes/${file}`).then((route) => {
    app.use("/api/v1", route.default)
    }).catch((err) => {
        console.log("Failed to load route file", err);        
    })
})

const server = async () => {
      try {
        await connectToMongoDb()
        app.listen(port, () => {
        console.log("Server is running on port:"+ " " + port);       
        })
        
    } catch (error) {
        console.log("fallo al iniciar el servidor", error.message);
        process.exit(1)        
    } 
}

server()


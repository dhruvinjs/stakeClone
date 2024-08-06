import express from "express";
import cookieParser from "cookie-parser";
const app=express()

app.use(express.json({limit:"32kb"}))

app.use(express.urlencoded())//this means tha twe can read the data even encoded in the url

app.use(express.static("public"))

app.use(cookieParser())

export default app;
    
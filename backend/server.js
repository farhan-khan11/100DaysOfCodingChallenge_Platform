import express from 'express'
import cors from 'cors'
import session from 'express-session';
import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

// imports
import generatefile from './generatefile.js';
import executeC from './execute.js';
import executeJS from './executeJS.js';
import "./cleanup.js"
import executePy from './executePy.js';

import './dbConnect.js'
import authRouter from './routes/auth.js';
import githubRouter from './routes/github.js';
import problemRouter from './routes/problem.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 4060 || 4061;

const server = express()


server.use(cors({
    origin: 'http://localhost:3000', // allowing this origin
    credentials: true // and allowing cookies/sessions
}));

server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000

    }
    
}))

server.use('/auth', authRouter)
server.use('/github', githubRouter)
server.use('/problems', problemRouter)



server.get("/hello", (req, res) => {
    return res.status(200).json("Hello from compiler project.")
})

server.post("/run", async (req, res) => {
    let { language, code } = req.body || {}
    console.log("language=c::", language)

    if (code === undefined || code === "") {
        console.log("empty code body")
        return res.status(400).json({ message: "empty code body" })
    }
    try {
        //generating file
        let filePath = await generatefile(language, code);
        let output;
        //executing that file
        if (language == 'c') {
            output = await executeC(filePath)

            console.log("body : ", language, code);
            // console.log("filePath: ", filePath);
            return res.status(200).json({ language: language, code, filePath, output })
            // return res.status(200).json({filePath})
        }
        if (language == 'js') {
            output = await executeJS(filePath)
            console.log("body : ", language, code);
            return res.status(200).json({ language: language, code, filePath, output })
        }
        if (language == 'py') {
            output = await executePy(filePath)
            console.log("body : ", language, code);
            return res.status(200).json({ language: language, code, filePath, output })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
        // return res.status(500).json({error : error.toString()})
    }
    //     catch (error) {
    //     console.log("server erro :",error)
    //     return res.status(500).json({output : "Internal server error"})
    // }
});

//serve frontend build folder first.
const buildPath = path.join(__dirname, "build");

if (fs.existsSync(buildPath)) {
    server.use(express.static(buildPath))
    // React SPA fallback
    server.get(/^\/(?!auth|github|problems|run).*/, (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'))
    })
    console.log('✅ Serving React build from /build')
}



server.use((req, res) => {
    res.status(400).json({ error: "Router not found !" })
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
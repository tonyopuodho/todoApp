import express from 'express'
import cors from 'cors'
import taskrouter from './routes/task.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(cors())
app.use(express.json());
app.use(taskrouter)
app.listen(process.env.PORT, () => { 
    console.log("Server is running")
})
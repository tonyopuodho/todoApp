import { Router } from "express";
import { countTasks, createTasks, getAllTasks, removeTask } from '../database.js';
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.get("/api/tasks", async (request, response) => {
    const [results] = await getAllTasks()
    return response.status(200).send(results)
})

router.post("/api/tasks", async (request, response) => {
    const {task,date_added} = request.body
    const taskAdded = await createTasks(task, date_added)

    if(taskAdded){
         response.status(201).send([{message:"Task added successfully"}])
    } else{
        response.status(400).send([{message:"An Error occured while  adding Task please try again later"}])
    }
})

router.get("/api/count", async (request, response) => {
    const counted = await countTasks()
    response.send(counted)
})

router.delete("/api/tasks/:id", async (request,response) => {
    const { id } = request.params
    const parseId = parseInt(id)

    if(isNaN(parseId)) {
        return response.status(400).send("Invalid request")
    }
    
    const task = await removeTask(parseId);
    if (task) {
        response.status(201).send([{message:"Task deleted successfully"}])
    } else {
        response.status(400).send({message:"Error in deleting task"})
    } 
})

export default router
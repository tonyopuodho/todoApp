import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    dateStrings:["DATE"]
}).promise()

export async function getAllTasks() {
    const task = await pool.query("SELECT * FROM tasks")
    return task
}

export async function createTasks(task,date_added) {
    const createdTasks = await pool.query("INSERT INTO tasks(task,date_added) VALUES(?,?)",[task,date_added])
    return createdTasks
}

export async function removeTask(id) {
    const task = await pool.query("DELETE FROM tasks WHERE id = ?",[id]);
    return task
}

export async function countTasks() {
    const [counted] = await pool.query("select count(task) as count FROM tasks")
    return counted
}


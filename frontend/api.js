const taskElement = document.getElementById('task');
const dateElement = document.getElementById('date');
const buttonElement = document.getElementById('add-btn');
const tableElement = document.getElementById('tbody');
const countElement = document.getElementById('available_task');
const messageElement = document.getElementById('message')
const messageDiv = document.querySelector('.message')
const deletedMessage = document.getElementById('dmessage');
const deletedDiv = document.querySelector('.dmessage')

buttonElement.addEventListener('click', () => {
    const taskValue = taskElement.value;
    const dateValue = dateElement.value;
    
    fetch("http://localhost:5000/api/tasks",{
        headers:{
            'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({
            task:taskElement.value,
            date_added:dateElement.value
        })
    })
    .then(response => response.json())
    .then(data => displayMessage(data))

    taskElement.value = '';
    dateElement.value = '';
})

let displayTable = () => {

    fetch("http://localhost:5000/api/tasks",{
        method:'GET'
    })
    .then(response => response.json())
    .then(data => loadTable(data))
}

let countTask = () => {
    fetch("http://localhost:5000/api/count",{method:'GET'})
    .then(response => response.json())
    .then(data => showTask(data))

    function showTask(task) {
        task.forEach((value) => {
            const { count } = value
            countElement.innerHTML = `${count}`
        }) 
    }

}

let loadTable = (data) => {
    data.forEach((tasks) => {
      const {task, date_added, completed, id} = tasks
      tableElement.innerHTML += `
         <tr>
            <td>${task}</td>
            <td>${date_added}</td>
            <td><input type="checkbox" name="check" class="check"></td>
            <td><button id=${id}>Delete</button></td>
         </tr>        
      `
    })
}


let deleteTask = () => {
    tableElement.addEventListener('click', (e) => {
    const DeleteBtn = e.target.id
    
    fetch("http://localhost:5000/api/tasks/" + DeleteBtn,{method:'DELETE'})
    .then(response => response.json())
    .then(data => displayDeleteMessage(data))
    })
}

let displayMessage = (message) => {
 
    message.forEach((value) => {
        const {message} = value

        messageDiv.classList.add('active')
        setInterval(() => {
            messageDiv.classList.remove('active') 
        },1000)

        messageElement.innerHTML = `${message}`
        
    })

    
}

let displayDeleteMessage = (message) => {
      
    message.forEach((value) => {
        const {message} = value

        deletedDiv.classList.add('active')
        setInterval(() => {
            deletedDiv.classList.remove('active') 
        },1000)

        deletedMessage.innerHTML = `${message}`
        
    })

}

deleteTask()
countTask()
displayTable()



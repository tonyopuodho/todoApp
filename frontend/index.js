const dayElement = document.getElementById('day')
const monthElement = document.getElementById('month')
const yearElement = document.getElementById('year')
const hourElement = document.getElementById('hours')
const secondElement = document.getElementById('seconds')
const minuteElement = document.getElementById('minutes')

let updateCalender = () => {
    const date = new Date
    dayElement.innerHTML = date.getDate();
    monthElement.innerHTML = date.getMonth();
    yearElement.innerHTML = date.getFullYear();
}

let updateTimer = () => {
    const date = new Date()
    hourElement.innerHTML =   hourElement.innerHTML < 10 ? `0` + date.getHours() : date.getHours();
    minuteElement.innerHTML = minuteElement.innerHTML < 10 ?`0` + date.getMinutes() : date.getMinutes()
    secondElement.innerHTML =  secondElement.innerHTML < 10 ? `0` + date.getSeconds() : date.getSeconds(); 
    
    setInterval(() => {
        updateTimer()
    },1000);
}
updateTimer()
updateCalender()
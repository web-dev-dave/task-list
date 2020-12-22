//  Define our UI Variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//  Load all event listeners
loadEventListeners()

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask)
}
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
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask)
  // Remove task event
  taskList.addEventListener('click', removeTask)
  // Clear all tasks
  clearBtn.addEventListener('click', clearTasks)
  // Filter tasks
  filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from local storage
function getTasks() {
  let tasks;

  localStorage.getItem('tasks') === null
    ? tasks = []
    : tasks = JSON.parse(localStorage.getItem('tasks'))

  tasks.forEach(task => {
    // Create li element
    const li = document.createElement('li')
    // Add class
    li.className = 'collection-item'
    // Create text node and append to li
    li.appendChild(document.createTextNode(task))
    // Create new link element
    const link = document.createElement('a')
    // Add class
    link.className = 'delete-item secondary-content'
    // Add icon html
    link.innerHTML = '<i class="fas fa-trash"></i>'
    // Append the link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li)
  })
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task')
  }

  // Create li element
  const li = document.createElement('li')
  // Add class
  li.className = 'collection-item'
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))
  // Create new link element
  const link = document.createElement('a')
  // Add class
  link.className = 'delete-item secondary-content'
  // Add icon html
  link.innerHTML = '<i class="fas fa-trash"></i>'
  // Append the link to li
  li.appendChild(link)

  // Append li to ul
  taskList.appendChild(li)

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value)


  // Clear input
  taskInput.value = ''

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task){
  let tasks;

  localStorage.getItem('tasks') === null
    ? tasks = []
    : tasks = JSON.parse(localStorage.getItem('tasks'))

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){

    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// Remove from ls
function removeTaskFromLocalStorage(taskItem){
  let tasks;

  localStorage.getItem('tasks') === null
    ? tasks = []
    : tasks = JSON.parse(localStorage.getItem('tasks'))

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear tasks
function clearTasks(e) {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  // Clear from ls
  clearTasksFromLocalStorage();
}

// Clear tasks from ls
function clearTasksFromLocalStorage() {
  localStorage.clear()
}

// Filter tasks
function filterTasks(e) {

  const text = e.target.value.toLowerCase()

 
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent

    item.toLowerCase().indexOf(text) !== -1 
      ? task.style.display = 'block'
      : task.style.display = 'none'
  });
}
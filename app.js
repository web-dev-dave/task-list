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
  // Remove task event
  taskList.addEventListener('click', removeTask)
  // Clear all tasks
  clearBtn.addEventListener('click', clearTasks)
  // Filter tasks
  filter.addEventListener('keyup', filterTasks)
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
  // console.log(li)
  taskList.appendChild(li)


  // Clear input
  taskInput.value = ''

  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    // console.log(e.target)
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()
    }
  }
}

// Clear tasks
function clearTasks(e) {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
}

// Filter tasks
function filterTasks(e) {
  // console.log(e.target)
  const text = e.target.value.toLowerCase()

  // console.log(text)
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent
    // console.log(item)
    if(item.toLowerCase().indexOf(text) !== -1) {
      console.log(item)
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  });
}
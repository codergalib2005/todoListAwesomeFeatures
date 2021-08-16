// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', adTodo);
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

// Functions
function adTodo(event) {
    // Prevent Form Form Submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create Li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);  
    //COMPLETE MARK BUTTON
    const completeButon = document.createElement('button');
    completeButon.innerHTML = '<i class="fas fa-check"></i>'
    completeButon.classList.add('complete-btn');
    todoDiv.appendChild(completeButon);
    //TRASH MARK BUTTON
    const trashButon = document.createElement('button');
    trashButon.innerHTML = '<i class="fas fa-trash"></i>'
    trashButon.classList.add('trash-btn');
    todoDiv.appendChild(trashButon);
    // APPEND TO LIST
    todoList.appendChild(todoDiv)


    // CLEAR TODO INPUT VALUE
    todoInput.value = '';
}


function deleteCheck(trash) {
    const item = trash.target;
    // DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodo(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    })
};




// Saved Local Storage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
         // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create Li
    const newTodo = document.createElement('li')
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);  
    //COMPLETE MARK BUTTON
    const completeButon = document.createElement('button');
    completeButon.innerHTML = '<i class="fas fa-check"></i>'
    completeButon.classList.add('complete-btn');
    todoDiv.appendChild(completeButon);
    //TRASH MARK BUTTON
    const trashButon = document.createElement('button');
    trashButon.innerHTML = '<i class="fas fa-trash"></i>'
    trashButon.classList.add('trash-btn');
    todoDiv.appendChild(trashButon);
    // APPEND TO LIST
    todoList.appendChild(todoDiv)
    })
    
}

function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// Selectors

const todoInput = document.querySelector ('.todo__input');
const todoBtn = document.querySelector ('.todo__button');
const todoList = document.querySelector ('.todo__list');
const filterOption = document.querySelector('.select__filter');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);

todoBtn.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteMark);

filterOption.addEventListener('change', filterTodo);

// Functions

function addTodo (event) {
    event.preventDefault();
    
    //Creating a new DIV
    const todoBlock = document.createElement('div');
    todoBlock.classList.add('todo__block');

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo__item');

    todoBlock.appendChild(newTodo);

    // SAVE TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    // Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("todo__complete");
    todoBlock.appendChild(completedButton);

    // Delete Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("todo__trash");
    todoBlock.appendChild(trashButton);

    // Append to List

    todoList.appendChild(todoBlock);

    todoInput.value = "";

};


// CHECK and DELETE
function deleteMark (event) {
    const target = event.target;

    // Delete Todo Item
    if (target.classList.contains("todo__trash")) {
        const todo = target.parentElement;
        todo.classList.add("fall");

        removeLocalTodos(todo);

        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    // Check Mark
    if (target.classList.contains("todo__complete")) {
        const todo = target.parentElement;
        todo.classList.toggle("completed");
    }
};


// FILTER
function filterTodo (event) {
    const todos = todoList.childNodes;
    todos.forEach(function(item) {
        switch(event.target.value) {
            case "all": 
            item.style.display = "flex";
                break;
            case "completed":
                if (item.classList.contains("completed")){
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
            case "incompleted":
                if(!item.classList.contains("completed")){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
                break;

        }
    });
}

// SAVE TODOS TO LOCAL STORAGE

function saveLocalTodos(todo) {
    // check if i already have a todo
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Get Todos from Local Storage

function getTodos() {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        //Creating a new DIV
    const todoBlock = document.createElement('div');
    todoBlock.classList.add('todo__block');

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo__item');

    todoBlock.appendChild(newTodo);

    // Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("todo__complete");
    todoBlock.appendChild(completedButton);

    // Delete Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("todo__trash");
    todoBlock.appendChild(trashButton);

    // Append to List

    todoList.appendChild(todoBlock);
    });
}

// Remove from Local Storage

function removeLocalTodos(todo) {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = (todo.children[0].innerText);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

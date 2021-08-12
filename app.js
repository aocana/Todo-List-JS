/** 
 * =============
 * | Selectors | 
 * =============
 * */
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-Button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const closeModal = document.querySelector('.fa-times-circle');


/** 
 * ===================
 * | Events Listener | 
 * ===================
 * */
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
closeModal.addEventListener("click", close);


/** 
 * =============
 * | Functions | 
 * =============
 * */

function storage(){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function addTodo (event){
    //para no recargar la pagina
    event.preventDefault();

    if (todoInput.value === ""){
        closeModal.parentNode.parentNode.style.display = "flex";
    }else{
        closeModal.parentNode.parentNode.style.display = "none";
        // To do div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //add todo to localstorage
        saveLocalTodos(todoInput.value);
        
        //Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        //Check Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        // Append to list
        todoList.appendChild(todoDiv);
        
        // Clear to do input value
        todoInput.value = '';
    }
}

function deleteCheck(event){
    const item = event.target;

    // Delete
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
        removeLocalTodos(todo);
    }

    // Check mark
    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch( e.target.value ){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if( todo.classList.contains('completed') ){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //check
    let todos = storage();

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos = storage();
    
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Check Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos = storage();

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function close(event){
    closeModal.parentNode.parentElement.style.display="none";
}
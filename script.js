// console.log("JS loaded");

function loadTodos() {
    // This function will load the todos from the browser
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList" : []};
    console.log(todos);  // console.log(tyoeof todos) -> without parse it give string but i need array that's why i use parse
    return todos;
}

// document.addEventListener("DOMContentLoaded",() => {

//     const todoInput = document.getElementById("todoInput");

//     todoInput.addEventListener("change",() => {
//         // This callback method is fired everytime there is a change in the input tag
//         console.log("something change",todoInput.value);  // one way to check value another way is this callback all take one argument this example is given below
//     })


//     loadTodos();
// })

function refreshTodo(todos) {
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodoToLocalStorage(todo) {
    const todos = loadTodos();
    todos.todoList.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function executeFilterAction(event) {
    const todoInput = document.getElementById("todoInput");
    const element = event.target;
    const value = element.getAttribute("data-filter");
    todoList.innerHTML = '';
    const todos = loadTodos();
    if(value == "all") {
        console.log(todoList);
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo);
        })

    }else if(value == "pending") {
        todos.todoList.forEach(todo => {
            if(todo.isCompleted !== true){
                appendTodoInHtml(todo);
            }
        })

    }else {
        todos.todoList.forEach(todo => {
            if(todo.isCompleted == true){
                appendTodoInHtml(todo);
            }
        })

    }
}

function appendTodoInHtml(todo) {
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    todoItem.setAttribute("data-id",todo.id);

    const textDiv = document.createElement("div");

    if(todo.isCompleted) {
        textDiv.classList.add("completed");
    }

    textDiv.textContent = todo.text;
    todoItem.classList.add("todoItem");

    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons");


    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click",editTodo);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click",deleteTodo);

    const completedBtn = document.createElement("button");
    completedBtn.textContent = (todo.isCompleted) ? "Reset" : "Completed";
    completedBtn.classList.add("completeBtn");
    completedBtn.addEventListener("click",toggleTodo);

    

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    todoItem.appendChild(textDiv);

    todoItem.appendChild(wrapper);

    todoList.appendChild(todoItem);
}

function resetHtmlTodos(todos) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
}

function toggleTodo(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        if(todo.id == todoId) {
            todo.isCompleted = !todo.isCompleted;
        }
    });
    refreshTodo(todos);
    resetHtmlTodos(todos);
    // const todoList = document.getElementById("todoList");
    // todoList.innerHTML = '';
    // todos.todoList.forEach(todo => {
    //     appendTodoInHtml(todo);
    // });
}

function editTodo(evet) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    let todos = loadTodos();
    const response = prompt("What is the new todo value you want to set ?");
    todos.todoList.forEach(todo => {
        if(todo.id == todoId) {
            todo.text = response;
        }
    });
    refreshTodo(todos);
    resetHtmlTodos(todos);
}

function deleteTodo(event) {
    console.log("deleting");
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    let todos = loadTodos();
    todos.todoList = todos.todoList.filter(todo => todo.id != todoId);
    refreshTodo(todos);
    resetHtmlTodos(todos);
}

document.addEventListener("DOMContentLoaded",() => {

    const todoInput = document.getElementById("todoInput");

    const submitButton = document.getElementById("addTodo");

    let todos = loadTodos();

    const todoList = document.getElementById("todoList");

    

    const filterBtn = document.getElementsByClassName("filterBtn");

    for(const btn of filterBtn) {
        btn.addEventListener("click",executeFilterAction);
    }

    submitButton.addEventListener("click",addNewTodo);

    todoInput.addEventListener("change",(event) => {
        // This callback method is fired everytime there is a change in the input tag

        // console.log("something change",event.target.value);  // here target point to todoInput id and by applying value we can achive the value which are present in this input id  

        const todoText = event.target.value;

        event.target.value = todoText.trim();

        console.log(event.target.value);
    })

    function addNewTodo() {
        const todoText = todoInput.value;

        if(todoText == '') {
            console.log("Please write something for the todo");
        }else {
            todos = loadTodos();
            const id = todos.todoList.length;
            addTodoToLocalStorage({text: todoText,isCompleted: false,id });
            appendTodoInHtml({text: todoText,isCompleted: false,id });
            todoInput.value = '';
        }
    }



    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    })

    document.addEventListener("keypress",(event) => {
        if(event.code == 'Enter') {
            addNewTodo();
        }
    })

    


})
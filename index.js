const addTodo = document.querySelector("#addTodo");

const todoList = document.querySelector("#todoList");

const todos = [];

function submitTodo() {

  if (addTodo.value != "") {
    let todoObject = new Todo(addTodo.value) 
    todos.push(todoObject);
    addTodo.value = "";
    render();
  };
};

function toggleTodo() { 
  
  this.parentElement.style.textDecoration = this.checked ? "line-through" : "";

  if (this.parentElement.style.textDecoration == "line-through" && this.parentElement.childNodes[2] == undefined) {

    const button = document.createElement("button");
    button.innerHTML = "remove";
    this.parentElement.appendChild(button);

    button.addEventListener("click", removeFromTodos);
  };
};

function removeFromTodos() {

  todos.splice(this.parentElement.id, 1);

  render();
}

function render() {

  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
  
    const li = document.createElement("li");
    todoList.appendChild(li);
    todoList.id = index

    const input = document.createElement("input");
    input.type = "checkbox";
    li.appendChild(input);
    
    const label = document.createElement("label");
    label.innerText = todo.todoName;
    li.appendChild(label);

    input.addEventListener("click", toggleTodo);
  });
};

//keep todo slashes on other element when user clicks on remove
//get rid of remove button when user removes strikethrough
//store state of todo on the todo object, update objects state when user clicks checkbox
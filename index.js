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

  todos[this.parentElement.id].done = this.checked ? true : false;

  render();
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
    li.id = index;

    const input = document.createElement("input");
    input.type = "checkbox";
    li.appendChild(input);
    
    const label = document.createElement("label");
    label.innerText = todo.todoName;
    li.appendChild(label);

    if (todo.done == true) {
      label.style.textDecoration = "line-through";
      input.checked = true;
      const button = document.createElement("button");
      button.innerHTML = "remove";
      li.appendChild(button);
  
      button.addEventListener("click", removeFromTodos);
    } 
    
    input.addEventListener("click", toggleTodo);
  });
};



const addTodo = document.querySelector("#addTodo");

const todoList = document.querySelector("#todoList");

const localStorageTodos = localStorage.getItem("todos");

let todos;

let replace;

if (localStorageTodos != undefined) {
  todos = JSON.parse(localStorageTodos);
  render();
}
else {
    todos = [];
};

function submitTodo() {
  if (!addTodo.value) return;
    
  const foundTodo = todos.some((todo) => todo.todoName == addTodo.value);
  
  if (foundTodo) {
    alert("todo already exists");
    return;
  }

  if (!replace) {
    todos.push(new Todo(addTodo.value));
  } 
  else {
    replace.todoName = addTodo.value;
    replace = undefined;
  };
  
  addTodo.value = "";
  render();
};


// function submitTodo() {
 
//   if (addTodo.value != "") {
//     // TODO: user should not be able to enter same todo more than once. Iterate through todos and see if it contains an item equal to addTodo.value. 
//     //If it doesn't, move onto the code below, else show message saying "to-do already exists"

//     if (replace == undefined) {
//       let todoObject = new Todo(addTodo.value) 
//       todos.push(todoObject);
//     }
//     else {
//       todos.forEach((todo) => {
//         if (todo.todoName == replace) {
//           todo.todoName = addTodo.value;
//         }
//         else {
//           //TODO: alert or message saying replace does not exist. 
//         };
//       });
//       replace = undefined;
//     };
//   };

//   addTodo.value = "";
//   render();
// };

function replaceTodo() {
  if (addTodo.value != "") {
    replace = todos.find((todo) => todo.todoName == addTodo.value);
  };

  addTodo.value = "";
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
    };
    
    input.addEventListener("click", toggleTodo);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};







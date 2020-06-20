'use strict';

(function (window, document) {
  let todolist = [];

  document.querySelector('#btn-todoform').addEventListener('click', addTodo);
  document.querySelector('#input-todoform').addEventListener('keyup', evt => evt.keyCode === 13 ? addTodo() : false);

  function addTodo() {
    let inputElem = document.querySelector("#input-todoform");
    let todo = {
      finish: false,
    };
    if (inputElem.value) {
      todo.name = inputElem.value;
      todolist.push(todo);
      inputElem.value = "";
      render();
    }
  }

  function render() {
    let list = document.querySelector('#list-todolist');
    let html = ``;
    todolist.forEach(function (todo, index) {
      html += `
        <li class="list-group-item">
          <div class="d-flex align-items-center">
            <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input">
                <span class="ml-2">${todo.name}</span>
              </label>
            </div>
            <div class="ml-auto">
              <i class="fas fa-times cursor-pointer" data-id="${index}"></i>
            </div>
          </div>
        </li>
      `
    });
    list.innerHTML = html;
    document.querySelector('#number-todolist').innerHTML = todolist.length;
  }
})(window, document);
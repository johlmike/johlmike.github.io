'use strict';

(function (window, document) {
  // 陣列清單
  let todolist = [];

  // 綁定事件
  document.querySelector('#btn-todoform').addEventListener('click', addTodo);
  document.querySelector('#input-todoform').addEventListener('keyup', e => e.keyCode === 13 ? addTodo() : false);
  document.querySelector('#list-todolist').addEventListener('click', function (e) {
    if (e.target.nodeName === "I") {
      deleteTodo(e);
    }
  });
  document.querySelector('#list-todolist').addEventListener('change', function (e) {
    updateTodo(e);
  });
  document.querySelector('#clear-todolist').addEventListener('click', deleteAllTodo);

  // 新增任務
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
  // 刪除任務
  function deleteTodo(e) {
    let index = e.target.getAttribute('data-id');
    todolist.splice(index, 1);
    render();
  }
  // 刪除所有任務
  function deleteAllTodo() {
    todolist = [];
    render();
  }
  // 更新任務
  function updateTodo(e) {
    let index = e.target.getAttribute('data-id');
    if (!todolist[index].finish) {
      todolist[index].finish = true;
    } else {
      todolist[index].finish = false;
    }
    render();
  }
  // 渲染畫面
  function render() {
    let list = document.querySelector('#list-todolist');
    let html = ``;
    todolist.forEach(function (todo, index) {
      html += `
        <li class="list-group-item">
          <div class="d-flex">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="check-${index}" data-id=${index} ${todo.finish?"checked":""}>
              <label for="check-${index}" class="ml-2 form-check-label ${todo.finish?"line-through":""}">${todo.name}</label>
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
    document.querySelector('#finish-todolist').innerHTML = todolist.filter(todo => todo.finish === true).length;
  }
})(window, document);
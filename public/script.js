function renderTodos(todosArray) {
  const todosHtmlArray = todosArray.map(todo => {
    return `<li class="${ todo.completed ? 'completed' : 'incomplete'}">
    <input class="edit-field" type="text" value="${todo.text}">
    <button class="complete-button" data-id="${todo.id}"data-completed="${todo.completed ? 'completed' : 'incomplete'}">E</button><button class="delete-button" data-id="${todo.id}">X</button></li>`
  })

  return todosHtmlArray.join('')
}

function fetchTodos() {
  fetch('/api/v1/todos')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      todos.innerHTML = renderTodos(data)
    })
}

const todos = document.getElementById('todos')
const todoForm = document.getElementById('todoForm')

fetchTodos()

todoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = document.getElementById('todo_text')
  fetch('/api/v1/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: input.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      }
      fetchTodos()
      todoForm.reset()
    })
})

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-button')) {
    const id = e.target.dataset.id;
    fetch(`/api/v1/todos/${id}`, {
      method: 'DELETE'
    })
      .then(res => !res.ok && res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        }
        fetchTodos()
      })
  }


  if (e.target.classList.contains('complete-button')) {
    const id = e.target.dataset.id;
    const completed = e.target.dataset.completed;
    fetch(`/api/v1/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: completed === 'completed' ? false : true
      })
    })
      .then(res => !res.ok && res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        }
        fetchTodos()
      })
  }
})

  
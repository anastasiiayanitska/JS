const createForm = document.querySelector('#create_form')
const btnAll = document.querySelector('#filter_all')
const btnActive = document.querySelector('#filter_active')
const btnDone = document.querySelector('#filter_done')
const check = document.querySelector('.checkbox')
const todoBlock = document.querySelector('.todo_block')
const search_input = document.querySelector('.search_field_input')


const getTodos = () => {
    const localStorageTodos  = JSON.parse(localStorage.getItem('todosStorage'))
    return localStorageTodos

}

const createTodo = (e) =>{
    e.preventDefault()
    const startDate = document.querySelector('#startDate').value
    const description = document.querySelector('#description').value
    const localStorageTodos = getTodos()
    const newTodo = { 
        id: 'todo_' + Math.random().toString(16).slice(2),
        createAt: new Date(),
         startDate,
         description,
        done:false
        
    }
    if(localStorageTodos && Array.isArray(localStorageTodos)){
        localStorageTodos.push(newTodo)
        localStorage.setItem('todosStorage', JSON.stringify(localStorageTodos))
    }else{
        localStorage.setItem('todosStorage', JSON.stringify([newTodo]))
    }
    renderTodos()
}   


const renderTodos = () =>{
    const localStorageTodos  = JSON.parse(localStorage.getItem('todosStorage'))
    if(localStorageTodos && Array.isArray(localStorageTodos)){
        const container = document.querySelector('.todo_list')
        container.innerHTML = ""
        localStorageTodos.forEach((todos) =>{
            const startDate = new Date(todos.startDate).toLocaleString("ru-Ru",
                 { 
                    day: 'numeric',
                    month: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric'})
            const id = todos.id;
            container.insertAdjacentHTML(
              "beforeend",
              `<li class='todo_block'>
                              <label class="checkbox" for="${id}" onclick="toggleTodoDone('${id}')">
                    <input type="checkbox" name="${id}" id="${id}" ${
                todos.done ? "checked" : ""
              }/>
                    <span class="material-symbols-rounded checkbox_check_icon">
                      check
                    </span>
                  </label>
                  <div class="todo_block_data">
                    <p class="todo_block_date">${startDate}</p>
                    <h3 class="todo_block_title">${todos.description}</h3>
                  </div>
                  <span class="material-symbols-rounded" onclick="deleteTodo('${id}')">
              close
            </span>
                          </li> `
            );
        })
    }
}

function renderFilter (){
    const localStorageTodos  = JSON.parse(localStorage.getItem(`todosFilter`))
    if(localStorageTodos && Array.isArray(localStorageTodos)){
        const container = document.querySelector('.todo_list')
        container.innerHTML = ""
        localStorageTodos.forEach((todos) =>{
            const startDate = new Date(todos.startDate).toLocaleString("ru-Ru",
                 { 
                    day: 'numeric',
                    month: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric'})
            const id = todos.id;
            container.insertAdjacentHTML(
              "beforeend",
              `<li class='todo_block'>
                              <label class="checkbox" for="${id}" onclick="toggleTodoDone('${id}')">
                    <input type="checkbox" name="${id}" id="${id}" ${
                todos.done ? "checked" : ""
              }/>
                    <span class="material-symbols-rounded checkbox_check_icon">
                      check
                    </span>
                  </label>
                  <div class="todo_block_data">
                    <p class="todo_block_date">${startDate}</p>
                    <h3 class="todo_block_title">${todos.description}</h3>
                  </div>
                  <span class="material-symbols-rounded" onclick="deleteTodo('${id}')">
              close
            </span>
                          </li> `
            );
        })
    }
}
function renderSeach (){
    const localStorageTodos  = JSON.parse(localStorage.getItem(`todosSearch`))
    if(localStorageTodos && Array.isArray(localStorageTodos)){
        const container = document.querySelector('.todo_list')
        container.innerHTML = ""
        localStorageTodos.forEach((todos) =>{
            const startDate = new Date(todos.startDate).toLocaleString("ru-Ru",
                 { 
                    day: 'numeric',
                    month: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric'})
            const id = todos.id;
            container.insertAdjacentHTML(
              "beforeend",
              `<li class='todo_block'>
                              <label class="checkbox" for="${id}" onclick="toggleTodoDone('${id}')">
                    <input type="checkbox" name="${id}" id="${id}" ${
                todos.done ? "checked" : ""
              }/>
                    <span class="material-symbols-rounded checkbox_check_icon">
                      check
                    </span>
                  </label>
                  <div class="todo_block_data">
                    <p class="todo_block_date">${startDate}</p>
                    <h3 class="todo_block_title">${todos.description}</h3>
                  </div>
                  <span class="material-symbols-rounded" onclick="deleteTodo('${id}')">
              close
            </span>
                          </li> `
            );
        })
    }
}


const deleteTodo = (todoId) =>{
    const localStorageTodos = getTodos()
    if(localStorageTodos && Array.isArray(localStorageTodos)){
        const newTodos = localStorageTodos.filter(todo => todo.id !== todoId)
        localStorage.setItem('todosStorage', JSON.stringify(newTodos))
    }
    renderTodos()

}
const toggleTodoDone = (todoId) =>{
    const localStorageTodos = getTodos()
    if(localStorageTodos && Array.isArray(localStorageTodos)){
        const todoIndex = localStorageTodos.findIndex(todo => todo.id === todoId)
        localStorageTodos[todoIndex].done  =! localStorageTodos[todoIndex].done
        localStorage.setItem('todosStorage' , JSON.stringify(localStorageTodos))
    }
    renderTodos()
}

function filterTodos (){
    const localStorageTodos = getTodos()
    
    if(filter=="filter_done"){
     const todosFilter = localStorageTodos.filter(todo => todo.done == true)
    localStorage.setItem('todosFilter', JSON.stringify(todosFilter))
    renderFilter() 

    }
   else if(filter=="filter_active"){
    const todosFilter = localStorageTodos.filter(todo => todo.done == false)
    localStorage.setItem('todosFilter', JSON.stringify(todosFilter))
    renderFilter() 
    }else{
        renderTodos()
    }

    }
    
function search(){
    const localStorageTodos = getTodos()
    const todosSearch = localStorageTodos.filter(item => item.description.includes(searchString))
    localStorage.setItem('todosSearch', JSON.stringify(todosSearch))
    renderSeach()

}

function splitButtonClickHandler(thisButton) {
    setActiveFilter(thisButton.id);
    filter = thisButton.id;
    localStorage.setItem('filter', filter);
    filterTodos()
}

function setActiveFilter(curFilter) {
    const buttons = document.querySelectorAll('.split_button_button');
    buttons.forEach(val => {
        val.classList.remove('split_button_button_active');
    })
    const btn = document.querySelector(`#${curFilter}`);
    btn.classList.add('split_button_button_active');

 }

 search_input.addEventListener('input', e => {
    searchString = e.target.value;
    localStorage.setItem('searchString', searchString);
    search()
})
createForm.addEventListener('submit', (e)=>{
    createTodo(e)
    renderTodos()
})
renderTodos()
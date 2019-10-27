'use strict'

// get todos from local storage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    
    try{
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e){
        return [];
    } 
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id)

    if (index > -1){
        todos.splice(index, 1);
    }
    return todos;
}

// Render applicatin todos
const generateTodoDOM = (todos) => {
    todos.forEach( (todo) => {

        const todoElement = document.createElement('label');
        const containerEl = document.createElement('div')
        const checkbox = document.createElement('input');
        const removeButton = document.createElement('button');
        const todoText = document.createElement('span');

        // Setup container
        containerEl.classList.add('list-item__container')
        todoElement.classList.add('list-item')
        todoElement.appendChild(containerEl)


        //create checkbox
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = todo.completed;
        containerEl.appendChild(checkbox);
        checkbox.addEventListener('change', (e) => {
            todo.completed = e.target.checked;
            saveTodos(todos);
            renderTodos(todos, filters);
        })

        // Create text element for the Todo
        todoText.textContent = todo.text;
        containerEl.appendChild(todoText);

        // Create remove button
        removeButton.textContent = 'remove';
        removeButton.classList.add('button', 'button--text')
        todoElement.appendChild(removeButton);
        removeButton.addEventListener('click', () =>{
            todos = removeTodo(todo.id);
            saveTodos(todos);
            renderTodos(todos, filters);
        })
        
        document.querySelector('#todos').appendChild(todoElement);
    })
}

const getSummaryDOM = (todos) => {
    const summary = document.createElement('h2');
    const completedTodos = todos.filter( (todo) => !todo.completed);
    summary.classList.add('list-title')
    if (completedTodos.length > 1){
    summary.textContent = `You have ${completedTodos.length} todos left`;
    } else {
    summary.textContent = `You have ${completedTodos.length} todo left`;
    }
    document.querySelector('#todos').appendChild(summary);
}

const renderTodos = (todos, filters) => {
    
    document.querySelector('#todos').innerHTML = '';

    let filteredTodos = todos.filter( (todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()));

    if (filters.hideCompleted){
         filteredTodos = todos.filter((todo) => todo.completed === !filters.hideCompleted);
    };
    getSummaryDOM(todos);
    generateTodoDOM(filteredTodos);
}

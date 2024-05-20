document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    // Load to-do items from localStorage
    loadTodos();

    // Function to add a new to-do item
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '' && !isDuplicate(todoText)) {
            const li = document.createElement('li');
            li.textContent = todoText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(li);
                saveTodos();
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);
            todoInput.value = '';
            saveTodos();
        }
    }

    // Function to check for duplicate to-do items
    function isDuplicate(todoText) {
        const todos = document.querySelectorAll('#todoList li');
        for (let todo of todos) {
            if (todo.firstChild.textContent === todoText) {
                return true;
            }
        }
        return false;
    }

    // Function to save to-do items to localStorage
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todoList li').forEach((todo) => {
            todos.push(todo.firstChild.textContent);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Function to load to-do items from localStorage
    function loadTodos() {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            savedTodos.forEach((todoText) => {
                const li = document.createElement('li');
                li.textContent = todoText;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    todoList.removeChild(li);
                    saveTodos();
                });

                li.appendChild(deleteButton);
                todoList.appendChild(li);
            });
        }
    }

    // Event listener for the Add button
    addButton.addEventListener('click', addTodo);

    // Event listener for pressing Enter key in the input field
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });
});

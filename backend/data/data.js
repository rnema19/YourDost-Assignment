const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'todos.json');

// Initialize in-memory data store
let todos = [];
let nextId = 1;

// Load data from JSON file if it exists
const loadData = () => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            const parsed = JSON.parse(data);
            todos = parsed.todos || [];
            nextId = parsed.nextId || 1;
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

// Save data to JSON file
const saveData = () => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ todos, nextId }, null, 2));
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

// Initialize data on module load
loadData();

module.exports = {
    getTodos: () => todos,
    getTodoById: (id) => todos.find(todo => todo.id === parseInt(id)),
    addTodo: (todo) => {
        const newTodo = {
            id: nextId++,
            task: todo.task,
            description: todo.description,
            completed: todo.completed || false,
            createdAt: new Date().toISOString()
        };
        todos.push(newTodo);
        saveData();
        return newTodo;
    },
    updateTodo: (id, updates) => {
        const index = todos.findIndex(todo => todo.id === parseInt(id));
        if (index === -1) return null;
        
        todos[index] = {
            ...todos[index],
            ...updates,
            id: todos[index].id, // Ensure ID doesn't change
            updatedAt: new Date().toISOString()
        };
        saveData();
        return todos[index];
    },
    deleteTodo: (id) => {
        const index = todos.findIndex(todo => todo.id === parseInt(id));
        if (index === -1) return null;
        
        const deleted = todos.splice(index, 1)[0];
        saveData();
        return deleted;
    }
};

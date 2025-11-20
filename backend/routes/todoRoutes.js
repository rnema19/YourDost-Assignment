const express = require('express');
const router = express.Router();
const data = require('../data/data');
const { log } = require('console');

// Input validation middleware
const validateTodo = (req, res, next) => {
    const { task, description } = req.body;
    
    if (!task || task.trim() === '') {
        return res.status(400).json({ 
            error: 'Task is required and cannot be empty' 
        });
    }
    
    if (!description || description.trim() === '') {
        return res.status(400).json({ 
            error: 'Description is required and cannot be empty' 
        });
    }
    
    next();
};

// GET /todos → get all todos
router.get("/", (req, res) => {
    try {
        const todos = data.getTodos();
        console.log("All todos: ", todos);
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
        
        
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Failed to retrieve todos' 
        });
    }
});

// POST /todos → create a todo
router.post("/", validateTodo, (req, res) => {
    try {
        const { task, description, completed } = req.body;
        
        const newTodo = data.addTodo({
            task: task.trim(),
            description: description.trim(),
            completed: completed === false
        });
        console.log("New todo: ", newTodo);
        
        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: newTodo
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Failed to create todo' 
        });
    }
});

// PUT /todos/:id → update a todo
router.put("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { task, description, completed } = req.body;
        
        // Check if todo exists
        const existingTodo = data.getTodoById(id);
        if (!existingTodo) {
            return res.status(404).json({ 
                success: false,
                error: 'Todo not found' 
            });
        }
        
        // Validate at least one field is provided
        if (!task && !description && completed === undefined) {
            return res.status(400).json({ 
                success: false,
                error: 'At least one field (task, description, or completed) must be provided' 
            });
        }
        
        const updates = {};
        if (task !== undefined) updates.task = task.trim();
        if (description !== undefined) updates.description = description.trim();
        if (completed !== undefined) updates.completed = completed === false;
        
        const updatedTodo = data.updateTodo(id, updates);
        console.log("updated todo: ", updatedTodo);
        
        res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: updatedTodo
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Failed to update todo' 
        });
    }
});

// DELETE /todos/:id → delete a todo
router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedTodo = data.deleteTodo(id);
        
        if (!deletedTodo) {
            return res.status(404).json({ 
                success: false,
                error: 'Todo not found' 
            });
        }
        console.log("Todo deleted succesfully!!!");
        
        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
            data: deletedTodo
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Failed to delete todo' 
        });
    }
});

module.exports = router;
const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// create a new todo
router.post('/newTodo', async (req, res) => {
    try {
        const todo = new Todo({
            text: req.body.text
        });
        await todo.save();
        res.status(201).json(todo);
    } catch(err) {
        res.status(400).json({err: err.message});
    }
});


// get all todos
router.get('/allTodos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch(err) {
        res.status(400).json({err: err.message});
    }
})


// Update a todo
router.put('/:id', async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(todo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

module.exports = router;
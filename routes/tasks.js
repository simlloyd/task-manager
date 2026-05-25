const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// GET /tasks - Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
});

// GET /tasks/:id - Get a single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
    res.json(task);
} catch (error) {
  res.status(500).json({ message: error.message});
}

});

// POST /tasks - Create a new task
router.post('/', async (req, res) => {
    if (!req.body.title || req.body.title.trim() === '') {
        return res.status(400).json({ message: 'Title is required '});
    }

    try {
      const task = new Task({ title: req.body.title });
      const saveTask = await task.save();

      res.status(201).json(saveTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 });

// PUT /tasks/:id - Update a task
router.put('/:id', async (req, res) => {
 try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
   res.json(task);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

     if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
    res.json({ message: 'Task deleted', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
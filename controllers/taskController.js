import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        if (tasks.length === 0) {
            return res.status(200).json({
                message: "No tasks found",
                data: []
            });
        }

        return res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).send("You should enter a task");
        }

        const existTitle = await Task.findOne({ title });

        if (existTitle) {
            return res.status(400).send("This task is already added before");
        }

        const newTask = await Task.create({
            title,
            description,
            status
        });

        return res.status(201).json(newTask);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).send("Task not found");
        }

        return res.status(200).json(updatedTask);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask
        });
        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
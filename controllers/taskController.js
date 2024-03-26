const db = require('../models/index');

// Enum type
const Level = Object.freeze({
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW:'LOW'
});

const createTask = async (req, res) => {
    try {
        console.info("inside the create method")
        const { title, description, endDate, priority } = req.body;
        const task = await db.Task.findOne({
            where: {title: req.body.title, userId: req.user.id},
        });
        if(task) return res.status(400).json({message:'Your already have a task with the same title'});
        const currentDate = new Date();
        if ( endDate.getTime() < currentDate.getTime() ) return res.status(400).json({message:'Invalid date'});
        const level = '';
        switch (priority) {
            case Level.HIGH:
                level = Level.HIGH;
                break;
            case Level.MEDIUM:
                level = Level.MEDIUM;
                break;
            case Level.LOW:
                level = Level.LOW;
                break;        
            default:
                level = Level.LOW;
                break;
        };

        await db.Task.create({
            title : title,
            description: description,
            endDate: endDate,
            priority: level,
            userId: req.user.id
        });

        return res.status(202).json({message:'Task created'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'});
    }
};

const editTask = async(req, res) => {
    try {
        const { title, description, endDate, priority } = req.body;
        const task = await db.Task.findOne({ 
            where: {id: req.body.id}
        });
        const currentDate = new Date();
        if ( task.userId != req.user.id || task.endDate.getTime() < currentDate.getTime() ) return res.status(400).json({message:'Action Forbidden'});
        if ( endDate.getTime() < currentDate.getTime() ) return res.status(400).json({message:'Invalid date'});
        const level = '';
        switch (priority) {
            case Level.HIGH:
                level = Level.HIGH;
                break;
            case Level.MEDIUM:
                level = Level.MEDIUM;
                break;
            case Level.LOW:
                level = Level.LOW;
                break;        
            default:
                level = Level.LOW;
                break;
        };
        
        await db.Task.update({
            title : title,
            description: description,
            endDate: endDate,
            priority: level,
        });

        return res.status(204).json({message:'Task updated'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'});
    }
};

const deleteTask = async(req, res) => {
    try {
        const task = await db.Task.findOne({ 
            where: {id: req.params.id}
        });
        if ( task.userId != req.user.id ) return res.status(400).json({message:'Action Forbidden'});
        await db.Task.delete({
            where: {id: req.body.id}
        });

        return res.status(200).json({message:'Task deleted'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'});
    }
};

const getUserTasks = async (req, res) => {
    try {
        const tasks = await db.Task.findAll({
            where:{userId: req.user.id}
        });
        return res.status(200).json(tasks); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'});
    }
};

module.exports = {
    createTask,
    editTask,
    deleteTask,
    getUserTasks
};
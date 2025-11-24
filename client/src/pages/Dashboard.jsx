import { useState, useEffect } from 'react';
import api from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskCreated = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const handleTaskDeleted = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    if (loading) return <div className="container" style={{ marginTop: '20px' }}>Loading tasks...</div>;

    return (
        <div className="container" style={{ marginTop: '20px', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '20px' }}>My Tasks</h2>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <TaskList tasks={tasks} onUpdate={handleTaskUpdated} onDelete={handleTaskDeleted} />
        </div>
    );
}

export default Dashboard;

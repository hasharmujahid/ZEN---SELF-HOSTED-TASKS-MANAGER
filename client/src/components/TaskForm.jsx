import { useState } from 'react';
import api from '../services/api';

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const response = await api.post('/tasks', { title, description });
            onTaskCreated(response.data);
            setTitle('');
            setDescription('');
            setIsExpanded(false);
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    return (
        <div className="card" style={{ marginBottom: '20px' }}>
            {!isExpanded ? (
                <input
                    type="text"
                    placeholder="Add a new task..."
                    onFocus={() => setIsExpanded(true)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '1rem' }}
                />
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        autoFocus
                        required
                        style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '1rem' }}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '80px' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button type="button" onClick={() => setIsExpanded(false)} className="btn" style={{ border: '1px solid var(--border-color)' }}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Task</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default TaskForm;

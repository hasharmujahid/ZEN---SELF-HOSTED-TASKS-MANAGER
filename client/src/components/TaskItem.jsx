import { useState } from 'react';
import api from '../services/api';
import Timer from './Timer';

function TaskItem({ task, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    const [showHistory, setShowHistory] = useState(false);
    const [logs, setLogs] = useState([]);

    const handleStatusChange = async (newStatus) => {
        let holdComment = task.holdComment;
        if (newStatus === 'hold') {
            const comment = prompt('Reason for holding this task:', holdComment || '');
            if (comment === null) return; // Cancelled
            holdComment = comment;
        } else {
            holdComment = null; // Clear comment if not on hold
        }

        try {
            const response = await api.put(`/tasks/${task.id}`, { status: newStatus, holdComment });
            onUpdate(response.data);
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const handleSave = async () => {
        try {
            const response = await api.put(`/tasks/${task.id}`, { title, description });
            onUpdate(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${task.id}`);
                onDelete(task.id);
            } catch (error) {
                console.error('Failed to delete task', error);
            }
        }
    };

    const toggleHistory = async () => {
        if (!showHistory) {
            try {
                const response = await api.get(`/tasks/${task.id}/logs`);
                setLogs(response.data);
            } catch (error) {
                console.error('Failed to fetch logs', error);
            }
        }
        setShowHistory(!showHistory);
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <div className="card" style={{ marginBottom: '15px', borderLeft: `5px solid ${task.status === 'completed' ? 'var(--accent-color)' : task.status === 'hold' ? '#f1c40f' : 'var(--text-secondary)'}` }}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={handleSave} className="btn btn-primary">Save</button>
                        <button onClick={() => setIsEditing(false)} className="btn" style={{ border: '1px solid var(--border-color)' }}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', color: task.status === 'completed' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{task.title}</h3>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <button onClick={() => setIsEditing(true)} className="btn" style={{ padding: '5px 10px', fontSize: '0.9rem' }}>Edit</button>
                            <button onClick={handleDelete} className="btn" style={{ padding: '5px 10px', fontSize: '0.9rem', color: 'var(--danger-color)' }}>Delete</button>
                        </div>
                    </div>
                    {task.description && <p style={{ color: 'var(--text-secondary)', marginTop: '5px' }}>{task.description}</p>}
                    {task.status === 'hold' && task.holdComment && (
                        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'rgba(241, 196, 15, 0.1)', borderRadius: '4px', fontSize: '0.9rem' }}>
                            <strong>On Hold:</strong> {task.holdComment}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Timer taskId={task.id} initialTotalTime={task.totalTime} onUpdate={() => onUpdate(task)} />
                        <button onClick={toggleHistory} className="btn" style={{ fontSize: '0.8rem', padding: '5px', color: 'var(--text-secondary)' }}>
                            {showHistory ? 'Hide History' : 'Show History'}
                        </button>
                    </div>

                    {showHistory && (
                        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', fontSize: '0.9rem' }}>
                            <h4 style={{ marginBottom: '5px' }}>Time Logs</h4>
                            {logs.length === 0 ? (
                                <p>No history yet.</p>
                            ) : (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {logs.map(log => (
                                        <li key={log.id} style={{ borderBottom: '1px solid var(--border-color)', padding: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{formatDateTime(log.startTime)} - {log.endTime ? formatDateTime(log.endTime) : 'Running'}</span>
                                            <span>{log.duration ? formatDuration(log.duration) : '-'}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                        {task.status !== 'completed' && (
                            <button onClick={() => handleStatusChange('completed')} className="btn" style={{ border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}>Complete</button>
                        )}
                        {task.status === 'completed' && (
                            <button onClick={() => handleStatusChange('todo')} className="btn" style={{ border: '1px solid var(--text-secondary)' }}>Reopen</button>
                        )}
                        {task.status !== 'hold' && task.status !== 'completed' && (
                            <button onClick={() => handleStatusChange('hold')} className="btn" style={{ border: '1px solid #f1c40f', color: '#f39c12' }}>Hold</button>
                        )}
                        {task.status === 'hold' && (
                            <button onClick={() => handleStatusChange('todo')} className="btn" style={{ border: '1px solid var(--text-secondary)' }}>Resume</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskItem;

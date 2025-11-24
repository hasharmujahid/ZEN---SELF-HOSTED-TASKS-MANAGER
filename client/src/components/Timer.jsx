import { useState, useEffect } from 'react';
import api from '../services/api';

function Timer({ taskId, initialTotalTime, onUpdate }) {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [totalTime, setTotalTime] = useState(initialTotalTime || 0);

    // Check if timer is running on mount (optional, requires backend check)
    // For simplicity, we'll start with stopped state or rely on user action.
    // Ideally, we should fetch "active timer" status from backend.
    // But for now, let's just handle local state and sync with backend actions.

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsed(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        setTotalTime(initialTotalTime);
    }, [initialTotalTime]);

    const handleStart = async () => {
        try {
            await api.post(`/tasks/${taskId}/timer/start`);
            setIsRunning(true);
            setElapsed(0);
        } catch (error) {
            console.error('Failed to start timer', error);
            alert(error.response?.data?.message || 'Failed to start timer');
        }
    };

    const handleStop = async () => {
        try {
            const response = await api.post(`/tasks/${taskId}/timer/stop`);
            setIsRunning(false);
            setTotalTime(prev => prev + elapsed);
            setElapsed(0);
            if (onUpdate) onUpdate(); // Notify parent to refresh task data if needed
        } catch (error) {
            console.error('Failed to stop timer', error);
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Total: {formatTime(totalTime + (isRunning ? elapsed : 0))}
            </div>
            {!isRunning ? (
                <button onClick={handleStart} className="btn" style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: 'var(--accent-color)', color: '#fff' }}>
                    Start Timer
                </button>
            ) : (
                <button onClick={handleStop} className="btn" style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: 'var(--danger-color)', color: '#fff' }}>
                    Stop Timer
                </button>
            )}
        </div>
    );
}

export default Timer;

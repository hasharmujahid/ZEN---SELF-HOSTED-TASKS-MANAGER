import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdate, onDelete }) {
    if (tasks.length === 0) {
        return <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>No tasks yet. Enjoy your Zen!</div>;
    }

    return (
        <div>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default TaskList;

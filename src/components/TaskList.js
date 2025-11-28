import React, { useState, useEffect } from 'react';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    const interval = setInterval(() => {

      console.log('Timer: mise à jour des tâches');
    }, 60000); 

    
    return () => {
      clearInterval(interval);
      console.log('Timer nettoyé');
    };
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      priority: priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setPriority('medium');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const inProgressCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="task-list-container">
      <h2>Gestion des Tâches</h2>
      
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Nom de la tâche"
          className="task-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
          <option value="urgent">Urgente</option>
        </select>
        <button type="submit" className="add-button">Ajouter</button>
      </form>

      
      <div className="task-counter">
        <div className="counter-item">
          <span className="counter-label">Terminées:</span>
          <span className="counter-value completed">{completedCount}</span>
        </div>
        <div className="counter-item">
          <span className="counter-label">En cours:</span>
          <span className="counter-value in-progress">{inProgressCount}</span>
        </div>
      </div>

      
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className="no-tasks">Aucune tâche pour le moment</p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''} ${task.priority === 'urgent' ? 'urgent' : ''} priority-${task.priority}`}
            >
              <div className="task-content">
                <span className="task-name">{task.name}</span>
                <span className={`priority-badge priority-${task.priority}`}>
                  {task.priority}
                </span>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  className={`action-button ${task.completed ? 'undo' : 'complete'}`}
                >
                  {task.completed ? 'Annuler' : 'Terminer'}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="action-button delete"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;


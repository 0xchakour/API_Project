import React from 'react';
import TaskList from './components/TaskList';
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Application de Gestion</h1>
        <p>Gérez vos tâches et consultez les utilisateurs</p>
      </header>
      <div className="app-content">
        <section className="section">
          <TaskList />
        </section>
        <section className="section">
          <UserList />
        </section>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        
        const data = await response.json();
        
        const usersWithRoles = data.map(user => ({
          ...user,
          role: ['Admin', 'Développeur', 'Designer', 'Manager', 'Testeur'][Math.floor(Math.random() * 5)]
        }));
        setUsers(usersWithRoles);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="user-list-container">
        <h2>Liste des Utilisateurs</h2>
        <div className="loading">Chargement des utilisateurs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <h2>Liste des Utilisateurs</h2>
        <div className="error">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2>Liste des Utilisateurs</h2>
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-image-container">
              <img
                src={`https://i.pravatar.cc/150?img=${user.id}`}
                alt={user.name}
                className="user-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
            </div>
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-username">@{user.username}</p>
              <div className={`user-role role-${user.role.toLowerCase()}`}>
                {user.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;


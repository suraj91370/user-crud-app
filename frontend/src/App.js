import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { getUsers } from './api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to load users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const clearEditing = () => {
    setEditingUser(null);
  };

  return (
    <div className="app">
      <h1>User Management</h1>
      
      {error && <div className="error">{error}</div>}
      
      <UserForm
        key={editingUser ? editingUser.id : 'create'} 
        userToEdit={editingUser}
        refreshUsers={refreshUsers}
        setError={setError}
        clearEditing={clearEditing}
      />
      
      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <UserList
          users={users}
          refreshUsers={refreshUsers}
          setEditingUser={setEditingUser}
          setError={setError}
        />
      )}
    </div>
  );
}

export default App;
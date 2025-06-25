import React, { useEffect, useState } from 'react';
import { deleteUser } from '../api';

const UserList = ({ users, refreshUsers, setEditingUser, setError }) => {
    const [localUsers, setLocalUsers] = useState(users);

    useEffect(() => {
        setLocalUsers(users);
    }, [users]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        // Optimistically remove user from local state
        setLocalUsers(prev => prev.filter(user => user.id !== id));

        try {
            await deleteUser(id);  // Backend deletion
            refreshUsers();         // Sync with server
            setError('');
        } catch (error) {
            setError('Failed to delete user: ' + error.message);
            // Revert UI on error
            refreshUsers();
        }
    };

    return (
        <div className="user-list">
            <h2>User List</h2>

            {users.length === 0 ? (
                <div className="empty-state">No users found. Add your first user!</div>
            ) : (
                <div className="user-grid">
                    {users.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-info">
                                <div className="user-name">{user.name}</div>
                                <div className="user-email">{user.email}</div>
                                <div className="user-dob">
                                    DOB: {new Date(user.dob).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="user-actions">
                                <button
                                    onClick={() => setEditingUser(user)}
                                    className="btn-edit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserList;
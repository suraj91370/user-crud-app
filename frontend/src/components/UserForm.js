import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../api';

const UserForm = ({ userToEdit, refreshUsers, setError, clearEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  });

  // Initialize form when userToEdit changes
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        password: '', // Always empty for security
        dob: userToEdit.dob ? userToEdit.dob.split('T')[0] : ''
      });
    } else {
      // Reset form when not editing
      setFormData({ name: '', email: '', password: '', dob: '' });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Client-side validation
    if (!formData.name || !formData.email || !formData.dob) {
      setError('Name, Email, and Date of Birth are required');
      return;
    }
    
    if (!userToEdit && !formData.password) {
      setError('Password is required for new users');
      return;
    }

    try {
      // Prepare payload with properly formatted dob
      const payload = {
        ...formData,
        dob: new Date(formData.dob).toISOString().split('T')[0]
      };
      
      if (userToEdit) {
        await updateUser(userToEdit.id, payload);
      } else {
        await createUser(payload);
      }
      
      refreshUsers();
      if (userToEdit) clearEditing(); // Clear editing state after update
    } catch (error) {
      console.error('Error saving user:', error);
      setError(error.message || 'Failed to save user');
    }
  };

  return (
    <div className="form-container">
      <h2>{userToEdit ? 'Edit User' : 'Add New User'}</h2>
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            required
          />
        </div>
        
        <div className="form-group">
          <label>
            Password {userToEdit && <span className="hint">(leave blank to keep current)</span>}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required={!userToEdit}
          />
        </div>
        
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {userToEdit ? 'Update User' : 'Add User'}
          </button>
          
          {userToEdit && (
            <button 
              type="button" 
              className="btn-secondary"
              onClick={clearEditing}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
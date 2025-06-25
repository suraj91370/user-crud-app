
const API_URL = 'http://localhost/user-crud-app/backend/api';

// Helper to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Extract backend error message or default
    let errorMsg = data.message || `API error: ${response.status}`;
    
    // Include validation errors if available
    if (data.errors) {
      errorMsg += `: ${data.errors.join(', ')}`;
    }
    
    throw new Error(errorMsg);
  }
  
  return data;
};

// Format date to YYYY-MM-DD
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const createUser = async (userData) => {
  const payload = {
    ...userData,
    dob: formatDate(userData.dob)
  };

  const response = await fetch(`${API_URL}/create_user.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  return handleResponse(response);
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/read_users.php`);
  return handleResponse(response);
};

export const updateUser = async (id, userData) => {
  const payload = {
    ...userData,
    dob: formatDate(userData.dob)
  };
  
  // Remove password if empty during update
  if (!payload.password) delete payload.password;

  const response = await fetch(`${API_URL}/update_user.php`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...payload })
  });
  
  return handleResponse(response);
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/delete_user.php?id=${id}`, {
    method: 'DELETE'
  });
  
  return handleResponse(response);
};
const API_BASE_URL = 'http://localhost:3000/api/v1';

export const fetchQueue = async () => {
  const response = await fetch(`${API_BASE_URL}/appointments/queue`);
  if (!response.ok) {
    throw new Error('Failed to fetch queue');
  }
  return response.json();
};

export const createAppointment = async (symptoms, severity = 'low') => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ symptoms, severity }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create appointment');
  }
  
  return data;
};

export const deleteAppointment = async (id) => {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete appointment');
  }
  return true;
};

export const clearAllAppointments = async () => {
  const response = await fetch(`${API_BASE_URL}/appointments/clear_all`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to clear appointments');
  }
  return true;
};

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const fetchQueue = async () => {
  const response = await fetch(`${API_BASE_URL}/appointments/queue`);
  if (!response.ok) {
    throw new Error('Failed to fetch queue');
  }
  return response.json();
};

export const createAppointment = async (symptoms) => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ symptoms }),
  });
  if (!response.ok) {
    throw new Error('Failed to create appointment');
  }
  return response.json();
};

// ========== API CLIENT ==========

async function apiCall(endpoint, options = {}) {
  const {
    method = 'GET',
    body = null,
    requiresAuth = true,
    showError = true
  } = options;
  
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (requiresAuth && State.token) {
    headers['Authorization'] = `Bearer ${State.token}`;
  }
  
  const fetchOptions = {
    method,
    headers
  };
  
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  
  try {
    State.loading = true;
    const response = await fetch(`${APP_CONFIG.api}${endpoint}`, fetchOptions);
    
    if (!response.ok) {
      const error = await response.json();
      const message = error.detail || 'Error en la solicitud';
      
      if (response.status === 401) {
        State.logout();
        throw new Error('Sesión expirada');
      }
      
      throw new Error(message);
    }
    
    State.loading = false;
    return await response.json();
  } catch (error) {
    State.loading = false;
    State.error = error.message;
    
    if (showError) {
      showNotification(error.message, 'error');
    }
    
    throw error;
  }
}

// ========== AUTH API ==========

async function apiRegister(username, email, password) {
  return apiCall('/auth/register', {
    method: 'POST',
    body: { username, email, password, confirm_password: password },
    requiresAuth: false
  });
}

async function apiLogin(email, password) {
  return apiCall('/auth/login', {
    method: 'POST',
    body: { email, password },
    requiresAuth: false
  });
}

// ========== HABITS API ==========

async function apiGetHabits() {
  return apiCall('/habits/');
}

async function apiCreateHabit(habitData) {
  return apiCall('/habits/', {
    method: 'POST',
    body: habitData
  });
}

async function apiUpdateHabit(habitId, habitData) {
  return apiCall(`/habits/${habitId}`, {
    method: 'PUT',
    body: habitData
  });
}

async function apiDeleteHabit(habitId) {
  return apiCall(`/habits/${habitId}`, {
    method: 'DELETE'
  });
}

async function apiCompleteHabit(habitId) {
  return apiCall(`/habits/${habitId}/complete`, {
    method: 'POST'
  });
}

// ========== XP API ==========

async function apiGetXPProfile() {
  return apiCall('/xp/profile');
}

async function apiGetXPHistory(limit = 20) {
  return apiCall(`/xp/history?limit=${limit}`);
}
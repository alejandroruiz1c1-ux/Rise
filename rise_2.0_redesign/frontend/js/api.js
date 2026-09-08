const API = {
  async request(endpoint, options = {}) {
    const url = `${Config.API_BASE_URL}${endpoint}`;
    const config = {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      UI.toast('Error de conexión', 'error');
      throw error;
    }
  },
  
  get(endpoint) { return this.request(endpoint); },
  post(endpoint, data) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }); },
  put(endpoint, data) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }); },
  delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }); },
};
window.API = API;

/**
 * ========== AUTENTICACIÓN ==========
 * Manejo de login, registro, tokens y sesiones
 */

const Auth = {
  
  /**
   * Registrar nuevo usuario
   */
  async register(username, email, password) {
    try {
      State.loading = true;
      const response = await apiCall('/auth/register', {
        method: 'POST',
        body: { username, email, password, confirm_password: password },
        requiresAuth: false,
        showError: false
      });
      
      // Guardar tokens
      State.setToken(response.access_token);
      State.setUser(response.user);
      
      State.loading = false;
      return { success: true, user: response.user };
    } catch (error) {
      State.loading = false;
      return { success: false, error: error.message };
    }
  },
  
  /**
   * Iniciar sesión
   */
  async login(email, password) {
    try {
      State.loading = true;
      const response = await apiCall('/auth/login', {
        method: 'POST',
        body: { email, password },
        requiresAuth: false,
        showError: false
      });
      
      // Guardar tokens
      State.setToken(response.access_token);
      State.setUser(response.user);
      
      State.loading = false;
      return { success: true, user: response.user };
    } catch (error) {
      State.loading = false;
      return { success: false, error: error.message };
    }
  },
  
  /**
   * Logout
   */
  logout() {
    State.logout();
  },
  
  /**
   * Verificar si está autenticado
   */
  isAuthenticated() {
    return State.isAuthenticated();
  }
};

window.Auth = Auth;
const Auth = {
  isAuthenticated() {
    return !!localStorage.getItem(Config.STORAGE_KEYS.TOKEN);
  },
  
  getToken() {
    return localStorage.getItem(Config.STORAGE_KEYS.TOKEN);
  },
  
  setToken(token) {
    localStorage.setItem(Config.STORAGE_KEYS.TOKEN, token);
  },
  
  logout() {
    State.clear();
    Router.navigate('onboarding');
  },
};
window.Auth = Auth;

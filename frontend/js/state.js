// ========== ESTADO GLOBAL DE LA APP ==========

const State = {
  // Usuario
  user: Storage.getUser() || null,
  token: Storage.getToken() || null,
  
  // Datos
  habits: [],
  goals: [],
  missions: [],
  transactions: [],
  diaryEntries: [],
  achievements: [],
  xpHistory: [],
  
  // UI
  currentScreen: 'onboarding',
  theme: Storage.getTheme(),
  language: Storage.getLanguage(),
  loading: false,
  error: null,
  
  // Métodos
  setUser(user) {
    this.user = user;
    Storage.setUser(user);
  },
  
  setToken(token) {
    this.token = token;
    Storage.setToken(token);
  },
  
  setTheme(theme) {
    this.theme = theme;
    Storage.setTheme(theme);
    applyTheme(theme);
  },
  
  setLanguage(lang) {
    this.language = lang;
    Storage.setLanguage(lang);
  },
  
  updateHabits(habits) {
    this.habits = habits;
  },
  
  updateXP(xp) {
    if (this.user) {
      this.user.xp = xp;
      Storage.setUser(this.user);
    }
  },
  
  isAuthenticated() {
    return this.token && this.user;
  },
  
  logout() {
    this.user = null;
    this.token = null;
    Storage.clearToken();
    localStorage.removeItem('user');
    redirectTo('onboarding');
  }
};

// ========== OBSERVABLES (Cambios de estado) ==========

const StateObservers = {
  listeners: {
    'user-change': [],
    'theme-change': [],
    'habits-change': [],
    'xp-change': []
  },
  
  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },
  
  notify(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
};

// Ejemplo de uso:
// StateObservers.subscribe('xp-change', (newXP) => console.log('XP actualizado:', newXP));
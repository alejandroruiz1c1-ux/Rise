/**
 * ========================================
 * RISE 2.0 - STATE MANAGEMENT
 * ========================================
 */

const State = {
  user: null,
  habits: [],
  missions: [],
  finances: {
    transactions: [],
    budgets: [],
    goals: [],
  },
  settings: {
    theme: Config.DEFAULT_THEME,
    notifications: true,
    haptics: true,
    language: 'es',
  },
  
  // Getters
  getUser() {
    return this.user;
  },
  
  getTheme() {
    return this.settings.theme;
  },
  
  // Setters
  setUser(user) {
    this.user = user;
    localStorage.setItem(Config.STORAGE_KEYS.USER, JSON.stringify(user));
  },
  
  setSettings(settings) {
    this.settings = { ...this.settings, ...settings };
    localStorage.setItem(Config.STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
  },
  
  updateXP(newXP) {
    if (this.user) {
      this.user.xp = newXP;
      localStorage.setItem(Config.STORAGE_KEYS.USER, JSON.stringify(this.user));
    }
  },
  
  updateLevel(newLevel) {
    if (this.user) {
      this.user.level = newLevel;
      localStorage.setItem(Config.STORAGE_KEYS.USER, JSON.stringify(this.user));
    }
  },
  
  updateStreak(streak) {
    if (this.user) {
      this.user.current_streak = streak;
      localStorage.setItem(Config.STORAGE_KEYS.USER, JSON.stringify(this.user));
    }
  },
  
  // Load from storage
  loadFromStorage() {
    try {
      const savedUser = localStorage.getItem(Config.STORAGE_KEYS.USER);
      const savedSettings = localStorage.getItem(Config.STORAGE_KEYS.SETTINGS);
      
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
      
      if (savedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
      }
    } catch (error) {
      console.error('Error loading state:', error);
    }
  },
  
  // Clear state
  clear() {
    this.user = null;
    this.habits = [];
    this.missions = [];
    localStorage.removeItem(Config.STORAGE_KEYS.USER);
    localStorage.removeItem(Config.STORAGE_KEYS.TOKEN);
  },
};

window.State = State;

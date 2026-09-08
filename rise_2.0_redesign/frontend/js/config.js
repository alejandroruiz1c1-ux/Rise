/**
 * ========================================
 * RISE 2.0 - CONFIGURACIÓN
 * ========================================
 */

const Config = {
  // API Configuration
  API_BASE_URL: window.location.origin + '/api',
  API_TIMEOUT: 15000,
  
  // App Info
  APP_NAME: 'Rise',
  APP_VERSION: '2.0.0',
  
  // Themes
  THEMES: ['rise', 'dark', 'light'],
  DEFAULT_THEME: 'rise',
  
  // XP System
  XP: {
    BASE_LEVEL_XP: 300,
    LEVEL_MULTIPLIER: 1.5,
    DAILY_BONUS_XP: 50,
    STREAK_BONUS_PERCENT: 0.1,
  },
  
  // Habits
  HABITS: {
    MAX_DAILY: 20,
    MIN_XP_REWARD: 10,
    MAX_XP_REWARD: 100,
  },
  
  // Missions
  MISSIONS: {
    DAILY_REFRESH_HOUR: 0,
    WEEKLY_REFRESH_DAY: 0,
  },
  
  // UI
  ANIMATION_ENABLED: true,
  HAPTIC_FEEDBACK_ENABLED: true,
  REDUCED_MOTION: false,
  
  // Storage Keys
  STORAGE_KEYS: {
    USER: 'rise_user',
    TOKEN: 'rise_token',
    THEME: 'rise_theme',
    SETTINGS: 'rise_settings',
    HABITS: 'rise_habits',
    MISSIONS: 'rise_missions',
  },
};

window.Config = Config;

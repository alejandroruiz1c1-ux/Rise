// ========== CONFIGURACIÓN GLOBAL ==========

const APP_CONFIG = {
  name: 'Rise',
  version: '2.0.0',
  api: 'http://localhost:8000/api',
  supportedLanguages: ['es', 'en'],
  themes: ['rise', 'dark', 'light', 'auto'],
  
  // Gamificación
  RANKS: ['Recluta','Aprendiz','Constante','Disciplinado','Determinado','Enfocado','Resiliente','Imparable','Maestro','Ascendido'],
  LEVEL_XP_THRESHOLD: 300,
  
  // Colores por categoría
  CATEGORY_COLORS: {
    'Salud': '#22c55e',
    'Entrenamiento': '#f97316',
    'Aprendizaje': '#3b82f6',
    'Finanzas': '#f59e0b',
    'Bienestar': '#ec4899',
    'Productividad': '#8b5cf6',
    'Otro': '#6b7280'
  }
};

// ========== ALMACENAMIENTO ==========

const Storage = {
  setToken: (token) => localStorage.setItem('access_token', token),
  getToken: () => localStorage.getItem('access_token'),
  clearToken: () => localStorage.removeItem('access_token'),
  
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => JSON.parse(localStorage.getItem('user')),
  
  setTheme: (theme) => localStorage.setItem('theme', theme),
  getTheme: () => localStorage.getItem('theme') || 'rise',
  
  setLanguage: (lang) => localStorage.setItem('language', lang),
  getLanguage: () => localStorage.getItem('language') || 'es'
};

// ========== TRADUCCIONES ==========

const TRANSLATIONS = {
  es: {
    // Navegación
    inicio: 'Inicio',
    habitos: 'Hábitos',
    misiones: 'Misiones',
    evolucion: 'Evolución',
    finanzas: 'Finanzas',
    diario: 'Diario',
    perfil: 'Perfil',
    
    // Acciones
    completar: 'Completar',
    eliminar: 'Eliminar',
    editar: 'Editar',
    guardar: 'Guardar',
    cancelar: 'Cancelar',
    agregar: 'Agregar',
    
    // Textos comunes
    cargando: 'Cargando...',
    error: 'Error',
    exito: 'Éxito',
    
    // Onboarding
    bienvenida: 'Bienvenido a Rise',
    configurar_habitos: 'Configura tus primeros hábitos',
    agregar_objetivo: 'Agrega tu objetivo principal'
  },
  en: {
    // Navigation
    inicio: 'Home',
    habitos: 'Habits',
    misiones: 'Missions',
    evolucion: 'Evolution',
    finanzas: 'Finance',
    diario: 'Diary',
    perfil: 'Profile',
    
    // Actions
    completar: 'Complete',
    eliminar: 'Delete',
    editar: 'Edit',
    guardar: 'Save',
    cancelar: 'Cancel',
    agregar: 'Add',
    
    // Common
    cargando: 'Loading...',
    error: 'Error',
    exito: 'Success',
    
    // Onboarding
    bienvenida: 'Welcome to Rise',
    configurar_habitos: 'Set up your first habits',
    agregar_objetivo: 'Add your main goal'
  }
};

function t(key) {
  const lang = Storage.getLanguage();
  return TRANSLATIONS[lang]?.[key] || key;
}
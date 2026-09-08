// ========== SISTEMA DE TEMAS ==========

const ThemeManager = {
  currentTheme: Storage.getTheme() || 'rise',
  
  init() {
    this.apply(this.currentTheme);
    this.setupAutoTheme();
  },
  
  apply(theme) {
    if (theme === 'auto') {
      // Detectar tema del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    this.currentTheme = theme;
    Storage.setTheme(theme);
    StateObservers.notify('theme-change', theme);
  },
  
  setupAutoTheme() {
    // Escuchar cambios en preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.currentTheme === 'auto') {
        this.apply('auto');
      }
    });
  },
  
  toggle() {
    const themes = ['rise', 'dark', 'light'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.apply(nextTheme);
  }
};

// Inicializar
ThemeManager.init();

function applyTheme(theme) {
  ThemeManager.apply(theme);
}
/**
 * ========================================
 * RISE 2.0 - THEME SYSTEM
 * Gestión de temas con transición suave
 * ========================================
 */

const Theme = {
  currentTheme: Config.DEFAULT_THEME,
  
  init() {
    // Cargar tema guardado o del sistema
    const savedTheme = localStorage.getItem(Config.STORAGE_KEYS.THEME);
    
    if (savedTheme && Config.THEMES.includes(savedTheme)) {
      this.setTheme(savedTheme, false);
    } else if (!savedTheme) {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      
      if (prefersDark) {
        this.setTheme('dark', false);
      } else if (prefersLight) {
        this.setTheme('light', false);
      } else {
        this.setTheme(Config.DEFAULT_THEME, false);
      }
    }
    
    // Escuchar cambios del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(Config.STORAGE_KEYS.THEME)) {
        this.setTheme(e.matches ? 'dark' : 'light', true);
      }
    });
  },
  
  setTheme(themeName, animate = true) {
    if (!Config.THEMES.includes(themeName)) {
      console.warn(`Tema "${themeName}" no válido`);
      return;
    }
    
    const html = document.documentElement;
    const oldTheme = html.getAttribute('data-theme');
    
    // Actualizar meta theme-color
    this.updateThemeColor(themeName);
    
    if (animate) {
      // Animación de transición
      document.body.style.transition = 'background-color 0.35s, color 0.35s';
      document.body.style.opacity = '0.8';
      
      setTimeout(() => {
        html.setAttribute('data-theme', themeName);
        this.currentTheme = themeName;
        localStorage.setItem(Config.STORAGE_KEYS.THEME, themeName);
        
        document.body.style.opacity = '1';
        
        // Remover transición después de completar
        setTimeout(() => {
          document.body.style.transition = '';
        }, 350);
      }, 175);
    } else {
      html.setAttribute('data-theme', themeName);
      this.currentTheme = themeName;
      localStorage.setItem(Config.STORAGE_KEYS.THEME, themeName);
    }
    
    // Actualizar estado global
    if (window.State) {
      State.setSettings({ theme: themeName });
    }
    
    // Dispatch event para que otros componentes se actualicen
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: themeName } }));
  },
  
  updateThemeColor(themeName) {
    const themeColors = {
      rise: '#0a0a0b',
      dark: '#0f0f11',
      light: '#f5f5f7',
    };
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColors[themeName] || themeColors.rise);
    }
  },
  
  toggleTheme() {
    const themeIndex = Config.THEMES.indexOf(this.currentTheme);
    const nextIndex = (themeIndex + 1) % Config.THEMES.length;
    this.setTheme(Config.THEMES[nextIndex]);
  },
  
  getAvailableThemes() {
    return Config.THEMES.map(theme => ({
      id: theme,
      name: this.getThemeName(theme),
      preview: this.getThemePreview(theme),
    }));
  },
  
  getThemeName(theme) {
    const names = {
      rise: 'Rise Identity',
      dark: 'Dark Premium',
      light: 'Light',
    };
    return names[theme] || theme;
  },
  
  getThemePreview(theme) {
    const previews = {
      rise: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
      dark: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
      light: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
    };
    return previews[theme] || previews.rise;
  },
};

window.Theme = Theme;

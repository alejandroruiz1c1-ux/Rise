/**
 * ========================================
 * RISE 2.0 - ROUTER
 * Sistema de navegación entre pantallas
 * ========================================
 */

const Router = {
  currentScreen: null,
  
  routes: {
    dashboard: DashboardScreen,
    habits: HabitsScreen,
    evolution: EvolutionScreen,
    profile: ProfileScreen,
    missions: MissionsScreen,
    finance: FinanceScreen,
    diary: DiaryScreen,
  },
  
  navigate(screenName, params = {}) {
    const container = document.getElementById('screen-container');
    if (!container) return;
    
    const screen = this.routes[screenName];
    if (!screen) {
      console.warn(`Pantalla "${screenName}" no encontrada`);
      return;
    }
    
    // Animación de salida si hay pantalla actual
    if (this.currentScreen && this.currentScreen.onLeave) {
      this.currentScreen.onLeave();
    }
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Renderizar nueva pantalla
    if (screen.render) {
      container.innerHTML = screen.render(params);
      
      // Ejecutar onEnter si existe
      setTimeout(() => {
        if (screen.onEnter) {
          screen.onEnter(params);
        }
      }, 50);
    }
    
    this.currentScreen = screen;
    
    // Actualizar navbar
    this.updateNavbar(screenName);
    
    // Scroll to top
    window.scrollTo(0, 0);
  },
  
  updateNavbar(activeScreen) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      const target = btn.dataset.screen;
      if (target === activeScreen) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  },
  
  back() {
    // Navegación hacia atrás (por implementar con historial)
    window.history.back();
  },
};

window.Router = Router;

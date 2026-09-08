/**
 * ========== MAIN APP ==========
 * Inicialización y enrutamiento principal
 */

// Enrutador
let currentScreen = 'onboarding';

function navigateTo(screen) {
  currentScreen = screen;
  
  // Actualizar navegación
  updateNavigation(screen);
  
  switch (screen) {
    case 'onboarding':
      hideNavigation();
      OnboardingScreen.render();
      break;
    case 'dashboard':
      if (!State.isAuthenticated()) {
        navigateTo('onboarding');
        return;
      }
      showNavigation();
      DashboardScreen.render();
      break;
    case 'habits':
      if (!State.isAuthenticated()) {
        navigateTo('onboarding');
        return;
      }
      showNavigation();
      HabitsScreen.render();
      break;
    case 'missions':
      if (!State.isAuthenticated()) {
        navigateTo('onboarding');
        return;
      }
      showNavigation();
      MissionsScreen.render();
      break;
    case 'evolution':
      if (!State.isAuthenticated()) {
        navigateTo('onboarding');
        return;
      }
      showNavigation();
      EvolutionScreen.render();
      break;
    case 'finance':
      if (!State.isAuthenticated()) {
        navigateTo('onboarding');
        return;
      }
      showNavigation();
      FinanceScreen.render();
      break;
    case 'diary':
      if (!State.isAuthenticated()) {
        navigateTo('onboarding');
        return;
      }
      showNavigation();
      DiaryScreen.render();
      break;
    case 'profile':
      if (!State.isAuthenticated()) {
        navigateTo('onboarding');
        return;
      }
      showNavigation();
      ProfileScreen.render();
      break;
    default:
      navigateTo('onboarding');
  }
}

// Mostrar/ocultar navegación
function showNavigation() {
  const nav = document.getElementById('bottom-nav');
  if (nav) nav.style.display = 'flex';
}

function hideNavigation() {
  const nav = document.getElementById('bottom-nav');
  if (nav) nav.style.display = 'none';
}

// Actualizar estado activo de la navegación
function updateNavigation(screen) {
  const navItems = document.querySelectorAll('.nav-item');
  const screenMap = {
    'dashboard': 0,
    'habits': 1,
    'missions': 2,
    'evolution': 3,
    'profile': 4
  };
  
  navItems.forEach((item, index) => {
    if (index === screenMap[screen]) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Utilidades de UI
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notif-${type} fade-in`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    Animations.fade(notification, false).then(() => notification.remove());
  }, 3000);
}

function showModal(content) {
  const scrim = document.createElement('div');
  scrim.className = 'modal-scrim active';
  scrim.id = 'modal-' + Date.now();
  
  scrim.innerHTML = `
    <div class="modal-content">
      ${content}
    </div>
  `;
  
  document.body.appendChild(scrim);
  
  scrim.addEventListener('click', (e) => {
    if (e.target === scrim) {
      closeModal(scrim.id);
    }
  });
}

function closeModal(modalId) {
  const scrim = document.getElementById(modalId) || document.querySelector('.modal-scrim.active');
  if (scrim) {
    scrim.classList.remove('active');
    setTimeout(() => scrim.remove(), 300);
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  // Aplicar tema
  ThemeManager.init();
  
  // Determinar pantalla inicial
  if (State.isAuthenticated()) {
    navigateTo('dashboard');
  } else {
    navigateTo('onboarding');
  }
  
  // Detectar cambios de tema del sistema
  if (State.theme === 'auto') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      ThemeManager.apply('auto');
    });
  }
});

// Manejador de errores global
window.addEventListener('error', (event) => {
  console.error('Error:', event.error);
  showNotification('Ocurrió un error: ' + event.error.message, 'error');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejected:', event.reason);
  showNotification('Error: ' + event.reason, 'error');
});

// Exportar funciones globales
window.navigateTo = navigateTo;
window.showNotification = showNotification;
window.showModal = showModal;
window.closeModal = closeModal;
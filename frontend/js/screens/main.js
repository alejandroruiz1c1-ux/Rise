/**
 * ========== MAIN APP ==========
 * Inicialización y enrutamiento principal
 */

// Enrutador
let currentScreen = 'onboarding';

function navigateTo(screen) {
  currentScreen = screen;
  
  switch (screen) {
    case 'onboarding':
      OnboardingScreen.render();
      break;
    case 'dashboard':
      if (!State.isAuthenticated()) {
        navigateTo('onboarding');
        return;
      }
      DashboardScreen.render();
      break;
    case 'habits':
      if (!State.isAuthenticated()) {
        navigateTo('onboarding');
        return;
      }
      HabitsScreen.render();
      break;
    case 'missions':
    case 'evolution':
    case 'finance':
    case 'diary':
    case 'profile':
      console.log('Screen no implementado:', screen);
      break;
    default:
      navigateTo('onboarding');
  }
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
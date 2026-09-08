/**
 * ========================================
 * RISE 2.0 - MAIN ENTRY POINT
 * Inicialización de la aplicación
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Rise 2.0 initializing...');
  
  // Inicializar componentes principales
  Theme.init();
  State.loadFromStorage();
  HabitsFeature.init();
  
  // Ocultar pantalla de carga
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      
      // Remover del DOM después de la transición
      setTimeout(() => loadingScreen.remove(), 500);
    }
    
    // Renderizar dashboard inicial
    Router.navigate('dashboard');
  }, 1200);
  
  // Configurar navegación por gestos
  setupGestures();
  
  // Escuchar cambios de tema
  window.addEventListener('themechange', (e) => {
    console.log('Theme changed to:', e.detail.theme);
  });
});

// Configuración de gestos básicos
function setupGestures() {
  let touchStartY = 0;
  let touchEndY = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe(touchStartY, touchEndY);
  }, { passive: true });
}

function handleSwipe(startY, endY) {
  const diff = startY - endY;
  const threshold = 50;
  
  // Swipe hacia arriba para cerrar bottom sheet
  if (diff > threshold) {
    const sheet = document.getElementById('bottom-sheet');
    if (sheet?.classList.contains('active')) {
      UI.closeSheet();
    }
  }
  
  // Swipe hacia abajo para cerrar modal
  if (diff < -threshold) {
    const modal = document.getElementById('modal-backdrop');
    if (modal?.classList.contains('active')) {
      UI.closeModal({ target: modal });
    }
  }
}

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.log('SW registration failed:', error);
    });
  });
}

// Manejar errores globales
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  UI.toast('Ha ocurrido un error', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  UI.toast('Error de conexión', 'error');
});

console.log('✅ Rise 2.0 ready!');

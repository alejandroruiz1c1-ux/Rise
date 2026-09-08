/**
 * ========================================
 * RISE 2.0 - UI UTILITIES
 * Componentes UI reutilizables
 * ========================================
 */

const UI = {
  // Toast Notifications
  toast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-enter`;
    toast.innerHTML = `
      <i class="ti ti-${this.getToastIcon(type)}"></i>
      <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Haptic feedback
    if (State.settings?.haptics && navigator.vibrate) {
      navigator.vibrate(type === 'success' ? [50] : type === 'error' ? [100, 50, 100] : [30]);
    }
    
    setTimeout(() => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  
  getToastIcon(type) {
    const icons = {
      success: 'check',
      error: 'alert-circle',
      info: 'info-circle',
      warning: 'alert-triangle',
    };
    return icons[type] || 'info-circle';
  },
  
  // Bottom Sheet
  openSheet(content, onClose) {
    const backdrop = document.getElementById('sheet-backdrop');
    const sheet = document.getElementById('bottom-sheet');
    const sheetContent = document.getElementById('sheet-content');
    
    if (!backdrop || !sheet || !sheetContent) return;
    
    sheetContent.innerHTML = content;
    backdrop.classList.add('active');
    sheet.classList.add('active');
    
    // Handle close
    this.sheetOnClose = onClose;
  },
  
  closeSheet() {
    const backdrop = document.getElementById('sheet-backdrop');
    const sheet = document.getElementById('bottom-sheet');
    
    if (!backdrop || !sheet) return;
    
    backdrop.classList.remove('active');
    sheet.classList.remove('active');
    
    if (this.sheetOnClose) {
      this.sheetOnClose();
      this.sheetOnClose = null;
    }
  },
  
  // Modal
  openModal(content, onClose) {
    const backdrop = document.getElementById('modal-backdrop');
    const container = document.getElementById('modal-container');
    
    if (!backdrop || !container) return;
    
    container.innerHTML = content;
    backdrop.classList.add('active');
    
    this.modalOnClose = onClose;
  },
  
  closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    
    const backdrop = document.getElementById('modal-backdrop');
    if (!backdrop) return;
    
    backdrop.classList.remove('active');
    
    if (this.modalOnClose) {
      this.modalOnClose();
      this.modalOnClose = null;
    }
  },
  
  // Loading State
  showLoading(elementId, text = 'Cargando...') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        <div class="spinner spinner-sm"></div>
        <span>${text}</span>
      </div>
    `;
    element.disabled = true;
  },
  
  hideLoading(elementId, originalContent) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = originalContent;
    element.disabled = false;
  },
  
  // Animate Numbers
  animateNumber(element, start, end, duration = 1000) {
    const startTime = performance.now();
    const elementNode = typeof element === 'string' ? document.getElementById(element) : element;
    
    if (!elementNode) return;
    
    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(start + (end - start) * ease);
      elementNode.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };
    
    requestAnimationFrame(updateNumber);
  },
  
  // Format Currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },
  
  // Format Date
  formatDate(date, options = {}) {
    const defaultOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    return new Date(date).toLocaleDateString('es-ES', mergedOptions);
  },
  
  // Format Relative Time
  formatRelativeTime(date) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return 'Ahora mismo';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`;
    if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} d`;
    
    return this.formatDate(date, { month: 'short', day: 'numeric' });
  },
};

window.UI = UI;

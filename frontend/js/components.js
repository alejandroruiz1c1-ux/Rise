/**
 * ========== COMPONENTES REUTILIZABLES ==========
 * Funciones para crear elementos UI comunes
 */

const Components = {
  
  /**
   * Crear un hábito card
   */
  habitCard(habit, isCompleted = false) {
    return `
      <div class="habit-card ${isCompleted ? 'completed' : ''}" data-habit-id="${habit.id}">
        <div class="habit-icon" style="color: ${habit.color}">
          <i class="ti ${habit.icon}"></i>
        </div>
        <div class="habit-info">
          <div class="habit-name">${habit.name}</div>
          <div class="habit-xp">+${habit.xp_reward} XP</div>
        </div>
        <button class="habit-check ${isCompleted ? 'done' : ''}" onclick="completeHabit('${habit.id}')">
          <i class="ti ti-check"></i>
        </button>
      </div>
    `;
  },
  
  /**
   * Crear un XP progress bar
   */
  xpBar(currentXP, maxXP) {
    const percentage = Math.round((currentXP / maxXP) * 100);
    return `
      <div class="xp-bar">
        <div class="xp-progress" style="width: ${percentage}%"></div>
      </div>
      <div class="xp-label">${currentXP} / ${maxXP} XP</div>
    `;
  },
  
  /**
   * Crear un botón cargando
   */
  loadingButton(text = 'Cargando...') {
    return `
      <button class="btn btn-primary" disabled>
        <div class="spinner"></div>
        ${text}
      </button>
    `;
  },
  
  /**
   * Crear notificación
   */
  notification(message, type = 'info') {
    const classes = {
      success: 'notif-success',
      error: 'notif-error',
      info: 'notif-info',
      warning: 'notif-warning'
    };
    
    return `
      <div class="notification ${classes[type] || 'notif-info'}">
        <div class="notif-content">${message}</div>
      </div>
    `;
  },
  
  /**
   * Crear input field con label
   */
  inputField(label, id, type = 'text', placeholder = '') {
    return `
      <div class="input-group">
        <label for="${id}" class="input-label">${label}</label>
        <input 
          id="${id}" 
          type="${type}" 
          placeholder="${placeholder}"
          class="input-field"
        />
      </div>
    `;
  },
  
  /**
   * Crear toggle switch
   */
  toggle(id, label, checked = false) {
    return `
      <div class="toggle-group">
        <label for="${id}" class="toggle-label">${label}</label>
        <input 
          id="${id}" 
          type="checkbox" 
          class="toggle-switch"
          ${checked ? 'checked' : ''}
        />
      </div>
    `;
  },
  
  /**
   * Crear skeleton loader
   */
  skeleton(count = 1) {
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `
        <div class="skeleton">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      `;
    }
    return html;
  }
};

window.Components = Components;
/**
 * ========================================
 * RISE 2.0 - BASE COMPONENTS
 * Componentes base reutilizables
 * ========================================
 */

const BaseComponents = {
  // Crear tarjeta de hábito
  habitCard(habit, isCompleted = false) {
    return `
      <div class="habit-card ${isCompleted ? 'completed' : ''}" data-habit-id="${habit.id}">
        <div class="habit-icon" style="color: ${habit.color || 'var(--accent-primary)'}">
          <i class="ti ${habit.icon || 'ti-circle-check'}"></i>
        </div>
        <div class="habit-info">
          <div class="habit-name">${this.escapeHtml(habit.name)}</div>
          <div class="habit-xp">+${habit.xp_reward || 20} XP</div>
        </div>
        <button class="habit-check ${isCompleted ? 'done' : ''}" onclick="HabitsFeature.completeHabit('${habit.id}')">
          <i class="ti ti-check"></i>
        </button>
      </div>
    `;
  },
  
  // Crear tarjeta de misión
  missionCard(mission) {
    const progressPercent = Math.min(100, Math.round((mission.current / mission.target) * 100));
    
    return `
      <div class="card-elevated press-feedback-card" data-mission-id="${mission.id}">
        <div class="flex justify-between items-center mb-3">
          <div class="flex items-center gap-2">
            <div class="avatar avatar-sm" style="background: ${this.getMissionColor(mission.type)}">
              <i class="ti ${mission.icon || 'ti-target'}"></i>
            </div>
            <div>
              <div class="text-body text-primary font-semibold">${this.escapeHtml(mission.title)}</div>
              <div class="text-footnote text-tertiary">${mission.type || 'Diaria'}</div>
            </div>
          </div>
          <div class="badge badge-accent">+${mission.xp_reward || 100} XP</div>
        </div>
        
        <div class="progress-bar mb-2">
          <div class="progress-fill" style="width: ${progressPercent}%"></div>
        </div>
        
        <div class="flex justify-between text-xs text-secondary">
          <span>${mission.current} / ${mission.target}</span>
          <span>${progressPercent}%</span>
        </div>
      </div>
    `;
  },
  
  // Crear tarjeta financiera
  financeTransaction(transaction) {
    const isIncome = transaction.type === 'income';
    
    return `
      <div class="habit-card press-feedback-card">
        <div class="habit-icon" style="background: ${isIncome ? 'var(--success-bg)' : 'var(--bg-tertiary)'}">
          <i class="ti ${transaction.category_icon || 'ti-wallet'}" style="color: ${isIncome ? 'var(--success-primary)' : 'var(--text-secondary)'}"></i>
        </div>
        <div class="habit-info">
          <div class="habit-name">${this.escapeHtml(transaction.description)}</div>
          <div class="habit-xp">${UI.formatRelativeTime(transaction.date)}</div>
        </div>
        <div class="text-body font-semibold ${isIncome ? 'text-success' : 'text-primary'}">
          ${isIncome ? '+' : '-'}${UI.formatCurrency(transaction.amount)}
        </div>
      </div>
    `;
  },
  
  // Crear estadística
  statCard(icon, label, value, trend = null) {
    return `
      <div class="mini-card glass">
        <div class="flex items-center gap-2 mb-2">
          <i class="ti ${icon}" style="color: var(--accent-primary)"></i>
          <div class="mini-label">${label}</div>
        </div>
        <div class="mini-value">${value}</div>
        ${trend ? `
          <div class="mini-subtext ${trend > 0 ? 'text-success' : trend < 0 ? 'text-danger' : ''}">
            ${trend > 0 ? '↑' : trend < 0 ? '↓' : ''} ${Math.abs(trend)}%
          </div>
        ` : ''}
      </div>
    `;
  },
  
  // Escapar HTML para seguridad
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },
  
  // Obtener color de misión
  getMissionColor(type) {
    const colors = {
      daily: 'var(--accent-primary)',
      weekly: 'var(--category-learning)',
      challenge: 'var(--category-health)',
      achievement: 'var(--category-finance)',
    };
    return colors[type?.toLowerCase()] || 'var(--accent-primary)';
  },
};

window.BaseComponents = BaseComponents;

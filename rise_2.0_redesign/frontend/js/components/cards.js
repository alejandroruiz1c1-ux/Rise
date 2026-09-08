/**
 * ========================================
 * RISE 2.0 - CARD COMPONENTS
 * Componentes de tarjetas especializadas
 * ========================================
 */

const CardComponents = {
  // Tarjeta Hero de progreso diario
  heroProgressCard(user, habits) {
    const completedCount = habits.filter(h => h.completed_today).length;
    const totalCount = habits.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    const circumference = 2 * Math.PI * 42;
    const offset = circumference - (percentage / 100) * circumference;
    
    return `
      <div class="hero-card glass fade-in-up">
        <div class="hero-ring-container">
          <svg class="day-ring" viewBox="0 0 100 100">
            <circle class="ring-bg" cx="50" cy="50" r="42"/>
            <circle class="ring-fg" cx="50" cy="50" r="42" style="stroke-dashoffset: ${offset}"/>
          </svg>
          <div class="ring-text">
            <div class="ring-value">${percentage}%</div>
            <div class="ring-label">hoy</div>
          </div>
        </div>
        
        <div class="hero-info">
          <div class="hero-stat">
            <span class="flame">🔥 ${user.current_streak || 0}</span>
            <span class="level-badge">Nivel ${user.level || 1}</span>
          </div>
          <div class="rank-display">${this.getRankName(user.level || 1)}</div>
          <div class="xp-progress-track">
            <div class="xp-progress-fill" style="width: ${this.calculateLevelProgress(user)}%"></div>
          </div>
          <div class="xp-label">${user.xp_in_level || 0} / ${user.xp_needed || 300} XP</div>
        </div>
      </div>
    `;
  },
  
  // Tarjeta de resumen financiero
  financeSummaryCard(finances) {
    const balance = finances.balance || 0;
    const income = finances.income || 0;
    const expenses = finances.expenses || 0;
    
    return `
      <div class="card-elevated glass fade-in-up">
        <div class="text-footnote text-tertiary mb-2">Balance actual</div>
        <div class="text-display text-primary mb-6">${UI.formatCurrency(balance)}</div>
        
        <div class="flex gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-1 mb-1">
              <i class="ti ti-arrow-down-left text-success" style="font-size: 14px"></i>
              <span class="text-footnote text-tertiary">Ingresos</span>
            </div>
            <div class="text-lg font-bold text-success">${UI.formatCurrency(income)}</div>
          </div>
          
          <div class="divider-vertical"></div>
          
          <div class="flex-1">
            <div class="flex items-center gap-1 mb-1">
              <i class="ti ti-arrow-up-right text-danger" style="font-size: 14px"></i>
              <span class="text-footnote text-tertiary">Gastos</span>
            </div>
            <div class="text-lg font-bold text-primary">${UI.formatCurrency(expenses)}</div>
          </div>
        </div>
      </div>
    `;
  },
  
  // Tarjeta de objetivo de ahorro
  savingsGoalCard(goal) {
    const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
    
    return `
      <div class="card press-feedback-card">
        <div class="flex justify-between items-start mb-3">
          <div>
            <div class="text-body text-primary font-semibold">${BaseComponents.escapeHtml(goal.name)}</div>
            <div class="text-footnote text-tertiary">${goal.deadline || 'Sin fecha límite'}</div>
          </div>
          <div class="badge badge-accent">${percentage}%</div>
        </div>
        
        <div class="progress-bar mb-2">
          <div class="progress-fill success" style="width: ${percentage}%"></div>
        </div>
        
        <div class="flex justify-between text-xs text-secondary">
          <span>${UI.formatCurrency(goal.current)}</span>
          <span>${UI.formatCurrency(goal.target)}</span>
        </div>
      </div>
    `;
  },
  
  // Tarjeta de presupuesto
  budgetCard(budget) {
    const percentage = Math.min(100, Math.round((budget.spent / budget.limit) * 100));
    const remaining = budget.limit - budget.spent;
    const isOver = percentage >= 100;
    const isWarning = percentage >= 80 && percentage < 100;
    
    return `
      <div class="card press-feedback-card">
        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center gap-2">
            <div class="avatar avatar-sm" style="background: var(--category-finance)">
              <i class="ti ti-wallet"></i>
            </div>
            <div>
              <div class="text-body text-primary font-semibold">${BaseComponents.escapeHtml(budget.category)}</div>
              <div class="text-footnote text-tertiary">${budget.period || 'Mensual'}</div>
            </div>
          </div>
          <div class="badge ${isOver ? 'badge-danger' : isWarning ? 'badge-warning' : 'badge-success'}">
            ${percentage}%
          </div>
        </div>
        
        <div class="progress-bar mb-2">
          <div class="progress-fill ${isOver ? 'danger' : isWarning ? '' : 'success'}" style="width: ${percentage}%"></div>
        </div>
        
        <div class="flex justify-between text-xs">
          <span class="${isOver ? 'text-danger' : 'text-secondary'}">
            ${isOver ? 'Excedido' : isWarning ? 'Casi al límite' : 'Disponible'}: ${UI.formatCurrency(Math.max(0, remaining))}
          </span>
          <span class="text-secondary">${UI.formatCurrency(budget.limit)}</span>
        </div>
      </div>
    `;
  },
  
  // Calcular progreso de nivel
  calculateLevelProgress(user) {
    if (!user.xp_in_level || !user.xp_needed) return 0;
    return Math.min(100, Math.round((user.xp_in_level / user.xp_needed) * 100));
  },
  
  // Obtener nombre de rango
  getRankName(level) {
    const ranks = [
      'Recluta',      // 1
      'Aprendiz',     // 2-3
      'Constante',    // 4-5
      'Disciplinado', // 6-7
      'Determinado',  // 8-9
      'Enfocado',     // 10-12
      'Resiliente',   // 13-15
      'Imparable',    // 16-19
      'Maestro',      // 20-24
      'Ascendido',    // 25+
    ];
    
    const rankIndex = Math.min(Math.floor((level - 1) / 2.5), ranks.length - 1);
    return ranks[rankIndex];
  },
};

window.CardComponents = CardComponents;

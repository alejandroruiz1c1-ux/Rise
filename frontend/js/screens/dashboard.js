/**
 * ========== DASHBOARD SCREEN ==========
 * Pantalla de inicio con estado del día, hábitos y progreso
 */

const DashboardScreen = {
  
  render() {
    const container = document.getElementById('screen-container');
    
    if (!State.user) {
      container.innerHTML = '<p>Usuario no cargado</p>';
      return;
    }
    
    const user = State.user;
    const today = new Date();
    const hours = today.getHours();
    const greeting = hours < 12 ? '☀️ Buenos días' : hours < 18 ? '🌤️ Buenas tardes' : '🌙 Buenas noches';
    
    container.innerHTML = `
      <div class="screen dashboard-screen fade-in">
        <!-- HEADER -->
        <div class="dashboard-header glass">
          <div>
            <div class="greeting">${greeting}</div>
            <div class="date-display">${this.formatDate(today)}</div>
          </div>
          <div class="xp-pill">
            <i class="ti ti-bolt"></i>
            <span>${user.xp} XP</span>
          </div>
        </div>
        
        <!-- HERO SECTION - Progreso del Día -->
        <div class="dashboard-content">
          <div class="hero-card glass">
            <div class="hero-ring-container">
              <svg class="day-ring" viewBox="0 0 100 100">
                <circle class="ring-bg" cx="50" cy="50" r="42"/>
                <circle class="ring-fg" id="day-progress" cx="50" cy="50" r="42"/>
              </svg>
              <div class="ring-text">
                <div class="ring-value" id="day-percent">0%</div>
                <div class="ring-label">hoy</div>
              </div>
            </div>
            
            <div class="hero-info">
              <div class="hero-stat">
                <span class="flame">🔥 ${user.current_streak || 0}</span>
                <span class="level-badge">Nivel ${user.level}</span>
              </div>
              <div class="rank-display">${this.getRankName(user.level)}</div>
              <div class="xp-progress-track">
                <div class="xp-progress-fill" id="level-progress"></div>
              </div>
              <div class="xp-label" id="xp-label">0 / 300 XP</div>
            </div>
          </div>
          
          <!-- FOCUS CARD - Siguiente acción -->
          <div class="focus-card glass" id="focus-card"></div>
          
          <!-- HÁBITOS DEL DÍA -->
          <div class="section">
            <div class="section-header">
              <h3 class="section-title">Hábitos de hoy</h3>
              <span class="habit-count" id="habits-count">0/0</span>
            </div>
            <div class="habits-list" id="habits-container"></div>
          </div>
          
          <!-- MINI CARDS - Resumen rápido -->
          <div class="mini-cards-grid">
            <div class="mini-card glass" onclick="navigateTo('missions')">
              <div class="mini-label">Misión</div>
              <div class="mini-value" id="current-mission">-</div>
              <div class="mini-subtext">Diaria</div>
            </div>
            
            <div class="mini-card glass" onclick="navigateTo('training')">
              <div class="mini-label">Entreno</div>
              <div class="mini-value" id="training-status">Pendiente</div>
              <div class="mini-subtext">Hoy</div>
            </div>
            
            <div class="mini-card glass" onclick="navigateTo('finance')">
              <div class="mini-label">Balance</div>
              <div class="mini-value" id="balance">$0</div>
              <div class="mini-subtext">Mes</div>
            </div>
            
            <div class="mini-card glass" onclick="toggleReminders()">
              <div class="mini-label">Recordatorios</div>
              <div class="mini-toggle" id="reminder-toggle">🔔</div>
              <div class="mini-subtext">Activos</div>
            </div>
          </div>
          
          <!-- TIMELINE DE DÍAS -->
          <div class="section">
            <div class="section-title">Últimos días</div>
            <div class="date-strip" id="date-strip"></div>
          </div>
        </div>
        
        <!-- NAVBAR -->
        <nav class="navbar glass">
          <button class="nav-btn active" onclick="navigateTo('dashboard')">
            <i class="ti ti-home"></i>
            <span>Inicio</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('habits')">
            <i class="ti ti-circle-check"></i>
            <span>Hábitos</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('missions')">
            <i class="ti ti-target"></i>
            <span>Misiones</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('evolution')">
            <i class="ti ti-chart-line"></i>
            <span>Evolución</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('profile')">
            <i class="ti ti-user"></i>
            <span>Perfil</span>
          </button>
        </nav>
      </div>
    `;
    
    // Cargar datos
    this.loadData();
  },
  
  async loadData() {
    try {
      const habits = await apiGetHabits();
      const xpProfile = await apiGetXPProfile();
      
      State.updateHabits(habits);
      this.renderHabits(habits);
      this.updateXPDisplay(xpProfile);
      this.renderDateStrip();
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  },
  
  renderHabits(habits) {
    const container = document.getElementById('habits-container');
    const today = this.getTodayKey();
    
    const completedCount = habits.filter(h => h.completed_today).length;
    document.getElementById('habits-count').textContent = `${completedCount}/${habits.length}`;
    
    // Actualizar anillo de progreso
    const percentage = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;
    document.getElementById('day-percent').textContent = percentage + '%';
    
    const ringCircle = document.getElementById('day-progress');
    const circumference = 2 * Math.PI * 42;
    const offset = circumference - (percentage / 100) * circumference;
    ringCircle.style.strokeDashoffset = offset;
    
    container.innerHTML = habits.map(habit => `
      <div class="habit-card ${habit.completed_today ? 'completed' : ''}" data-habit-id="${habit.id}">
        <div class="habit-icon" style="color: ${habit.color}">
          <i class="ti ${habit.icon}"></i>
        </div>
        <div class="habit-info">
          <div class="habit-name">${habit.name}</div>
          <div class="habit-xp">+${habit.xp_reward} XP</div>
        </div>
        <button class="habit-check ${habit.completed_today ? 'done' : ''}" 
                onclick="DashboardScreen.completeHabit('${habit.id}', this)">
          <i class="ti ti-check"></i>
        </button>
      </div>
    `).join('');
  },
  
  async completeHabit(habitId, button) {
    try {
      const result = await apiCompleteHabit(habitId);
      
      // Animaciones
      Animations.pulse(button);
      Animations.animateXPGain(button, result.xp_earned);
      
      // Actualizar UI
      button.classList.add('done');
      button.parentElement.classList.add('completed');
      
      // Actualizar XP
      const newXP = State.user.xp + result.xp_earned;
      State.updateXP(newXP);
      
      // Actualizar display
      document.querySelector('.xp-pill span').textContent = newXP + ' XP';
      
      // Mostrar notificación
      showNotification(`+${result.xp_earned} XP ganados!`, 'success');
      
      // Recargar datos
      setTimeout(() => this.loadData(), 500);
    } catch (error) {
      console.error('Error completando hábito:', error);
    }
  },
  
  updateXPDisplay(xpProfile) {
    document.getElementById('xp-label').textContent = 
      `${xpProfile.xp_in_level} / ${xpProfile.xp_needed_for_next_level} XP`;
    
    const levelProgress = document.getElementById('level-progress');
    levelProgress.style.width = xpProfile.progress_percentage + '%';
  },
  
  renderDateStrip() {
    const container = document.getElementById('date-strip');
    const today = new Date();
    let html = '';
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const isToday = i === 0;
      const dayName = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][date.getDay()];
      
      html += `
        <div class="date-pill ${isToday ? 'today' : ''}">
          <div class="date-day">${dayName}</div>
          <div class="date-num">${date.getDate()}</div>
        </div>
      `;
    }
    
    container.innerHTML = html;
  },
  
  formatDate(date) {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    return `${days[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]}`;
  },
  
  getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  },
  
  getRankName(level) {
    const rankIndex = Math.min(Math.floor((level - 1) / 2), 9);
    const ranks = ['Recluta', 'Aprendiz', 'Constante', 'Disciplinado', 'Determinado', 'Enfocado', 'Resiliente', 'Imparable', 'Maestro', 'Ascendido'];
    return ranks[rankIndex];
  }
};

window.DashboardScreen = DashboardScreen;
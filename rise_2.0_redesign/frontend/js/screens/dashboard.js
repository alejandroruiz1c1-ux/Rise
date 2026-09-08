/**
 * ========================================
 * RISE 2.0 - DASHBOARD SCREEN
 * Pantalla principal de inicio
 * ========================================
 */

const DashboardScreen = {
  render() {
    const user = State.user || this.getMockUser();
    const habits = HabitsFeature.getHabits();
    
    return `
      <div class="page-enter safe-area-top" style="padding-bottom: env(safe-area-inset-bottom)">
        <!-- Header -->
        <header class="header">
          <div>
            <div class="header-subtitle">${this.getGreeting()}</div>
            <div class="header-title">${user.name || 'Usuario'}</div>
          </div>
          <button class="btn btn-icon glass" onclick="Router.navigate('profile')">
            <i class="ti ti-settings"></i>
          </button>
        </header>
        
        <!-- Hero Card -->
        ${CardComponents.heroProgressCard(user, habits)}
        
        <!-- Date Strip -->
        <div class="date-strip">
          ${this.renderDateStrip()}
        </div>
        
        <!-- Mini Stats Grid -->
        <div class="mini-cards-grid">
          ${BaseComponents.statCard('ti-flame', 'Racha', `${user.current_streak || 0} días`)}
          ${BaseComponents.statCard('ti-trophy', 'Nivel', `${user.level || 1}`)}
          ${BaseComponents.statCard('ti-calendar-check', 'Hábitos', `<span id="habits-count">${habits.filter(h => h.completed_today).length}/${habits.length}</span>`)}
          ${BaseComponents.statCard('ti-gift', 'Misiones', '2 activas')}
        </div>
        
        <!-- Today's Habits Section -->
        <section class="section">
          <div class="section-header">
            <div class="section-title">Hábitos de hoy</div>
            <button class="btn btn-ghost" onclick="Router.navigate('habits')">
              Ver todos
            </button>
          </div>
          
          <div id="habits-container">
            ${habits.slice(0, 4).map(habit => BaseComponents.habitCard(habit, habit.completed_today)).join('')}
          </div>
        </section>
        
        <!-- Active Missions Preview -->
        <section class="section">
          <div class="section-header">
            <div class="section-title">Misión activa</div>
            <button class="btn btn-ghost" onclick="Router.navigate('missions')">
              Ver todas
            </button>
          </div>
          
          ${BaseComponents.missionCard({
            id: 'm1',
            title: 'Maestro de hábitos',
            type: 'daily',
            current: habits.filter(h => h.completed_today).length,
            target: 4,
            xp_reward: 150,
            icon: 'ti-target'
          })}
        </section>
        
        <!-- Navigation Bar -->
        <nav class="navbar safe-area-bottom">
          <button class="nav-btn active" data-screen="dashboard" onclick="Router.navigate('dashboard')">
            <i class="ti ti-home"></i>
            <span>Inicio</span>
          </button>
          <button class="nav-btn" data-screen="habits" onclick="Router.navigate('habits')">
            <i class="ti ti-checkbox"></i>
            <span>Hábitos</span>
          </button>
          <button class="nav-btn" data-screen="evolution" onclick="Router.navigate('evolution')">
            <i class="ti ti-chart-bar"></i>
            <span>Evolución</span>
          </button>
          <button class="nav-btn" data-screen="finance" onclick="Router.navigate('finance')">
            <i class="ti ti-wallet"></i>
            <span>Finanzas</span>
          </button>
          <button class="nav-btn" data-screen="profile" onclick="Router.navigate('profile')">
            <i class="ti ti-user"></i>
            <span>Perfil</span>
          </button>
        </nav>
      </div>
    `;
  },
  
  onEnter() {
    // Actualizar contador de hábitos
    HabitsFeature.updateHabitsCount();
    
    // Animar números
    setTimeout(() => {
      const ringFg = document.querySelector('.ring-fg');
      if (ringFg) {
        // Trigger reflow
        ringFg.style.transition = 'stroke-dashoffset 0.8s var(--ease-ios-decelerate)';
      }
    }, 100);
  },
  
  getMockUser() {
    return {
      name: 'Usuario',
      level: 5,
      xp: 1250,
      xp_in_level: 150,
      xp_needed: 300,
      current_streak: 7,
    };
  },
  
  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  },
  
  renderDateStrip() {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const today = new Date();
    let html = '';
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      const isToday = i === 0;
      const dayName = days[date.getDay()];
      const dayNum = date.getDate();
      
      html += `
        <div class="date-pill ${isToday ? 'today' : ''}">
          <div class="date-day">${dayName}</div>
          <div class="date-num">${dayNum}</div>
        </div>
      `;
    }
    
    return html;
  },
};

window.DashboardScreen = DashboardScreen;

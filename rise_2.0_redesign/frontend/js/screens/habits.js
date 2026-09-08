const HabitsScreen = {
  render() {
    const habits = HabitsFeature.getHabits();
    return `
      <div class="page-enter safe-area-top" style="padding-bottom: env(safe-area-inset-bottom)">
        <header class="header">
          <div class="header-title">Hábitos</div>
          <button class="btn btn-icon glass" onclick="HabitsScreen.addHabit()">
            <i class="ti ti-plus"></i>
          </button>
        </header>
        <section class="section">
          <div id="habits-container">
            ${habits.map(h => BaseComponents.habitCard(h, h.completed_today)).join('')}
          </div>
        </section>
        <nav class="navbar safe-area-bottom">
          <button class="nav-btn" data-screen="dashboard" onclick="Router.navigate('dashboard')"><i class="ti ti-home"></i><span>Inicio</span></button>
          <button class="nav-btn active" data-screen="habits" onclick="Router.navigate('habits')"><i class="ti ti-checkbox"></i><span>Hábitos</span></button>
          <button class="nav-btn" data-screen="evolution" onclick="Router.navigate('evolution')"><i class="ti ti-chart-bar"></i><span>Evolución</span></button>
          <button class="nav-btn" data-screen="finance" onclick="Router.navigate('finance')"><i class="ti ti-wallet"></i><span>Finanzas</span></button>
          <button class="nav-btn" data-screen="profile" onclick="Router.navigate('profile')"><i class="ti ti-user"></i><span>Perfil</span></button>
        </nav>
      </div>
    `;
  },
  onEnter() { HabitsFeature.renderHabitsList(); },
  addHabit() { UI.toast('Función próximamente', 'info'); }
};
window.HabitsScreen = HabitsScreen;

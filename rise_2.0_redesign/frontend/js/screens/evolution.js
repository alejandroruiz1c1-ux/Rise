const EvolutionScreen = {
  render() {
    return `
      <div class="page-enter safe-area-top" style="padding-bottom: env(safe-area-inset-bottom)">
        <header class="header"><div class="header-title">Evolución</div></header>
        <section class="section">
          <div class="empty-state">
            <i class="ti ti-chart-bar empty-state-icon"></i>
            <div class="empty-state-title">Tu evolución</div>
            <div class="empty-state-description">Próximamente verás aquí tu progreso detallado</div>
          </div>
        </section>
        <nav class="navbar safe-area-bottom">
          <button class="nav-btn" data-screen="dashboard" onclick="Router.navigate('dashboard')"><i class="ti ti-home"></i><span>Inicio</span></button>
          <button class="nav-btn" data-screen="habits" onclick="Router.navigate('habits')"><i class="ti ti-checkbox"></i><span>Hábitos</span></button>
          <button class="nav-btn active" data-screen="evolution" onclick="Router.navigate('evolution')"><i class="ti ti-chart-bar"></i><span>Evolución</span></button>
          <button class="nav-btn" data-screen="finance" onclick="Router.navigate('finance')"><i class="ti ti-wallet"></i><span>Finanzas</span></button>
          <button class="nav-btn" data-screen="profile" onclick="Router.navigate('profile')"><i class="ti ti-user"></i><span>Perfil</span></button>
        </nav>
      </div>
    `;
  }
};
window.EvolutionScreen = EvolutionScreen;

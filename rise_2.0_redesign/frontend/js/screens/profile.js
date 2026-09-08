const ProfileScreen = {
  render() {
    const user = State.user || { name: 'Usuario', level: 1, xp: 0 };
    const themes = Theme.getAvailableThemes();
    return `
      <div class="page-enter safe-area-top" style="padding-bottom: env(safe-area-inset-bottom)">
        <header class="header"><div class="header-title">Perfil</div></header>
        <section class="section">
          <div class="card-elevated glass text-center padding-lg">
            <div class="avatar avatar-lg" style="margin: 0 auto 16px">${user.name?.charAt(0) || 'U'}</div>
            <div class="text-headline text-primary">${user.name || 'Usuario'}</div>
            <div class="text-caption text-tertiary">Nivel ${user.level || 1}</div>
          </div>
        </section>
        <section class="section">
          <div class="section-header"><div class="section-title">Tema</div></div>
          <div class="flex gap-2">
            ${themes.map(t => `
              <button class="btn btn-secondary flex-1" onclick="Theme.setTheme('${t.id}')" style="background: ${t.preview}; border: none;">
                <span style="color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.5)">${t.name}</span>
              </button>
            `).join('')}
          </div>
        </section>
        <nav class="navbar safe-area-bottom">
          <button class="nav-btn" data-screen="dashboard" onclick="Router.navigate('dashboard')"><i class="ti ti-home"></i><span>Inicio</span></button>
          <button class="nav-btn" data-screen="habits" onclick="Router.navigate('habits')"><i class="ti ti-checkbox"></i><span>Hábitos</span></button>
          <button class="nav-btn" data-screen="evolution" onclick="Router.navigate('evolution')"><i class="ti ti-chart-bar"></i><span>Evolución</span></button>
          <button class="nav-btn" data-screen="finance" onclick="Router.navigate('finance')"><i class="ti ti-wallet"></i><span>Finanzas</span></button>
          <button class="nav-btn active" data-screen="profile" onclick="Router.navigate('profile')"><i class="ti ti-user"></i><span>Perfil</span></button>
        </nav>
      </div>
    `;
  }
};
window.ProfileScreen = ProfileScreen;

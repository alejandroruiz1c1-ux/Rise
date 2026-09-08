/**
 * ========== PROFILE SCREEN ==========
 * Pantalla de perfil: nivel, logros, personalización y configuración
 */

const ProfileScreen = {

  render() {
    const container = document.getElementById('screen-container');

    if (!State.user) {
      container.innerHTML = '<p>Cargando datos...</p>';
      return;
    }

    const user = State.user;

    container.innerHTML = `
      <div class="screen profile-screen fade-in">
        <!-- HEADER -->
        <div class="profile-header glass">
          <h2>Perfil</h2>
          <button class="btn-icon" onclick="ProfileScreen.logout()">
            <i class="ti ti-logout"></i>
          </button>
        </div>

        <!-- CONTENT -->
        <div class="profile-content">
          <!-- USER INFO -->
          <div class="user-card glass">
            <div class="user-avatar">
              <span class="avatar-text">${user.username ? user.username.charAt(0).toUpperCase() : 'U'}</span>
            </div>
            <div class="user-info">
              <div class="user-name">${user.username || 'Usuario'}</div>
              <div class="user-email">${user.email || ''}</div>
              <div class="user-level">Nivel ${user.level} · ${this.getRankName(user.level)}</div>
            </div>
          </div>

          <!-- ESTADÍSTICAS -->
          <div class="section">
            <h3 class="section-title">Estadísticas</h3>
            <div class="stats-grid">
              <div class="stat-card glass">
                <div class="stat-value">${user.current_streak || 0}</div>
                <div class="stat-label">Racha actual</div>
              </div>
              <div class="stat-card glass">
                <div class="stat-value">${user.best_streak || 0}</div>
                <div class="stat-label">Mejor racha</div>
              </div>
              <div class="stat-card glass">
                <div class="stat-value">${user.xp || 0}</div>
                <div class="stat-label">XP Total</div>
              </div>
              <div class="stat-card glass">
                <div class="stat-value">${user.habits_completed || 0}</div>
                <div class="stat-label">Hábitos</div>
              </div>
            </div>
          </div>

          <!-- LOGROS -->
          <div class="section">
            <h3 class="section-title">Logros</h3>
            <div class="achievements-list">
              <div class="achievement-item glass">
                <div class="achievement-icon">🔥</div>
                <div class="achievement-info">
                  <div class="achievement-name">Primera Racha</div>
                  <div class="achievement-desc">Completa 7 días seguidos</div>
                </div>
                <div class="achievement-status">✓</div>
              </div>
              <div class="achievement-item glass">
                <div class="achievement-icon">⭐</div>
                <div class="achievement-info">
                  <div class="achievement-name">Principiante</div>
                  <div class="achievement-desc">Completa 10 hábitos</div>
                </div>
                <div class="achievement-status locked">🔒</div>
              </div>
              <div class="achievement-item glass">
                <div class="achievement-icon">💪</div>
                <div class="achievement-info">
                  <div class="achievement-name">Disciplinado</div>
                  <div class="achievement-desc">30 días de racha</div>
                </div>
                <div class="achievement-status locked">🔒</div>
              </div>
            </div>
          </div>

          <!-- CONFIGURACIÓN -->
          <div class="section">
            <h3 class="section-title">Configuración</h3>
            <div class="settings-list">
              <div class="setting-item glass" onclick="ThemeManager.toggle()">
                <div class="setting-icon">
                  <i class="ti ti-moon"></i>
                </div>
                <div class="setting-info">
                  <div class="setting-name">Tema</div>
                  <div class="setting-desc">${State.theme === 'dark' ? 'Oscuro' : State.theme === 'light' ? 'Claro' : 'Automático'}</div>
                </div>
                <div class="setting-action">
                  <i class="ti ti-chevron-right"></i>
                </div>
              </div>

              <div class="setting-item glass">
                <div class="setting-icon">
                  <i class="ti ti-bell"></i>
                </div>
                <div class="setting-info">
                  <div class="setting-name">Notificaciones</div>
                  <div class="setting-desc">Recordatorios activos</div>
                </div>
                <div class="setting-action">
                  <i class="ti ti-toggle-on"></i>
                </div>
              </div>

              <div class="setting-item glass">
                <div class="setting-icon">
                  <i class="ti ti-language"></i>
                </div>
                <div class="setting-info">
                  <div class="setting-name">Idioma</div>
                  <div class="setting-desc">Español</div>
                </div>
                <div class="setting-action">
                  <i class="ti ti-chevron-right"></i>
                </div>
              </div>

              <div class="setting-item glass">
                <div class="setting-icon">
                  <i class="ti ti-info-circle"></i>
                </div>
                <div class="setting-info">
                  <div class="setting-name">Acerca de</div>
                  <div class="setting-desc">Versión 2.0</div>
                </div>
                <div class="setting-action">
                  <i class="ti ti-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- NAVBAR -->
        <nav class="navbar glass">
          <button class="nav-btn" onclick="navigateTo('dashboard')">
            <i class="ti ti-home"></i>
            <span>Inicio</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('habits')">
            <i class="ti ti-circle-check"></i>
            <span>Hábitos</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('evolution')">
            <i class="ti ti-chart-line"></i>
            <span>Evolución</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('missions')">
            <i class="ti ti-target"></i>
            <span>Misiones</span>
          </button>
          <button class="nav-btn active" onclick="navigateTo('profile')">
            <i class="ti ti-user"></i>
            <span>Perfil</span>
          </button>
        </nav>
      </div>
    `;
  },

  getRankName(level) {
    const rankIndex = Math.min(Math.floor((level - 1) / 2), 9);
    const ranks = ['Recluta', 'Aprendiz', 'Constante', 'Disciplinado', 'Determinado', 'Enfocado', 'Resiliente', 'Imparable', 'Maestro', 'Ascendido'];
    return ranks[rankIndex];
  },

  logout() {
    if (confirm('¿Cerrar sesión?')) {
      Auth.logout();
    }
  }
};

window.ProfileScreen = ProfileScreen;

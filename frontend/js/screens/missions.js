/**
 * ========== MISSIONS SCREEN ==========
 * Pantalla de misiones: diarias, semanales y desafíos
 */

const MissionsScreen = {

  render() {
    const container = document.getElementById('screen-container');

    if (!State.user) {
      container.innerHTML = '<p>Cargando datos...</p>';
      return;
    }

    const user = State.user;

    container.innerHTML = `
      <div class="screen missions-screen fade-in">
        <!-- HEADER -->
        <div class="missions-header glass">
          <h2>Misiones</h2>
          <button class="btn-icon" onclick="MissionsScreen.refresh()">
            <i class="ti ti-refresh"></i>
          </button>
        </div>

        <!-- CONTENT -->
        <div class="missions-content">
          <!-- MISIÓN DIARIA -->
          <div class="section">
            <h3 class="section-title">Misión Diaria</h3>
            <div class="mission-card glass daily">
              <div class="mission-icon">
                <i class="ti ti-sun"></i>
              </div>
              <div class="mission-info">
                <div class="mission-name">Construye tu día</div>
                <div class="mission-desc">Completa 3 hábitos hoy</div>
                <div class="mission-progress">
                  <div class="mission-bar">
                    <div class="mission-fill" style="width: 60%"></div>
                  </div>
                  <div class="mission-count">3/5 completados</div>
                </div>
              </div>
              <div class="mission-reward">
                <span class="xp-badge">+50 XP</span>
              </div>
            </div>
          </div>

          <!-- MISIONES SEMANALES -->
          <div class="section">
            <h3 class="section-title">Semanales</h3>
            <div class="mission-card glass weekly">
              <div class="mission-icon">
                <i class="ti ti-calendar-week"></i>
              </div>
              <div class="mission-info">
                <div class="mission-name">Consistencia</div>
                <div class="mission-desc">Mantén tu racha esta semana</div>
                <div class="mission-progress">
                  <div class="mission-bar">
                    <div class="mission-fill" style="width: 71%"></div>
                  </div>
                  <div class="mission-count">5/7 días</div>
                </div>
              </div>
              <div class="mission-reward">
                <span class="xp-badge">+150 XP</span>
              </div>
            </div>

            <div class="mission-card glass weekly">
              <div class="mission-icon">
                <i class="ti ti-dumbbell"></i>
              </div>
              <div class="mission-info">
                <div class="mission-name">Entrenamiento</div>
                <div class="mission-desc">Entrena 4 veces esta semana</div>
                <div class="mission-progress">
                  <div class="mission-bar">
                    <div class="mission-fill" style="width: 50%"></div>
                  </div>
                  <div class="mission-count">2/4 sesiones</div>
                </div>
              </div>
              <div class="mission-reward">
                <span class="xp-badge">+100 XP</span>
              </div>
            </div>
          </div>

          <!-- DESAFÍOS -->
          <div class="section">
            <h3 class="section-title">Desafíos</h3>
            <div class="mission-card glass challenge">
              <div class="mission-icon">
                <i class="ti ti-trophy"></i>
              </div>
              <div class="mission-info">
                <div class="mission-name">Principiante</div>
                <div class="mission-desc">Completa 10 hábitos en total</div>
                <div class="mission-progress">
                  <div class="mission-bar">
                    <div class="mission-fill" style="width: 40%"></div>
                  </div>
                  <div class="mission-count">4/10 completados</div>
                </div>
              </div>
              <div class="mission-reward">
                <span class="xp-badge">+200 XP</span>
                <span class="badge">🏅 Logro</span>
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
          <button class="nav-btn active" onclick="navigateTo('missions')">
            <i class="ti ti-target"></i>
            <span>Misiones</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('profile')">
            <i class="ti ti-user"></i>
            <span>Perfil</span>
          </button>
        </nav>
      </div>
    `;
  },

  refresh() {
    this.render();
    showNotification('Misiones actualizadas', 'success');
  }
};

window.MissionsScreen = MissionsScreen;

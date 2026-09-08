/**
 * ========== EVOLUTION SCREEN ==========
 * Pantalla de evolución: XP, niveles, atributos, estadísticas y progreso
 */

const EvolutionScreen = {

  render() {
    const container = document.getElementById('screen-container');

    if (!State.user) {
      container.innerHTML = '<p>Cargando datos...</p>';
      return;
    }

    const user = State.user;
    const xpProfile = this.calculateXPProfile(user.xp);

    container.innerHTML = `
      <div class="screen evolution-screen fade-in">
        <!-- HEADER -->
        <div class="evolution-header glass">
          <h2>Evolución</h2>
          <button class="btn-icon" onclick="EvolutionScreen.refresh()">
            <i class="ti ti-refresh"></i>
          </button>
        </div>

        <!-- CONTENT -->
        <div class="evolution-content">
          <!-- LEVEL CARD -->
          <div class="level-card glass">
            <div class="level-display">
              <div class="level-number">${user.level}</div>
              <div class="level-label">Nivel</div>
            </div>
            <div class="level-info">
              <div class="rank-name">${this.getRankName(user.level)}</div>
              <div class="xp-progress-container">
                <div class="xp-progress-bar">
                  <div class="xp-progress-fill" style="width: ${xpProfile.progress_percentage}%"></div>
                </div>
                <div class="xp-text">${xpProfile.xp_in_level} / ${xpProfile.xp_needed_for_next_level} XP</div>
              </div>
            </div>
          </div>

          <!-- ATRIBUTOS -->
          <div class="section">
            <h3 class="section-title">Atributos</h3>
            <div class="attributes-grid">
              <div class="attribute-card glass">
                <div class="attribute-icon" style="color: #ef4444">
                  <i class="ti ti-heart"></i>
                </div>
                <div class="attribute-name">Salud</div>
                <div class="attribute-level">Nivel ${Math.floor(user.level / 3) + 1}</div>
                <div class="attribute-bar">
                  <div class="attribute-fill" style="width: ${(user.level % 3) * 33}%"></div>
                </div>
              </div>

              <div class="attribute-card glass">
                <div class="attribute-icon" style="color: #8b5cf6">
                  <i class="ti ti-brain"></i>
                </div>
                <div class="attribute-name">Disciplina</div>
                <div class="attribute-level">Nivel ${Math.floor(user.level / 2) + 1}</div>
                <div class="attribute-bar">
                  <div class="attribute-fill" style="width: ${(user.level % 2) * 50}%"></div>
                </div>
              </div>

              <div class="attribute-card glass">
                <div class="attribute-icon" style="color: #3b82f6">
                  <i class="ti ti-focus"></i>
                </div>
                <div class="attribute-name">Enfoque</div>
                <div class="attribute-level">Nivel ${Math.floor(user.level / 4) + 1}</div>
                <div class="attribute-bar">
                  <div class="attribute-fill" style="width: ${(user.level % 4) * 25}%"></div>
                </div>
              </div>

              <div class="attribute-card glass">
                <div class="attribute-icon" style="color: #eab308">
                  <i class="ti ti-book"></i>
                </div>
                <div class="attribute-name">Aprendizaje</div>
                <div class="attribute-level">Nivel ${Math.floor(user.level / 5) + 1}</div>
                <div class="attribute-bar">
                  <div class="attribute-fill" style="width: ${(user.level % 5) * 20}%"></div>
                </div>
              </div>

              <div class="attribute-card glass">
                <div class="attribute-icon" style="color: #10b981">
                  <i class="ti ti-wallet"></i>
                </div>
                <div class="attribute-name">Finanzas</div>
                <div class="attribute-level">Nivel ${Math.floor(user.level / 6) + 1}</div>
                <div class="attribute-bar">
                  <div class="attribute-fill" style="width: ${(user.level % 6) * 16}%"></div>
                </div>
              </div>

              <div class="attribute-card glass">
                <div class="attribute-icon" style="color: #f97316">
                  <i class="ti ti-mood-happy"></i>
                </div>
                <div class="attribute-name">Bienestar</div>
                <div class="attribute-level">Nivel ${Math.floor(user.level / 4) + 1}</div>
                <div class="attribute-bar">
                  <div class="attribute-fill" style="width: ${(user.level % 4) * 25}%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- ESTADÍSTICAS -->
          <div class="section">
            <h3 class="section-title">Estadísticas</h3>
            <div class="stats-grid">
              <div class="stat-card glass">
                <div class="stat-icon">🔥</div>
                <div class="stat-value">${user.current_streak || 0}</div>
                <div class="stat-label">Racha actual</div>
              </div>

              <div class="stat-card glass">
                <div class="stat-icon">⭐</div>
                <div class="stat-value">${user.best_streak || 0}</div>
                <div class="stat-label">Mejor racha</div>
              </div>

              <div class="stat-card glass">
                <div class="stat-icon">✓</div>
                <div class="stat-value">${user.habits_completed || 0}</div>
                <div class="stat-label">Hábitos completados</div>
              </div>

              <div class="stat-card glass">
                <div class="stat-icon">📅</div>
                <div class="stat-value">${user.days_active || 1}</div>
                <div class="stat-label">Días activos</div>
              </div>
            </div>
          </div>

          <!-- HISTORIAL XP -->
          <div class="section">
            <h3 class="section-title">Historial XP</h3>
            <div class="xp-history-card glass">
              <div class="xp-history-list" id="xp-history-list">
                <div class="xp-history-item">
                  <div class="xp-history-icon">✓</div>
                  <div class="xp-history-info">
                    <div class="xp-history-name">Hábito completado</div>
                    <div class="xp-history-date">Hoy</div>
                  </div>
                  <div class="xp-history-gain">+10 XP</div>
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
          <button class="nav-btn active" onclick="navigateTo('evolution')">
            <i class="ti ti-chart-line"></i>
            <span>Evolución</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('missions')">
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

    this.loadXPHistory();
  },

  calculateXPProfile(xp) {
    const level = Math.floor(xp / 300) + 1;
    const xpInLevel = xp % 300;
    const xpNeeded = 300;
    const progressPercentage = (xpInLevel / xpNeeded) * 100;

    return {
      level,
      xp_in_level: xpInLevel,
      xp_needed_for_next_level: xpNeeded,
      progress_percentage: progressPercentage
    };
  },

  getRankName(level) {
    const rankIndex = Math.min(Math.floor((level - 1) / 2), 9);
    const ranks = ['Recluta', 'Aprendiz', 'Constante', 'Disciplinado', 'Determinado', 'Enfocado', 'Resiliente', 'Imparable', 'Maestro', 'Ascendido'];
    return ranks[rankIndex];
  },

  async loadXPHistory() {
    try {
      // TODO: Implementar cuando el backend esté listo
      // const history = await apiGetXPHistory();
      // Render historial...
    } catch (error) {
      console.error('Error cargando historial XP:', error);
    }
  },

  refresh() {
    this.render();
    showNotification('Datos actualizados', 'success');
  }
};

window.EvolutionScreen = EvolutionScreen;

/**
 * ========== DIARY SCREEN ==========
 * Pantalla de diario: registro de pensamientos y reflexiones
 */

const DiaryScreen = {

  render() {
    const container = document.getElementById('screen-container');

    if (!State.user) {
      container.innerHTML = '<p>Cargando datos...</p>';
      return;
    }

    container.innerHTML = `
      <div class="screen diary-screen fade-in">
        <!-- HEADER -->
        <div class="diary-header glass">
          <h2>Diario</h2>
          <button class="btn-icon" onclick="DiaryScreen.newEntry()">
            <i class="ti ti-plus"></i>
          </button>
        </div>

        <!-- CONTENT -->
        <div class="diary-content">
          <!-- ENTRADA DEL DÍA -->
          <div class="section">
            <h3 class="section-title">Hoy</h3>
            <div class="entry-card glass">
              <div class="entry-date">${this.formatDate(new Date())}</div>
              <div class="entry-prompt">¿Cómo te sientes hoy?</div>
              <textarea class="entry-input" placeholder="Escribe tus pensamientos..."></textarea>
              <button class="btn btn-primary" onclick="DiaryScreen.saveEntry()">Guardar entrada</button>
            </div>
          </div>

          <!-- ENTRADAS ANTERIORES -->
          <div class="section">
            <h3 class="section-title">Entradas anteriores</h3>
            <div class="entries-list" id="entries-list">
              <div class="empty-state">
                <i class="ti ti-book"></i>
                <p>No hay entradas aún</p>
                <span>Comienza escribiendo tu primera reflexión</span>
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

  formatDate(date) {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${days[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]}`;
  },

  newEntry() {
    showNotification('Nueva entrada', 'info');
  },

  saveEntry() {
    showNotification('Entrada guardada', 'success');
  }
};

window.DiaryScreen = DiaryScreen;

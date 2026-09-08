/**
 * ========== FINANCE SCREEN ==========
 * Pantalla de finanzas: seguimiento de gastos e ingresos
 */

const FinanceScreen = {

  render() {
    const container = document.getElementById('screen-container');

    if (!State.user) {
      container.innerHTML = '<p>Cargando datos...</p>';
      return;
    }

    container.innerHTML = `
      <div class="screen finance-screen fade-in">
        <!-- HEADER -->
        <div class="finance-header glass">
          <h2>Finanzas</h2>
          <button class="btn-icon" onclick="FinanceScreen.refresh()">
            <i class="ti ti-refresh"></i>
          </button>
        </div>

        <!-- CONTENT -->
        <div class="finance-content">
          <!-- BALANCE -->
          <div class="balance-card glass">
            <div class="balance-label">Balance del mes</div>
            <div class="balance-amount">$0.00</div>
            <div class="balance-details">
              <div class="balance-item income">
                <span class="balance-icon">↑</span>
                <span>Ingresos: $0.00</span>
              </div>
              <div class="balance-item expense">
                <span class="balance-icon">↓</span>
                <span>Gastos: $0.00</span>
              </div>
            </div>
          </div>

          <!-- ACCIONES RÁPIDAS -->
          <div class="quick-actions">
            <button class="quick-btn" onclick="FinanceScreen.addTransaction('income')">
              <i class="ti ti-plus"></i>
              <span>Ingreso</span>
            </button>
            <button class="quick-btn" onclick="FinanceScreen.addTransaction('expense')">
              <i class="ti ti-minus"></i>
              <span>Gasto</span>
            </button>
          </div>

          <!-- HISTORIAL -->
          <div class="section">
            <h3 class="section-title">Historial</h3>
            <div class="transactions-list" id="transactions-list">
              <div class="empty-state">
                <i class="ti ti-wallet"></i>
                <p>No hay transacciones aún</p>
                <span>Comienza registrando tus primeros movimientos</span>
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

  addTransaction(type) {
    showNotification('Función próximamente disponible', 'info');
  },

  refresh() {
    this.render();
    showNotification('Datos actualizados', 'success');
  }
};

window.FinanceScreen = FinanceScreen;

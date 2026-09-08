/**
 * ========================================
 * RISE 2.0 - FINANCE SCREEN
 * Pantalla de gestión financiera
 * ========================================
 */

const FinanceScreen = {
  render() {
    const summary = FinanceFeature.getSummary();
    const transactions = FinanceFeature.getTransactions().slice(0, 5);
    
    return `
      <div class="page-enter safe-area-top" style="padding-bottom: env(safe-area-inset-bottom)">
        <!-- Header -->
        <header class="header">
          <div class="header-title">Finanzas</div>
          <button class="btn btn-icon glass" onclick="FinanceScreen.openAddTransaction()">
            <i class="ti ti-plus"></i>
          </button>
        </header>
        
        <!-- Resumen Financiero -->
        <div class="section">
          ${CardComponents.financeSummaryCard(summary)}
        </div>
        
        <!-- Acciones rápidas -->
        <div class="mini-cards-grid">
          <div class="mini-card press-feedback-card" onclick="FinanceScreen.openAddTransaction('expense')">
            <div class="flex items-center gap-2 mb-2">
              <i class="ti ti-arrow-up-right text-danger" style="font-size: 18px"></i>
              <div class="mini-label">Gasto</div>
            </div>
          </div>
          <div class="mini-card press-feedback-card" onclick="FinanceScreen.openAddTransaction('income')">
            <div class="flex items-center gap-2 mb-2">
              <i class="ti ti-arrow-down-left text-success" style="font-size: 18px"></i>
              <div class="mini-label">Ingreso</div>
            </div>
          </div>
        </div>
        
        <!-- Gastos por categoría -->
        <section class="section">
          <div class="section-header">
            <div class="section-title">Gastos por categoría</div>
          </div>
          <div id="categories-chart" class="card-elevated glass">
            ${this.renderCategoriesChart()}
          </div>
        </section>
        
        <!-- Transacciones recientes -->
        <section class="section">
          <div class="section-header">
            <div class="section-title">Transacciones recientes</div>
            <button class="btn btn-ghost" onclick="FinanceScreen.showAllTransactions()">
              Ver todas
            </button>
          </div>
          
          <div id="transactions-container">
            ${transactions.map(t => BaseComponents.financeTransaction(t)).join('')}
          </div>
        </section>
        
        <!-- Objetivos de ahorro -->
        <section class="section">
          <div class="section-header">
            <div class="section-title">Objetivos de ahorro</div>
            <button class="btn btn-ghost" onclick="FinanceScreen.addGoal()">
              <i class="ti ti-plus"></i>
            </button>
          </div>
          
          <div id="goals-container">
            ${FinanceFeature.goals.length > 0 
              ? FinanceFeature.goals.map(g => CardComponents.savingsGoalCard(g)).join('')
              : '<div class="empty-state"><p class="text-secondary text-sm">Sin objetivos aún</p></div>'
            }
          </div>
        </section>
        
        <!-- Navigation Bar -->
        <nav class="navbar safe-area-bottom">
          <button class="nav-btn" data-screen="dashboard" onclick="Router.navigate('dashboard')">
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
          <button class="nav-btn active" data-screen="finance" onclick="Router.navigate('finance')">
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
    FinanceFeature.init();
  },
  
  renderCategoriesChart() {
    const categories = FinanceFeature.getExpensesByCategory();
    
    if (categories.length === 0) {
      return '<p class="text-secondary text-sm text-center padding-lg">Sin gastos registrados</p>';
    }
    
    const total = categories.reduce((sum, c) => sum + c.amount, 0);
    
    return `
      <div class="flex flex-col gap-3">
        ${categories.map(cat => {
          const percentage = Math.round((cat.amount / total) * 100);
          return `
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-primary">${cat.name}</span>
                <span class="text-secondary">${percentage}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
              </div>
              <div class="text-footnote text-tertiary mt-1">${UI.formatCurrency(cat.amount)}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },
  
  openAddTransaction(type = null) {
    const content = `
      <div class="text-headline text-primary mb-4">Nueva transacción</div>
      
      <div class="input-group">
        <label class="input-label">Tipo</label>
        <div class="flex gap-2">
          <button class="btn btn-secondary flex-1 ${type === 'expense' ? 'active' : ''}" onclick="FinanceScreen.selectTransactionType('expense')">
            <i class="ti ti-arrow-up-right"></i> Gasto
          </button>
          <button class="btn btn-secondary flex-1 ${type === 'income' ? 'active' : ''}" onclick="FinanceScreen.selectTransactionType('income')">
            <i class="ti ti-arrow-down-left"></i> Ingreso
          </button>
        </div>
      </div>
      
      <div class="input-group">
        <label class="input-label">Monto</label>
        <input type="number" id="tx-amount" class="input-field" placeholder="$0.00" step="0.01">
      </div>
      
      <div class="input-group">
        <label class="input-label">Categoría</label>
        <select id="tx-category" class="input-field">
          <option value="Comida">🍔 Comida</option>
          <option value="Transporte">🚗 Transporte</option>
          <option value="Servicios">💡 Servicios</option>
          <option value="Entretenimiento">🎬 Entretenimiento</option>
          <option value="Salud">🏥 Salud</option>
          <option value="Compras">🛒 Compras</option>
          <option value="Salario">💰 Salario</option>
          <option value="Inversiones">📈 Inversiones</option>
          <option value="Otros">📦 Otros</option>
        </select>
      </div>
      
      <div class="input-group">
        <label class="input-label">Descripción</label>
        <input type="text" id="tx-description" class="input-field" placeholder="Ej: Supermercado">
      </div>
      
      <button class="btn btn-primary btn-block" onclick="FinanceScreen.saveTransaction('${type || 'expense'}')">
        Guardar transacción
      </button>
    `;
    
    UI.openSheet(content);
    
    // Set default type
    if (type) {
      window.selectedTransactionType = type;
    }
  },
  
  selectTransactionType(type) {
    window.selectedTransactionType = type;
    // Actualizar UI de botones
    const buttons = document.querySelectorAll('.btn-secondary.flex-1');
    buttons.forEach((btn, i) => {
      if ((type === 'expense' && i === 0) || (type === 'income' && i === 1)) {
        btn.style.background = 'var(--accent-bg)';
        btn.style.borderColor = 'var(--accent-border)';
      } else {
        btn.style.background = '';
        btn.style.borderColor = '';
      }
    });
  },
  
  saveTransaction(defaultType) {
    const amount = parseFloat(document.getElementById('tx-amount').value);
    const category = document.getElementById('tx-category').value;
    const description = document.getElementById('tx-description').value;
    const type = window.selectedTransactionType || defaultType;
    
    if (!amount || amount <= 0) {
      UI.toast('Ingresa un monto válido', 'error');
      return;
    }
    
    FinanceFeature.addTransaction({
      type,
      amount,
      category,
      description: description || category,
      icon: this.getCategoryIcon(category),
    });
    
    UI.closeSheet();
    UI.toast('Transacción guardada', 'success');
    
    // Recargar pantalla
    setTimeout(() => Router.navigate('finance'), 300);
  },
  
  getCategoryIcon(category) {
    const icons = {
      'Comida': 'ti-shopping-cart',
      'Transporte': 'ti-gas-station',
      'Servicios': 'ti-wifi',
      'Entretenimiento': 'ti-movie',
      'Salud': 'ti-heart',
      'Compras': 'ti-shopping-bag',
      'Salario': 'ti-cash',
      'Inversiones': 'ti-chart-line',
      'Otros': 'ti-package',
    };
    return icons[category] || 'ti-wallet';
  },
  
  showAllTransactions() {
    Router.navigate('finance');
    UI.toast('Función completa próximamente', 'info');
  },
  
  addGoal() {
    const name = prompt('Nombre del objetivo:');
    if (!name) return;
    
    const target = parseFloat(prompt('Monto objetivo ($):'));
    if (!target || target <= 0) return;
    
    FinanceFeature.createGoal({ name, target });
    UI.toast('Objetivo creado', 'success');
    setTimeout(() => Router.navigate('finance'), 300);
  },
};

window.FinanceScreen = FinanceScreen;

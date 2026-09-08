/**
 * ========== HABITS SCREEN ==========
 * Gestión completa de hábitos (crear, editar, eliminar, completar)
 */

const HabitsScreen = {
  
  editMode: false,
  
  render() {
    const container = document.getElementById('screen-container');
    
    container.innerHTML = `
      <div class="screen habits-screen fade-in">
        <!-- HEADER -->
        <div class="habits-header glass">
          <h2>Mis Hábitos</h2>
          <button class="btn-icon" onclick="HabitsScreen.toggleEditMode()">
            <i class="ti ti-settings"></i>
          </button>
        </div>
        
        <!-- CONTENT -->
        <div class="habits-content">
          <div class="habits-list" id="habits-list"></div>
          
          <div class="habits-actions" id="habits-actions"></div>
        </div>
        
        <!-- NAVBAR -->
        <nav class="navbar glass">
          <button class="nav-btn" onclick="navigateTo('dashboard')">
            <i class="ti ti-home"></i>
            <span>Inicio</span>
          </button>
          <button class="nav-btn active" onclick="navigateTo('habits')">
            <i class="ti ti-circle-check"></i>
            <span>Hábitos</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('missions')">
            <i class="ti ti-target"></i>
            <span>Misiones</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('evolution')">
            <i class="ti ti-chart-line"></i>
            <span>Evolución</span>
          </button>
          <button class="nav-btn" onclick="navigateTo('profile')">
            <i class="ti ti-user"></i>
            <span>Perfil</span>
          </button>
        </nav>
      </div>
    `;
    
    this.loadAndRender();
  },
  
  async loadAndRender() {
    try {
      const habits = await apiGetHabits();
      this.renderHabitsList(habits);
      this.renderActions();
    } catch (error) {
      console.error('Error:', error);
    }
  },
  
  renderHabitsList(habits) {
    const container = document.getElementById('habits-list');
    
    container.innerHTML = habits.map(habit => `
      <div class="habit-row" data-habit-id="${habit.id}">
        <div class="habit-info-group">
          <div class="habit-icon-large" style="color: ${habit.color}">
            <i class="ti ${habit.icon}"></i>
          </div>
          <div class="habit-info-text">
            <div class="habit-row-name">${habit.name}</div>
            <div class="habit-row-meta">${habit.category} · +${habit.xp_reward} XP · 🔥 ${habit.streak}</div>
          </div>
        </div>
        
        <div class="habit-controls">
          ${this.editMode ? `
            <button class="btn-icon-sm" onclick="HabitsScreen.editHabit('${habit.id}')">
              <i class="ti ti-pencil"></i>
            </button>
            <button class="btn-icon-sm danger" onclick="HabitsScreen.deleteHabit('${habit.id}')">
              <i class="ti ti-trash"></i>
            </button>
          ` : `
            <button class="habit-complete-btn" onclick="HabitsScreen.quickComplete('${habit.id}', this)">
              <i class="ti ti-check"></i>
            </button>
          `}
        </div>
      </div>
    `).join('');
  },
  
  renderActions() {
    const container = document.getElementById('habits-actions');
    
    if (this.editMode) {
      container.innerHTML = `
        <div class="actions-row">
          <button class="btn btn-danger btn-block" onclick="HabitsScreen.toggleEditMode()">
            <i class="ti ti-login"></i> Salir
          </button>
          <button class="btn btn-primary btn-block" onclick="HabitsScreen.showCreateHabitForm()">
            <i class="ti ti-plus"></i> Agregar
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <button class="btn btn-secondary btn-block" onclick="HabitsScreen.toggleEditMode()">
          <i class="ti ti-settings"></i> Editar hábitos
        </button>
      `;
    }
  },
  
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.loadAndRender();
  },
  
  async quickComplete(habitId, button) {
    try {
      const result = await apiCompleteHabit(habitId);
      
      Animations.pulse(button);
      Animations.animateXPGain(button, result.xp_earned);
      
      button.classList.add('completed');
      showNotification(`+${result.xp_earned} XP`, 'success');
      
      setTimeout(() => this.loadAndRender(), 500);
    } catch (error) {
      showNotification(error.message, 'error');
    }
  },
  
  showCreateHabitForm() {
    showModal(`
      <div class="modal-header">
        <h3>Crear nuevo hábito</h3>
        <button class="btn-close" onclick="closeModal()">
          <i class="ti ti-x"></i>
        </button>
      </div>
      
      <form onsubmit="HabitsScreen.handleCreateHabit(event)">
        <div class="input-group">
          <label class="input-label">Nombre del hábito</label>
          <input type="text" id="habit-name" class="input-field" placeholder="Ej: Yoga" required />
        </div>
        
        <div class="input-group">
          <label class="input-label">Categoría</label>
          <select id="habit-category" class="input-field">
            <option value="Salud">Salud</option>
            <option value="Aprendizaje">Aprendizaje</option>
            <option value="Productividad">Productividad</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        
        <div class="input-group">
          <label class="input-label">XP por completar</label>
          <input type="number" id="habit-xp" class="input-field" value="10" min="5" max="100" />
        </div>
        
        <button type="submit" class="btn btn-primary btn-block">
          Crear hábito
        </button>
      </form>
    `);
  },
  
  async handleCreateHabit(event) {
    event.preventDefault();
    
    const name = document.getElementById('habit-name').value;
    const category = document.getElementById('habit-category').value;
    const xpReward = parseInt(document.getElementById('habit-xp').value);
    
    try {
      await apiCreateHabit({
        name,
        category,
        xp_reward: xpReward,
        icon: 'ti-star',
        color: '#f97316'
      });
      
      closeModal();
      showNotification('Hábito creado', 'success');
      this.loadAndRender();
    } catch (error) {
      showNotification(error.message, 'error');
    }
  },
  
  async deleteHabit(habitId) {
    if (confirm('¿Eliminar este hábito?')) {
      try {
        await apiDeleteHabit(habitId);
        showNotification('Hábito eliminado', 'success');
        this.loadAndRender();
      } catch (error) {
        showNotification(error.message, 'error');
      }
    }
  },
  
  editHabit(habitId) {
    // Implementar después
    console.log('Editar hábito:', habitId);
  }
};

window.HabitsScreen = HabitsScreen;
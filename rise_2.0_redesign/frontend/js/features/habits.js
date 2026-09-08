/**
 * ========================================
 * RISE 2.0 - HABITS FEATURE
 * Gestión de hábitos con animaciones
 * ========================================
 */

const HabitsFeature = {
  habits: [],
  
  init() {
    this.loadHabits();
  },
  
  loadHabits() {
    const saved = localStorage.getItem(Config.STORAGE_KEYS.HABITS);
    if (saved) {
      this.habits = JSON.parse(saved);
    } else {
      // Hábitos por defecto
      this.habits = [
        { id: '1', name: 'Beber agua', icon: 'ti-glass-water', color: '#3b82f6', xp_reward: 15, completed_today: false },
        { id: '2', name: 'Leer 15 min', icon: 'ti-book', color: '#8b5cf6', xp_reward: 20, completed_today: false },
        { id: '3', name: 'Ejercicio', icon: 'ti-dumbbell', color: '#ef4444', xp_reward: 30, completed_today: false },
        { id: '4', name: 'Meditar', icon: 'ti-brain', color: '#22c55e', xp_reward: 25, completed_today: false },
      ];
      this.saveHabits();
    }
    
    // Resetear completados cada día
    this.checkDailyReset();
  },
  
  checkDailyReset() {
    const lastReset = localStorage.getItem('rise_habits_reset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      this.habits.forEach(h => h.completed_today = false);
      this.saveHabits();
      localStorage.setItem('rise_habits_reset', today);
    }
  },
  
  saveHabits() {
    localStorage.setItem(Config.STORAGE_KEYS.HABITS, JSON.stringify(this.habits));
  },
  
  getHabits() {
    return this.habits;
  },
  
  completeHabit(habitId) {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit || habit.completed_today) return;
    
    // Marcar como completado
    habit.completed_today = true;
    this.saveHabits();
    
    // Haptic feedback
    if (navigator.vibrate && State.settings?.haptics) {
      navigator.vibrate([30, 50, 30]);
    }
    
    // Actualizar XP del usuario
    if (State.user) {
      const newXp = State.user.xp + habit.xp_reward;
      State.updateXP(newXp);
      
      // Verificar level up
      if (newXp >= State.user.xp_needed) {
        this.handleLevelUp();
      }
    }
    
    // Mostrar feedback visual
    this.showCompletionFeedback(habit);
    
    // Actualizar UI
    this.updateHabitUI(habitId);
  },
  
  handleLevelUp() {
    if (State.user) {
      State.updateLevel(State.user.level + 1);
      State.user.xp_in_level = 0;
      State.user.xp_needed = Math.round(State.user.xp_needed * Config.XP.LEVEL_MULTIPLIER);
      
      // Mostrar notificación especial
      UI.toast('¡Nivel completado! 🎉', 'success', 5000);
      
      // Haptic feedback más fuerte
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
      }
    }
  },
  
  showCompletionFeedback(habit) {
    // Crear elemento flotante de XP
    const xpFloat = document.createElement('div');
    xpFloat.className = 'xp-float';
    xpFloat.textContent = `+${habit.xp_reward} XP`;
    
    // Posicionar cerca del botón
    const button = document.querySelector(`[data-habit-id="${habit.id}"] .habit-check`);
    if (button) {
      const rect = button.getBoundingClientRect();
      xpFloat.style.left = `${rect.left + rect.width / 2}px`;
      xpFloat.style.top = `${rect.top}px`;
      
      document.body.appendChild(xpFloat);
      
      // Remover después de la animación
      setTimeout(() => xpFloat.remove(), 800);
    }
  },
  
  updateHabitUI(habitId) {
    const card = document.querySelector(`[data-habit-id="${habitId}"]`);
    const checkBtn = card?.querySelector('.habit-check');
    
    if (card) {
      card.classList.add('completed');
    }
    
    if (checkBtn) {
      checkBtn.classList.add('done');
    }
    
    // Actualizar contador de hábitos
    this.updateHabitsCount();
  },
  
  updateHabitsCount() {
    const countEl = document.getElementById('habits-count');
    if (countEl) {
      const completed = this.habits.filter(h => h.completed_today).length;
      countEl.textContent = `${completed}/${this.habits.length}`;
    }
  },
  
  addHabit(habit) {
    const newHabit = {
      id: Date.now().toString(),
      name: habit.name,
      icon: habit.icon || 'ti-circle-check',
      color: habit.color || 'var(--accent-primary)',
      xp_reward: habit.xp_reward || 20,
      completed_today: false,
    };
    
    this.habits.push(newHabit);
    this.saveHabits();
    
    return newHabit;
  },
  
  removeHabit(habitId) {
    this.habits = this.habits.filter(h => h.id !== habitId);
    this.saveHabits();
  },
  
  renderHabitsList() {
    const container = document.getElementById('habits-container');
    if (!container) return;
    
    container.innerHTML = this.habits.map(habit => 
      BaseComponents.habitCard(habit, habit.completed_today)
    ).join('');
    
    this.updateHabitsCount();
  },
};

window.HabitsFeature = HabitsFeature;

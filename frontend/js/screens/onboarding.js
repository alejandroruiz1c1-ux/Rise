/**
 * ========== ONBOARDING SCREEN ==========
 * Flujo de bienvenida, registro y primeros hábitos
 */

const OnboardingScreen = {
  
  currentStep: 0,
  setupData: {
    username: '',
    email: '',
    password: '',
    language: 'es',
    theme: 'rise',
    initialHabits: [],
    mainGoal: ''
  },
  
  /**
   * Renderizar onboarding
   */
  render() {
    const container = document.getElementById('screen-container');
    
    switch (this.currentStep) {
      case 0:
        return this.renderWelcome(container);
      case 1:
        return this.renderRegister(container);
      case 2:
        return this.renderLanguageTheme(container);
      case 3:
        return this.renderHabitSelection(container);
      case 4:
        return this.renderGoalSetup(container);
      case 5:
        return this.renderVoiceSetup(container);
      default:
        return this.renderWelcome(container);
    }
  },
  
  /**
   * Paso 0: Bienvenida
   */
  renderWelcome(container) {
    container.innerHTML = `
      <div class="screen welcome-screen fade-in">
        <div class="welcome-container">
          <div class="welcome-icon">
            <div class="icon-circle">R</div>
          </div>
          
          <h1 class="welcome-title">Rise</h1>
          <p class="welcome-subtitle">Tu vida es el juego</p>
          
          <p class="welcome-description">
            Desarrolla hábitos, gana XP, sube niveles y construye la mejor versión de ti.
          </p>
          
          <div class="welcome-features">
            <div class="feature">
              <i class="ti ti-flame"></i>
              <span>Gamificación elegante</span>
            </div>
            <div class="feature">
              <i class="ti ti-trending-up"></i>
              <span>Ve tu progreso</span>
            </div>
            <div class="feature">
              <i class="ti ti-brain"></i>
              <span>IA inteligente</span>
            </div>
          </div>
          
          <button class="btn btn-primary btn-block" onclick="OnboardingScreen.nextStep()">
            Comenzar
          </button>
          
          <button class="btn btn-ghost btn-block" onclick="OnboardingScreen.skipToLogin()">
            Ya tengo cuenta
          </button>
        </div>
      </div>
    `;
    
    Animations.fade(container, true);
  },
  
  /**
   * Paso 1: Registro
   */
  renderRegister(container) {
    container.innerHTML = `
      <div class="screen register-screen fade-in">
        <div class="onboarding-header">
          <button class="btn-back" onclick="OnboardingScreen.previousStep()">
            <i class="ti ti-arrow-left"></i>
          </button>
          <h2>Crea tu cuenta</h2>
          <div></div>
        </div>
        
        <div class="onboarding-content">
          <div class="step-indicator">
            <div class="step-dot active"></div>
            <div class="step-dot"></div>
            <div class="step-dot"></div>
            <div class="step-dot"></div>
          </div>
          
          <form onsubmit="return OnboardingScreen.handleRegister(event)">
            <div class="input-group">
              <label class="input-label">Usuario</label>
              <input 
                type="text" 
                id="reg-username"
                placeholder="Tu nombre de usuario"
                class="input-field"
                minlength="3"
                required
              />
            </div>
            
            <div class="input-group">
              <label class="input-label">Email</label>
              <input 
                type="email" 
                id="reg-email"
                placeholder="tu@email.com"
                class="input-field"
                required
              />
            </div>
            
            <div class="input-group">
              <label class="input-label">Contraseña</label>
              <input 
                type="password" 
                id="reg-password"
                placeholder="Mínimo 8 caracteres"
                class="input-field"
                minlength="8"
                required
              />
            </div>
            
            <div id="register-error" class="notification notif-error" style="display: none;"></div>
            
            <button type="submit" class="btn btn-primary btn-block" id="register-btn">
              Crear cuenta
            </button>
          </form>
          
          <div class="form-divider">
            <span>¿Ya tienes cuenta?</span>
          </div>
          
          <button class="btn btn-secondary btn-block" onclick="OnboardingScreen.showLogin()">
            Inicia sesión
          </button>
        </div>
      </div>
    `;
  },
  
  /**
   * Paso 2: Idioma y Tema
   */
  renderLanguageTheme(container) {
    container.innerHTML = `
      <div class="screen preferences-screen fade-in">
        <div class="onboarding-header">
          <button class="btn-back" onclick="OnboardingScreen.previousStep()">
            <i class="ti ti-arrow-left"></i>
          </button>
          <h2>Preferencias</h2>
          <div></div>
        </div>
        
        <div class="onboarding-content">
          <div class="step-indicator">
            <div class="step-dot active"></div>
            <div class="step-dot active"></div>
            <div class="step-dot"></div>
            <div class="step-dot"></div>
          </div>
          
          <h3 class="pref-title">Idioma</h3>
          <div class="language-options">
            <button 
              class="lang-btn active" 
              data-lang="es"
              onclick="OnboardingScreen.setLanguage('es', this)"
            >
              <span class="flag">🇪🇸</span>
              <span>Español</span>
            </button>
            <button 
              class="lang-btn" 
              data-lang="en"
              onclick="OnboardingScreen.setLanguage('en', this)"
            >
              <span class="flag">🇬🇧</span>
              <span>English</span>
            </button>
          </div>
          
          <h3 class="pref-title">Tema visual</h3>
          <div class="theme-options">
            <button 
              class="theme-btn active" 
              data-theme="rise"
              onclick="OnboardingScreen.setThemePreference('rise', this)"
            >
              <div class="theme-preview rise-preview"></div>
              <span>Rise</span>
            </button>
            <button 
              class="theme-btn" 
              data-theme="dark"
              onclick="OnboardingScreen.setThemePreference('dark', this)"
            >
              <div class="theme-preview dark-preview"></div>
              <span>Dark</span>
            </button>
            <button 
              class="theme-btn" 
              data-theme="light"
              onclick="OnboardingScreen.setThemePreference('light', this)"
            >
              <div class="theme-preview light-preview"></div>
              <span>Light</span>
            </button>
          </div>
          
          <button class="btn btn-primary btn-block" onclick="OnboardingScreen.nextStep()">
            Continuar
          </button>
        </div>
      </div>
    `;
  },
  
  /**
   * Paso 3: Selección de hábitos iniciales
   */
  renderHabitSelection(container) {
    const predefinedHabits = [
      {
        id: 'entrenar',
        name: 'Entrenar',
        icon: 'ti-run',
        color: '#22c55e',
        category: 'Salud',
        description: '30+ min de ejercicio'
      },
      {
        id: 'leer',
        name: 'Leer',
        icon: 'ti-book',
        color: '#3b82f6',
        category: 'Aprendizaje',
        description: 'Mínimo 1 página'
      },
      {
        id: 'meditacion',
        name: 'Meditación',
        icon: 'ti-yoga',
        color: '#8b5cf6',
        category: 'Bienestar',
        description: '10+ min de meditación'
      },
      {
        id: 'escribir',
        name: 'Escribir',
        icon: 'ti-pencil',
        color: '#ec4899',
        category: 'Creativo',
        description: 'Reflexión o diario'
      },
      {
        id: 'aprender',
        name: 'Aprender algo',
        icon: 'ti-bulb',
        color: '#f59e0b',
        category: 'Educación',
        description: 'Skill o conocimiento nuevo'
      },
      {
        id: 'dormir',
        name: 'Dormir bien',
        icon: 'ti-moon',
        color: '#14b8a6',
        category: 'Salud',
        description: '7-9 horas de sueño'
      }
    ];
    
    const habitsList = predefinedHabits.map(h => `
      <div class="habit-selection-item" onclick="OnboardingScreen.toggleHabit('${h.id}', this)">
        <div class="habit-select-icon" style="background: ${h.color}20; color: ${h.color}">
          <i class="ti ${h.icon}"></i>
        </div>
        <div class="habit-select-info">
          <div class="habit-select-name">${h.name}</div>
          <div class="habit-select-desc">${h.description}</div>
        </div>
        <div class="habit-select-check">
          <i class="ti ti-check"></i>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = `
      <div class="screen habits-selection-screen fade-in">
        <div class="onboarding-header">
          <button class="btn-back" onclick="OnboardingScreen.previousStep()">
            <i class="ti ti-arrow-left"></i>
          </button>
          <h2>Elige tus hábitos</h2>
          <div></div>
        </div>
        
        <div class="onboarding-content">
          <div class="step-indicator">
            <div class="step-dot active"></div>
            <div class="step-dot active"></div>
            <div class="step-dot active"></div>
            <div class="step-dot"></div>
          </div>
          
          <p class="selection-subtitle">Selecciona los hábitos con los que quieres comenzar</p>
          
          <div class="habits-selection-list">
            ${habitsList}
          </div>
          
          <div class="custom-habit-section">
            <h4>¿Quieres agregar uno personalizado?</h4>
            <div class="input-group">
              <input 
                type="text" 
                id="custom-habit-input"
                placeholder="Ej: Yoga, Fotografía, Aprender italiano..."
                class="input-field"
              />
            </div>
            <button class="btn btn-secondary btn-block" onclick="OnboardingScreen.addCustomHabit()">
              Agregar
            </button>
          </div>
          
          <button class="btn btn-primary btn-block" onclick="OnboardingScreen.nextStep()">
            Continuar con ${this.setupData.initialHabits.length} hábito(s)
          </button>
        </div>
      </div>
    `;
  },
  
  /**
   * Paso 4: Objetivo principal
   */
  renderGoalSetup(container) {
    container.innerHTML = `
      <div class="screen goal-setup-screen fade-in">
        <div class="onboarding-header">
          <button class="btn-back" onclick="OnboardingScreen.previousStep()">
            <i class="ti ti-arrow-left"></i>
          </button>
          <h2>Tu objetivo principal</h2>
          <div></div>
        </div>
        
        <div class="onboarding-content">
          <div class="step-indicator">
            <div class="step-dot active"></div>
            <div class="step-dot active"></div>
            <div class="step-dot active"></div>
            <div class="step-dot active"></div>
          </div>
          
          <p class="goal-subtitle">¿Cuál es tu objetivo principal para los próximos 3 meses?</p>
          
          <div class="goal-options">
            <button class="goal-card" onclick="OnboardingScreen.selectGoal('health')">
              <div class="goal-icon">💪</div>
              <div class="goal-text">
                <div class="goal-title">Mejorar mi salud</div>
                <div class="goal-desc">Ejercicio y nutrición</div>
              </div>
            </button>
            
            <button class="goal-card" onclick="OnboardingScreen.selectGoal('productivity')">
              <div class="goal-icon">⚡</div>
              <div class="goal-text">
                <div class="goal-title">Ser más productivo</div>
                <div class="goal-desc">Organización y hábitos</div>
              </div>
            </button>
            
            <button class="goal-card" onclick="OnboardingScreen.selectGoal('learning')">
              <div class="goal-icon">🧠</div>
              <div class="goal-text">
                <div class="goal-title">Aprender algo nuevo</div>
                <div class="goal-desc">Educación y desarrollo</div>
              </div>
            </button>
            
            <button class="goal-card" onclick="OnboardingScreen.selectGoal('finance')">
              <div class="goal-icon">💰</div>
              <div class="goal-text">
                <div class="goal-title">Mejorar mis finanzas</div>
                <div class="goal-desc">Ahorrar e invertir</div>
              </div>
            </button>
          </div>
          
          <div class="custom-goal-section">
            <input 
              type="text" 
              id="custom-goal-input"
              placeholder="O escribe tu objetivo personalizado..."
              class="input-field"
            />
          </div>
          
          <button class="btn btn-primary btn-block" onclick="OnboardingScreen.nextStep()">
            Continuar
          </button>
        </div>
      </div>
    `;
  },
  
  /**
   * Paso 5: Permisos de voz
   */
  renderVoiceSetup(container) {
    container.innerHTML = `
      <div class="screen voice-setup-screen fade-in">
        <div class="onboarding-header">
          <div></div>
          <h2>Últimos ajustes</h2>
          <div></div>
        </div>
        
        <div class="onboarding-content">
          <div class="voice-setup-icon">
            <i class="ti ti-microphone"></i>
          </div>
          
          <h3>Habilitar grabaciones de voz</h3>
          <p class="voice-description">
            Rise puede guardar notas de voz para tus hábitos y reflexiones.
            Esto es completamente opcional y privado.
          </p>
          
          <div class="voice-benefits">
            <div class="benefit">
              <i class="ti ti-check"></i>
              <span>Notas rápidas sin escribir</span>
            </div>
            <div class="benefit">
              <i class="ti ti-check"></i>
              <span>Reflexiones más personales</span>
            </div>
            <div class="benefit">
              <i class="ti ti-check"></i>
              <span>Análisis con IA (próximamente)</span>
            </div>
          </div>
          
          <div class="toggle-group full-width">
            <label class="toggle-label">Permitir grabaciones de voz</label>
            <input 
              type="checkbox" 
              class="toggle-switch"
              id="voice-permission"
              checked
            />
          </div>
          
          <button class="btn btn-primary btn-block" onclick="OnboardingScreen.completeOnboarding()">
            Empezar con Rise 🚀
          </button>
          
          <button class="btn btn-ghost btn-block" onclick="OnboardingScreen.skipVoice()">
            Saltar
          </button>
        </div>
      </div>
    `;
  },
  
  // ========== MANEJADORES ==========
  
  async handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    this.setupData.username = username;
    this.setupData.email = email;
    this.setupData.password = password;
    
    const result = await Auth.register(username, email, password);
    
    if (result.success) {
      this.nextStep();
    } else {
      document.getElementById('register-error').textContent = result.error;
      document.getElementById('register-error').style.display = 'block';
    }
    
    return false;
  },
  
  toggleHabit(habitId, element) {
    const index = this.setupData.initialHabits.indexOf(habitId);
    
    if (index > -1) {
      this.setupData.initialHabits.splice(index, 1);
      element.classList.remove('selected');
    } else {
      this.setupData.initialHabits.push(habitId);
      element.classList.add('selected');
    }
  },
  
  addCustomHabit() {
    const input = document.getElementById('custom-habit-input');
    const habitName = input.value.trim();
    
    if (habitName) {
      this.setupData.initialHabits.push({
        name: habitName,
        icon: 'ti-star',
        category: 'Otro',
        is_custom: true
      });
      input.value = '';
      this.renderHabitSelection(document.getElementById('screen-container'));
    }
  },
  
  selectGoal(goalType) {
    this.setupData.mainGoal = goalType;
    
    document.querySelectorAll('.goal-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    event.target.closest('.goal-card').classList.add('selected');
  },
  
  setLanguage(lang, button) {
    this.setupData.language = lang;
    State.setLanguage(lang);
    
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
  },
  
  setThemePreference(theme, button) {
    this.setupData.theme = theme;
    State.setTheme(theme);
    
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
  },
  
  nextStep() {
    this.currentStep++;
    this.render();
  },
  
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  },
  
  showLogin() {
    // Mostrar modal de login
    this.renderLoginModal();
  },
  
  skipToLogin() {
    this.renderLoginModal();
  },
  
  renderLoginModal() {
    // Implementar login modal
    console.log('Show login modal');
  },
  
  skipVoice() {
    this.completeOnboarding();
  },
  
  async completeOnboarding() {
    // Crear hábitos iniciales
    for (const habit of this.setupData.initialHabits) {
      if (typeof habit === 'string') {
        // Hábito predeterminado
        // Implementar después
      } else {
        // Hábito personalizado
        await apiCreateHabit({
          name: habit.name,
          icon: habit.icon,
          category: habit.category,
          xp_reward: 10
        });
      }
    }
    
    // Marcar onboarding como completado
    State.user.onboarding_completed = true;
    Storage.setUser(State.user);
    
    // Ir a dashboard
    navigateTo('dashboard');
  }
};

window.OnboardingScreen = OnboardingScreen;
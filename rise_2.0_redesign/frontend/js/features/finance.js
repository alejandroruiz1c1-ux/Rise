/**
 * ========================================
 * RISE 2.0 - FINANCE FEATURE
 * Gestión financiera personal
 * ========================================
 */

const FinanceFeature = {
  transactions: [],
  budgets: [],
  goals: [],
  
  init() {
    this.loadData();
  },
  
  loadData() {
    // Cargar datos desde localStorage
    const savedTransactions = localStorage.getItem('rise_finance_transactions');
    const savedBudgets = localStorage.getItem('rise_finance_budgets');
    const savedGoals = localStorage.getItem('rise_finance_goals');
    
    if (savedTransactions) this.transactions = JSON.parse(savedTransactions);
    if (savedBudgets) this.budgets = JSON.parse(savedBudgets);
    if (savedGoals) this.goals = JSON.parse(savedGoals);
    
    // Datos de ejemplo si está vacío
    if (this.transactions.length === 0) {
      this.transactions = [
        { id: '1', type: 'income', amount: 2500, category: 'Salario', description: 'Pago mensual', date: new Date().toISOString(), icon: 'ti-cash' },
        { id: '2', type: 'expense', amount: 45, category: 'Comida', description: 'Supermercado', date: new Date(Date.now() - 86400000).toISOString(), icon: 'ti-shopping-cart' },
        { id: '3', type: 'expense', amount: 12, category: 'Transporte', description: 'Gasolina', date: new Date(Date.now() - 172800000).toISOString(), icon: 'ti-gas-station' },
        { id: '4', type: 'expense', amount: 80, category: 'Servicios', description: 'Internet', date: new Date(Date.now() - 259200000).toISOString(), icon: 'ti-wifi' },
      ];
      this.saveData();
    }
  },
  
  saveData() {
    localStorage.setItem('rise_finance_transactions', JSON.stringify(this.transactions));
    localStorage.setItem('rise_finance_budgets', JSON.stringify(this.budgets));
    localStorage.setItem('rise_finance_goals', JSON.stringify(this.goals));
  },
  
  // Obtener resumen financiero
  getSummary() {
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      balance: income - expenses,
      income,
      expenses,
      savings: income > 0 ? Math.round((income - expenses) / income * 100) : 0,
    };
  },
  
  // Agregar transacción
  addTransaction(transaction) {
    const newTransaction = {
      id: Date.now().toString(),
      ...transaction,
      date: transaction.date || new Date().toISOString(),
    };
    
    this.transactions.unshift(newTransaction);
    this.saveData();
    
    // XP por registrar gasto (solo gastos, no ingresos)
    if (transaction.type === 'expense' && State.user) {
      State.updateXP(State.user.xp + 5);
      UI.toast('+5 XP por organizar tus finanzas', 'success');
    }
    
    return newTransaction;
  },
  
  // Eliminar transacción
  removeTransaction(id) {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.saveData();
  },
  
  // Obtener transacciones filtradas
  getTransactions(filters = {}) {
    let filtered = [...this.transactions];
    
    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    
    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }
    
    if (filters.startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate));
    }
    
    if (filters.endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate));
    }
    
    return filtered;
  },
  
  // Obtener gastos por categoría
  getExpensesByCategory() {
    const categories = {};
    
    this.transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (!categories[t.category]) {
          categories[t.category] = 0;
        }
        categories[t.category] += t.amount;
      });
    
    return Object.entries(categories)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);
  },
  
  // Crear presupuesto
  createBudget(budget) {
    const newBudget = {
      id: Date.now().toString(),
      spent: 0,
      ...budget,
    };
    
    this.budgets.push(newBudget);
    this.saveData();
    return newBudget;
  },
  
  // Crear objetivo de ahorro
  createGoal(goal) {
    const newGoal = {
      id: Date.now().toString(),
      current: 0,
      ...goal,
    };
    
    this.goals.push(newGoal);
    this.saveData();
    return newGoal;
  },
  
  // Actualizar progreso de objetivo
  updateGoalProgress(goalId, amount) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.current = Math.max(0, goal.current + amount);
      this.saveData();
      
      // Verificar si se completó
      if (goal.current >= goal.target) {
        UI.toast('¡Objetivo completado! 🎉', 'success', 5000);
        if (State.user) {
          State.updateXP(State.user.xp + 100);
        }
      }
    }
  },
};

window.FinanceFeature = FinanceFeature;

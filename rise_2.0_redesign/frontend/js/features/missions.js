const MissionsFeature = {
  missions: [],
  
  init() {
    this.loadMissions();
  },
  
  loadMissions() {
    const saved = localStorage.getItem(Config.STORAGE_KEYS.MISSIONS);
    if (saved) {
      this.missions = JSON.parse(saved);
    } else {
      this.missions = [
        { id: 'm1', title: 'Primeros pasos', type: 'daily', current: 0, target: 4, xp_reward: 100, icon: 'ti-target' },
        { id: 'm2', title: 'Semana productiva', type: 'weekly', current: 0, target: 20, xp_reward: 500, icon: 'ti-calendar-week' },
      ];
      this.saveMissions();
    }
  },
  
  saveMissions() {
    localStorage.setItem(Config.STORAGE_KEYS.MISSIONS, JSON.stringify(this.missions));
  },
  
  updateProgress(missionId, amount = 1) {
    const mission = this.missions.find(m => m.id === missionId);
    if (mission && mission.current < mission.target) {
      mission.current = Math.min(mission.target, mission.current + amount);
      this.saveMissions();
      
      if (mission.current >= mission.target) {
        UI.toast(`¡Misión completada! +${mission.xp_reward} XP`, 'success', 4000);
        if (State.user) State.updateXP(State.user.xp + mission.xp_reward);
      }
    }
  },
  
  getMissions() { return this.missions; },
};
window.MissionsFeature = MissionsFeature;

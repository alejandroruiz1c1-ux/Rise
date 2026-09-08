const XPFeature = {
  calculateLevelXP(level) {
    return Math.round(Config.XP.BASE_LEVEL_XP * Math.pow(Config.XP.LEVEL_MULTIPLIER, level - 1));
  },
  
  getTotalXPForLevel(level) {
    let total = 0;
    for (let i = 1; i < level; i++) {
      total += this.calculateLevelXP(i);
    }
    return total;
  },
  
  getLevelFromXP(totalXP) {
    let level = 1;
    let xpNeeded = this.calculateLevelXP(level);
    let accumulated = 0;
    
    while (accumulated + xpNeeded <= totalXP) {
      accumulated += xpNeeded;
      level++;
      xpNeeded = this.calculateLevelXP(level);
    }
    
    return { level, xpInLevel: totalXP - accumulated, xpNeeded };
  },
};
window.XPFeature = XPFeature;

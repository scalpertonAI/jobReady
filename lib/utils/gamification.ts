/**
 * Gamification Utilities
 * XP calculation, leveling, achievements
 */

/**
 * Calculate level from total XP
 * Level formula: level = floor(sqrt(xp / 100))
 */
export function calculateLevel(totalXP: number): number {
  return Math.floor(Math.sqrt(totalXP / 100)) + 1;
}

/**
 * Calculate XP required for next level
 */
export function getXPForNextLevel(currentLevel: number): number {
  const nextLevel = currentLevel + 1;
  return (nextLevel - 1) ** 2 * 100;
}

/**
 * Calculate XP progress to next level
 */
export function getXPProgress(totalXP: number): {
  current_level: number;
  current_xp: number;
  xp_for_current_level: number;
  xp_for_next_level: number;
  xp_to_next_level: number;
  progress_percentage: number;
} {
  const currentLevel = calculateLevel(totalXP);
  const xpForCurrentLevel = getXPForNextLevel(currentLevel - 1);
  const xpForNextLevel = getXPForNextLevel(currentLevel);
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = Math.round((xpInCurrentLevel / xpNeededForLevel) * 100);

  return {
    current_level: currentLevel,
    current_xp: totalXP,
    xp_for_current_level: xpForCurrentLevel,
    xp_for_next_level: xpForNextLevel,
    xp_to_next_level: xpForNextLevel - totalXP,
    progress_percentage: Math.min(progressPercentage, 100),
  };
}

/**
 * Achievement definitions
 */
export const ACHIEVEMENTS = {
  FIRST_RESUME: {
    type: 'first_resume',
    title: 'First Step',
    description: 'Uploaded your first resume',
    badge_icon: '📄',
    xp_reward: 50,
  },
  FIRST_ANALYSIS: {
    type: 'first_analysis',
    title: 'Job Hunter',
    description: 'Completed your first job match analysis',
    badge_icon: '🎯',
    xp_reward: 100,
  },
  FIRST_PLAN: {
    type: 'first_plan',
    title: 'Planner',
    description: 'Generated your first preparation plan',
    badge_icon: '📚',
    xp_reward: 150,
  },
  WEEK_STREAK: {
    type: '7_day_streak',
    title: 'Week Warrior',
    description: 'Maintained a 7-day learning streak',
    badge_icon: '🔥',
    xp_reward: 200,
  },
  MONTH_STREAK: {
    type: '30_day_streak',
    title: 'Consistency King',
    description: 'Maintained a 30-day learning streak',
    badge_icon: '👑',
    xp_reward: 500,
  },
  FIRST_INTERVIEW: {
    type: 'first_interview',
    title: 'Interview Ready',
    description: 'Completed your first mock interview',
    badge_icon: '🎤',
    xp_reward: 150,
  },
  INTERVIEW_ACE: {
    type: 'interview_ace',
    title: 'Interview Ace',
    description: 'Scored 90%+ on a mock interview',
    badge_icon: '⭐',
    xp_reward: 300,
  },
  TASK_MASTER: {
    type: 'task_master_10',
    title: 'Task Master',
    description: 'Completed 10 learning tasks',
    badge_icon: '✅',
    xp_reward: 200,
  },
  PROJECT_BUILDER: {
    type: 'project_builder',
    title: 'Project Builder',
    description: 'Completed a portfolio project',
    badge_icon: '🚀',
    xp_reward: 250,
  },
  RESUME_OPTIMIZER: {
    type: 'resume_optimizer',
    title: 'Resume Pro',
    description: 'Optimized your resume',
    badge_icon: '✨',
    xp_reward: 100,
  },
  LEVEL_5: {
    type: 'level_5',
    title: 'Rising Star',
    description: 'Reached level 5',
    badge_icon: '🌟',
    xp_reward: 250,
  },
  LEVEL_10: {
    type: 'level_10',
    title: 'Expert',
    description: 'Reached level 10',
    badge_icon: '💎',
    xp_reward: 500,
  },
};

/**
 * Check if user should unlock an achievement
 */
export function checkAchievementUnlock(
  achievementType: string,
  userStats: {
    resumes_count?: number;
    analyses_count?: number;
    plans_count?: number;
    streak_days?: number;
    interviews_count?: number;
    tasks_completed?: number;
    level?: number;
  }
): boolean {
  switch (achievementType) {
    case 'first_resume':
      return (userStats.resumes_count || 0) >= 1;
    case 'first_analysis':
      return (userStats.analyses_count || 0) >= 1;
    case 'first_plan':
      return (userStats.plans_count || 0) >= 1;
    case '7_day_streak':
      return (userStats.streak_days || 0) >= 7;
    case '30_day_streak':
      return (userStats.streak_days || 0) >= 30;
    case 'first_interview':
      return (userStats.interviews_count || 0) >= 1;
    case 'task_master_10':
      return (userStats.tasks_completed || 0) >= 10;
    case 'level_5':
      return (userStats.level || 0) >= 5;
    case 'level_10':
      return (userStats.level || 0) >= 10;
    default:
      return false;
  }
}

/**
 * Calculate streak days
 */
export function calculateStreak(
  lastActivityDate: Date | null,
  today: Date = new Date()
): {
  streak_days: number;
  is_active: boolean;
} {
  if (!lastActivityDate) {
    return { streak_days: 0, is_active: false };
  }

  const lastDate = new Date(lastActivityDate);
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const lastStart = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());

  const daysDiff = Math.floor((todayStart.getTime() - lastStart.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    // Activity today, streak continues
    return { streak_days: 1, is_active: true };
  } else if (daysDiff === 1) {
    // Activity yesterday, can continue streak
    return { streak_days: 1, is_active: true };
  } else {
    // Streak broken
    return { streak_days: 0, is_active: false };
  }
}

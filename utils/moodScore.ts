// Calcule la moyenne des scores d'humeur (1 a 5)
export function calculateMoodAverage(scores: number[]): number {
  if (scores.length === 0) return 0 // cas tableau vide
  const sum = scores.reduce((acc, score) => acc + score, 0)
  return Math.round((sum / scores.length) * 10) / 10
}

// Retourne un label selon le score moyen
export function getMoodLabel(average: number): string {
  if (average === 0) return 'Aucune donnee'
  if (average < 2.5) return 'Difficile'
  if (average < 3.5) return 'Moyen'
  if (average < 4.5) return 'Bien'
  return 'Excellent'
}

// Verifie si la streak est active (entree dans les 24 dernieres heures)
export function isStreakActive(lastEntryDate: Date): boolean {
  const now = new Date()
  const diffMs = now.getTime() - lastEntryDate.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  return diffHours < 24
}

export function getWeeklyTrend(
  scores: number[]
): 'improving' | 'declining' | 'stable' {
  // Regle : moins de 6 scores → 'stable'
  if (scores.length < 6) return 'stable'

  // Prendre les 3 premiers scores
  const firstThree = scores.slice(0, 3)
  const firstAvg = firstThree.reduce((acc, s) => acc + s, 0) / 3

  // Prendre les 3 derniers scores
  const lastThree = scores.slice(-3)
  const lastAvg = lastThree.reduce((acc, s) => acc + s, 0) / 3

  // Calculer la différence
  const difference = lastAvg - firstAvg

  // - difference > 0.5 → 'improving'
  if (difference > 0.5) return 'improving'

  // - difference < -0.5 → 'declining'
  if (difference < -0.5) return 'declining'

  // - sinon → 'stable'
  return 'stable'
}

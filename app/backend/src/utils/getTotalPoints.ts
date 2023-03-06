const getTotalPoints = (homeGoal: number, outGoal: number): number => {
  if (homeGoal > outGoal) { return homeGoal + 3; }
  if (homeGoal === outGoal) { return homeGoal + 1; }
  if (homeGoal < outGoal) { return homeGoal; }

  return homeGoal;
};

export default getTotalPoints;

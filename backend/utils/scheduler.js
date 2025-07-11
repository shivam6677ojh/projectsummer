// Simple interval overlap check
function isOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

// Priority: 1 (Emergency), 2 (Express), 3 (Local)
function comparePriority(a, b) {
  return a.priority - b.priority;
}

// Find available platform or resolve conflict
async function assignPlatform(TrainModel, newTrain, username, platforms = [1,2,3,4,5]) {
  // Convert time to minutes for comparison
  const toMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const nStart = toMinutes(newTrain.arrival);
  const nEnd = toMinutes(newTrain.departure);

  // Check each platform
  for (const platform of platforms) {
    const trains = await TrainModel.find({ platform, username });
    let conflict = null;
    for (const t of trains) {
      const tStart = toMinutes(t.arrival);
      const tEnd = toMinutes(t.departure);
      if (isOverlap(nStart, nEnd, tStart, tEnd)) {
        // Conflict found
        if (comparePriority(newTrain, t) < 0) {
          // New train has higher priority, delay the existing train
          conflict = t;
        } else {
          // Existing train has higher or equal priority
          conflict = 'new';
        }
        break;
      }
    }
    if (!conflict) {
      // No conflict, assign this platform
      return { platform, delayed: null };
    } else if (conflict !== 'new') {
      // Delay the existing train, assign platform to new train
      return { platform, delayed: conflict };
    }
    // else, try next platform
  }
  // No platform available
  return { platform: null, delayed: null };
}

module.exports = { assignPlatform }; 
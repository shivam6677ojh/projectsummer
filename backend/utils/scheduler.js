// class IntervalNode {
//   constructor(interval) {
//     this.interval = interval; 
//     this.max = interval.end;
//     this.left = null;
//     this.right = null;
//   }
// }

// class IntervalTree {
//   constructor() {
//     this.root = null;
//   }
//   insert(interval) {
//     this.root = this._insert(this.root, interval);
//   }
//   _insert(node, interval) {
//     if (!node) return new IntervalNode(interval);
//     if (interval.start < node.interval.start) {
//       node.left = this._insert(node.left, interval);
//     } else {
//       node.right = this._insert(node.right, interval);
//     }
//     node.max = Math.max(node.max, interval.end);
//     return node;
//   }
//   overlaps(interval) {
//     return this._overlaps(this.root, interval);
//   }
//   _overlaps(node, interval) {
//     if (!node) return null;
//     if (node.interval.start < interval.end && interval.start < node.interval.end) {
//       return node.interval;
//     }
//     if (node.left && node.left.max >= interval.start) {
//       return this._overlaps(node.left, interval);
//     }
//     return this._overlaps(node.right, interval);
//   }
// }

// class PriorityQueue {
//   constructor() {
//     this.heap = [];
//   }
//   insert(item) {
//     this.heap.push(item);
//     this._bubbleUp(this.heap.length - 1);
//   }
//   extractMin() {
//     if (this.heap.length === 0) return null;
//     if (this.heap.length === 1) return this.heap.pop();
//     const min = this.heap[0];
//     this.heap[0] = this.heap.pop();
//     this._bubbleDown(0);
//     return min;
//   }
//   _bubbleUp(index) {
//     while (index > 0) {
//       const parent = Math.floor((index - 1) / 2);
//       if (this.heap[parent].priority <= this.heap[index].priority) break;
//       [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
//       index = parent;
//     }
//   }
//   _bubbleDown(index) {
//     const length = this.heap.length;
//     while (true) {
//       let left = 2 * index + 1;
//       let right = 2 * index + 2;
//       let smallest = index;
//       if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
//         smallest = left;
//       }
//       if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
//         smallest = right;
//       }
//       if (smallest === index) break;
//       [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
//       index = smallest;
//     }
//   }
// }


// function toMinutes(t) {
//   const [h, m] = t.split(':').map(Number);
//   return h * 60 + m;
// }


// async function assignPlatform(TrainModel, newTrain, username, platforms = [1,2,3,4,5]) {
//   const nStart = toMinutes(newTrain.arrival);
//   const nEnd = toMinutes(newTrain.departure);

//   const platformTrees = {};
//   const platformTrains = {};
//   for (const platform of platforms) {
//     const trains = await TrainModel.find({ platform, username });
//     platformTrains[platform] = trains;
//     const tree = new IntervalTree();
//     trains.forEach(t => {
//       tree.insert({ start: toMinutes(t.arrival), end: toMinutes(t.departure), train: t });
//     });
//     platformTrees[platform] = tree;
//   }

//   // Try priority-based preemption first
//   let bestSwap = null;
//   for (const platform of platforms) {
//     const overlappingTrains = platformTrains[platform].filter(t => {
//       const tStart = toMinutes(t.arrival);
//       const tEnd = toMinutes(t.departure);
//       return tStart < nEnd && nStart < tEnd;
//     });
//     if (overlappingTrains.length === 0) continue;

//     // Determine the lowest-priority existing train (highest numeric value)
//     let lowestPriorityTrain = overlappingTrains[0];
//     for (const t of overlappingTrains) {
//       if (t.priority > lowestPriorityTrain.priority) {
//         lowestPriorityTrain = t;
//       }
//     }

//     // Preempt only if the new train has strictly higher priority (lower number)
//     if (typeof newTrain.priority === 'number' && newTrain.priority < lowestPriorityTrain.priority) {
//       // After delaying the lowest-priority train, ensure no other overlaps remain
//       const remainingOverlaps = overlappingTrains.filter(t => t.id !== lowestPriorityTrain.id);
//       if (remainingOverlaps.length === 0) {
//         // Prefer the platform where the priority gap is largest
//         const priorityGap = lowestPriorityTrain.priority - newTrain.priority;
//         if (!bestSwap || priorityGap > (bestSwap.priorityGap || -Infinity)) {
//           bestSwap = {
//             platform,
//             delayed: lowestPriorityTrain,
//             inconvenienceMsg: 'Existing train delayed for higher priority train.',
//             priorityGap
//           };
//         }
//       }
//     }
//   }
//   if (bestSwap) {
//     return { platform: bestSwap.platform, delayed: bestSwap.delayed, inconvenienceMsg: bestSwap.inconvenienceMsg };
//   }

//   // If no preemption, assign a free platform
//   for (const platform of platforms) {
//     const overlap = platformTrees[platform].overlaps({ start: nStart, end: nEnd });
//     if (!overlap) {
//       return { platform, delayed: null, inconvenienceMsg: null };
//     }
//   }

//   return { platform: null, delayed: null, inconvenienceMsg: "No platform available for this time slot. Sorry for the inconvenience." };
// }

// module.exports = { assignPlatform }; 
// scheduler.js

// ===================== Interval Tree =====================
class IntervalNode {
  constructor(interval) {
    this.interval = interval;          // { start, end, train }
    this.max = interval.end;           // max end in this subtree
    this.left = null;
    this.right = null;
  }
}

class IntervalTree {
  constructor() {
    this.root = null;
  }

  insert(interval) {
    this.root = this._insert(this.root, interval);
  }

  _insert(node, interval) {
    if (!node) return new IntervalNode(interval);

    if (interval.start < node.interval.start) {
      node.left = this._insert(node.left, interval);
    } else {
      node.right = this._insert(node.right, interval);
    }

    node.max = Math.max(node.max, interval.end);
    return node;
  }

  // Returns the first overlap found (or null).
  overlaps(interval) {
    return this._overlaps(this.root, interval);
  }

  _overlaps(node, interval) {
    if (!node) return null;

    if (intervalsOverlap(node.interval, interval)) return node.interval;

    if (node.left && node.left.max > interval.start) {
      // Note: '>' means adjacent end==start is NOT overlap (desired)
      return this._overlaps(node.left, interval);
    }
    return this._overlaps(node.right, interval);
  }
}

// ===================== Helpers =====================

// "HH:MM" -> minutes since midnight
function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// Normalize [start,end] in minutes.
// If you want to support overnight (e.g., 23:30 -> 01:00), set handleOvernight=true
function normalizeInterval(startMin, endMin, handleOvernight = false) {
  if (handleOvernight && endMin <= startMin) {
    endMin += 1440; // push end to next day
  }
  return { start: startMin, end: endMin };
}

// Strict overlap: [a.start, a.end) intersects [b.start, b.end)
// Adjacent touch (end == start) is NOT overlap.
function intervalsOverlap(a, b) {
  return a.start < b.end && b.start < a.end;
}

// Numeric priority (coerce), 1 = highest priority
function asPriority(n) {
  const v = Number(n);
  return Number.isFinite(v) ? v : 9; // default worst if bad input
}

// Safe id getter
function getId(doc) {
  return doc?._id ?? doc?.id;
}

// ===================== Core Logic =====================
/**
 * Assign a platform to a newTrain with priority-based preemption.
 *
 * @param {Model} TrainModel - Mongoose model for trains
 * @param {Object} newTrain  - { arrival: "HH:MM", departure: "HH:MM", priority: 1..9, ... }
 * @param {String} username
 * @param {Number[]} platforms - e.g., [1,2,3,4,5]
 * @param {Object} options
 *   - handleOvernight: boolean (default false)
 *   - applyPreemptionUpdates: boolean (default true) - update DB for delayed trains
 *
 * @returns {Object} { platform, delayed, inconvenienceMsg }
 */
async function assignPlatform(
  TrainModel,
  newTrain,
  username,
  platforms = [1, 2, 3, 4, 5],
  options = {}
) {
  const {
    handleOvernight = false,
    applyPreemptionUpdates = true,
  } = options;

  const nPrio = asPriority(newTrain.priority);
  const nStart = toMinutes(newTrain.arrival);
  const nEnd = toMinutes(newTrain.departure);
  const newInterval = normalizeInterval(nStart, nEnd, handleOvernight);

  // Build per-platform data
  const platformTrees = {};
  const platformTrains = {};

  for (const platform of platforms) {
    const trains = await TrainModel.find({ platform, username }).lean();
    platformTrains[platform] = trains;

    const tree = new IntervalTree();
    for (const t of trains) {
      const s = toMinutes(t.arrival);
      const e = toMinutes(t.departure);
      const interval = normalizeInterval(s, e, handleOvernight);
      tree.insert({ ...interval, train: t });
    }
    platformTrees[platform] = tree;
  }

  // -------- 1) Try multi-preemption (only if ALL overlapping trains are lower priority) --------
  // Collect all viable preemption options, then choose the best using tiebreakers.
  const candidates = [];

  for (const platform of platforms) {
    const trains = platformTrains[platform];

    // Gather overlapping trains on this platform
    const overlapping = [];
    for (const t of trains) {
      const s = toMinutes(t.arrival);
      const e = toMinutes(t.departure);
      const iv = normalizeInterval(s, e, handleOvernight);
      if (intervalsOverlap(iv, newInterval)) {
        overlapping.push(t);
      }
    }

    if (overlapping.length === 0) continue; // nothing to preempt here

    // Check if new train outranks ALL overlapping trains
    const allLower = overlapping.every((t) => nPrio < asPriority(t.priority));
    if (!allLower) continue;

    // Compute priority "gain": sum of (t.priority - new.priority)
    const totalGap = overlapping.reduce(
      (sum, t) => sum + (asPriority(t.priority) - nPrio),
      0
    );

    candidates.push({
      platform,
      overlapping,
      totalGap,
      displacedCount: overlapping.length,
    });
  }

  if (candidates.length > 0) {
    // Sort: max totalGap, then fewer displaced, then lowest platform number
    candidates.sort((a, b) => {
      if (b.totalGap !== a.totalGap) return b.totalGap - a.totalGap;
      if (a.displacedCount !== b.displacedCount) return a.displacedCount - b.displacedCount;
      return a.platform - b.platform;
    });

    const best = candidates[0];

    // Apply DB updates for all displaced trains
    if (applyPreemptionUpdates) {
      const ids = best.overlapping.map((t) => getId(t)).filter(Boolean);
      if (ids.length) {
        await TrainModel.updateMany(
          { _id: { $in: ids } },
          { $set: { platform: null, status: "Delayed" } }
        );
      }
    }

    return {
      platform: best.platform,
      delayed: best.overlapping,
      inconvenienceMsg: best.overlapping.length > 1
        ? "Multiple existing trains delayed for higher-priority train."
        : "Existing train delayed for higher-priority train.",
    };
  }

  // -------- 2) No preemption possible: assign to any free platform --------
  for (const platform of platforms) {
    const tree = platformTrees[platform];
    const overlap = tree.overlaps({ start: newInterval.start, end: newInterval.end, train: null });
    if (!overlap) {
      // Free slot found
      return { platform, delayed: null, inconvenienceMsg: null };
    }
  }

  // -------- 3) Nothing works --------
  return {
    platform: null,
    delayed: null,
    inconvenienceMsg:
      "No platform available for this time slot. Sorry for the inconvenience.",
  };
}

module.exports = {
  assignPlatform,
  // Exported for unit testing / debugging if you want
  _internals: {
    IntervalTree,
    intervalsOverlap,
    toMinutes,
    normalizeInterval,
    asPriority,
  },
};

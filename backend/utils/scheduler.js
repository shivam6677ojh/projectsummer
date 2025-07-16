class IntervalNode {
  constructor(interval) {
    this.interval = interval; 
    this.max = interval.end;
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
  overlaps(interval) {
    return this._overlaps(this.root, interval);
  }
  _overlaps(node, interval) {
    if (!node) return null;
    if (node.interval.start < interval.end && interval.start < node.interval.end) {
      return node.interval;
    }
    if (node.left && node.left.max >= interval.start) {
      return this._overlaps(node.left, interval);
    }
    return this._overlaps(node.right, interval);
  }
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  insert(item) {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }
  _bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].priority <= this.heap[index].priority) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }
  _bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;
      if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }
      if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right;
      }
      if (smallest === index) break;
      [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
      index = smallest;
    }
  }
}


function toMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}


async function assignPlatform(TrainModel, newTrain, username, platforms = [1,2,3,4,5]) {
  const nStart = toMinutes(newTrain.arrival);
  const nEnd = toMinutes(newTrain.departure);

  const platformTrees = {};
  const platformTrains = {};
  for (const platform of platforms) {
    const trains = await TrainModel.find({ platform });
    platformTrains[platform] = trains;
    const tree = new IntervalTree();
    trains.forEach(t => {
      tree.insert({ start: toMinutes(t.arrival), end: toMinutes(t.departure), train: t });
    });
    platformTrees[platform] = tree;
  }


  for (const platform of platforms) {
    const overlap = platformTrees[platform].overlaps({ start: nStart, end: nEnd });
    if (!overlap) {
      return { platform, delayed: null, inconvenienceMsg: null };
    }
  }

  let bestSwap = null;
  for (const platform of platforms) {
    const overlappingTrains = platformTrains[platform].filter(t => {
      const tStart = toMinutes(t.arrival);
      const tEnd = toMinutes(t.departure);
      return tStart < nEnd && nStart < tEnd;
    });
    if (overlappingTrains.length > 0) {
      const pq = new PriorityQueue();
      overlappingTrains.forEach(t => pq.insert({ ...t, priority: t.priority }));
      pq.insert({ ...newTrain, priority: newTrain.priority, isNew: true });
      const minTrain = pq.extractMin();
      if (minTrain.isNew) {
        bestSwap = { platform, delayed: pq.extractMin(), inconvenienceMsg: `Existing train delayed for higher priority train.` };
        break;
      }
    }
  }
  if (bestSwap) {
    return { platform: bestSwap.platform, delayed: bestSwap.delayed, inconvenienceMsg: bestSwap.inconvenienceMsg };
  }

  return { platform: null, delayed: null, inconvenienceMsg: "No platform available for this time slot. Sorry for the inconvenience." };
}

module.exports = { assignPlatform }; 

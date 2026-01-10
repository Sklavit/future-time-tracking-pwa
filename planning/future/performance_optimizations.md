# Performance Optimization Strategies

## Current Performance Profile

### Target Metrics (MVP)
- Initial load: < 2 seconds
- Card flip: Instant (< 100ms)
- Search: < 500ms
- Progress update: < 100ms
- Export: < 1 second (1000 cards)

## Optimization Strategies

### 1. Lazy Loading

#### Code Splitting
- Separate bundle for each route
- Load features on demand
- Only load LLM integration when needed

```javascript
// Load LLM module on demand
const llmModule = await import('./llm.js');
const cards = await llmModule.generateCards(prompt);
```

#### Image Lazy Loading
- Don't load images until visible
- Use IntersectionObserver API
- Reduces initial bundle

```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
    }
  });
});
```

### 2. Caching Strategies

#### Service Worker Caching
- Cache all assets on install
- Cache-first for static assets
- Network-first for data

```javascript
// Cache-first for assets
fetch(event.request)
  .then(response => {
    const cache = caches.open('v1');
    cache.then(c => c.put(event.request, response));
    return response;
  })
  .catch(() => caches.match(event.request));
```

#### localStorage Optimization
- Index frequently accessed data
- Keep sorted for binary search
- Minimize JSON.stringify calls

```javascript
// Cache parsed data in memory
let cardsCache = null;

function getCards() {
  if (!cardsCache) {
    cardsCache = JSON.parse(localStorage.getItem('cards'));
  }
  return cardsCache;
}

function updateCards(cards) {
  cardsCache = cards;
  localStorage.setItem('cards', JSON.stringify(cards));
}
```

### 3. Memory Optimization

#### Virtualization (Large Decks)
Only render visible cards:

```javascript
// Render only 10 visible + 5 buffer cards
const visibleRange = calculateVisible(scrollTop, containerHeight);
const renderStart = Math.max(0, visibleRange.start - 5);
const renderEnd = Math.min(cards.length, visibleRange.end + 5);
const visibleCards = cards.slice(renderStart, renderEnd);
```

#### Object Pooling
Reuse objects instead of creating new ones:

```javascript
// Pool for progress objects to reduce GC
const progressPool = [];

function createProgress(cardId) {
  let obj = progressPool.pop();
  if (!obj) {
    obj = {};
  }
  obj.cardId = cardId;
  obj.interval = 1;
  // ... other fields
  return obj;
}
```

### 4. Computation Optimization

#### Memoization
Cache expensive calculations:

```javascript
// Memoize due card calculation
const dueDeck = new Map();

function getDueCards(deckId) {
  if (dueDeck.has(deckId)) {
    return dueDeck.get(deckId);
  }
  const due = cards
    .filter(c => c.deckId === deckId && progress[c.id]?.nextReview <= now);
  dueDeck.set(deckId, due);
  return due;
}

// Invalidate cache on review
function reviewCard(cardId) {
  // ... update progress
  dueDeck.clear(); // Invalidate all caches
}
```

#### Web Workers
Offload heavy computation:

```javascript
// Main thread
const worker = new Worker('spaced-repetition.worker.js');
worker.postMessage({ cardId, quality });
worker.onmessage = (e) => {
  const newProgress = e.data;
  updateProgress(newProgress);
};

// In worker
self.onmessage = (e) => {
  const newProgress = calculateSM2(e.data);
  self.postMessage(newProgress);
};
```

### 5. Network Optimization

#### Bundle Minification
- Minify JavaScript
- Remove dead code
- Compress assets

#### Request Batching
For LLM calls (when online):

```javascript
// Batch multiple card generation requests
const queue = [];

function generateCard(prompt) {
  queue.push(prompt);
  setTimeout(processBatch, 1000); // Batch every second
}

function processBatch() {
  if (queue.length === 0) return;

  // Send all at once
  fetch('/api/generate-cards', {
    method: 'POST',
    body: JSON.stringify({ prompts: queue })
  })
  .then(res => res.json())
  .then(cards => {
    // Update UI
  });

  queue.length = 0;
}
```

### 6. DOM Optimization

#### Event Delegation
Use single listener for multiple elements:

```javascript
// Instead of listeners on each button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('quality-btn')) {
    const quality = parseInt(e.target.dataset.quality);
    reviewCard(quality);
  }
});
```

#### Batch DOM Updates
```javascript
// Use DocumentFragment to minimize reflows
const fragment = document.createDocumentFragment();
cards.forEach(card => {
  const el = createCardElement(card);
  fragment.appendChild(el);
});
container.appendChild(fragment); // Single reflow
```

#### Debounce/Throttle
```javascript
// Debounce expensive operations
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const handleResize = debounce(() => {
  calculateLayout();
}, 300);
window.addEventListener('resize', handleResize);
```

### 7. Browser APIs

#### requestAnimationFrame
Smooth animations at 60fps:

```javascript
// Instead of setInterval for updates
function animateProgress(from, to) {
  const start = performance.now();
  const duration = 500;

  function update(now) {
    const progress = (now - start) / duration;
    const current = from + (to - from) * progress;
    updateUI(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
```

#### IntersectionObserver
Detect visibility for lazy loading:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadCardContent(entry.target);
      observer.unobserve(entry.target);
    }
  });
});
```

## Monitoring & Metrics

### Performance Monitoring
```javascript
// Measure key operations
const metrics = {
  cardFlip: performance.measure('cardFlip'),
  cardReview: performance.measure('cardReview'),
  dataLoad: performance.measure('dataLoad'),
  export: performance.measure('export'),
};

// Log to console in development
if (process.env.NODE_ENV === 'development') {
  console.table(metrics);
}
```

### Memory Profiling
```javascript
// Monitor memory usage
function getMemoryUsage() {
  if (performance.memory) {
    return {
      used: performance.memory.usedJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit,
      percentage: (performance.memory.usedJSHeapSize /
                  performance.memory.jsHeapSizeLimit * 100).toFixed(2)
    };
  }
}
```

## Scalability Targets

### Small Deck (< 100 cards)
- All operations instant
- No optimization needed
- Current approach sufficient

### Medium Deck (100-1000 cards)
- Implement memoization
- Add basic virtualization
- Current approach with caching

### Large Deck (1000-10000 cards)
- Implement IndexedDB
- Full virtualization
- Web Workers for calculations
- Advanced caching strategies

### Very Large Deck (10000+ cards)
- Consider database (SQLite WASM)
- Segmented decks
- Progressive loading
- Consider architecture change

## Testing Performance

### Lighthouse Audits
- Run regularly
- Target: 90+ score
- Monitor improvements

### Load Testing
- Simulate 10000 cards
- Measure load time
- Measure review time
- Identify bottlenecks

### Real User Monitoring
- Collect performance data
- Analyze patterns
- Identify problem areas

## Priority Order

1. **First**: Memoization (easy, big impact)
2. **Second**: Virtualization (medium effort, helps scaling)
3. **Third**: IndexedDB (complex, future need)
4. **Fourth**: Web Workers (complex, high load)
5. **Fifth**: Advanced strategies (diminishing returns)

## Conclusion

Start simple, optimize based on data:
- MVP: Basic localStorage, no optimization
- Post-MVP: Add monitoring and memoization
- Scaling: Add virtualization and IndexedDB
- Advanced: Web Workers and advanced techniques

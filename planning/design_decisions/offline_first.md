# Offline-First Architecture

## Decision: True Offline-First App

The app works completely offline. No network required after initial load.

## Architecture Principles

### 1. Client-Side Only Operations
All core features work offline:
- ✓ View cards
- ✓ Review cards
- ✓ Track progress
- ✓ Create/edit cards
- ✓ Export data
- ✓ Manage decks

### 2. No Required Backend
No server-side functionality:
- ✗ No authentication server
- ✗ No data sync service
- ✗ No cloud storage
- ✗ No analytics backend

### 3. Local Storage Only
Data persists in browser:
- localStorage for current data
- IndexedDB for large datasets (future)
- No cloud sync (until optional)

## Implementation Strategy

### Service Worker Caching

**Install Event:**
```javascript
// Cache essential files on first load
caches.open('app-v1').then(cache => {
  cache.addAll([
    '/',
    '/index.html',
    '/script.js',
    '/style.css',
    '/manifest.json'
  ]);
});
```

**Fetch Event:**
```javascript
// Serve from cache, fall back to network
fetch(event.request)
  .then(response => {
    // Cache successful responses
    return response;
  })
  .catch(() => {
    // Return cached version if offline
    return caches.match(event.request);
  });
```

### Offline-Friendly Data Model

All data is:
- **Self-contained**: Complete card + progress data
- **Normalized**: Efficient storage and querying
- **Versioned**: Can handle schema changes
- **Immutable refs**: Cards by ID, not references

### No Sync Complexity

Without sync, we avoid:
- ✗ Merge conflicts
- ✗ Timestamp inconsistencies
- ✗ Network retry logic
- ✗ Partial sync states
- ✗ Offline queue management

## User Workflow

### Connected (Initial Load)
1. User visits app URL
2. Service worker registers
3. Assets cached
4. App shell loads
5. localStorage loads (empty on first visit)
6. Sample deck provided

### Disconnected (Offline)
1. Service worker serves cached shell
2. localStorage data loads
3. All features work normally
4. No network requests attempted
5. User can't access LLM features (optional)

### Reconnected
1. Service worker can check for updates
2. App still works completely
3. Optional: Periodic version checks
4. Optional: Update caches silently

## LLM Integration in Offline-First Design

### Challenge
LLM features require network access (API calls to OpenAI, etc.)

### Solution: Optional Network Feature
- LLM card generation is optional
- App fully functional without LLM
- Clear indication when offline (disable LLM button)
- User's own API key = their network usage

### Implementation
```javascript
// Check if can reach LLM service
navigator.onLine ? enableLLMFeatures() : disableLLMFeatures();

// Listen for online/offline events
window.addEventListener('online', enableLLMFeatures);
window.addEventListener('offline', disableLLMFeatures);
```

## Benefits

### For Users
✓ **Works everywhere**: No network required
✓ **Always fast**: No network latency
✓ **Privacy**: Data stays on device
✓ **Reliable**: Not dependent on servers
✓ **Cheap**: No hosting costs

### For Developers
✓ **Simple**: No backend to maintain
✓ **Scalable**: Infinite users (no server load)
✓ **Deployable**: Works on any CDN
✓ **Debuggable**: All logic client-side
✓ **Portable**: Can run locally

## Offline Limitations

Some features unavailable offline:
- ✗ LLM card generation
- ✗ Cloud sync (if added)
- ✗ Collaborative features (if added)
- ✗ Remote data access (if added)

These are presented as optional, not required.

## Progressive Enhancement

### Core Experience (Offline)
1. View and study cards
2. Track progress
3. Manage decks
4. Edit cards
5. Export data

### Enhanced Experience (Online, Optional)
1. Generate cards with LLM
2. Cloud backup (future)
3. Device sync (future)
4. Sharing (future)

## Service Worker Implementation Details

### Update Strategy
```javascript
// Check for updates periodically
setInterval(() => {
  navigator.serviceWorker.getRegistration().then(reg => {
    if (reg) reg.update();
  });
}, 60000); // Every minute
```

### Cache Busting
Include version in cache name:
```javascript
const CACHE_NAME = 'flashcard-app-v1';
// Increment on changes
const CACHE_NAME = 'flashcard-app-v2'; // New version
```

### Fallback Handling
```javascript
// If offline and no cache
fetch(event.request)
  .catch(() => {
    // Return offline page or empty response
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  });
```

## Testing Offline Mode

### Browser DevTools
1. Open DevTools → Application → Service Workers
2. Check "Offline" checkbox
3. Refresh page
4. Verify all features work

### Network Throttling
1. DevTools → Network
2. Select "Offline" from throttling dropdown
3. Reload page
4. Test functionality

### CI/CD Testing
- [ ] Test with network disabled
- [ ] Test with cache corrupted
- [ ] Test with localStorage cleared
- [ ] Test version updates

## Upgrade to Online-Capable (Future)

If sync needed later:
1. Add sync endpoint
2. Track changes locally
3. Sync when connection available
4. Handle conflicts
5. Maintain offline functionality

But for MVP: Stay truly offline-first.

## Conclusion

Offline-first architecture:
- ✓ Simplifies development
- ✓ Improves reliability
- ✓ Enhances privacy
- ✓ Reduces costs
- ✓ Better user experience
- ✓ Future extensible

Core principle: **Assume no network, handle network as bonus.**

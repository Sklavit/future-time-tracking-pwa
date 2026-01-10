# Storage Strategy: localStorage vs IndexedDB vs Others

## Decision: Primary localStorage with IndexedDB Plan

## Storage Requirements

Per app requirements:
- Cards (questions + answers)
- Card metadata (created, updated, tags, difficulty)
- Progress tracking (intervals, ease factors, review history)
- Deck information (name, description, cards)
- User settings (API keys, preferences)

Expected data sizes:
- Single card: ~500 bytes
- 1000 cards: ~500 KB
- 10000 cards: ~5 MB
- Full progress history: Additional ~100 bytes per review

## Option 1: localStorage (MVP)

### Specification
- Simple key-value storage
- Per-origin limit: 5-10 MB (varies by browser)
- Synchronous API
- Data persists until manually cleared

### Data Structure
```
localStorage.cards        // JSON array of all cards
localStorage.decks        // JSON array of deck metadata
localStorage.progress     // JSON array of progress records
localStorage.settings     // JSON object of user settings
```

### Advantages
✓ Simple implementation
✓ No learning curve
✓ Works on all browsers
✓ Fast for MVP (< 1 MB data)
✓ Easy export/import (already JSON)
✓ No schema migrations needed

### Disadvantages
✗ Hard limit: ~10 MB
✗ Synchronous = potential blocking
✗ Full serialization on every write
✗ No indexing capabilities
✗ Not great for complex queries

### When to Upgrade
- Data grows beyond 5 MB
- Performance degradation noticed
- Need for advanced queries
- Large review history accumulation

## Option 2: IndexedDB (Future)

### Specification
- Object-oriented database
- Per-origin limit: 50 MB+ (varies)
- Asynchronous API (non-blocking)
- Better for large datasets

### Advantages
✓ Large storage capacity (50MB+)
✓ Asynchronous = non-blocking
✓ Indexing for fast queries
✓ Can store complex objects
✓ Better performance at scale
✓ Transactions support

### Disadvantages
✗ More complex implementation
✗ Longer development time
✗ Requires async/await patterns
✗ More difficult migrations
✗ Not needed for MVP

## Option 3: File API (Download/Upload)

### Specification
- User downloads backup files
- User can upload files to restore
- Browser downloads JSON file

### Use Case
- Backup/restore functionality
- Data portability
- Emergency recovery

### Implementation
- Export button: Download cards + progress as JSON
- Import button: Upload JSON to restore
- Optional: Encryption for security

## MVP Storage Plan

### Phase 1: localStorage
```javascript
// All data as JSON strings
localStorage.setItem('cards', JSON.stringify(cardsArray));
localStorage.setItem('progress', JSON.stringify(progressArray));
localStorage.setItem('decks', JSON.stringify(decksArray));
localStorage.setItem('settings', JSON.stringify(settingsObj));
```

### On App Load
```javascript
const cards = JSON.parse(localStorage.getItem('cards')) || [];
const progress = JSON.parse(localStorage.getItem('progress')) || [];
const decks = JSON.parse(localStorage.getItem('decks')) || defaultDecks;
const settings = JSON.parse(localStorage.getItem('settings')) || defaultSettings;
```

### On Every Change
```javascript
localStorage.setItem('cards', JSON.stringify(cards));
// Repeat for progress, decks, settings
```

## Phase 2: IndexedDB (If Needed)

Upgrade path:
1. Create IndexedDB stores for each data type
2. Migrate localStorage data to IndexedDB
3. Update read/write operations
4. Keep localStorage as fallback or remove

### Schema (IndexedDB)
```javascript
// Cards store
const cardStore = db.createObjectStore('cards', { keyPath: 'id' });
cardStore.createIndex('deckId', 'deckId');
cardStore.createIndex('createdAt', 'createdAt');

// Progress store
const progressStore = db.createObjectStore('progress', { keyPath: 'cardId' });
progressStore.createIndex('nextReview', 'nextReview');
progressStore.createIndex('deckId', 'deckId');

// Decks store
const deckStore = db.createObjectStore('decks', { keyPath: 'id' });

// Settings
const settingsStore = db.createObjectStore('settings', { keyPath: 'key' });
```

## Backup/Recovery Strategy

### Automatic Backup
- Optional: Auto-download backup periodically
- Or: Store backup in secondary localStorage key

### Manual Export
- Button to download cards.json + progress.json
- Includes timestamp
- Can be imported later

### Cloud Backup (Future)
- Optional: Sync to cloud service
- Only if user provides credentials
- End-to-end encrypted
- Restore to any device

## Performance Considerations

### localStorage Optimization
- Keep data minimal
- Serialize only on changes
- Avoid deep object copies
- Monitor serialization time

### Limits Monitoring
```javascript
function getStorageUsage() {
  let total = 0;
  for (let key in localStorage) {
    total += localStorage[key].length;
  }
  return total; // bytes
}

if (getStorageUsage() > 4000000) {
  // Warn user, consider cleanup
}
```

## Data Cleanup Strategies

### Periodic Pruning
- Archive completed cards (interval > 60 days)
- Delete old review history (keep last 10)
- Cleanup old decks

### User Controls
- Option to clear review history
- Option to archive old cards
- Bulk export before cleanup

## Security Considerations

### API Keys (LLM Integration)
- Stored in localStorage (user's device)
- User responsible for security
- Show warnings about exposing keys
- Consider encryption at rest (optional)

### User Data
- All data is user's, stored locally
- No telemetry or tracking
- Transparent privacy model

## Conclusion

**For MVP:** Use localStorage
- Simple, fast, sufficient for typical usage
- Easy to export/backup
- Scale to 10,000+ cards comfortably
- Upgrade to IndexedDB if needed later

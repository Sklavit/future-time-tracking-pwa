# Cloud Sync & Data Synchronization Strategies

## Current Approach: No Sync (MVP)

App is completely offline-first with local-only storage.
Sync is optional future feature.

## Why No Sync in MVP?

### Complexity Reduction
- ✓ No backend required
- ✓ No server architecture
- ✓ No conflict resolution
- ✓ No session management
- ✓ Faster development

### User Benefits
- ✓ Complete privacy
- ✓ No data transmission
- ✓ Works offline indefinitely
- ✓ Simple export/import

## Future: Sync Architecture Options

### Option 1: Firebase Realtime Database

#### Characteristics
- Hosted backend solution
- Real-time sync
- Authentication built-in
- Generous free tier

#### Implementation
```javascript
// Sync cards to Firebase
firebase.database().ref('users/' + userId + '/cards')
  .set(cardsData)
  .then(() => console.log('Synced'))
  .catch(err => console.error('Sync failed', err));

// Listen for changes
firebase.database().ref('users/' + userId + '/cards')
  .on('value', snapshot => {
    const remoteData = snapshot.val();
    mergeData(localData, remoteData);
  });
```

#### Pros
- ✓ Minimal backend code
- ✓ Real-time updates
- ✓ Authentication included
- ✓ Scalable

#### Cons
- ✗ Vendor lock-in
- ✗ Data on Google servers
- ✗ Costs at scale
- ✗ Less control

### Option 2: Custom REST API

#### Characteristics
- Backend you control
- Simple HTTP endpoints
- Stateless architecture
- Full flexibility

#### Implementation
```javascript
// GET /api/sync
const { cards, progress, decks } = await fetch(
  '/api/sync?lastSync=' + lastSyncTime
).then(r => r.json());

// POST /api/sync
await fetch('/api/sync', {
  method: 'POST',
  body: JSON.stringify({
    cards: changedCards,
    progress: changedProgress,
    timestamp: now
  })
});
```

#### Pros
- ✓ Full control
- ✓ Privacy options
- ✓ Custom features
- ✓ Self-hosted option

#### Cons
- ✗ Need to build backend
- ✗ DevOps complexity
- ✗ Authentication needed
- ✗ Ongoing maintenance

### Option 3: CRDT-Based Sync (Git-Like)

#### Characteristics
- Distributed sync
- Conflict-free merging
- No central server needed
- P2P possible

#### Libraries
- Automerge
- Yjs
- IPFS
- Holochain

#### Implementation (Simplified)
```javascript
import * as Automerge from 'automerge';

// Create CRDT document
let doc = Automerge.from({ cards: [], progress: [] });

// Make changes
doc = Automerge.change(doc, d => {
  d.cards.push({ id: '1', question: '?' });
});

// Merge with remote version
doc = Automerge.merge(localDoc, remoteDoc);

// Send changes to network
const changes = Automerge.getChanges(baseDoc, doc);
broadcastChanges(changes);
```

#### Pros
- ✓ Conflict resolution automatic
- ✓ P2P possible
- ✓ No central server needed
- ✓ Git-like benefits

#### Cons
- ✗ Complex implementation
- ✗ Larger bundle size
- ✗ Learning curve
- ✗ Not needed for single-user

### Option 4: Simple Cloud Storage (Best for MVP Extension)

#### Characteristics
- Use existing cloud storage
- Minimal code needed
- User provides credentials
- Privacy-friendly

#### Implementation
```javascript
// Google Drive
async function backupToGoogleDrive() {
  const data = {
    cards: JSON.stringify(cards),
    progress: JSON.stringify(progress),
    timestamp: Date.now()
  };

  await gapi.client.drive.files.create({
    name: 'flashcard-backup-' + Date.now() + '.json',
    mimeType: 'application/json',
    body: new Blob([JSON.stringify(data)])
  });
}

// OneDrive, Dropbox similar approach
```

#### Pros
- ✓ No backend needed
- ✓ User controls storage
- ✓ End-to-end encryption easy
- ✓ Multiple provider support

#### Cons
- ✗ Not real-time sync
- ✗ Manual sync
- ✗ Requires user auth
- ✗ Provider dependent

## Recommended Path: Layered Approach

### Phase 1 (MVP): No Sync
- ✓ LocalStorage only
- ✓ Export/Import capability
- ✓ User responsibility for backup

### Phase 2: Manual Backup to Cloud
- ✓ Export button → Google Drive
- ✓ Or Dropbox, OneDrive
- ✓ User controls backup frequency
- ✓ Minimal code

### Phase 3: Optional Sync Service
- ✓ Self-hosted or third-party
- ✓ Users opt-in
- ✓ End-to-end encrypted
- ✓ Multi-device sync

### Phase 4: Advanced
- ✓ Real-time collaboration
- ✓ Sharing decks
- ✓ Community features
- ✓ Full backend ecosystem

## Conflict Resolution Strategies

### Last-Write-Wins
Simple but loses data:
```javascript
// Latest timestamp wins
if (remote.updatedAt > local.updatedAt) {
  local = remote;
} else {
  remote = local;
}
```

### Merge Per-Field
Preserve more data:
```javascript
// Merge field-by-field
const merged = {
  question: local.updatedAt > remote.updatedAt ? local.question : remote.question,
  answer: local.updatedAt > remote.updatedAt ? local.answer : remote.answer,
  // ... etc
};
```

### Three-Way Merge
Most sophisticated:
```javascript
// Merge against common ancestor
const merged = mergeThreeWay(base, local, remote);
// If conflicts, present user choice
```

### CRDT-Based
Automatic, conflict-free:
```javascript
// CRDTs handle merges automatically
const merged = Automerge.merge(localDoc, remoteDoc);
// No conflicts possible
```

## Data Structure for Sync

### Sync Metadata
```javascript
{
  cardId: string,
  lastModified: number,        // Timestamp
  syncVersion: number,         // Version counter
  deviceId: string,            // Which device modified
  operation: 'create' | 'update' | 'delete'
}
```

### Sync Envelope
```javascript
{
  userId: string,
  timestamp: number,
  deviceId: string,
  changes: [
    { type: 'card', op: 'update', id: '123', data: {...} },
    { type: 'progress', op: 'update', id: '456', data: {...} },
    { type: 'card', op: 'delete', id: '789' }
  ]
}
```

## Network Handling

### Offline Queue
```javascript
// Queue changes while offline
const pendingSync = [];

function updateCard(card) {
  cards[card.id] = card;
  pendingSync.push({ type: 'update', card });

  if (navigator.onLine) {
    syncThenClear();
  }
}

window.addEventListener('online', syncThenClear);

async function syncThenClear() {
  await fetch('/api/sync', {
    method: 'POST',
    body: JSON.stringify({ changes: pendingSync })
  });
  pendingSync.length = 0;
}
```

### Retry Logic
```javascript
async function syncWithRetry(changes, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(changes)
      });
      return true;
    } catch (err) {
      if (i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
      }
    }
  }
  return false;
}
```

## Privacy & Security

### End-to-End Encryption
```javascript
// Before sending to cloud
const encrypted = await encryptAES(
  JSON.stringify(userData),
  userKey
);

// After receiving from cloud
const decrypted = await decryptAES(encrypted, userKey);
```

### User Control
- [ ] Users can opt-in to sync
- [ ] Users can delete cloud data
- [ ] Users can revoke access
- [ ] Clear privacy policy

### Zero-Knowledge Architecture
- User key derived from password
- Data encrypted before transmission
- Server never sees plaintext
- Only server-side can sync (no backup)

## Implementation Timeline

### Month 1-3: MVP
- Offline-first app
- Export/import only

### Month 4-6: Manual Backup
- Cloud storage integration
- Export to Drive/Dropbox

### Month 7-12: Optional Sync
- Self-hosted sync option
- Or Firebase option
- User-initiated sync

### Year 2+: Advanced
- Real-time collaboration
- Community features
- Advanced sharing

## Conclusion

For MVP: **Stay local-only**
- Privacy preserved
- No backend complexity
- Simple export/import
- Upgrade path clear

When ready: **Add optional sync**
- Start with manual backup
- Add real-time when needed
- Users control their data

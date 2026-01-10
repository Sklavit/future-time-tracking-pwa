# Flashcard Spaced Repetition PWA - Technical Documentation

## Project Overview

This is a Progressive Web App (PWA) for learning with textual flashcards using an efficient spaced repetition algorithm (SM-2). The app allows users to create and manage decks of cards, track learning progress, and study with optimal scheduling. Fully offline-capable with optional LLM-powered card generation.

## Planning Directory

The `/planning` directory contains structured documentation for development and decision-making:

### Directory Structure
```
/planning
├── in-progress.md                   # Current sprint tasks and priorities
├── done/                            # Completed features (implementation docs)
├── requests/                        # User stories (what to build)
│   ├── cards.md                     # User story: Create, edit, manage cards
│   ├── spaced_repetition.md         # User story: Smart review scheduling
│   ├── decks.md                     # User story: Organize into decks
│   ├── progress_tracking.md         # User story: View learning progress
│   ├── llm_integration.md           # User story: AI card generation
│   └── ui_layout.md                 # User story: Clean, minimal interface
├── todo/                            # Technical tasks (how to build)
│   ├── cards.md                     # Task: Implement card CRUD
│   ├── spaced_repetition.md         # Task: Implement SM-2 algorithm
│   ├── decks.md                     # Task: Implement deck management
│   ├── progress_tracking.md         # Task: Implement statistics tracking
│   ├── llm_integration.md           # Task: Implement LLM integration
│   └── ui_layout.md                 # Task: Build user interface
├── design_decisions/                # Architectural decisions
│   ├── spa_vs_pwa.md               # Why PWA approach
│   ├── storage_strategy.md         # localStorage vs IndexedDB
│   ├── algorithm_choice.md         # SM-2 algorithm selection
│   └── offline_first.md            # Offline-first architecture
└── future/                          # Post-MVP enhancements
    ├── advanced_features.md        # Future feature ideas
    ├── performance_optimizations.md # Scaling strategies
    ├── mobile_considerations.md    # Mobile/iOS/Android
    └── sync_strategies.md          # Cloud sync options
```

### Using Planning Documents During Development

**Before Starting Work:**
1. Check `/planning/in-progress.md` for current sprint tasks
2. Review the user story in `/planning/requests/{feature}.md`
3. Review the technical task in `/planning/todo/{feature}.md`
4. Read design decisions in `/planning/design_decisions/` to understand architecture

**When Adding Features:**
1. Read the user story in `/planning/requests/{feature}.md` (what users want)
2. Follow the technical tasks in `/planning/todo/{feature}.md` (how to implement)
3. Ensure implementation matches data structures and function signatures
4. Reference planning docs in code comments when complex
5. When complete, create implementation docs in `/planning/done/`

**When Making Architectural Decisions:**
1. Review `/planning/design_decisions/` for previous rationales
2. Document new decisions if they differ from planning docs
3. Update relevant planning docs if approach changes

**When Encountering Limitations:**
1. Check `/planning/future/` for planned enhancements
2. Evaluate if immediate solution or defer to MVP+
3. Document constraints encountered for future reference

**When Optimizing or Scaling:**
1. Reference `/planning/future/performance_optimizations.md`
2. Follow suggested priority order for improvements
3. Add performance metrics to track improvements

## Current Architecture

### Core Approach

**Offline-First Spaced Repetition Learning**
- Client-side only: All computation and storage on device
- localStorage-based persistence for cards, progress, and decks
- SM-2 algorithm for optimal scheduling
- PWA for offline capability and home-screen installation
- Optional LLM integration for card generation (user's own API key)
- No backend required - fully self-contained

### File Structure

```
/
├── index.html              # Main HTML structure
├── script.js               # Core app logic and SM-2 algorithm
├── style.css               # Styling and responsive layout
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── CLAUDE.md               # This documentation
└── planning/               # Development planning and specs
    ├── in-progress.md      # Current sprint tasks
    ├── done/               # Completed feature documentation
    ├── requests/           # User stories (what to build)
    ├── todo/               # Technical tasks (how to build)
    ├── design_decisions/   # Architecture decisions
    └── future/             # Post-MVP ideas
```

## Implementation Details

### Data Model

**Card Structure:**
```javascript
{
  id: string,              // Unique identifier
  deckId: string,          // Reference to parent deck
  question: string,        // Front of card
  answer: string,          // Back of card
  createdAt: number,       // Creation timestamp (ms)
  updatedAt: number,       // Last modification timestamp (ms)
  tags: string[],          // Optional categorization
  difficulty: string       // 'easy' | 'medium' | 'hard'
}
```

**Progress Tracking Structure:**
```javascript
{
  cardId: string,
  deckId: string,
  interval: number,        // Days until next review
  easeFactor: number,      // SM-2 factor (1.3-2.5)
  repetitions: number,     // Times reviewed successfully
  nextReview: number,      // Unix timestamp of next due date
  lastReview: number,      // Timestamp of last review
  quality: number,         // Quality of last review (0-5)
  reviewHistory: Array     // Historical reviews
}
```

**Deck Structure:**
```javascript
{
  id: string,              // Unique identifier
  name: string,            // User-facing name
  description: string,     // Optional description
  createdAt: number,       // Creation timestamp
  updatedAt: number,       // Last modification
  cardCount: number,       // Number of cards
  color: string,           // Optional visual identifier
  isDefault: boolean       // Default deck?
}
```

**Storage:**
- `localStorage.cards` - Array of all cards (JSON)
- `localStorage.progress` - Array of progress records (JSON)
- `localStorage.decks` - Array of deck metadata (JSON)
- `localStorage.settings` - User settings and preferences (JSON)
- Each array persists across browser sessions
- Can be exported/imported as JSON files

### State Management (script.js)

**Global State Variables:**
- `cards` - Array of all flashcards loaded from localStorage
- `progress` - Object mapping cardId to progress records
- `decks` - Array of deck metadata
- `currentDeckId` - Currently active deck
- `currentCardIndex` - Index of card being reviewed (null when not reviewing)

**Key Functions:**

1. **`calculateSM2(cardProgress, quality)`** - SM-2 Algorithm Implementation
   - Input: Current progress object and quality rating (0-5)
   - Output: Updated progress with new interval and ease factor
   - Implements full SuperMemo 2 algorithm
   - Used for every card review

2. **`getNextDueCard(deckId)`** - Card Selection
   - Filters cards where nextReview <= now
   - Randomly selects from due cards
   - Returns null if no cards due

3. **`reviewCard(cardId, quality)`** - Record Review
   - Calls calculateSM2 with quality rating
   - Updates localStorage with new progress
   - Updates UI with next card
   - Records timestamp of review

4. **`exportData()`** - Data Export
   - Creates JSON file with cards + progress
   - User downloads for backup/analysis
   - Can be imported later to restore state

5. **`importData(jsonFile)`** - Data Import
   - Parses JSON import file
   - Merges or replaces existing data
   - Updates UI after import

See `/planning/requests/` for detailed function specifications.

### User Interface

**Main Screen Layout:**
```
┌─────────────────────────────────────┐
│  Deck Selector    │ ⚙️ Settings      │
├─────────────────────────────────────┤
│  📊 Stats: Due: 5 | Learning: 8      │
├─────────────────────────────────────┤
│                                       │
│      What is the capital of          │
│      France?                          │
│                                       │
│              (Tap to reveal)         │
│                                       │
├─────────────────────────────────────┤
│  [0]  [1]  [2]  [3]  [4]  [5]        │
│   ❌   😕   😑   🤔   😊   😄        │
├─────────────────────────────────────┤
│  Last: 2d ago | Next: 7 days         │
└─────────────────────────────────────┘
```

**Key UI Elements:**
- **Deck Selector**: Switch between named card decks
- **Card Display**: Large, centered card with question visible
- **Flip Animation**: Tap/click to reveal answer
- **Quality Buttons**: 6-point scale (0-5) for rating retention
- **Progress Info**: Shows scheduling and review history
- **Stats Bar**: Due, learning, and mastered card counts

**Design Principles:**
- Minimalist: Remove distractions from learning
- Fast: Instant interactions, smooth animations
- Offline-capable: Works completely without network
- Touch-friendly: Large buttons (44px minimum)
- macOS native feel: Clean typography and spacing

### Styling (style.css)

**Layout Strategy:**
- CSS Grid for responsive layout
- Max-width container (600px) for desktop
- Full width with padding for mobile
- Centered card display
- Bottom navigation for mobile

**Interactive Elements:**
- Hover effects (subtle scale: 1.02x)
- Active/pressed state (0.98x)
- Smooth transitions (200ms)
- Ripple effect on button press
- Color-coded quality buttons (red to green gradient)

## Workflow

### Review Session (Study Cards)

1. User opens app and selects deck
2. App loads cards and progress from localStorage
3. User taps "Study Now" or "Review Due Cards"
4. App finds cards scheduled for today
5. App displays card front (question)
6. User reads and recalls answer
7. User taps to reveal back (answer)
8. User rates retention (0-5 quality scale)
9. App applies SM-2 algorithm:
   - Calculates new interval
   - Updates ease factor
   - Sets next review date
10. App shows next due card
11. Repeat from step 5

### Creating/Editing Cards

1. User clicks "New Card" or "Edit Card"
2. Modal opens with question and answer fields
3. User enters card content
4. User optionally sets tags or difficulty
5. User saves card
6. App generates unique ID
7. App saves to localStorage
8. Card added to current deck

### Switching Decks

1. User clicks deck selector dropdown
2. List shows all available decks
3. User selects different deck
4. App loads deck's cards and progress
5. Card count and stats update
6. User can now study selected deck

### Generating Cards with LLM (Optional, Online)

1. User clicks "Generate Cards"
2. Modal prompts for topic or text
3. User provides input
4. App sends request to LLM service (user's API key)
5. LLM generates card pairs (Q&A)
6. App displays preview of generated cards
7. User can edit before saving
8. User confirms to add to deck
9. Cards saved to localStorage

### Exporting Data

1. User clicks "Export"
2. Browser downloads JSON file with all data
3. File contains: cards, progress, decks, timestamps
4. User can backup or analyze data
5. File can be imported later

### Time Travel (Manual Review on Past Date)

1. User opens date picker
2. User selects past date
3. App filters cards due on that date
4. User reviews cards as if in past
5. App tracks review with past timestamp
6. Progress updates relative to selected date
7. Useful for catching up or adjusting progress

## Technical Considerations

### Data Persistence
- Uses localStorage (5-10MB limit) for MVP
- Stores: cards, progress, decks, settings (all as JSON)
- Data persists across browser sessions and app updates
- Future: Migrate to IndexedDB for datasets > 1000 cards
- Serialization happens only on save (efficient)

### SM-2 Algorithm Accuracy
- Interval calculations use integer days
- Timestamps precise to milliseconds
- Quality ratings: 0-5 scale (integer)
- Ease factor: Floating-point (1.3-2.5 range)
- All calculations deterministic (no randomness in scheduling)
- Random selection only when multiple cards due

### Browser Compatibility
- Requires ES6+ support (modern browsers)
- localStorage API (all modern browsers)
- Service Worker (all modern browsers)
- CSS Grid (modern browsers)
- Date/time APIs (all browsers)
- Works on desktop and mobile

### PWA Features
- Service worker enables offline functionality
- All assets cached on first load
- Can be installed to home screen (macOS, iOS, Android)
- Works completely without network (after initial load)
- App icon and metadata via manifest.json
- Optional: Update cache in background when online

### Storage Scaling
- 100 cards: ~50KB (minimal impact)
- 1000 cards: ~500KB (good performance)
- 10000 cards: ~5MB (approaching limit, consider IndexedDB)
- Review history adds ~100 bytes per review
- Plan data cleanup strategy for large datasets

## Future Enhancement Ideas

See `/planning/future/` for detailed specifications. Key areas:

### MVP Focus
- ✓ Basic card CRUD operations
- ✓ SM-2 spaced repetition
- ✓ Multi-deck support
- ✓ Progress tracking
- ✓ Export/import functionality
- ✓ Offline-first PWA
- ✓ Test deck included

### Advanced Learning Features (Phase 2+)
- Cloze deletion cards
- Multiple choice cards
- Image cards
- Audio cards
- Hierarchical/nested cards
- Study sessions with goals
- Cramming mode
- See `/planning/future/advanced_features.md`

### Analytics & Progress (Phase 2+)
- Learning curves visualization
- Retention rate analysis
- Study streak tracking
- Daily heatmap
- Predictive time to mastery
- Per-card statistics

### LLM Integration (Phase 1-2)
- ✓ Generate cards from prompts
- ✓ Generate cards from pasted text
- ✓ Support multiple LLM providers
- ✓ User manages API keys
- Multi-language support
- See `/planning/features/llm_integration.md`

### Integration & Sharing (Phase 3+)
- Anki deck import/export
- Community deck library
- Shared decks with friends
- Cloud sync (optional)
- See `/planning/future/sync_strategies.md`

### Performance & Scaling (As Needed)
- IndexedDB migration for large datasets
- Web Workers for calculations
- Virtualization for large decks
- See `/planning/future/performance_optimizations.md`

## Development Notes

### Working with Planning Documents

**Planning Directory Organization:**
- `/planning/requests/` = User stories (what users want)
- `/planning/todo/` = Technical tasks (how to implement)
- `/planning/done/` = Completed features (implementation docs)
- `/planning/in-progress.md` = Current sprint priorities
- Files are cross-linked (each requests/*.md links to todo/*.md and vice versa)

**Before Implementing a Feature:**
1. Check `/planning/in-progress.md` for current priorities
2. Read the user story in `/planning/requests/{feature}.md` (understand what users want)
3. Read the technical task in `/planning/todo/{feature}.md` (understand how to build it)
4. Review data structures, function signatures, and testing requirements
5. Note cross-references to related features
6. Reference planning docs in your code comments

**When Implementing Core Logic:**
1. Check `/planning/design_decisions/` for architecture choices
2. SM-2 algorithm: See `/planning/requests/spaced_repetition.md` (user story) + `/planning/todo/spaced_repetition.md` (tasks)
3. Data structures: See `/planning/requests/cards.md` (user story) + `/planning/todo/cards.md` (implementation)
4. Follow the technical tasks in order
5. Keep implementation matching the spec exactly

**When Fixing Bugs:**
1. Determine if bug is in logic or data
2. Verify against user story in `/planning/requests/{feature}.md`
3. Verify against technical task in `/planning/todo/{feature}.md`
4. Update planning docs if spec was incomplete
5. Test fix thoroughly

**When Completing a Feature:**
1. Complete the feature according to `/planning/requests/` (user story) and `/planning/todo/` (technical task) specifications
2. Test thoroughly with all use cases
3. Create implementation documentation in `/planning/done/{feature}.md` describing what was implemented
4. Update `/planning/in-progress.md` to mark feature as complete
5. Note any deviations from original spec and why

**When Starting New Development:**
1. Move feature from `/planning/requests/` into `/planning/in-progress.md`
2. Follow technical tasks from `/planning/todo/{feature}.md`
3. Update acceptance criteria checklist as you progress
4. Cross-reference related features in comments

### Common Development Tasks

**Adding a Card Property:**
1. Update card structure in both `.md` files and code
2. Update storage serialization if needed
3. Update export/import functions
4. Test persistence across page reload

**Modifying SM-2 Algorithm:**
1. Review user story in `/planning/requests/spaced_repetition.md`
2. Review technical task in `/planning/todo/spaced_repetition.md`
3. Document change in code comments with reference to planning
4. Test with various quality ratings (0-5)
5. Verify ease factor stays in 1.3-2.5 range
6. Check interval calculations

**Creating a New Deck:**
1. Reference user story in `/planning/requests/decks.md`
2. Follow tasks in `/planning/todo/decks.md`
3. Generate unique ID
4. Save to localStorage
5. Update UI deck selector
6. Verify against acceptance criteria

**Exporting/Importing Data:**
1. Reference `/planning/requests/cards.md` for user expectations
2. Follow format specs in `/planning/todo/cards.md`
3. Include timestamps for reproducibility
4. Handle missing/extra fields gracefully
5. Test round-trip (export then import)

### Testing Checklist

- [ ] Create new deck
- [ ] Create cards in deck
- [ ] Review cards (various quality ratings)
- [ ] Switch between decks
- [ ] Check progress persistence
- [ ] Refresh page (data still there?)
- [ ] Export data to file
- [ ] Import exported file
- [ ] Delete card (confirm progress deleted)
- [ ] Offline mode works
- [ ] UI responsive on mobile

## Code Quality Notes

**MVP Strengths:**
- Simple, readable code
- Single-page app (no routing complexity)
- No external dependencies (pure vanilla JS)
- Lightweight and fast
- Completely offline-capable
- Deterministic algorithm (SM-2)

**MVP Limitations (by design for simplicity):**
- Minimal input validation (assume valid user input)
- Basic error handling for storage
- Simple UI (no complex interactions)
- Limited accessibility features (can add later)
- No unit tests (can add in phase 2+)

**Code Organization:**
- Global state at top of `script.js`
- Core functions: SM-2 algorithm, card operations, storage
- UI functions: Display updates, user interaction
- Keep functions small and focused
- Add comments only where logic isn't self-evident

**Avoiding Common Pitfalls:**
- Don't add features beyond requirements
- Don't over-engineer (YAGNI principle)
- Don't add validation for impossible scenarios
- Don't create abstractions for one-time code
- Keep it simple: Three similar lines beats premature abstraction

**When to Refactor:**
- Code is duplicated 3+ times
- Function is > 50 lines
- Complex nested logic is hard to follow
- Performance is measurably slow

**When to Keep It Simple:**
- MVP phase (ship features first)
- Experimental code (may delete soon)
- One-time utility functions
- Small isolated modules

## Contact & Maintenance

This documentation should be updated when:
- Architecture changes significantly
- New features are added
- Data model changes
- Breaking changes are introduced

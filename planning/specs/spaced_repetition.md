# Specification: Spaced Repetition (SM-2 Algorithm)

**Status**: Not yet implemented  
**Links**: User Story: `/planning/requests/spaced_repetition.md` | Tasks: `/planning/todo/spaced_repetition.md`

## Overview

SM-2 (SuperMemo 2) algorithm schedules card reviews based on user performance. Core to the learning experience.

## File Structure

```
script.js
├── GLOBAL STATE
│   └── let progress = {};  // Map of cardId → progress object
├── ALGORITHM FUNCTIONS
│   ├── calculateSM2(progressRecord, quality)
│   ├── calculateEaseFactor(currentEase, quality)
│   ├── calculateInterval(prevInterval, ease, quality, reps)
│   └── calculateNextReviewDate(today, intervalDays)
├── REVIEW FUNCTIONS
│   ├── reviewCard(cardId, quality, dateOverride = null)
│   ├── getDueCards(deckId, dateOverride = null)
│   └── getNextDueCard(deckId)
├── STORAGE FUNCTIONS
│   ├── loadProgress()
│   └── saveProgress()
└── UTILITY FUNCTIONS
    ├── initializeProgress(cardId, deckId)
    └── formatProgressForDisplay(progress)
```

## Data Model

### Progress Object
```javascript
{
  cardId: "card-123",
  deckId: "deck-abc",
  interval: 1,                          // Days until next review
  easeFactor: 2.5,                      // 1.3 to 2.5 (ease multiplier)
  repetitions: 0,                       // Successful reviews
  nextReview: 1609459200000,            // Unix timestamp (ms)
  lastReview: null,                     // Unix timestamp or null
  quality: null,                        // 0-5 rating or null
  reviewHistory: [                      // Optional: track history
    { date: 1609459200000, quality: 4, interval: 1, easeFactor: 2.5 }
  ]
}
```

### Storage
- **Key**: `localStorage.progress`
- **Format**: JSON array of progress objects
- **Index**: By cardId for fast lookup
- **Limit**: Scales with card count (~100 bytes per card + history)

## SM-2 Algorithm Implementation

### Key Constants
```javascript
MIN_EASE = 1.3;
MAX_EASE = 2.5;
INITIAL_EASE = 2.5;
INITIAL_INTERVAL = 1; // day
SECOND_INTERVAL = 3;  // days
```

### Main Function: `calculateSM2(progress, quality)`

```javascript
function calculateSM2(progress, quality) {
  // Validate quality (0-5)
  if (quality < 0 || quality > 5) return null;
  
  // Calculate new ease factor
  const newEase = calculateEaseFactor(progress.easeFactor, quality);
  
  // Calculate new interval (days)
  let newInterval;
  if (quality < 3) {
    newInterval = 1;
    newReps = 0;
  } else if (progress.repetitions === 0) {
    newInterval = 1;
    newReps = 1;
  } else if (progress.repetitions === 1) {
    newInterval = 3;
    newReps = 2;
  } else {
    newInterval = Math.round(progress.interval * newEase);
    newReps = progress.repetitions + 1;
  }
  
  // Update progress object
  return {
    ...progress,
    interval: newInterval,
    easeFactor: Math.max(MIN_EASE, Math.min(MAX_EASE, newEase)),
    repetitions: newReps,
    nextReview: Date.now() + (newInterval * 24 * 60 * 60 * 1000),
    lastReview: Date.now(),
    quality: quality,
    reviewHistory: [...(progress.reviewHistory || []), {
      date: Date.now(),
      quality: quality,
      interval: newInterval,
      easeFactor: newEase
    }]
  };
}
```

### Helper: `calculateEaseFactor(currentEase, quality)`
```javascript
// Formula: ease' = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
function calculateEaseFactor(currentEase, quality) {
  const delta = 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
  return currentEase + delta;
}
```

## Key Functions

### `reviewCard(cardId, quality, dateOverride = null)`
- Get progress record for card
- Call calculateSM2(progress, quality)
- Save updated progress to localStorage
- Update card's updatedAt timestamp
- Invalidate cached due cards
- Return: updated progress object

### `getDueCards(deckId, dateOverride = null)`
- Load progress for deck
- Filter where nextReview <= now (or dateOverride)
- Return: array of due card IDs (unsorted)

### `getNextDueCard(deckId)`
- Get all due cards
- Randomly select one
- Return: single card ID or null

### `initializeProgress(cardId, deckId)`
- Create progress object with initial values
- Set nextReview to now (due immediately)
- Save to localStorage
- Return: progress object

## Component Interactions

```
User rates card (quality 0-5)
    ↓
reviewCard(cardId, quality)
    ↓
calculateSM2(progress, quality)  ← Apply algorithm
    ↓
Update localStorage.progress
    ↓
Update card.updatedAt
    ↓
Show next due card or "done for today"
```

## Implementation Notes

- **Integer Intervals**: Use integer days (no fractions)
- **Timestamp Precision**: Milliseconds for accuracy
- **Ease Factor Bounds**: Always clamp to [1.3, 2.5]
- **Initial Due**: New cards due immediately (nextReview = now)
- **Time Travel**: Support dateOverride parameter for past/future reviews
- **Performance**: Cache due cards, invalidate on review

## Related Features

- **Cards**: Progress linked via cardId
- **Progress Tracking**: Display nextReview, interval, easeFactor
- **Decks**: Due cards calculated per deck
- **UI**: Quality buttons (0-5) for rating

## Quality Rating Impact

| Quality | Repetitions Effect | Interval Effect | Ease Factor |
|---------|-------------------|-----------------|-------------|
| 0-2 | Reset to 0 | Reset to 1 day | Decrease |
| 3 | +1 | Same or +1 day | Slight decrease |
| 4 | +1 | Increase | Increase |
| 5 | +1 | Increase more | Increase more |

## Testing Checklist

- [ ] New card initializes with interval=1, ease=2.5
- [ ] Quality 5 increases interval smoothly
- [ ] Quality 0-2 resets interval to 1
- [ ] Ease factor stays in [1.3, 2.5]
- [ ] getDueCards returns correct cards
- [ ] Random selection is truly random
- [ ] Time travel works correctly
- [ ] 10000+ cards calculate efficiently
- [ ] No floating point errors

## Implementation Status

- [ ] Algorithm functions implemented
- [ ] SM-2 formula verified correct
- [ ] Performance tested
- [ ] Time travel working
- [ ] Progress persisted correctly
- [ ] Integration with cards complete

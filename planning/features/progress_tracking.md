# Progress Tracking & Learning Statistics

## Overview
Track individual card performance and aggregate deck-level learning statistics.

## Card Progress Data

```javascript
{
  cardId: string,
  deckId: string,
  interval: number,        // Days until next review
  easeFactor: number,      // SM-2 factor (1.3-2.5)
  repetitions: number,     // Number of times reviewed successfully
  nextReview: number,      // Unix timestamp (ms)
  lastReview: number,      // Unix timestamp of last review
  quality: number,         // Quality of last review (0-5)
  reviewHistory: [         // Array of past reviews
    {
      date: number,        // Review timestamp
      quality: number,     // Rating given (0-5)
      interval: number,    // Interval at that time
      easeFactor: number   // Ease factor at that time
    }
  ]
}
```

## Per-Card Display

When reviewing a card, show:
- Card front (question)
- Reveal answer on demand
- Last reviewed: `X days ago` or "Never"
- Next due: `in X days` or "Due now"
- Total reviews: `N reviews`
- Current ease factor: `1.5`
- Current interval: `7 days`

## Deck-Level Statistics

### Overview Stats
- **Total Cards**: Count of all cards in deck
- **Due Today**: Cards where nextReview <= today
- **Cards Scheduled**: Cards with nextReview > today
- **Never Reviewed**: Cards with lastReview === null
- **Mastered**: Cards with interval >= 30 days

### Learning Progress
- **Learning**: Cards with interval < 7 days
- **Review**: Cards with interval 7-29 days
- **Mastered**: Cards with interval >= 30 days
- **Percentage**: Visual breakdown of above

### Performance Metrics
- **Average Ease Factor**: Mean of all ease factors
- **Average Interval**: Mean of current intervals
- **Repetitions**: Total reviews across all cards
- **Last Studied**: Date of most recent review

## Progress Visualization

### Simple Progress Bars
Per card:
```
Question here...
[████████░░] Interval: 7 days
Reviewed 5 times | Last: 2 days ago
```

### Deck Summary
```
Deck: Spanish Vocabulary
Total: 50 cards | Due: 12 | Learning: 8 | Mastered: 30
Average Interval: 12 days | Last Studied: Today
```

## Time Travel Support

Allow user to:
- Select any past date
- View which cards were due on that date
- Manually review those cards as if in the past
- Update progress with the past timestamp
- Useful for catching up or reviewing history

### Implementation
- Date picker in UI
- Filter cards by due date <= selected date
- When rating, use selected date for calculations
- Update nextReview relative to selected date

## Data Persistence

Progress data stored in localStorage:
- Key: `cardProgress` or similar
- Format: Array of progress records indexed by cardId
- Update on every review
- Backup/restore on page load

## Export/Analysis

Support exporting progress:
- JSON format for external analysis
- Include full history per card
- Include deck summary statistics
- Timestamp for reproducibility

## Reset Mechanics

Options to reset:
- Reset single card (keeps edit history, clears review history)
- Reset deck (clears all progress, keeps cards)
- Archive completed cards (move to "done" state)

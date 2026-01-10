# Technical Task: Implement Progress Tracking

## Overview
Implement progress tracking and statistics display as specified in `/planning/requests/progress_tracking.md`.

## Data Model

### Progress Structure
```javascript
{
  cardId: string,
  deckId: string,
  interval: number,        // Days
  easeFactor: number,      // 1.3-2.5
  repetitions: number,     // Successful reviews
  nextReview: number,      // Unix timestamp
  lastReview: number,      // Unix timestamp
  quality: number,         // 0-5 rating
  reviewHistory: Array     // [{date, quality, interval}]
}
```

## Core Functions

### initializeProgress(cardId, deckId)
- Create progress record for new card
- Initial values: interval=1, easeFactor=2.5, etc.
- Return progress object

### getProgress(cardId) / getProgressForDeck(deckId)
- Load progress from localStorage
- Return single or array
- Handle missing records

### updateProgress(progress, updates)
- Update progress fields
- Validate: interval > 0, easeFactor in 1.3-2.5
- Save to localStorage
- Update card's `updatedAt`

### getDeckStatistics(deckId)
- Count total cards
- Count cards due today
- Count cards in learning (< 7 days)
- Count cards in review (7-29 days)
- Count cards mastered (>= 30 days)
- Calculate average ease factor
- Calculate average interval
- Count total reviews
- Return stats object

### getCardProgress(cardId)
- Get specific card's progress
- Calculate days until due
- Format for display
- Return progress with formatting

## Statistics Calculations

### Status Categories
- **Due**: nextReview <= today
- **Learning**: interval < 7 days
- **Review**: 7 <= interval < 30 days
- **Mastered**: interval >= 30 days

### Aggregates
- Average ease factor: sum / count
- Average interval: sum / count
- Total reviews: sum of all review counts
- Cards studied today: count

## Display Components

### Card Progress Display
- Reviews: "5 reviews"
- Last reviewed: "2 days ago"
- Next due: "in 7 days"
- Current interval: "7 days"
- Ease factor: "2.1"

### Deck Statistics Panel
- Total: "50 cards"
- Due today: "5 cards"
- Learning: "8 cards"
- Review: "20 cards"
- Mastered: "17 cards"

### Progress Bars
- Visual bar showing progress
- Color coded: new, learning, review, mastered
- Percentage display

## Export Functions

### exportProgress(deckId, options)
- Options: {format: 'json'|'csv', includeHistory: boolean}
- Create downloadable file
- Include timestamps
- Format as specified

## Testing Checklist

- [ ] Initialize progress correctly
- [ ] Get statistics for deck
- [ ] Statistics update after review
- [ ] Export works in JSON and CSV
- [ ] Handle 10000+ cards efficiently
- [ ] Calculate interval categories correctly
- [ ] Average calculations accurate
- [ ] Progress persists across sessions

## Related Stories

- User Story: `/planning/requests/progress_tracking.md`
- Task: `/planning/todo/spaced_repetition.md` (calculating intervals)
- Task: `/planning/todo/cards.md` (progress linked to cards)

## Success Criteria

✓ Progress tracked accurately
✓ Statistics calculate correctly
✓ Export works in multiple formats
✓ Display updates after each review
✓ Performance acceptable at scale

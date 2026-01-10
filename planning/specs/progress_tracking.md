# Specification: Progress Tracking & Statistics

**Status**: Not yet implemented  
**Links**: User Story: `/planning/requests/progress_tracking.md` | Tasks: `/planning/todo/progress_tracking.md`

## Overview

Track and display learning progress per card and per deck. Generate statistics and insights.

## File Structure

```
script.js
├── STATISTICS FUNCTIONS
│   ├── getDeckStatistics(deckId)
│   ├── getCardProgress(cardId)
│   ├── getProgressDistribution(deckId)
│   └── calculateLearningRate(deckId, days = 7)
├── DISPLAY FUNCTIONS
│   ├── displayCardProgress(card)
│   ├── displayDeckStats(deckId)
│   ├── displayProgressChart(deckId)
│   └── displayMilestones()
├── EXPORT FUNCTIONS
│   ├── exportProgress(deckId, format = 'json')
│   └── exportProgressCSV(deckId)
└── ANALYTICS FUNCTIONS
    ├── getStreak()
    ├── getReviewCount(deckId, days = 7)
    └── predictMastery(cardId)
```

## Progress Display Elements

### Per-Card Display
```
Last reviewed: 2 days ago
Next review: in 7 days
Reviews: 5
Current interval: 7 days
Ease factor: 2.1
[████████░░] 80% progress
```

### Deck Summary Panel
```
Total: 50 | Due: 5 | Learning: 8 | Mastered: 20
Average ease: 2.15 | Average interval: 12 days
Last studied: Today
```

### Progress Categories
- **New**: Never reviewed (interval = 1, nextReview ≤ now)
- **Learning**: interval < 7 days
- **Review**: 7 ≤ interval < 30 days
- **Mastered**: interval ≥ 30 days

## Key Functions

### `getDeckStatistics(deckId)`
- Get all progress for deck
- Count cards in each category
- Calculate averages
- Return: stats object

### `getCardProgress(cardId)`
- Load progress record
- Calculate "days until due"
- Format for display
- Return: formatted progress object

### `getProgressDistribution(deckId)`
- Categorize all cards
- Return: { new, learning, review, mastered }

### `exportProgress(deckId, format = 'json')`
- Format progress data
- Include timestamps
- Trigger browser download
- Return: success boolean

## Implementation Notes

- **Real-time Updates**: Update stats after each review
- **Caching**: Cache statistics, invalidate on card review
- **Formatting**: "2 days ago" instead of timestamps
- **Performance**: Calculate stats only for current deck
- **Historical**: Keep full review history for analysis

## Related Features

- **Spaced Repetition**: Uses progress data
- **Cards**: Display progress with cards
- **Decks**: Statistics per deck

## Testing Checklist

- [ ] Statistics calculate correctly
- [ ] Card progress displays accurately
- [ ] Export works in JSON and CSV
- [ ] Progress updates after review
- [ ] Category distribution correct
- [ ] Average calculations accurate
- [ ] Performance with 10000+ cards

## Implementation Status

- [ ] Statistics functions
- [ ] Display formatting
- [ ] Export functions
- [ ] Performance optimized

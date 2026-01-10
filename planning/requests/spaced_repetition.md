# Spaced Repetition Algorithm

## Algorithm Choice: SM-2 (SuperMemo 2)

Simple, proven, and efficient algorithm suitable for this application.

## SM-2 Formula

### Interval Calculation
```
If quality >= 3:
  if repetitions == 0:
    interval = 1
  else if repetitions == 1:
    interval = 3
  else:
    interval = previous_interval * easeFactor

If quality < 3:
  repetitions = 0
  interval = 1
```

### Ease Factor Adjustment
```
easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

Constraints:
- Minimum easeFactor: 1.3
- Maximum easeFactor: 2.5
```

## Implementation Details

### Variables per Card Progress
- `interval`: Days until next review
- `easeFactor`: Multiplier for interval growth (1.3-2.5)
- `repetitions`: Number of successful reviews
- `nextReview`: Unix timestamp when card is due
- `lastReview`: Timestamp of last review

### Initial Values
```javascript
interval = 1,
easeFactor = 2.5,
repetitions = 0,
nextReview = Date.now(), // Due immediately
lastReview = null
```

## Review Scheduling

### Due Cards
- Cards where `nextReview <= now` are due
- Sort by due date (oldest first)
- Display in order for optimal learning

### Random Selection
- When due cards exist, randomly select from due cards
- Prevents predictable patterns
- Better learning retention

### Next Review Time
```javascript
nextReviewTime = now + (interval * 24 * 60 * 60 * 1000)
```

## Quality Ratings & Impact

| Rating | Description | Effect |
|--------|-------------|--------|
| 0 | Complete failure | Reset to interval=1 |
| 1 | Incorrect, hard to recall | Reset to interval=1 |
| 2 | Incorrect, easy to recall | Reset to interval=1 |
| 3 | Correct, with difficulty | Increase interval |
| 4 | Correct, some hesitation | Increase interval more |
| 5 | Perfect, instant recall | Increase interval most |

## Considerations

### Time Travel Support
- Manually adjust `nextReview` timestamp
- Allow reviewing cards on past/future dates
- Recalculate progress based on selected date

### Batch Operations
- Update multiple cards at once
- Useful for bulk reviews or resets

### Reset Mechanics
- Allow full reset of a card's progress
- Useful for relearning or correcting errors

## Statistics

Track per-deck:
- Total cards
- Cards due today
- New cards (never reviewed)
- Cards in learning (interval < 7 days)
- Cards in review (interval >= 7 days)
- Average ease factor
- Average interval

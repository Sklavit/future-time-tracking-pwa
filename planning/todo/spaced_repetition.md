# Technical Task: Implement SM-2 Spaced Repetition Algorithm

## Overview
Implement the SM-2 (SuperMemo 2) algorithm to schedule card reviews based on user performance, as specified in `/planning/requests/spaced_repetition.md`.

## Algorithm Implementation

### SM-2 Formula

#### Interval Calculation
```
If quality >= 3:
  if repetitions == 0:
    interval = 1 day
  else if repetitions == 1:
    interval = 3 days
  else:
    interval = round(previous_interval * easeFactor) days

If quality < 3:
  repetitions = 0
  interval = 1 day
```

#### Ease Factor Adjustment
```
easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

Constraints:
- Minimum: 1.3
- Maximum: 2.5
```

## Core Functions

### calculateSM2(progress, quality)
- Apply SM-2 algorithm to progress record
- Input: progress object, quality 0-5
- Output: updated progress object
- Update: interval, easeFactor, repetitions, nextReview

### getDueCards(deckId, dateOverride)
- Find all cards scheduled for review
- Filter: `nextReview <= now`
- Support time travel with dateOverride
- Return: array of due card IDs

### getNextDueCard(deckId)
- Randomly select from due cards
- Prevents predictable study patterns
- Return: single card ID or null

### reviewCard(cardId, quality, dateOverride)
- Record user's performance
- Calculate new schedule
- Update localStorage
- Return: updated progress

## Testing Checklist

- [ ] New card initializes (1 day, ease 2.5)
- [ ] Quality 0-2: reset interval to 1
- [ ] Quality 3-5: increase interval
- [ ] Ease factor stays in 1.3-2.5 range
- [ ] Get due cards returns correct set
- [ ] Random selection is actually random
- [ ] Time travel works
- [ ] Statistics display accurately
- [ ] 10000+ cards performance acceptable

## Related Documentation

- **User Story**: See `/planning/requests/spaced_repetition.md`
- **Task**: See `/planning/todo/cards.md` (card CRUD)
- **Task**: See `/planning/todo/progress_tracking.md` (tracking stats)

## Success Criteria

✓ SM-2 algorithm fully implemented
✓ All calculations mathematically correct
✓ Review dates update as expected
✓ Performance acceptable at scale
✓ No rounding errors in intervals

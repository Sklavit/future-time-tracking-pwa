# User Story: Spaced Repetition Learning

## Overview
As a learner, I want the app to schedule my card reviews intelligently so I study cards at optimal times for long-term retention.

## User Stories

### Smart Review Scheduling
**As a learner, I want cards scheduled based on how well I remember them**
- Cards I struggle with appear sooner
- Cards I know well appear less frequently
- The app learns my learning curve over time
- I can review about 20-30 cards per day comfortably

### See When Cards Are Due
**As a learner, I want to know which cards need review today**
- I can see "5 cards due today" at a glance
- I can distinguish between new cards and review cards
- I get a count of cards in each study stage
- I can see when the next card will be due after today

### Rate How Well I Remember
**As a learner, I want to rate how well I knew each card on a scale**
- 0 = Completely forgot
- 1 = Very hard to recall
- 2 = Hard but I got it
- 3 = Got it with difficulty
- 4 = Got it with some doubt
- 5 = Perfect, instant recall

### Progress Adjustment
**As a learner, I want the algorithm to adapt to my learning**
- Cards I rate 5 appear much less frequently
- Cards I rate 0-2 appear again soon
- The app adjusts the difficulty of each card individually
- My learning pattern improves the algorithm over time

### Time Travel Review
**As a learner, I want to catch up on missed reviews**
- I can select any past date
- I can review cards as if I had reviewed on that date
- I can adjust my progress retroactively
- Useful for catching up after a break

### Statistics and Insights
**As a learner, I want to understand my learning progress**
- I can see my current learning rate
- I can see how many cards I've mastered
- I can see my average interval between reviews
- I can see how my ease factor is changing

## Algorithm Details

The app uses SM-2 (SuperMemo 2) algorithm:
- Simple but effective
- Used by millions of learners
- Proven to maximize retention
- Adjusts to individual learner patterns

## Related Documentation

- **Technical Implementation**: See `/planning/todo/spaced_repetition.md` for algorithm details
- **Related Stories**: See `/planning/requests/progress_tracking.md` (viewing progress)
- **Related Stories**: See `/planning/requests/cards.md` (rating cards affects scheduling)

## Acceptance Criteria

✓ Cards due today show correctly
✓ Review dates update when I rate cards
✓ Algorithm adapts to my ratings
✓ Time travel function works for past dates
✓ Statistics display accurately
✓ No cards appear more than once per day (unless I choose)
✓ Spacing works correctly for 100+ days ahead

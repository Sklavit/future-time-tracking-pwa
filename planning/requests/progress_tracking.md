# User Story: Track Learning Progress

## Overview
As a learner, I want to see my learning progress and statistics so I can understand how well I'm learning and stay motivated.

## User Stories

### View Card Progress
**As a learner, I want to see progress for each card**
- I can see how many times I've reviewed this card
- I can see my average rating for this card
- I can see my current interval (how long until next review)
- I can see when I last reviewed it
- I can see when it's due next

### View Deck Statistics
**As a learner, I want deck-level statistics**
- I can see total cards in the deck
- I can see cards due today count
- I can see cards in learning (short intervals)
- I can see cards in review (longer intervals)
- I can see cards mastered (30+ day intervals)
- I can see my average learning speed

### See Progress Visually
**As a learner, I want visual indicators of my progress**
- Progress bars showing learning stage
- Color-coded buttons (red for new, orange for learning, green for review, blue for mastered)
- Pie charts or graphs of deck composition
- Learning streak indicator

### Export My Progress
**As a learner, I want to download my learning data**
- I can export all my cards and progress as JSON
- I can export statistics as CSV for analysis
- I can use this data with other tools
- The export includes timestamps for accuracy

### See Learning Trends
**As a learner, I want to understand my learning patterns**
- I can see which cards I struggle with
- I can see which cards I've mastered
- I can see my learning rate over time
- I can see my average ease factor changing

## Related Documentation

- **Technical Implementation**: See `/planning/todo/progress_tracking.md` for how to build this
- **Related Stories**: See `/planning/requests/spaced_repetition.md` (how scheduling works)
- **Related Stories**: See `/planning/requests/cards.md` (reviewing cards creates progress)

## Acceptance Criteria

✓ Card progress displays accurately
✓ Deck statistics calculate correctly
✓ Visual indicators match card status
✓ Export works in multiple formats
✓ Progress persists across sessions
✓ Statistics update after each review
✓ Large datasets (10000+ cards) calculate efficiently

# User Story: Flashcard Management

## Overview
As a learner, I want to create, edit, and manage flashcards efficiently so I can build and maintain my study materials.

## User Stories

### Create Cards
**As a learner, I want to quickly create new flashcards**
- I can add a question and answer in a simple form
- I can optionally add tags to organize related cards
- I can set initial difficulty (easy/medium/hard)
- The card is saved automatically to my device
- I get visual confirmation when the card is saved

### View Cards
**As a learner, I want cards displayed clearly for study**
- The question is shown prominently and clearly
- I can tap/click to reveal the answer
- I can see when I last reviewed this card
- I can see when this card is next due for review
- The layout is distraction-free and minimalist

### Edit Cards
**As a learner, I want to fix and improve my cards**
- I can edit the question and answer text
- I can update tags and difficulty rating
- My review history is preserved when I edit
- I get confirmation when changes are saved

### Delete Cards
**As a learner, I want to remove cards I no longer need**
- I can delete individual cards
- I get a confirmation before deletion
- I have the option to archive instead of delete
- Related progress data is handled properly

### Rate Cards During Review
**As a learner, I want to rate how well I knew each card**
- I can rate from 0-5 scale (Forgot → Perfect)
- The rating affects when I'll see the card next
- Visual indicators show the rating options clearly

### Bulk Operations
**As a learner, I want to work with multiple cards efficiently**
- I can import cards from a JSON file
- I can export my cards and their progress
- I can duplicate cards within my deck
- I can filter cards by tags

### Search & Organize
**As a learner, I want to find cards easily**
- I can search cards by question or answer text
- I can filter by tags
- I can filter by difficulty
- I can sort by various criteria

## Related Documentation

- **Technical Implementation**: See `/planning/todo/cards.md` for how to build this
- **Data Structures**: Card format, progress tracking data models
- **Related Stories**: See `/planning/requests/decks.md` (cards belong to decks)
- **Related Stories**: See `/planning/requests/progress_tracking.md` (card ratings affect progress)

## Acceptance Criteria

✓ Users can create, read, update, delete cards
✓ Cards display clearly on desktop and mobile
✓ Data persists between sessions
✓ Create/edit/delete happens in < 1 second
✓ Import/export works with standard JSON
✓ UI provides clear feedback for all actions

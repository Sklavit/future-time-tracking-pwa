# User Story: Organize Cards into Decks

## Overview
As a learner with multiple subjects, I want to organize my cards into separate decks so I can focus on one topic at a time.

## User Stories

### Create Decks
**As a learner, I want to create multiple decks**
- I can name each deck for a subject or course
- I can add a description for the deck's purpose
- I can optionally assign a color for quick recognition
- Each deck starts empty and ready for cards

### Switch Decks
**As a learner, I want to easily switch between decks**
- I can see all my decks in a dropdown or list
- I can switch decks instantly
- The app remembers which deck I was studying
- Cards and progress are deck-specific

### View Deck Stats
**As a learner, I want to see progress for each deck**
- I can see how many total cards in the deck
- I can see how many cards are due today
- I can see cards in learning vs. mastered
- I can see average interval and ease factor

### Edit Decks
**As a learner, I want to manage my decks**
- I can rename a deck
- I can update the description
- I can change the color
- I can archive old decks

### Delete Decks
**As a learner, I want to remove decks I don't need**
- I can delete a deck and its cards
- I get confirmation before deletion
- I have the option to archive instead

### Sample Deck
**As a new user, I want to try the app immediately**
- The app provides a "Sample" deck with test cards
- I can study the sample to learn how the app works
- I can delete the sample when ready
- Sample deck includes: "What is the capital of France?", "What is 2 + 2?", "How do you say hello in Spanish?"

## Related Documentation

- **Technical Implementation**: See `/planning/todo/decks.md` for how to build this
- **Related Stories**: See `/planning/requests/cards.md` (cards belong to decks)
- **Related Stories**: See `/planning/requests/progress_tracking.md` (deck statistics)

## Acceptance Criteria

✓ Users can create, read, update, delete decks
✓ Deck switching works instantly
✓ Cards stay with their deck
✓ Progress is tracked per deck
✓ Sample deck included for new users
✓ Color selector works with custom colors
✓ Archive feature preserves data safely

# Card Management & Display

## Overview
Cards are the core unit of the application. Each card contains a question and answer for spaced repetition learning.

## Card Data Structure

```javascript
{
  id: string,              // Unique identifier (UUID or timestamp-based)
  deckId: string,          // Reference to parent deck
  question: string,        // Front of card (question)
  answer: string,          // Back of card (answer)
  createdAt: number,       // Creation timestamp (ms)
  updatedAt: number,       // Last modification timestamp (ms)
  tags: string[],          // Optional categorization
  difficulty: 'easy' | 'medium' | 'hard',  // Initial difficulty estimation
}
```

## Progress Tracking

Progress data stored separately:
```javascript
{
  cardId: string,
  deckId: string,
  interval: number,        // Days until next review
  easeFactor: number,      // SM-2 algorithm factor (1.3-2.5)
  repetitions: number,     // Times reviewed
  nextReview: number,      // Timestamp of next due date
  lastReview: number,      // Last review timestamp
  quality: number,         // Last quality rating (0-5)
}
```

## Card Display

### Front (Question)
- Large, readable text
- Center aligned
- Minimal styling
- Tap/click to reveal answer

### Back (Answer)
- Larger text than question
- Formatted as needed
- Show timestamp of last review
- Show next review date
- Action buttons for rating

## Card Editing

### Create Card
- Modal or inline form
- Fields: Question, Answer, Tags, Difficulty
- Validation: Both fields required
- Auto-save option

### Edit Card
- In-place editing or modal form
- Preserve review history
- Update timestamp
- Optional: Reset progress option

### Delete Card
- Confirmation dialog
- Option to archive instead of delete
- Cascade to progress records

## Card Rating System

After review, user rates retention (0-5 scale):
- 0: Forgot completely
- 1: Incorrect with effort
- 2: Incorrect but easy to recall
- 3: Correct with difficulty
- 4: Correct with some hesitation
- 5: Perfect, instant recall

Rating determines next interval via SM-2 algorithm.

## Bulk Operations

- [ ] Import cards from JSON
- [ ] Export cards with progress
- [ ] Duplicate card
- [ ] Clone cards between decks
- [ ] Tag-based filtering

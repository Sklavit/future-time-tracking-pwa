# Technical Task: Implement Flashcard CRUD Operations

## Overview
Implement the technical architecture and functions to support flashcard creation, reading, updating, and deletion as specified in `/planning/requests/cards.md`.

## Data Model

### Card Structure
```javascript
{
  id: string,              // UUID or timestamp-based unique identifier
  deckId: string,          // Reference to parent deck
  question: string,        // Front of card (required)
  answer: string,          // Back of card (required)
  createdAt: number,       // Creation timestamp (ms)
  updatedAt: number,       // Last modification timestamp (ms)
  tags: string[],          // Optional tags for organization
  difficulty: 'easy' | 'medium' | 'hard'  // Initial difficulty
}
```

### Storage
- Key: `localStorage.cards` (JSON array)
- Format: Array of card objects
- Persistence: Across browser sessions and app updates

## Implementation Tasks

### Task 1: Create Card
**Function: `createCard(deckId, question, answer, tags, difficulty)`**
- Generate unique ID
- Validate: both question and answer required
- Save to localStorage
- Emit event/callback for UI update
- Return created card object

### Task 2: Read Cards
**Function: `getCards(deckId)` / `getCard(cardId)`**
- Load from localStorage
- Filter by deck if needed
- Return card(s) or null
- Handle missing data gracefully

### Task 3: Update Card
**Function: `updateCard(cardId, updates)`**
- Update specified fields
- Preserve review history
- Update `updatedAt` timestamp
- Save to localStorage
- Validate: question and answer required
- Return updated card

### Task 4: Delete Card
**Function: `deleteCard(cardId, archive=false)`**
- If archive: mark as archived
- If delete: remove from cards array
- Cascade: remove associated progress records
- Save to localStorage
- Return success status

### Task 5: Bulk Import
**Function: `importCards(jsonData, deckId)`**
- Parse JSON file
- Validate card format
- Handle duplicates (merge or skip)
- Add missing fields (timestamps, IDs)
- Save to localStorage
- Return import report

### Task 6: Bulk Export
**Function: `exportCards(deckId, includeProgress=false)`**
- Get cards for deck
- Optionally include progress data
- Format as JSON
- Trigger browser download
- Include timestamp in filename

### Task 7: Card Display
**Function: `displayCard(card)`**
- Render question prominently
- Show card metadata (created, last review, difficulty)
- Implement flip animation
- Add rating buttons (0-5)
- Handle tap/click to flip

### Task 8: Search & Filter
**Function: `filterCards(deckId, options)`**
- Options: `{ tags, difficulty, search }`
- Search: match question or answer text
- Return filtered card array
- Support combining multiple filters

## UI Components

### Create/Edit Modal
- Question textarea
- Answer textarea
- Tags input (comma-separated)
- Difficulty selector (easy/medium/hard)
- Save/Cancel buttons
- Auto-save on blur (optional)

### Card Display
- Large centered question text (24-32px)
- Tap/click area to flip
- Answer revealed with smooth animation
- Metadata below answer (last review, next review)
- Rating buttons (0-5) with visual indicators
- Navigation to next/previous card

### Card List
- Minimal view showing question/answer preview
- Tags displayed
- Difficulty indicator
- Edit/Delete buttons
- Bulk actions (select multiple)

## Error Handling

### Validation
- Question and answer required (non-empty)
- Question max 500 chars, answer max 5000 chars
- Tags: max 10 tags, max 50 chars each
- Difficulty: must be 'easy', 'medium', or 'hard'

### Storage Errors
- Handle localStorage quota exceeded
- Log errors to console
- Show user-friendly error messages
- Provide recovery options

### Data Integrity
- Preserve orphaned progress records if card deleted
- Handle missing deckId gracefully
- Validate card structure on load
- Clean up corrupted records

## Testing Checklist

- [ ] Create card with all fields
- [ ] Create card with minimal fields
- [ ] Edit card (verify data preserved)
- [ ] Delete card (verify confirmation works)
- [ ] Archive card (verify can be restored)
- [ ] Import 100+ cards from JSON
- [ ] Export cards with and without progress
- [ ] Search by question text
- [ ] Filter by tags
- [ ] Filter by difficulty
- [ ] Display card with flip animation
- [ ] Rate cards (all 0-5 values)
- [ ] Verify localStorage persistence
- [ ] Test with large deck (10000+ cards)
- [ ] Handle storage quota exceeded
- [ ] Handle corrupted localStorage data

## Related User Stories

- See `/planning/requests/cards.md` for user-facing requirements
- Connected to: `/planning/requests/decks.md` (cards belong to decks)
- Connected to: `/planning/requests/progress_tracking.md` (card ratings)

## Success Criteria

✓ All CRUD operations work without errors
✓ Data persists across browser sessions
✓ Import/export round-trip successful
✓ Card display is responsive and fast
✓ Error handling shows clear messages
✓ Performance acceptable with 10000+ cards

# Specification: Deck Management

**Status**: Not yet implemented  
**Links**: User Story: `/planning/requests/decks.md` | Tasks: `/planning/todo/decks.md`

## Overview

Decks organize cards into named collections. Users can create multiple decks and switch between them.

## File Structure

```
script.js
├── GLOBAL STATE
│   ├── let decks = [];          // Array of all decks
│   └── let currentDeckId = null; // Active deck
├── CRUD FUNCTIONS
│   ├── createDeck(name, description, color)
│   ├── getDeck(deckId)
│   ├── getAllDecks()
│   ├── updateDeck(deckId, updates)
│   ├── deleteDeck(deckId, archive)
│   └── switchDeck(deckId)
├── UTILITY FUNCTIONS
│   ├── generateDeckId()
│   ├── getDeckStatistics(deckId)
│   └── initializeSampleDeck()
├── STORAGE FUNCTIONS
│   ├── loadDecks()
│   └── saveDecks()
└── UI FUNCTIONS
    ├── displayDeckSelector()
    ├── showDeckModal(deck = null)
    └── updateDeckStats()
```

## Data Model

### Deck Object
```javascript
{
  id: "deck-123456789",
  name: "Spanish Vocabulary",
  description: "Common Spanish words",
  createdAt: 1609459200000,
  updatedAt: 1609459200000,
  color: "#FF6B6B",              // Hex color, optional
  isDefault: false,              // Is default deck
  isArchived: false              // Soft delete flag
}
```

### Storage
- **Key**: `localStorage.decks`
- **Format**: JSON array of deck objects
- **Persistence**: Across browser sessions

### Sample Deck (on first load)
```javascript
{
  id: "deck-sample",
  name: "Sample",
  description: "Try out the app with these cards",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  color: "#4ECDC4",
  isDefault: true,
  isArchived: false
}
```

Sample cards to include:
1. Q: "What is the capital of France?" A: "Paris"
2. Q: "What is 2 + 2?" A: "4"
3. Q: "How do you say hello in Spanish?" A: "Hola"

## Key Functions

### `createDeck(name, description = '', color = '#4ECDC4')`
- Validate: name required, max 50 chars
- Generate unique ID
- Initialize with zero cards
- Save to localStorage
- Switch to new deck
- Return: deck object

### `switchDeck(deckId)`
- Validate deckId exists
- Set currentDeckId
- Load deck's cards into UI
- Update statistics display
- Return: success boolean

### `getDeckStatistics(deckId)`
- Count total cards
- Count due cards
- Count by stage (new, learning, review, mastered)
- Calculate average ease/interval
- Return: stats object

### `deleteDeck(deckId, archive = false)`
- If archive: set isArchived = true
- If delete: remove deck and cascade delete cards/progress
- Prevent deleting last deck
- Switch to another deck
- Return: success boolean

## Component Interactions

```
User clicks deck selector
    ↓
displayDeckSelector() → Show dropdown
    ↓
User selects deck → switchDeck(deckId)
    ↓
Load deck's cards
    ↓
updateDeckStats() → Display stats
    ↓
Show first due card
```

## Implementation Notes

- **Default Deck**: Create "Sample" on first load
- **Current Deck**: Store in global state AND sessionStorage
- **Colors**: Provide palette or allow custom hex
- **Last Deck**: Remember which deck user was studying
- **Statistics**: Recalculate when card reviewed

## Deck Statistics Display

```javascript
{
  total: 50,              // Total cards
  due: 5,                 // Due today
  new: 8,                 // Never reviewed
  learning: 12,           // interval < 7 days
  review: 20,             // 7 ≤ interval < 30
  mastered: 5,            // interval ≥ 30 days
  averageEase: 2.15,      // Mean ease factor
  averageInterval: 12.5   // Mean interval in days
}
```

## Related Features

- **Cards**: Each card has deckId reference
- **Progress**: Progress records have deckId
- **Spaced Repetition**: Due cards calculated per deck
- **UI**: Deck selector dropdown

## Testing Checklist

- [ ] Create deck with name only
- [ ] Create deck with color
- [ ] Switch between decks
- [ ] Statistics calculate correctly
- [ ] Sample deck created on first load
- [ ] Delete deck removes cards
- [ ] Archive deck preserves data
- [ ] Can't delete last deck
- [ ] Deck selector shows all decks

## Implementation Status

- [ ] Functions created
- [ ] Sample deck on first load
- [ ] Deck selector UI
- [ ] CRUD operations working
- [ ] Statistics display
- [ ] localStorage integration

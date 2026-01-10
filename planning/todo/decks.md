# Technical Task: Implement Deck Management

## Overview
Implement deck creation, switching, and management system as specified in `/planning/requests/decks.md`.

## Data Model

### Deck Structure
```javascript
{
  id: string,              // UUID or timestamp-based
  name: string,            // User-facing deck name (required)
  description: string,     // Optional description
  createdAt: number,       // Creation timestamp
  updatedAt: number,       // Last modification
  color: string,           // Optional hex color (#FF0000)
  isDefault: boolean,      // Is this the default deck?
  isArchived: boolean      // Soft delete flag
}
```

### Storage
- Key: `localStorage.decks` (JSON array)
- Link cards via `card.deckId`

## Core Functions

### createDeck(name, description, color)
- Generate unique ID
- Validate: name required, max 50 chars
- Save to localStorage
- Return deck object

### getDeck(deckId) / getAllDecks()
- Load from localStorage
- Return single deck or array
- Filter archived if needed

### updateDeck(deckId, updates)
- Update name, description, color
- Preserve card associations
- Update `updatedAt`
- Save to localStorage

### deleteDeck(deckId, archive=false)
- If archive: set `isArchived = true`
- If delete: remove from decks and cascade delete cards
- Remove associated progress
- Save to localStorage

### switchDeck(deckId)
- Set as active/current deck
- Load deck's cards
- Update UI
- Store in sessionStorage

### getDeckStatistics(deckId)
- Count total cards
- Count due cards
- Count cards by stage
- Calculate average ease/interval
- Return stats object

## UI Components

### Deck Selector
- Dropdown or list of decks
- Show card count for each
- Current deck highlighted
- "New Deck" button
- Click to switch deck

### Deck Modal (Create/Edit)
- Name field (required)
- Description field
- Color picker
- Save/Cancel buttons

### Sample Deck
- Create default "Sample" deck on first load
- Include 3 sample cards
- Cannot delete last deck

## Testing Checklist

- [ ] Create deck with valid name
- [ ] Create deck without name (should fail)
- [ ] Update deck properties
- [ ] Delete deck (with confirmation)
- [ ] Archive deck instead of delete
- [ ] Switch between decks
- [ ] Sample deck created on first load
- [ ] Get statistics for deck
- [ ] Handle 100+ decks
- [ ] Deck color persists

## Related Stories

- User Story: `/planning/requests/decks.md`
- Task: `/planning/todo/cards.md` (cards reference decks)
- Task: `/planning/todo/progress_tracking.md` (stats per deck)

## Success Criteria

✓ Full CRUD for decks implemented
✓ Deck switching works instantly
✓ Sample deck included
✓ Statistics calculate correctly
✓ Archive/restore function works

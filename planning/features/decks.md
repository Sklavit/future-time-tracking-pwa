# Named Decks (Card Collections)

## Overview
Users can organize cards into named decks for different subjects, courses, or learning goals.

## Deck Data Structure

```javascript
{
  id: string,              // Unique identifier
  name: string,            // User-facing deck name
  description: string,     // Optional description
  createdAt: number,       // Creation timestamp
  updatedAt: number,       // Last modification timestamp
  cardCount: number,       // Number of cards in deck
  color: string,           // Optional visual identifier (hex color)
  isDefault: boolean,      // Is this the default deck?
}
```

## Storage Strategy

All decks and cards stored in localStorage under:
- `decks`: Array of deck metadata
- `cards`: Array of all cards (with deckId reference)
- `progress`: Array of progress tracking data

## Default Deck

### Initial State
- "Sample Deck" provided with test cards
- Contains basic cards to demonstrate functionality
- Can be deleted by user if desired

### Sample Cards
Example cards for testing:
```
Q: What is the capital of France?
A: Paris

Q: What is 2 + 2?
A: 4

Q: How do you say 'hello' in Spanish?
A: Hola
```

## Deck Operations

### Create Deck
- Modal form with name and optional description
- Validation: Name required, unique per user session
- Initialize empty cardCount

### Switch Deck
- Select from dropdown/list
- Load all cards for that deck
- Show deck-specific progress
- Preserve review state

### Edit Deck
- Rename deck
- Update description
- Change color
- Preserve all card data

### Delete Deck
- Confirmation dialog
- Cascade delete all cards in deck
- Cascade delete all progress records
- Cannot delete if only deck remaining (option: archive)

## Deck Statistics

Per deck, track:
- Total cards
- Cards due today
- Cards never reviewed
- Cards in learning phase
- Cards in review phase
- Average ease factor
- Average review interval
- Last studied: timestamp

## Deck Visibility

In main UI:
- Deck selector/switcher (top of screen)
- Current deck name displayed prominently
- Quick stats for current deck
- "Create New Deck" button

## Bulk Deck Operations

- [ ] Duplicate entire deck
- [ ] Merge decks
- [ ] Export deck with progress
- [ ] Import deck from file
- [ ] Share deck (future)

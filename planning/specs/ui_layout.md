# Specification: User Interface

**Status**: Not yet implemented  
**Links**: User Story: `/planning/requests/ui_layout.md` | Tasks: `/planning/todo/ui_layout.md`

## Overview

Clean, minimal interface focused on distraction-free studying.

## File Structure

```
index.html
├── <div id="header">
│   ├── <select id="deckSelector">
│   └── <button id="settingsBtn">
├── <div id="statsBar">
│   ├── <span class="stat">Due: 5</span>
│   ├── <span class="stat">Learning: 8</span>
│   └── <span class="stat">Mastered: 20</span>
├── <div id="cardDisplay">
│   ├── <div class="card" id="currentCard">
│   ├── <div class="answer" id="cardAnswer" style="display:none">
│   └── <button id="flipBtn">
├── <div id="ratingButtons">
│   └── [0] [1] [2] [3] [4] [5]
├── <div id="progressInfo">
│   ├── <span>Last: 2d ago</span>
│   └── <span>Next: 7 days</span>
└── <div id="modals">
    ├── <div class="modal" id="cardModal">
    ├── <div class="modal" id="deckModal">
    └── <div class="modal" id="settingsModal">

style.css
├── Color variables
├── Layout (grid/flexbox)
├── Components (buttons, cards, modals)
├── Responsive breakpoints
├── Animations (flip, ripple)
└── Dark mode (optional)

script.js
├── UI STATE
│   ├── let cardFlipped = false;
│   └── let currentCard = null;
├── DISPLAY FUNCTIONS
│   ├── displayCard(card)
│   ├── flipCard()
│   ├── showModal(modalId)
│   ├── updateStats(stats)
│   └── updateProgressInfo(card)
├── EVENT HANDLERS
│   ├── onCardClick()
│   ├── onRatingClick(quality)
│   ├── onDeckChange(deckId)
│   ├── onSettingsClick()
│   └── onModalSubmit()
└── RESPONSIVE FUNCTIONS
    ├── adjustForMobile()
    ├── adjustForTablet()
    └── adjustForDesktop()
```

## Layout Design

### Desktop (1024px+)
```
┌─────────────────────────────────────────┐
│ [Deck ▼] [Settings]                     │
├─────────────────────────────────────────┤
│ Due:5 | Learning:8 | Mastered:20        │
├─────────────────────────────────────────┤
│                                         │
│         Large question text             │
│         here...                         │
│                                         │
│          (Click to reveal)              │
│                                         │
├─────────────────────────────────────────┤
│  [0] [1] [2] [3] [4] [5]                │
│   Rating buttons (6 total)              │
├─────────────────────────────────────────┤
│ Last: 2d ago | Next: 7 days             │
└─────────────────────────────────────────┘
```

### Mobile (<600px)
- Full width, padding 10px
- Deck selector at top
- Larger buttons (48px min)
- Bottom navigation optional

### Responsive Breakpoints
```css
/* Desktop */
@media (min-width: 1024px) { ... }
/* Tablet */
@media (min-width: 600px) and (max-width: 1023px) { ... }
/* Mobile */
@media (max-width: 599px) { ... }
```

## Key UI Components

### Card Display
- **Question**: 24-32px, bold, centered
- **Answer**: Hidden initially, reveal on click
- **Animation**: 200ms fade or flip
- **Clickable area**: Entire card

### Rating Buttons
- **Count**: 6 buttons (0-5)
- **Size**: 44-48px (touch-friendly)
- **Colors**: Red (0-1), Orange (2-3), Green (4-5)
- **Feedback**: Scale 0.95x on press, ripple effect

### Deck Selector
- **Type**: Dropdown <select>
- **Shows**: Deck name + card count
- **Position**: Top-left
- **Action**: Switch deck instantly

### Statistics Bar
- **Content**: Due | Learning | Mastered cards
- **Update**: Real-time after each review
- **Position**: Below header

### Modals
- **Card Modal**: Create/edit cards (question, answer, tags, difficulty)
- **Deck Modal**: Create/edit decks (name, description, color)
- **Settings Modal**: API keys, preferences, export/import

## CSS Architecture

```css
:root {
  --primary: #007AFF;
  --success: #34C759;
  --warning: #FF9500;
  --danger: #FF3B30;
  --bg: #FFFFFF;
  --text: #000000;
  --border: #E0E0E0;
}

/* Layouts */
.container { max-width: 600px; margin: 0 auto; }
#header { display: flex; justify-content: space-between; }
#cardDisplay { text-align: center; padding: 40px 20px; }

/* Components */
.card { border: 1px solid var(--border); border-radius: 8px; }
button { min-width: 44px; min-height: 44px; }
.button-group { display: flex; gap: 8px; }

/* Animations */
.card { transition: opacity 200ms ease; }
.flip { animation: flipCard 200ms ease; }
```

## Keyboard Navigation

- **Tab**: Move through buttons/fields
- **Enter/Space**: Activate button
- **Arrow Keys**: Navigate deck selector
- **1-6**: Quick rating (optional)

## Accessibility

- **ARIA Labels**: All buttons labeled
- **Color Not Only**: Don't use color alone to show meaning
- **Contrast**: 4.5:1 minimum
- **Focus Visible**: Clear focus indicators
- **Semantic HTML**: <button>, <header>, <nav>

## Performance

- **Load Time**: < 1 second
- **Interaction**: < 100ms response
- **Animations**: 60fps
- **Memory**: < 10MB with 10000 cards

## Implementation Notes

- **No Frameworks**: Vanilla HTML/CSS/JS
- **System Font**: Use SF Pro (macOS), -apple-system fallback
- **Smooth Scrolling**: Optional, disabled on low-power devices
- **Dark Mode**: Detect via prefers-color-scheme (optional)

## Testing Checklist

- [ ] Responsive on mobile/tablet/desktop
- [ ] Touch buttons work (44px min)
- [ ] Card flip animation smooth
- [ ] Modals functional
- [ ] Keyboard navigation works
- [ ] Stats update correctly
- [ ] Accessible via screen reader
- [ ] Fast response to interactions
- [ ] Works offline
- [ ] Beautiful on macOS

## Implementation Status

- [ ] HTML structure
- [ ] CSS styling
- [ ] Event handlers
- [ ] Responsive design
- [ ] Modals working
- [ ] Accessibility features

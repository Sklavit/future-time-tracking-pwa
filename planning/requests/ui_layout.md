# User Interface Layout

## Design Principles

- **Minimalist**: Remove unnecessary elements
- **Fast**: Instant interactions, no lag
- **Distraction-free**: Focus on card learning
- **Offline-first**: Work completely offline
- **macOS Feel**: Native app aesthetic

## Main Screen Layout

```
┌─────────────────────────────────────┐
│  DECK SELECTOR │ ⚙️  Settings     │
├─────────────────────────────────────┤
│                                       │
│  📊 Deck Stats                        │
│  Due: 5 | Learning: 8 | Mastered: 20 │
│                                       │
├─────────────────────────────────────┤
│                                       │
│                                       │
│      FLASHCARD DISPLAY                │
│      (Question on tap shows answer)   │
│                                       │
│                                       │
├─────────────────────────────────────┤
│  [0] [1] [2] [3] [4] [5]             │
│  Quality Rating Buttons               │
├─────────────────────────────────────┤
│  Next: 2 days | Progress: 60% ⬜⬜⬛ │
└─────────────────────────────────────┘
```

## Screen States

### Home/Review Screen
- Deck selector at top
- Card display (large, centered)
- Quality rating buttons below card
- Progress and timing info

### Settings Screen
- Deck management
  - List of all decks
  - Create/Edit/Delete options
- API keys for LLM
- App preferences
  - Color scheme (light/dark)
  - Card font size
  - Animation preference

### Edit Card Screen
- Question field (textarea)
- Answer field (textarea)
- Tags field
- Difficulty selector
- Save/Cancel buttons

### Deck Management Screen
- List of decks with stats
- Create new deck button
- Edit/Delete/Archive options
- Deck color selector

## Card Display

### Front (Question)
```
┌──────────────────────┐
│                      │
│   What is the        │
│   capital of         │
│   France?            │
│                      │
│  (Tap to reveal)     │
└──────────────────────┘
```

### Back (Answer)
```
┌──────────────────────┐
│                      │
│   Paris              │
│                      │
│   Last: 2d ago       │
│   Next: 7 days       │
│                      │
│  Ease: 2.1           │
└──────────────────────┘
```

## Quality Rating UI

```
┌────────────────────────────────────┐
│  0    1    2    3    4    5         │
│  ❌   😕   😑   🤔   😊   😄         │
│ Forgot Easy  Ok  Difficult Easy Perfect │
└────────────────────────────────────┘
```

Simple button row with:
- 0: Red background
- 1-2: Orange background
- 3-5: Green gradient

## Navigation

### Bottom/Side Navigation (macOS app feel)
- Review (home icon)
- Decks (folder icon)
- Settings (gear icon)
- Stats (chart icon)

Or: Tab-based interface at top for desktop
Or: Bottom sheet swipe for mobile-like feel

## Color Scheme

### Light Mode (Default)
- Background: White/very light gray
- Text: Dark gray/black
- Accent: Blue
- Success (quality 4-5): Green
- Warning (quality 1-2): Orange
- Error (quality 0): Red

### Dark Mode (Optional)
- Background: Dark gray/charcoal
- Text: White/light gray
- Accent: Light blue
- Success: Light green
- Warning: Orange
- Error: Light red

## Typography

- Font: System font (SF Pro Display on macOS)
- Question: 24-32px bold
- Answer: 18-24px regular
- UI text: 14-16px
- Buttons: 16px medium

## Interactive Elements

### Buttons
- Rounded corners (8-12px radius)
- Subtle shadow on hover
- Slight scale on click (0.98x)
- Smooth transitions (200ms)

### Cards
- Tap/click to flip
- Smooth 3D flip animation (optional)
- Or fade in/out animation
- Swipe to next card (mobile)

## Responsive Design

### Desktop
- Max-width container (500-600px)
- Centered on screen
- Sidebar navigation (optional)

### Mobile
- Full width with padding
- Bottom navigation
- Touch-optimized buttons (min 44px)
- Portrait-first layout

### macOS App
- Window size ~600x700px
- Menu bar integration (future)
- Keyboard shortcuts

# Technical Task: Build User Interface

## Overview
Implement clean, minimal UI as specified in `/planning/requests/ui_layout.md`.

## Page Structure

### Main Study Screen
```
┌────────────────────────────┐
│ [Deck▼] | Settings ⚙       │
├────────────────────────────┤
│ Due: 5 | Learning: 8       │
├────────────────────────────┤
│                            │
│  Large question text       │
│  here...                   │
│                            │
│  (Tap to reveal answer)    │
│                            │
├────────────────────────────┤
│ [0][1][2][3][4][5]         │
│  Quality rating buttons    │
├────────────────────────────┤
│ Last: 2d ago | Next: 7d    │
└────────────────────────────┘
```

## Components

### Deck Selector
- Dropdown or select element
- Shows all available decks
- Current deck highlighted
- Click handler to switch
- Shows card count

### Statistics Bar
- Cards due today: count
- Cards in learning: count
- Cards mastered: count
- Average ease factor
- Dynamic update after each review

### Card Display
- Centered layout
- Large question text (24-32px)
- Full clickable area to flip
- Smooth animation (200ms)
- Answer text larger
- Metadata below

### Quality Rating Buttons
- Six buttons: [0] [1] [2] [3] [4] [5]
- Color coded: 0=red, 1-2=orange, 3-5=green
- Large (48px minimum)
- Click handler saves review
- Visual feedback on press

### Navigation
- Navigation bar or menu
- Options: Study, Decks, Settings
- Icon-based or text
- Mobile-friendly

### Settings Panel
- API key input field
- Card display settings
- Color scheme toggle
- Import/Export buttons
- Clear data option

## Responsive Design

### Desktop (1024px+)
```css
max-width: 600px;
margin: 0 auto;
padding: 20px;
```

### Tablet (600-1024px)
```css
width: 90%;
margin: 0 auto;
padding: 15px;
```

### Mobile (<600px)
```css
width: 100%;
padding: 10px;
font-size: 16px;
button height: 44px;
```

## CSS Architecture

### Variables
```css
--primary-color: #007AFF;
--background: #FFFFFF;
--text: #000000;
--border: #E0E0E0;
--success: #34C759;
--warning: #FF9500;
--danger: #FF3B30;
```

### Layout
- CSS Grid for main layout
- Flexbox for components
- No external frameworks
- Vanilla CSS only

## Animations

### Card Flip
- Smooth fade in/out (200ms)
- Or 3D flip effect
- No janky transitions
- Smooth easing

### Button Press
- Scale on hover: 1.02x
- Scale on press: 0.98x
- Color change on active
- Ripple effect optional

### Transitions
- All: 200ms ease
- No animations for motion-reduce

## Accessibility

### Keyboard Navigation
- Tab through all buttons
- Enter to activate
- Spacebar for buttons
- Arrow keys for deck selection

### ARIA Labels
- Button purpose labeled
- Form fields labeled
- Landmark regions
- Error messages associated

### Color Contrast
- Minimum 4.5:1 for text
- Quality button colors distinct
- Not color-only indicators

### Screen Reader
- Semantic HTML (button, header, nav)
- Text alternatives for icons
- Form field labels
- List structure for decks

## Performance

### Load Time
- Target: < 1 second initial load
- Target: < 100ms interaction response
- Minimize reflows/repaints
- Lazy load if possible

### Bundle Size
- HTML: < 10KB
- CSS: < 20KB
- JavaScript: < 50KB (with SM-2 logic)

### Optimization
- Minify CSS/JS in production
- Combine files where practical
- Cache bust on updates
- Service worker for caching

## Testing Checklist

- [ ] Layout responsive on mobile/tablet/desktop
- [ ] All buttons properly sized (44px min)
- [ ] Touch targets have spacing
- [ ] Text readable on all sizes
- [ ] No layout shift when switching views
- [ ] Animations smooth on low-end devices
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Fast response to interactions
- [ ] Works offline completely

## Related Stories

- User Story: `/planning/requests/ui_layout.md`
- Task: All other tasks depend on UI

## Success Criteria

✓ UI loads instantly
✓ All interactions < 100ms response
✓ Responsive on all device sizes
✓ Touch-friendly buttons
✓ Distraction-free design
✓ Accessible with keyboard
✓ Works offline completely
✓ Clean, macOS-like aesthetic

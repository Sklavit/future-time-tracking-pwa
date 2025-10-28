# Time Tracker PWA - Technical Documentation

## Project Overview

This is a simple Progressive Web App (PWA) for tracking time spent on different activities. The app allows users to track time across categories and export their logs for analysis.

## Current Architecture

### Core Approach

**Simple State-Based Tracking**
- Single active category at a time
- Automatic interval logging when switching between categories
- Client-side data persistence using localStorage
- No backend required - fully offline-capable

### File Structure

```
/
├── index.html          # Main HTML structure
├── script.js           # Core tracking logic
├── style.css          # Styling and layout
├── manifest.json      # PWA manifest
├── service-worker.js  # Service worker for offline support
└── CLAUDE.md          # This documentation
```

## Implementation Details

### Data Model

**Log Entry Structure:**
```javascript
{
  category: string,      // e.g., "Work", "Chores", "Other"
  start: number,         // Unix timestamp (ms)
  end: number,          // Unix timestamp (ms)
  durationSec: number   // Duration in seconds
}
```

**Storage:**
- Array of log entries stored in `localStorage` under key `"logs"`
- Persists across browser sessions
- Can be exported as JSON file

### State Management (script.js)

**Global State Variables:**
- `activeCategory` - Currently active category (null when stopped)
- `startTime` - Start timestamp of current interval (null when stopped)
- `timerInterval` - setInterval reference for UI updates
- `logs` - Array of completed log entries

**Key Functions:**

1. **`startCategory(category)`** (script.js:13-45)
   - Ends previous tracking interval (if any)
   - Saves completed interval to logs
   - If category is "Stop": clears state and stops timer
   - Otherwise: starts new tracking interval
   - Updates UI and starts timer

2. **`updateElapsed()`** (script.js:47-51)
   - Updates elapsed time display every second
   - Calculates difference between current time and startTime
   - Formats as HH:MM:SS

3. **`formatTime(sec)`** (script.js:6-11)
   - Converts seconds to HH:MM:SS format
   - Zero-pads all components

4. **`exportLogs()`** (script.js:53-61)
   - Creates downloadable JSON file
   - Contains all logged intervals
   - Useful for external analysis

### User Interface

**Categories Layout (2x2 Grid):**
```
┌─────────┬─────────┐
│  Work   │ Chores  │
├─────────┼─────────┤
│  Other  │  Stop   │
└─────────┴─────────┘
```

**Category Buttons:**
- Grid layout using CSS Grid (2 columns)
- Work, Chores, Other: Start tracking that category
- Stop: End tracking without starting new category
- Stop button has red-tinted styling for emphasis

**Status Display:**
- Shows currently active category
- Shows elapsed time for current interval
- Updates every second

### Styling (style.css)

**Layout Strategy:**
- CSS Grid for button layout (`grid-template-columns: 1fr 1fr`)
- Max-width container (400px) centered on page
- Responsive button sizing

**Interactive Elements:**
- Hover effects with scale transformation (1.05x)
- Active state with scale-down (0.95x)
- Smooth transitions (0.2s)
- Special styling for Stop button (red background)

## Workflow

### Starting a Tracking Session

1. User clicks category button (e.g., "Work")
2. If another category was active:
   - Current interval is ended
   - Log entry is created and saved
3. New category becomes active
4. Timer starts updating UI
5. Status shows active category and elapsed time

### Stopping Tracking

1. User clicks "Stop" button
2. Current interval is ended and saved
3. Active category is cleared
4. Timer is stopped
5. Display shows "None" and "00:00:00"

### Switching Categories

1. User clicks new category button
2. Previous category interval is automatically ended and saved
3. New category starts immediately
4. Timer resets and begins counting from 0

### Exporting Data

1. User clicks "Export Logs" button
2. Browser downloads `time-logs.json`
3. File contains array of all logged intervals
4. Can be imported into spreadsheets or analytics tools

## Technical Considerations

### Data Persistence
- Uses localStorage (approximately 5-10MB limit per origin)
- Data persists until explicitly cleared
- No automatic cleanup - logs accumulate indefinitely
- Consider implementing data management UI for large datasets

### Timer Accuracy
- Updates every 1000ms (1 second)
- May drift slightly over long periods
- Uses actual timestamps for log entries (accurate)
- Display is for user feedback only

### Browser Compatibility
- Requires ES6 support (arrow functions, template literals, const/let)
- localStorage API (widely supported)
- CSS Grid (modern browsers)
- Works on mobile and desktop

### PWA Features
- Service worker enables offline functionality
- Can be installed to home screen
- Works without network connection
- Manifest defines app metadata

## Future Enhancement Ideas

### Features to Consider
- Visual indicators for active category (button highlighting)
- Daily/weekly summary statistics
- Category color customization
- Pause/resume functionality
- Data visualization (charts/graphs)
- Multiple export formats (CSV, Excel)
- Data import functionality
- Time goal setting and alerts
- Historical data viewing/editing
- Category management (add/remove/rename)

### Technical Improvements
- Add data size limits and cleanup options
- Implement IndexedDB for larger datasets
- Add data backup/sync functionality
- Improve timer accuracy with Web Workers
- Add keyboard shortcuts
- Implement undo/redo functionality
- Add data validation and error handling
- Unit tests for core functions

## Development Notes

### Making Changes

**Adding a New Category:**
1. Add button to `index.html` in `#categories` div
2. Update grid layout in CSS if needed (currently 2x2)
3. No JavaScript changes needed (uses data attributes)

**Modifying Time Display:**
1. Update `formatTime()` function in `script.js`
2. Adjust `updateElapsed()` if calculation changes

**Changing Storage:**
1. Modify `localStorage` calls in `startCategory()`
2. Update `logs` initialization at top of `script.js`
3. Update `exportLogs()` for new format

**Styling Changes:**
1. Modify `style.css`
2. Button styles under `#categories button`
3. Layout in `#categories` (CSS Grid)

### Testing Checklist

- [ ] Start tracking a category
- [ ] Switch between categories
- [ ] Stop tracking
- [ ] Resume after stop
- [ ] Export logs
- [ ] Refresh page (persistence check)
- [ ] Long-running session (timer accuracy)
- [ ] Multiple sessions across days

## Code Quality Notes

**Strengths:**
- Simple, readable code
- Clear separation of concerns
- No external dependencies
- Lightweight and fast

**Areas for Improvement:**
- No input validation
- No error handling for storage failures
- No confirmation dialogs for data operations
- Limited accessibility features (ARIA labels)
- No unit tests

## Contact & Maintenance

This documentation should be updated when:
- Architecture changes significantly
- New features are added
- Data model changes
- Breaking changes are introduced

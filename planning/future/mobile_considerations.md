# Mobile Considerations

## Current Focus: macOS Desktop First

MVP targets macOS desktop with PWA install.
Mobile considerations are for future phases.

## Mobile PWA Installation

### iOS (Safari)
**Add to Home Screen:**
1. Open app in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. App appears as icon on homescreen
5. Opens in Safari-based WebView

**Limitations:**
- iOS 16.3 required for full PWA features
- Limited to 50MB storage
- No background sync
- No offline access to some files

### Android (Chrome)
**Install Prompt:**
1. Open app in Chrome
2. Browser shows "Install app" banner
3. Tap to install
4. App appears in app drawer
5. Opens in standalone Chrome shell

**Advantages:**
- Better storage (up to 50MB+)
- Service Worker fully supported
- More capable than iOS

## Responsive Design Strategy

### MVP: Desktop-First
- Optimize for 1024x768+ screens
- Single column layout
- Large touch targets

### Phase 2: Mobile-Responsive
- Max-width 600px for tablets
- Full width for phones
- Responsive grid

### Phase 3: Mobile App
- Native iOS app
- Native Android app
- Better performance

## Touch Interactions

### Primary Actions (Mobile-Optimized)
```
Card Display
  Tap: Flip card
  Long-press: Menu options
  Swipe left: Next card
  Swipe right: Previous card

Quality Buttons
  Tap: Submit rating
  Visual feedback on press
```

### Size Requirements
- Minimum touch target: 44x44px (iOS)
- Minimum touch target: 48x48px (Android)
- Spacing between targets: 8px minimum

### Visual Feedback
- Ripple effect on tap
- Button scale animation
- Color change on hover
- Haptic feedback (if available)

## Mobile Viewport

### Viewport Meta Tag
```html
<meta name="viewport"
      content="width=device-width,
               initial-scale=1,
               maximum-scale=5,
               user-scalable=yes,
               viewport-fit=cover">
```

### Safe Area Consideration
```css
/* Account for notches and home indicators */
padding: max(20px, env(safe-area-inset-top));
padding-bottom: max(20px, env(safe-area-inset-bottom));
```

## Mobile Storage

### iOS WebStorage
- localStorage: 5-10 MB
- IndexedDB: 50 MB
- User can clear anytime

### Android WebStorage
- localStorage: 5-10 MB
- IndexedDB: 50 MB+
- More reliable persistence

### Handling Storage Full
```javascript
function saveToDB(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      // Backup to cloud or delete old data
      handleStorageFull();
    }
  }
}
```

## Mobile Network Considerations

### Offline-First
- App works completely offline
- Network is optional enhancement
- LLM features disabled offline

### Network Status
```javascript
window.addEventListener('online', () => {
  console.log('Online');
  enableNetworkFeatures();
});

window.addEventListener('offline', () => {
  console.log('Offline');
  disableNetworkFeatures();
});
```

### Connection Quality
```javascript
// Detect slow network
const connection = navigator.connection;
if (connection) {
  const effectiveType = connection.effectiveType;
  // 4g, 3g, 2g, slow-2g
  if (effectiveType === '2g' || effectiveType === 'slow-2g') {
    // Disable large media
  }
}
```

## Performance on Mobile

### Optimization for Mobile
- Reduce animations (battery drain)
- Minimize JavaScript
- Lazy load images
- Compress assets
- Efficient caching

### Battery Considerations
- Avoid continuous polling
- Use efficient timers
- Minimize network requests
- Reduce GPU animation

### CPU Considerations
- Offload to Web Workers
- Debounce expensive operations
- Avoid synchronous DOM access
- Profile with DevTools

## Mobile UI Adjustments

### Layout Changes
```css
/* Desktop */
@media (min-width: 1024px) {
  .layout { display: grid; grid-template-columns: 1fr 3fr 1fr; }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .layout { display: grid; grid-template-columns: 1fr 2fr; }
}

/* Phone */
@media (max-width: 767px) {
  .layout { display: block; }
  .sidebar { margin-bottom: 20px; }
}
```

### Font Scaling
```css
/* Use relative units for better scaling */
body { font-size: 16px; } /* Base size */

@media (max-width: 767px) {
  body { font-size: 14px; } /* Smaller on mobile */
}

/* Use rem for scaling */
.card-question { font-size: 1.5rem; } /* 24px on desktop, 21px on mobile */
.card-answer { font-size: 1.125rem; } /* 18px on desktop, 15.75px on mobile */
```

### Navigation Adjustments
```
Desktop: Top navigation bar
Tablet: Side drawer + top bar
Mobile: Bottom navigation (Tab Bar)
```

## Mobile Gestures

### Supported Gestures
- Tap: Primary action
- Long-press: Secondary menu
- Swipe: Navigate between cards
- Pinch: Zoom (optional, disabled by default)
- Shake: Trigger action (future)

### Implementation
```javascript
let touchStart = 0;

document.addEventListener('touchstart', (e) => {
  touchStart = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const touchEnd = e.changedTouches[0].clientX;
  const diff = touchStart - touchEnd;

  if (Math.abs(diff) > 50) { // 50px swipe threshold
    if (diff > 0) {
      showNextCard();
    } else {
      showPreviousCard();
    }
  }
});
```

## Mobile Testing

### iOS Testing
- Use Safari DevTools
- Test on different iOS versions
- Check HomeScreen install
- Test offline mode

### Android Testing
- Use Chrome DevTools
- Test on different Android versions
- Check app drawer install
- Test background behavior

### Responsive Testing Tools
- Chrome DevTools device emulation
- BrowserStack for real devices
- Responsive design mode
- Touch event simulation

## Mobile Analytics (Future)

Track mobile-specific metrics:
- Installation rate
- Offline usage percentage
- Session duration
- Battery impact
- Storage usage
- Network type distribution

## Accessibility on Mobile

### Touch Accessibility
- Large touch targets (min 44x44px)
- High contrast for visibility
- Screen reader compatibility
- Keyboard navigation support

### Orientation
Support both portrait and landscape:
```javascript
window.addEventListener('orientationchange', () => {
  const orientation = window.innerHeight > window.innerWidth
    ? 'portrait'
    : 'landscape';
  adjustLayout(orientation);
});
```

## Progressive Enhancement

### Detect Capabilities
```javascript
const capabilities = {
  serviceWorker: 'serviceWorker' in navigator,
  storage: typeof localStorage !== 'undefined',
  indexedDB: typeof indexedDB !== 'undefined',
  webWorker: typeof Worker !== 'undefined',
  touch: 'ontouchstart' in window,
  clipboard: 'clipboard' in navigator,
  vibration: 'vibrate' in navigator,
};
```

### Fallbacks
- No Service Worker → Reload on each use
- No localStorage → In-memory storage
- No IndexedDB → Use localStorage only
- No touch → Use mouse events
- No vibration → Use audio feedback

## Future: Native Apps

### React Native (iOS + Android)
- Share logic with web
- Native performance
- Better storage access
- App store distribution

### Capacitor (Web → Native)
- Wrap web app
- Access native APIs
- iOS and Android
- Web fallback

### Flutter (Alternative)
- Cross-platform
- Native performance
- Beautiful UI
- Separate codebase

## Mobile Optimization Priority

1. **MVP**: Desktop works, responsive design optional
2. **Phase 2**: Responsive mobile layout
3. **Phase 3**: Mobile PWA optimization
4. **Phase 4**: Native iOS/Android apps

## Conclusion

Start with desktop-first, add mobile considerations:
- ✓ Responsive design from start
- ✓ Touch-friendly interactions
- ✓ Offline-first (works on mobile)
- ✓ Minimize performance impact
- ✓ Plan for native apps later

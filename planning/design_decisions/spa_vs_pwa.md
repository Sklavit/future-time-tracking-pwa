# Single Page App vs Progressive Web App Decision

## Decision: Use PWA Architecture

## Rationale

### Requirements Met by PWA
1. **Offline-Capable** ✓
   - Service Worker enables offline functionality
   - All assets cached for offline access
   - No network required after initial load

2. **Standalone App Feel** ✓
   - Can be installed to home screen (macOS, iOS, Android)
   - Minimal chrome (no browser URL bar when installed)
   - Native app-like experience
   - Works without browser context

3. **Fast Performance** ✓
   - Service Worker caching = instant loads
   - No server round-trips for cached content
   - Small bundle size = fast initial load
   - Responsive UI = smooth interactions

4. **No Backend Required** ✓
   - All computation client-side
   - All storage in localStorage
   - No server dependency
   - Can be served as static files

5. **Serverless** ✓
   - Can run from CDN (GitHub Pages, Netlify, etc.)
   - Or as standalone app file
   - No ongoing server costs

## PWA vs Pure SPA

### What is a PWA?
A PWA is a SPA with:
- Service Worker for offline support
- Manifest.json for installability
- Responsive design
- HTTPS protocol
- Installable to home screen

### Why PWA over plain SPA?
- **Offline**: Works without network
- **Home Screen**: Installed like native app
- **Appearance**: Can hide browser chrome
- **Engagement**: Push notifications (future)

## Technical Implementation

### Files Required
- `index.html` - Main app shell
- `script.js` - Application logic
- `style.css` - Styling
- `manifest.json` - PWA manifest
- `service-worker.js` - Offline support
- Icon files for home screen

### Service Worker Strategy
- Cache app shell on install
- Network requests with cache fallback
- Periodic cache updates
- Handle offline gracefully

### Installation Flow
1. User visits app URL
2. Browser detects manifest.json
3. "Install" or "Add to Home Screen" prompt
4. App launches in standalone mode
5. Service Worker caches assets
6. App works offline

## Alternatives Considered

### Alternative 1: Native App (macOS)
**Rejected because:**
- Requires app store distribution
- Platform-specific code needed
- More complex build process
- Higher maintenance burden
- Can use PWA as web wrapper instead

### Alternative 2: Electron App
**Rejected because:**
- Large binary size (~200MB)
- Overkill for data-only app
- PWA provides same functionality lighter

### Alternative 3: Simple Static Website
**Rejected because:**
- Needs backend for offline content
- No home screen installation
- No native app feel
- Less engaging UX

## Benefits of PWA Choice

| Aspect | PWA | Native | Electron |
|--------|-----|--------|----------|
| Offline | ✓ | ✓ | ✓ |
| Size | Small | Medium | Large |
| Development Speed | Fast | Medium | Fast |
| Deployment | Easy | Slow | Medium |
| Cross-platform | ✓ | ✗ | ✓ |
| Update | Automatic | Manual | Automatic |
| Home Screen | ✓ | ✓ | ✗ |

## macOS-Specific Considerations

### macOS PWA Install
- Available in Safari, Chrome, Edge
- Can set custom icon
- Launches in app-like window
- Supports keyboard shortcuts
- Can dock it like app

### Future Options
- Wrap as native macOS app using similar web view
- Use Tauri or similar lightweight wrapper
- Publish to App Store if needed

## Migration Path

If needs change:
1. **To Native**: Wrap existing PWA in native shell
2. **To Desktop**: Use Tauri/Electron wrapper
3. **To Backend**: Add server component if scaling
4. **To Hybrid**: Keep PWA, add sync capability

## Conclusion

PWA architecture provides:
- ✓ All required features
- ✓ Minimal complexity
- ✓ Fast development
- ✓ Easy distribution
- ✓ Great user experience
- ✓ Future extensibility

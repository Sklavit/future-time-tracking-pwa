# Flashcard Spaced Repetition App - Development Plans

## Current Status
Transitioning from Time Tracker PWA to a Flashcard learning application with spaced repetition algorithm.

## Core Requirements

### Architecture & Delivery
- [ ] Simple, minimalistic design
- [ ] Standalone macOS app feel (PWA-based)
- [ ] Simple but efficient spaced repetition algorithm
- [ ] Fully offline-capable
- [ ] No backend required
- [ ] Serverless after initial load
- [ ] Fast performance
- [ ] Persist application state locally

### Features (Priority Order)
- [ ] **Textual Flashcards** - Display Q&A style cards
- [ ] **Test Set of Cards** - Provide sample deck for users to test
- [ ] **Card Editing** - Allow users to modify existing cards
- [ ] **Local Storage** - Remember app state when closed
- [ ] **Spaced Repetition** - Implement efficient scheduling algorithm
- [ ] **Random Card Proposal** - Suggest cards due for review now
- [ ] **Learning Progress** - Track and display progress per card
- [ ] **Named Decks** - Support multiple card collections
- [ ] **Card Creation with LLM** - Generate 1 or multiple cards from prompts
- [ ] **Time Travel** - Navigate to specific date for manual review
- [ ] **Manual Card Updates** - Select and update cards manually

### Data Persistence
- [ ] localStorage-based card storage
- [ ] localStorage-based progress tracking
- [ ] localStorage-based deck management
- [ ] Automatic state recovery on app load

### User Interface
- [ ] Clean, minimal card display
- [ ] Simple navigation between cards
- [ ] Progress indicators
- [ ] Deck selector/switcher
- [ ] Basic settings/configuration
- [ ] Export/Import functionality (future)

## Feature Details

See individual files in `/planning/features/` for detailed specifications:
- `cards.md` - Card management and display
- `spaced_repetition.md` - Scheduling algorithm details
- `decks.md` - Multi-deck support
- `progress_tracking.md` - Learning statistics
- `llm_integration.md` - LLM-powered card generation
- `ui_layout.md` - User interface design

## Design Decisions

See `/planning/design_decisions/` for architectural choices:
- `spa_vs_pwa.md` - Why PWA approach
- `storage_strategy.md` - localStorage vs alternatives
- `algorithm_choice.md` - Spaced repetition algorithm selection
- `offline_first.md` - Offline-first architecture

## Future Enhancements

See `/planning/future/` for post-MVP ideas:
- `advanced_features.md` - Potential advanced features
- `performance_optimizations.md` - Scaling considerations
- `mobile_considerations.md` - Mobile-specific improvements
- `sync_strategies.md` - Future sync capabilities

## Development Phases

### Phase 1: MVP (Current)
1. Basic card creation and display
2. Simple review workflow
3. localStorage persistence
4. Test deck included
5. Basic spaced repetition

### Phase 2: Enhancement
1. LLM card generation
2. Multiple decks
3. Improved UI/UX
4. Progress statistics

### Phase 3: Advanced
1. Time travel/review
2. Advanced scheduling
3. Import/Export
4. Accessibility improvements

## Notes

- Keep codebase simple and readable
- No external dependencies unless absolutely necessary
- Test on macOS first, ensure PWA install works
- Focus on performance and speed
- Ensure works completely offline

# User Story: AI-Powered Card Generation

## Overview
As a learner, I want to generate flashcards from topics or text using AI so I can quickly create study materials without typing each card manually.

## User Stories

### Generate from Topic
**As a learner, I want to generate cards from a topic**
- I type a topic like "photosynthesis" or "French verbs"
- The AI generates 5-10 relevant flashcards
- I can preview the cards before saving
- I can edit cards before adding to my deck
- I can generate more cards on the same topic

### Generate from Text
**As a learner, I want to paste text and get cards**
- I paste text from an article or textbook
- The AI extracts key concepts
- The AI creates flashcards from those concepts
- I can adjust how many cards to create
- I can edit before saving

### Edit Generated Cards
**As a learner, I want to fix generated cards**
- I can edit the question or answer
- I can delete cards I don't want
- I can add missing context
- All edits are preserved when I save

### Support Multiple AI Providers
**As a learner, I want flexibility in AI choice**
- The app supports OpenAI's GPT
- The app supports Anthropic's Claude
- I use my own API key
- I control the settings (detail level, number of cards)

### Privacy Control
**As a learner, I want control over my data**
- My API key stays on my device
- No data is sent to our servers
- I'm responsible for my API usage
- The app is clear about what's being sent

## Related Documentation

- **Technical Implementation**: See `/planning/todo/llm_integration.md` for how to build this
- **Related Stories**: See `/planning/requests/cards.md` (generated cards are added as normal cards)
- **Related Stories**: See `/planning/requests/decks.md` (cards go into a selected deck)

## Acceptance Criteria

✓ Card generation works from topics and text
✓ Generated cards are editable
✓ Multiple AI providers supported
✓ User API keys stored securely
✓ Error messages are clear
✓ Works with various topics and languages
✓ Generated cards match user's deck style

# Technical Task: Implement LLM Card Generation

## Overview
Implement AI-powered card generation using LLM APIs as specified in `/planning/requests/llm_integration.md`.

## Architecture

### Supported Providers
- OpenAI (GPT-3.5, GPT-4)
- Anthropic (Claude)
- User provides API key
- No backend intermediary

### API Key Storage
- Stored in localStorage
- Never transmitted to our servers
- User's responsibility for security
- Can be cleared in settings

## Core Functions

### generateCardsFromTopic(topic, count, deckId, apiKey, provider)
- Validate API key
- Call LLM with structured prompt
- Parse response into cards
- Return preview for user approval
- Save cards if approved

### generateCardsFromText(text, count, deckId, apiKey, provider)
- Extract key concepts from text
- Call LLM to create cards
- Return cards for review
- Preserve original text reference

### callLLM(prompt, apiKey, provider, options)
- Route to correct provider
- Handle errors gracefully
- Retry on failure (max 3 times)
- Timeout after 30 seconds
- Return parsed JSON

### saveGeneratedCards(cards, deckId)
- Validate card format
- Create card objects
- Add to specified deck
- Tag as "AI Generated"
- Return count saved

## LLM Prompts

### Topic Prompt
```
Generate exactly N flashcards about {topic}.

Format each card as JSON:
{
  "question": "...",
  "answer": "...",
  "difficulty": "easy|medium|hard"
}

Requirements:
- Clear, specific questions
- Concise, complete answers
- Vary question types
- Appropriate difficulty
```

### Text Extraction Prompt
```
Extract key learning concepts from this text:

{text}

Create N flashcards in JSON format:
{
  "question": "...",
  "answer": "...",
  "difficulty": "easy|medium|hard"
}

Focus on the most important concepts.
```

## UI Components

### Generate Modal
- Method selector: Topic / Text
- Input field (prompt or text)
- Card count selector (1-50)
- API provider selector
- "Generate" button

### Preview Grid
- Show generated cards
- Allow edit before save
- Show source/topic
- "Save to Deck" button

### Settings
- API key input field (password type)
- Provider selector
- Temperature slider (0.0-1.0)
- Clear API key button

## Error Handling

### Validation
- API key format
- Card response format
- Question/answer non-empty
- Count within limits (1-50)

### Network Errors
- Timeout: show message, allow retry
- Invalid API key: show clear error
- Rate limit: explain and suggest wait
- Network offline: disable feature

### Card Validation
- Missing required fields
- Text length limits
- Invalid JSON response
- Incomplete cards

## Testing Checklist

- [ ] Generate from topic works
- [ ] Generate from text works
- [ ] Preview shows generated cards
- [ ] Edit cards in preview
- [ ] Save cards to deck
- [ ] API key storage works
- [ ] Provider switching works
- [ ] Error messages are clear
- [ ] Offline gracefully disables
- [ ] Timeout handling works
- [ ] Rate limiting handled
- [ ] Various topics tested
- [ ] Different languages tested

## Related Stories

- User Story: `/planning/requests/llm_integration.md`
- Task: `/planning/todo/cards.md` (saving generated cards)
- Task: `/planning/todo/decks.md` (adding to decks)

## Success Criteria

✓ Generate cards from prompts and text
✓ Preview and edit before saving
✓ Multiple LLM providers supported
✓ API keys handled securely
✓ Error messages are user-friendly
✓ Works offline gracefully
✓ Performance acceptable

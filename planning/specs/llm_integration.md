# Specification: LLM Card Generation

**Status**: Not yet implemented  
**Links**: User Story: `/planning/requests/llm_integration.md` | Tasks: `/planning/todo/llm_integration.md`

## Overview

Generate flashcards from prompts and text using LLM APIs. User provides API key, no backend required.

## File Structure

```
script.js
├── SETTINGS
│   ├── loadApiKey(provider)
│   ├── saveApiKey(provider, key)
│   └── clearApiKey(provider)
├── GENERATION FUNCTIONS
│   ├── generateFromTopic(topic, count, deckId)
│   ├── generateFromText(text, count, deckId)
│   ├── generateCardsViaLLM(prompt, apiKey, provider)
│   └── parseGeneratedCards(response)
├── PROVIDER SUPPORT
│   ├── callOpenAI(prompt, apiKey)
│   ├── callAnthropic(prompt, apiKey)
│   └── callLLM(provider, prompt, apiKey)
├── UI FUNCTIONS
│   ├── showGenerationModal()
│   ├── showCardPreview(cards)
│   └── saveGeneratedCards(cards, deckId)
└── ERROR HANDLING
    ├── validateApiKey(provider, key)
    └── handleGenerationError(error)
```

## Supported Providers

- **OpenAI**: GPT-3.5-turbo, GPT-4
- **Anthropic**: Claude 2, Claude 3
- Extensible to more providers

## Key Functions

### `generateFromTopic(topic, count, deckId)`
- Validate topic (non-empty, < 200 chars)
- Validate count (1-50)
- Load API key for selected provider
- Call LLM with topic prompt
- Return preview for user approval

### `generateFromText(text, count, deckId)`
- Validate text (non-empty, < 10000 chars)
- Call LLM with extraction prompt
- Return preview for user approval

### `callOpenAI(prompt, apiKey)`
- POST to `https://api.openai.com/v1/chat/completions`
- Handle timeout (30s)
- Parse JSON response
- Return: array of card objects or null

### `saveGeneratedCards(cards, deckId)`
- Validate card format
- Add "AI Generated" tag
- Create card objects
- Save to deck
- Return: count saved

## LLM Prompts

### Topic Generation
```
Generate exactly {count} flashcards about: {topic}

Format response as JSON array:
[
  { "question": "...", "answer": "...", "difficulty": "easy" },
  ...
]

Requirements:
- Clear, specific questions
- Concise, complete answers
- Vary question types
```

### Text Extraction
```
Extract {count} key learning concepts from this text and create flashcards:

{text}

Format as JSON array with 'question' and 'answer' fields.
Focus on important concepts only.
```

## Implementation Notes

- **API Keys**: Stored in localStorage (user's device)
- **Privacy**: Keys never sent to our servers
- **Error Handling**: Show clear messages for API errors
- **Offline**: Disable generation button when offline
- **Preview**: Always show before saving
- **Validation**: Ensure generated cards have both Q and A

## Related Features

- **Cards**: Generated cards added via createCard()
- **Decks**: Cards added to selected deck
- **UI**: Modal for generation and preview

## Testing Checklist

- [ ] OpenAI API works
- [ ] Anthropic API works
- [ ] Card preview displays
- [ ] User can edit before save
- [ ] Error messages are clear
- [ ] API key stored securely
- [ ] Timeout handling works
- [ ] Various topics tested
- [ ] Offline disables generation

## Implementation Status

- [ ] API integration
- [ ] Prompt templates
- [ ] Card parsing
- [ ] Preview UI
- [ ] Error handling

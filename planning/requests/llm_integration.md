# LLM-Powered Card Generation

## Overview
Allow users to generate flashcards using an LLM (Large Language Model) without backend requirement.

## Architecture: Client-Side Integration

Since app is fully offline-capable, LLM integration uses:
- User provides their own API key (OpenAI, Anthropic, etc.)
- API calls made directly from browser to LLM provider
- No backend intermediary
- Privacy: API key stored only in user's browser

## Card Generation Modes

### Mode 1: Generate from Prompt
```
User Input: "Create 5 flashcards about photosynthesis"
System: Calls LLM with structured prompt
Output: 5 cards with Q&A pairs
```

### Mode 2: Generate from Text
```
User Input: Paste or upload learning material
System: LLM extracts key concepts, creates cards
Output: Multiple cards from material
```

### Mode 3: Single Card from Description
```
User Input: "Flashcard about Python list comprehension"
System: Generates one well-formed card
Output: Single card, user can refine
```

## LLM Prompt Templates

### Template for Multiple Cards
```
Generate exactly N flashcards about: {topic}

Format each card as:
Q: {question}
A: {answer}

Requirements:
- Questions should be clear and specific
- Answers should be concise but complete
- Focus on key concepts and facts
- Vary question types (definition, explanation, application)
```

### Template for Text Extraction
```
Extract key learning concepts from this text and create flashcards:

{text}

Create 5-10 flashcards in format:
Q: {question}
A: {answer}

Focus on the most important concepts.
```

## Storage & Workflow

1. User clicks "Generate Cards"
2. Choose generation mode
3. Provide input (prompt, text, description)
4. Select API provider (with stored key)
5. LLM generates cards
6. Preview generated cards
7. Edit/approve cards before adding to deck
8. Save to deck with "AI Generated" tag

## API Configuration

Settings modal for:
- OpenAI API key (or other providers)
- Model selection (GPT-3.5, GPT-4, Claude, etc.)
- Temperature/creativity setting (0-1.0)
- Card generation style preference

## Error Handling

- Invalid API key: Show clear error message
- Quota exceeded: Notify user
- Network error: Offline fallback (generate manually)
- Malformed response: Show raw response for manual editing

## Quality Control

Generated cards should:
- Have both question and answer
- Be properly formatted
- Make semantic sense
- Allow user review before save
- Be editable before final save

## Future: Advanced Features

- [ ] Fine-tune models for specific domains
- [ ] Card quality rating and improvement
- [ ] Automatically expand cards with more context
- [ ] Generate from images (OCR + LLM)
- [ ] Multilingual card generation

## Privacy & Security Notes

- API keys stored in localStorage (user's responsibility)
- No keys transmitted to any backend
- Users responsible for API usage costs
- Clear disclosure about API calls
- Option to use with or without LLM

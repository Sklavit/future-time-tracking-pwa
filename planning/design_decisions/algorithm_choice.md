# Spaced Repetition Algorithm Choice

## Decision: SM-2 Algorithm

Chosen: SuperMemo 2 (SM-2) - Simple, proven, efficient

## Algorithms Evaluated

### Option 1: SM-2 (SuperMemo 2) ✓ CHOSEN

#### Algorithm Overview
```
If quality >= 3:
  if repetitions == 0:
    interval = 1
  else if repetitions == 1:
    interval = 3
  else:
    interval = interval * easeFactor

If quality < 3:
  repetitions = 0
  interval = 1

easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
Constraints: 1.3 <= easeFactor <= 2.5
```

#### Advantages
✓ **Simple**: Easy to understand and implement
✓ **Proven**: Used by Anki and millions of learners
✓ **Efficient**: Minimal computation per review
✓ **Flexible**: Works with 0-5 quality scale
✓ **Research-backed**: Backed by scientific research
✓ **Parameters**: Few parameters to tune
✓ **Works offline**: No dependencies, fully client-side

#### Disadvantages
✗ **Limited adaptivity**: Doesn't adapt to user patterns
✗ **One-size-fits-all**: Same algorithm for all users
✗ **Basic**: No advanced features built-in

### Option 2: SM-6, SM-11, SM-18

#### Overview
More advanced versions of SM algorithm with:
- Better forgetting curves
- Adjustable parameters
- More complex math

#### Decision: Not chosen because
- Overkill for MVP
- Significant complexity increase
- Marginal benefit for our use case
- Can upgrade later if needed

### Option 3: FSRS (Free Spaced Repetition Scheduler)

#### Overview
Modern algorithm using:
- Machine learning insights
- Better empirical forgetting curves
- Multiple difficulty parameters

#### Decision: Not chosen because
- More complex implementation
- Requires more data to train
- Better for advanced users
- SM-2 is simpler and sufficient

### Option 4: Leitner System

#### Overview
Card-based system:
- Cards in physical or virtual boxes
- Each box = different review interval
- Simple deterministic scheduling

#### Decision: Not chosen because
- Less sophisticated than SM-2
- No quality/difficulty adaptation
- More discrete intervals (less smooth)
- SM-2 provides better learning outcomes

### Option 5: Simple Interval System

#### Overview
Hardcoded intervals:
- Day 1, 3, 7, 14, 30, 90, 365

#### Decision: Not chosen because
- No adaptation to difficulty
- No feedback from user performance
- Less optimal learning
- SM-2 is only slightly more complex

## SM-2 Implementation Details

### Initial Card State
```javascript
{
  interval: 1,           // Due tomorrow
  easeFactor: 2.5,       // Base difficulty (high)
  repetitions: 0,        // Never reviewed
  nextReview: tomorrow,  // Due immediately
}
```

### After First Review
Based on quality (0-5):
- Quality 0-2: Reset (interval = 1 day)
- Quality 3: interval = 1 day, easeFactor decreases
- Quality 4: interval = 1 day, easeFactor increases
- Quality 5: interval = 1 day, easeFactor increases more

### After Second Review
- Quality 0-2: Reset (interval = 1 day)
- Quality 3+: interval = 3 days

### After Third Review+
- Quality 0-2: Reset (interval = 1 day)
- Quality 3+: interval = previous * easeFactor

## Quality Scale Mapping

| Rating | Description | Meaning |
|--------|-------------|---------|
| 0 | Complete blackout | Totally forgot |
| 1 | Incorrect, hard effort | Barely recalled |
| 2 | Incorrect, easy recall | Wrong but easy |
| 3 | Correct, significant effort | Got it with difficulty |
| 4 | Correct, some hesitation | Pretty sure |
| 5 | Perfect, instant recall | Instant answer |

### Ease Factor Impact
```
Quality 0-2: Decrease ease (too hard)
Quality 3:   Slight decrease (barely okay)
Quality 4:   Increase ease (good)
Quality 5:   Increase ease more (perfect)
```

## Performance Characteristics

### Theoretical Forgetting Curve
- Day 1 (100% retention) → Review
- Day 1-3 (70% retention) → Review
- Day 3-7 (50% retention) → Review
- Day 7-30 (30% retention) → Review
- Day 30+ (10% retention) → Rare reviews

### User Effort Over Time
With SM-2:
- New cards: Every 1-3 days
- Learning phase: Every 3-30 days
- Mastery phase: Every 30-365 days
- Stable cards: Review 2-4x per year

## Customization Options

### Adjustable Parameters (Future)

User can configure:
```javascript
{
  initialEase: 2.5,      // Starting ease factor
  minEase: 1.3,          // Minimum ease
  maxEase: 2.5,          // Maximum ease
  easyBonus: 1.3,        // Multiplier for perfect (5)
  hardPenalty: 1.0,      // Multiplier for difficult (3)
  lapse: 0.6,            // Reset factor on lapse
  graduatingInterval: 1, // Days until next after #2
  easyInterval: 4,       // Days until next after #3
}
```

But for MVP: Use defaults only

## Upgrade Path

If empirical data shows issues:
1. Collect user review data
2. Analyze forgetting patterns
3. Fine-tune SM-2 parameters
4. Or switch to FSRS with historical data
5. User data can be migrated

## Testing SM-2

Before release:
- [ ] Test initial card review progression
- [ ] Verify ease factor boundaries (1.3-2.5)
- [ ] Check interval calculations
- [ ] Test edge cases (all 0s, all 5s)
- [ ] Verify localStorage persistence
- [ ] Test with varied quality ratings
- [ ] Measure computation time

## Conclusion

SM-2 provides:
- ✓ Optimal learning (scientific backing)
- ✓ Simple implementation
- ✓ Proven in millions of users
- ✓ Fast computation
- ✓ Offline-capable
- ✓ Room for optimization later

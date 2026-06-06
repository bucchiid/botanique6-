# Joke Generator Feature Guide

## Overview

The Joke Generator is a fun feature that fetches random jokes from the [JokeAPI](https://jokeapi.dev) and displays them to users. It supports multiple categories, favorites system, and copy-to-clipboard functionality.

## Features

✅ **Random Jokes** - Fetch jokes from JokeAPI in real-time
✅ **Multiple Categories** - General, Programming, Knock-knock, Dark, Pun jokes
✅ **Favorites System** - Save your favorite jokes with localStorage persistence
✅ **Copy to Clipboard** - Easily share jokes with others
✅ **Joke History** - Keep track of last 50 jokes viewed
✅ **Responsive Design** - Works on desktop and mobile
✅ **Loading States** - Visual feedback during API calls
✅ **Error Handling** - Graceful error messages with retry option

## Quick Start

### Basic Usage

```tsx
import { JokeGenerator } from './components/JokeGenerator/JokeGenerator';

function App() {
  return <JokeGenerator />;
}
```

### Using the Custom Hook

```tsx
import { useJokeGenerator } from './hooks/useJokeGenerator';

function MyComponent() {
  const {
    joke,
    loading,
    error,
    favorites,
    getJoke,
    addToFavorites,
    isFavorited
  } = useJokeGenerator();

  return (
    <div>
      <button onClick={() => getJoke('Programming')}>
        Get Programming Joke
      </button>
      {joke && <p>{joke.joke || `${joke.setup}\n${joke.delivery}`}</p>}
    </div>
  );
}
```

## Components

### JokeGenerator Component (`src/components/JokeGenerator/JokeGenerator.tsx`)

Main UI component for displaying and interacting with jokes.

**Features:**
- Category selector dropdown
- Get Joke button with loading state
- Favorites management
- Copy to clipboard functionality
- Joke history view
- Error handling with retry

**Props:** None (self-contained component)

### useJokeGenerator Hook (`src/hooks/useJokeGenerator.ts`)

Custom React hook for managing joke state and API calls.

**Options:**
```typescript
interface UseJokeGeneratorOptions {
  autoFetch?: boolean;  // Auto-fetch joke on mount
  category?: string;    // Default category (default: 'Any')
}
```

**Returns:**
```typescript
{
  joke: Joke | null;                           // Current joke
  loading: boolean;                             // API call in progress
  error: string | null;                         // Error message
  history: Joke[];                              // Last 50 jokes
  favorites: Joke[];                            // Saved favorites
  getJoke: (category?: string) => Promise<void>; // Fetch new joke
  addToFavorites: (joke?: Joke) => void;        // Add/remove favorite
  removeFavorite: (jokeId: string) => void;     // Remove specific favorite
  isFavorited: (jokeId: string) => boolean;     // Check if favorited
  clearHistory: () => void;                     // Clear history
  clearFavorites: () => void;                   // Clear all favorites
}
```

## API Service

### jokeApi.ts Service (`src/services/jokeApi.ts`)

Provides all API communication with JokeAPI.

**Functions:**

#### `fetchRandomJoke(category)`
```typescript
// Fetch a single random joke
const joke = await fetchRandomJoke('Programming');
// Returns: { id, setup, delivery, joke, type, category, safe }
```

#### `fetchMultipleJokes(count, category)`
```typescript
// Fetch multiple jokes at once
const jokes = await fetchMultipleJokes(5, 'General');
// Includes delay between requests to avoid rate limiting
```

#### `fetchCategories()`
```typescript
// Get available joke categories
const categories = await fetchCategories();
// Returns: ['General', 'Programming', 'Knock-knock', ...]
```

#### `formatJoke(joke)`
```typescript
// Format joke for display
const formatted = formatJoke(joke);
// Returns single or two-part formatted string
```

#### `formatJokeForShare(joke)`
```typescript
// Format joke for social media sharing
const shareText = formatJokeForShare(joke);
// Returns: "😂 Joke text\n\n#Joke #RandomJoke"
```

#### `checkApiHealth()`
```typescript
// Check if API is available
const isHealthy = await checkApiHealth();
```

## Joke Data Structure

```typescript
interface Joke {
  id: string;
  setup?: string;           // For two-part jokes
  delivery?: string;        // For two-part jokes
  joke?: string;            // For single-line jokes
  type: 'single' | 'twopart';
  category?: string;
  safe?: boolean;
}
```

## Categories

Available joke categories:
- **Any** - Random from all categories
- **General** - General/clean jokes
- **Programming** - Programming/developer jokes
- **Knock-knock** - Knock-knock jokes
- **Dark** - Dark humor
- **Pun** - Pun-based jokes

## localStorage Schema

### Favorites Storage

```json
[
  {
    "id": "12345-1686400000000",
    "setup": "Why do programmers prefer dark mode?",
    "delivery": "Because light attracts bugs!",
    "type": "twopart",
    "category": "Programming",
    "safe": true
  }
]
```

## Usage Examples

### Example 1: Simple Joke Button

```tsx
import { JokeGenerator } from './components/JokeGenerator/JokeGenerator';

export function App() {
  return <JokeGenerator />;
}
```

### Example 2: Programmatic Joke Fetching

```tsx
import { useJokeGenerator } from './hooks/useJokeGenerator';

function JokeWidget() {
  const { joke, loading, getJoke } = useJokeGenerator({
    autoFetch: true,
    category: 'Programming'
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {joke && <p>{joke.joke || `${joke.setup}\n${joke.delivery}`}</p>}
      <button onClick={() => getJoke()}>Next Joke</button>
    </div>
  );
}
```

### Example 3: Favorites Management

```tsx
import { useJokeGenerator } from './hooks/useJokeGenerator';

function FavoritesManager() {
  const { favorites, removeFavorite } = useJokeGenerator();

  return (
    <div>
      <h2>Favorites ({favorites.length})</h2>
      {favorites.map(joke => (
        <div key={joke.id}>
          <p>{joke.joke}</p>
          <button onClick={() => removeFavorite(joke.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

### Example 4: Copy Joke to Clipboard

```tsx
import { formatJokeForShare } from './services/jokeApi';

function CopyableJoke({ joke }) {
  const handleCopy = () => {
    const text = formatJokeForShare(joke);
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <p>{joke.joke}</p>
      <button onClick={handleCopy}>Copy to Share</button>
    </div>
  );
}
```

## API Details

### JokeAPI Endpoint

```
https://v2.jokeapi.dev/joke/[category]
```

**Supported Categories:**
- Any
- General
- Knock-knock
- Programming
- Dark
- Pun

**Query Parameters:**
- `format=json` - Response format
- `safe-mode` - Filter explicit content

**Rate Limiting:**
- No official rate limit documented
- 100ms delay added between requests in batch operations

## Error Handling

The component handles various error scenarios:

```tsx
try {
  const joke = await fetchRandomJoke(category);
} catch (error) {
  // API timeout
  // Network error
  // Invalid category
  // API error response
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance Considerations

- **Lazy Loading** - Jokes only fetched on user request
- **Batch Operations** - 100ms delay between requests to avoid rate limiting
- **History Limit** - Only last 50 jokes kept in memory
- **localStorage** - Async operations don't block UI

## Accessibility

- ✅ Keyboard navigation support
- ✅ Loading state feedback
- ✅ Error messages are clear
- ✅ Color not the only indicator
- ✅ ARIA labels on buttons

## Future Enhancements

### Planned Features
- ⏳ Joke sharing via social media
- ⏳ Dark mode support
- ⏳ Joke rating system
- ⏳ Daily joke notifications
- ⏳ Custom joke filters
- ⏳ Translation support

### Potential Improvements
- Add emoji reactions to jokes
- Implement offline support with cached jokes
- Add analytics for popular jokes
- Create joke collections/themes
- Add audio narration of jokes

## Troubleshooting

### API Not Responding

```typescript
// Check API health
const isHealthy = await checkApiHealth();
if (!isHealthy) {
  console.log('JokeAPI is currently unavailable');
}
```

### Favorites Not Persisting

- Check if localStorage is enabled in browser settings
- Check browser console for localStorage errors
- Verify localStorage quota not exceeded

### No Jokes Loading

- Check network connection
- Verify JokeAPI is accessible (https://jokeapi.dev)
- Check browser console for CORS errors
- Try a different category

## Contributing

To extend the joke generator:

1. Add new API services to `jokeApi.ts`
2. Create new UI components in `src/components/JokeGenerator/`
3. Add tests for new functionality
4. Update this documentation
5. Submit pull request

## License

Part of the Botanique project - MIT License

## Credits

Powered by [JokeAPI](https://jokeapi.dev) - A REST API for jokes!

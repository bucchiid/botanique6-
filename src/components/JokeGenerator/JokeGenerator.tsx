import React, { useState, useCallback } from 'react';
import { Loader, Copy, Check, RefreshCw, Heart } from 'lucide-react';
import './JokeGenerator.css';

interface Joke {
  id: string;
  setup?: string;
  delivery?: string;
  joke?: string;
  type: 'single' | 'twopart';
}

interface JokeGeneratorProps {
  houseMembers?: string[];
}

export const JokeGenerator: React.FC<JokeGeneratorProps> = ({ 
  houseMembers = [
    '🏠 Botanique Brussels Community',
    '👨‍💼 Marcus',
    '👩‍🎨 Sophie',
    '🧑‍💻 Alex',
    '👩‍🌾 Emma',
    '🧑‍🍳 Tom',
    '👨‍🎵 David',
    '🏠 Welcome to Our Home',
  ]
}) => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Joke[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Any');

  const categories = ['Any', 'General', 'Programming', 'Knock-knock', 'Dark', 'Pun'];

  const fetchJoke = useCallback(async (category: string = 'Any') => {
    setLoading(true);
    setError(null);
    try {
      const categoryParam = category === 'Any' ? '' : `/${category}`;
      const response = await fetch(
        `https://v2.jokeapi.dev/joke${categoryParam}?format=json`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || 'Could not fetch joke');
      }

      const newJoke: Joke = {
        id: `${Date.now()}-${Math.random()}`,
        setup: data.setup,
        delivery: data.delivery,
        joke: data.joke,
        type: data.type,
      };

      setJoke(newJoke);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while fetching the joke'
      );
      setJoke(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGenerateJoke = () => {
    fetchJoke(selectedCategory);
  };

  const handleCopyJoke = () => {
    if (!joke) return;

    const jokeText = joke.type === 'twopart'
      ? `${joke.setup}\n\n${joke.delivery}`
      : joke.joke || '';

    navigator.clipboard.writeText(jokeText);
    setCopiedId(joke.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddToFavorites = () => {
    if (!joke) return;

    const isFavorited = favorites.some(fav => fav.id === joke.id);
    
    if (isFavorited) {
      setFavorites(favorites.filter(fav => fav.id !== joke.id));
    } else {
      setFavorites([...favorites, joke]);
    }
  };

  const isFavorited = joke ? favorites.some(fav => fav.id === joke.id) : false;

  const renderJoke = (jokeData: Joke) => {
    if (jokeData.type === 'twopart') {
      return (
        <>
          <p className="joke-setup">{jokeData.setup}</p>
          <p className="joke-delivery">{jokeData.delivery}</p>
        </>
      );
    }
    return <p className="joke-text">{jokeData.joke}</p>;
  };

  return (
    <div className="joke-generator-container">
      {/* Animated Banner with House Members */}
      <div className="banner-container">
        <div className="banner-content">
          <div className="banner-scroll">
            {houseMembers.map((member, index) => (
              <span key={index} className="banner-item">
                {member}
                <span className="banner-separator">✨</span>
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {houseMembers.map((member, index) => (
              <span key={`duplicate-${index}`} className="banner-item">
                {member}
                <span className="banner-separator">✨</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="joke-header">
        <div className="header-content">
          <h1>😂 Botanique Joke Room</h1>
          <p className="subtitle">Bringing laughter to our Brussels community! 🌿</p>
        </div>
        <div className="header-decoration">
          <div className="leaf leaf-1">🌿</div>
          <div className="leaf leaf-2">🍃</div>
          <div className="leaf leaf-3">🌱</div>
        </div>
      </div>

      <div className="joke-controls">
        <div className="category-selector">
          <label htmlFor="category">Pick Your Vibe:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
            disabled={loading}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'Any' ? '🎲 Any' : `${cat}`}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn-generate"
          onClick={handleGenerateJoke}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader size={20} className="spinner" /> Fetching...
            </>
          ) : (
            <>
              <RefreshCw size={20} /> Get Joke
            </>
          )}
        </button>

        <button
          className="btn-favorites"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <Heart size={20} /> Saved ({favorites.length})
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
          <button onClick={handleGenerateJoke} className="error-retry">
            Try Again
          </button>
        </div>
      )}

      {showFavorites ? (
        <div className="favorites-section">
          <h2>❤️ Your Saved Jokes ({favorites.length})</h2>
          {favorites.length > 0 ? (
            <div className="favorites-list">
              {favorites.map((fav) => (
                <div key={fav.id} className="favorite-item">
                  {renderJoke(fav)}
                  <button
                    className="btn-remove-favorite"
                    onClick={() => setFavorites(favorites.filter(f => f.id !== fav.id))}
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-favorites">No saved jokes yet. Start saving your favorites! 🤭</p>
          )}
          <button 
            className="btn-back-to-jokes"
            onClick={() => setShowFavorites(false)}
          >
            ← Back to Jokes
          </button>
        </div>
      ) : (
        joke && (
          <div className="joke-display">
            <div className="joke-card">
              <div className="joke-content">
                {renderJoke(joke)}
              </div>

              <div className="joke-actions">
                <button
                  className={`btn-favorite ${isFavorited ? 'favorited' : ''}`}
                  onClick={handleAddToFavorites}
                  title={isFavorited ? 'Remove from saved' : 'Save this joke'}
                >
                  <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                  {isFavorited ? 'Saved!' : 'Save'}
                </button>

                <button
                  className="btn-copy"
                  onClick={handleCopyJoke}
                >
                  {copiedId === joke.id ? (
                    <>
                      <Check size={20} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={20} /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              className="btn-next-joke"
              onClick={handleGenerateJoke}
              disabled={loading}
            >
              🎲 Next Joke
            </button>
          </div>
        )
      )}

      {!joke && !showFavorites && !loading && !error && (
        <div className="empty-state">
          <div className="empty-icon-container">
            <span className="empty-icon">😄</span>
            <span className="empty-leaf-1">🌿</span>
            <span className="empty-leaf-2">🍃</span>
          </div>
          <p>Ready for a laugh? Click "Get Joke" to start! 👇</p>
          <p className="empty-subtitle">Brought to you by the Botanique community 🏠</p>
        </div>
      )}

      <div className="joke-footer">
        <div className="footer-content">
          <p>Powered by <a href="https://jokeapi.dev" target="_blank" rel="noopener noreferrer">JokeAPI</a></p>
          <p>Made with 💚 for Botanique Brussels</p>
        </div>
        <div className="footer-decoration">
          <span>🌿</span>
          <span>🌱</span>
          <span>🍃</span>
        </div>
      </div>
    </div>
  );
};

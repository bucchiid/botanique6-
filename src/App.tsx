import React, { useState } from 'react';
import { Calendar } from './components/Calendar/Calendar';
import { JokeGenerator } from './components/JokeGenerator/JokeGenerator';
import { useCalendarTasks } from './hooks/useCalendarTasks';
import './App.css';

function App() {
  const { tasks, addTask, deleteTask } = useCalendarTasks();
  const [currentPage, setCurrentPage] = useState<'calendar' | 'jokes' | 'home'>('calendar');

  const houseMembers = [
    '🏠 Botanique Brussels',
    '👨‍💼 Marcus',
    '👩‍🎨 Sophie',
    '🧑‍💻 Alex',
    '👩‍🌾 Emma',
    '🧑‍🍳 Tom',
    '👨‍🎵 David',
  ];

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navigation-bar">
        <div className="nav-content">
          <h1 className="nav-title">🌿 Botanique</h1>
          <div className="nav-buttons">
            <button
              className={`nav-button ${currentPage === 'calendar' ? 'active' : ''}`}
              onClick={() => setCurrentPage('calendar')}
            >
              📅 Calendar
            </button>
            <button
              className={`nav-button ${currentPage === 'jokes' ? 'active' : ''}`}
              onClick={() => setCurrentPage('jokes')}
            >
              😂 Jokes
            </button>
            <button
              className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              🏠 Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {currentPage === 'calendar' && (
          <div className="page-content">
            <Calendar 
              tasks={tasks}
              onTaskAdd={addTask}
              onTaskDelete={deleteTask}
            />
          </div>
        )}

        {currentPage === 'jokes' && (
          <div className="page-content">
            <JokeGenerator houseMembers={houseMembers} />
          </div>
        )}

        {currentPage === 'home' && (
          <div className="home-page">
            <div className="home-banner">
              <h1>🌿 Botanique</h1>
              <p>Your Brussels Community Hub</p>
              <p className="subtitle">Home Organization, Tasks & Fun</p>
            </div>

            <div className="home-content">
              <div className="features-grid">
                <div 
                  className="feature-card"
                  onClick={() => setCurrentPage('calendar')}
                >
                  <div className="feature-icon">📅</div>
                  <h2>Calendar & Tasks</h2>
                  <p>Manage household tasks, trash collection schedules, and community events. Download to your phone calendar!</p>
                  <button className="feature-button">Open Calendar</button>
                </div>

                <div 
                  className="feature-card jokes"
                  onClick={() => setCurrentPage('jokes')}
                >
                  <div className="feature-icon">😂</div>
                  <h2>Joke Room</h2>
                  <p>Get random jokes with our community and save your favorites</p>
                  <button className="feature-button">Get Jokes</button>
                </div>
              </div>

              <div className="community-section">
                <h2>👥 Our Community</h2>
                <div className="members-list">
                  {houseMembers.map((member, index) => (
                    <div key={index} className="member-badge">
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <footer className="home-footer">
              <p>Made with 💚 for Botanique Brussels</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

// Session configurations
const DEFAULT_SESSIONS = {
  FOCUS: { label: 'Focus', time: 25 },
  SHORT_BREAK: { label: 'Short Break', time: 5 },
  LONG_BREAK: { label: 'Long Break', time: 15 }
};

// Motivational quotes
const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It's not about having time, it's about making time.", author: "Unknown" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Your focus determines your reality.", author: "Qui-Gon Jinn" },
  { text: "Concentrate all your thoughts upon the work at hand.", author: "Alexander Graham Bell" },
  { text: "Where focus goes, energy flows.", author: "Tony Robbins" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Small progress is still progress.", author: "Unknown" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Work hard in silence, let success make the noise.", author: "Frank Ocean" },
  { text: "Dreams don't work unless you do.", author: "John C. Maxwell" }
];

// 24 Ambient sounds - High-quality real-world audio samples from stable CDNs
const AMBIENT_SOUNDS = [
  { id: 'rain', label: 'Heavy Rain', icon: '🌧️', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/rain.mp3' },
  { id: 'thunder', label: 'Thunder', icon: '⛈️', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/thunder.mp3' },
  { id: 'ocean', label: 'Ocean Waves', icon: '🌊', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/waves.mp3' },
  { id: 'forest', label: 'Windy Leaves', icon: '🌲', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/leaves.mp3' },
  { id: 'birds', label: 'Birds', icon: '🐦', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/birds.mp3' },
  { id: 'wind', label: 'Howling Wind', icon: '💨', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/wind.mp3' },
  { id: 'fire', label: 'Campfire', icon: '🔥', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/fire.mp3' },
  { id: 'night', label: 'Crickets', icon: '🌙', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/crickets.mp3' },
  { id: 'frogs', label: 'Frog Lake', icon: '🐸', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/frogs.mp3' },
  { id: 'cafe', label: 'Busy Cafe', icon: '☕', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/cafe.mp3' },
  { id: 'street', label: 'City Street', icon: '🏙️', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/street.mp3' },
  { id: 'airplane', label: 'Airplane', icon: '✈️', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/airplane.mp3' },
  { id: 'train', label: 'Train Ride', icon: '🚂', url: 'https://raw.githubusercontent.com/rafaelcastrocouto/ambient-sounds/master/sounds/train.mp3' },
  { id: 'clock', label: 'Clock', icon: '⏰', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/clock.mp3' },
  { id: 'typewriter', label: 'Typewriter', icon: '⌨️', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/typewriter.mp3' },
  { id: 'purr', label: 'Cat Purring', icon: '🐱', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/purr.mp3' },
  { id: 'fan', label: 'Electric Fan', icon: '�', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/fan.mp3' },
  { id: 'library', label: 'Library', icon: '📚', url: 'https://archive.org/download/library-ambience-loop/library-ambience-loop.mp3' },
  { id: 'waterfall', label: 'Waterfall', icon: '�', url: 'https://archive.org/download/waterfall-loop-audio/waterfall-loop-audio.mp3' },
  { id: 'river', label: 'River', icon: '🏞️', url: 'https://raw.githubusercontent.com/rafaelcastrocouto/ambient-sounds/master/sounds/river.mp3' },
  { id: 'lofi', label: 'Lo-Fi Beats', icon: '🎵', url: 'https://archive.org/download/lofi-beats-loop/lofi-beats-loop.mp3' },
  { id: 'piano', label: 'Zen Piano', icon: '🎹', url: 'https://archive.org/download/zen-piano-loop/zen-piano-loop.mp3' },
  { id: 'white', label: 'White Noise', icon: '📻', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/white.mp3' },
  { id: 'brown', label: 'Brown Noise', icon: '🟤', url: 'https://raw.githubusercontent.com/ebraminio/ambient/master/sounds/brown.mp3' }
];

// Themes
const THEMES = [
  { id: 'emerald', name: 'Emerald' },
  { id: 'ocean', name: 'Ocean' },
  { id: 'sunset', name: 'Sunset' },
  { id: 'purple', name: 'Purple' },
  { id: 'rose', name: 'Rose' },
  { id: 'mint', name: 'Mint' },
  { id: 'gold', name: 'Gold' },
  { id: 'nord', name: 'Nord' },
  { id: 'dracula', name: 'Dracula' }
];

// Animation styles
const ANIMATIONS = [
  { id: 'orbs', name: 'Orbs' },
  { id: 'gradient', name: 'Gradient' },
  { id: 'particles', name: 'Particles' },
  { id: 'waves', name: 'Waves' },
  { id: 'aurora', name: 'Aurora' },
  { id: 'geometric', name: 'Geometric' },
  { id: 'matrix', name: 'Matrix' },
  { id: 'none', name: 'None' }
];

// Background images (using gradient placeholders - replace with real images)
const BACKGROUNDS = [
  { id: 'none', name: 'None', gradient: 'transparent' },
  { id: 'mountain', name: 'Mountain', gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
  { id: 'forest', name: 'Forest', gradient: 'linear-gradient(135deg, #0d1b0d 0%, #1a3a1a 50%, #2d5a2d 100%)' },
  { id: 'ocean', name: 'Ocean', gradient: 'linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #2a5a8c 100%)' },
  { id: 'sunset', name: 'Sunset', gradient: 'linear-gradient(135deg, #1a0a1a 0%, #3a1a2a 50%, #5a2a3a 100%)' },
  { id: 'night', name: 'Night Sky', gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a2a 100%)' },
  { id: 'aurora', name: 'Aurora', gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a3a3a 50%, #0a2a1a 100%)' },
  { id: 'desert', name: 'Desert', gradient: 'linear-gradient(135deg, #1a1510 0%, #3a2a1a 50%, #5a4a2a 100%)' },
  { id: 'space', name: 'Space', gradient: 'linear-gradient(135deg, #050510 0%, #0a0a20 50%, #050515 100%)' },
  { id: 'rain', name: 'Rainy', gradient: 'linear-gradient(135deg, #101520 0%, #202530 50%, #151a25 100%)' }
];

// Alert sounds
const ALERT_SOUNDS = [
  { id: 'gong', label: 'Gong', icon: '🔔' },
  { id: 'bird', label: 'Bird', icon: '🐦' },
  { id: 'beep', label: 'Digital', icon: '📱' },
  { id: 'bell', label: 'Bell', icon: '🔔' },
  { id: 'chime', label: 'Chime', icon: '🎐' },
  { id: 'singing', label: 'Bowl', icon: '🥣' }
];

function App() {
  // Timer state
  const [session, setSession] = useState('FOCUS');
  const [sessions, setSessions] = useState(DEFAULT_SESSIONS);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSIONS.FOCUS.time * 60);
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(DEFAULT_SESSIONS.FOCUS.time * 60);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState(['tasks', 'sounds']);
  const [fullscreenMode, setFullscreenMode] = useState(false);

  // Features state
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [activeTodoId, setActiveTodoId] = useState(null);
  const [quote, setQuote] = useState(QUOTES[0]);

  // Settings state
  const [theme, setTheme] = useState('emerald');
  const [animation, setAnimation] = useState('orbs');
  const [background, setBackground] = useState('none');
  const [ambientSound, setAmbientSound] = useState(null);
  const [ambientVolume, setAmbientVolume] = useState(0.5);
  const [alertSound, setAlertSound] = useState('gong');
  const [autoTransition, setAutoTransition] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    todayPomodoros: 0,
    weekPomodoros: 0,
    totalMinutes: 0,
    streak: 0
  });

  // Refs
  const audioContextRef = useRef(null);
  const ambientNodesRef = useRef([]);
  const gainNodeRef = useRef(null);

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('zenspace-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.sessions) setSessions(data.sessions);
      if (data.todos) setTodos(data.todos);
      if (data.theme) setTheme(data.theme);
      if (data.animation) setAnimation(data.animation);
      if (data.background) setBackground(data.background);
      if (data.alertSound) setAlertSound(data.alertSound);
      if (data.autoTransition !== undefined) setAutoTransition(data.autoTransition);
      if (data.ambientVolume !== undefined) setAmbientVolume(data.ambientVolume);
      if (data.stats) setStats(data.stats);
    }
    generateQuote();
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const data = {
      sessions,
      todos,
      theme,
      animation,
      background,
      alertSound,
      autoTransition,
      ambientVolume,
      stats
    };
    localStorage.setItem('zenspace-data', JSON.stringify(data));
  }, [sessions, todos, theme, animation, background, alertSound, autoTransition, ambientVolume, stats]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
      });
    } else if (Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
  }, []);

  // Generate random quote
  const generateQuote = useCallback(() => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  // Play alert sound
  const playAlertSound = useCallback(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    switch (alertSound) {
      case 'gong':
        oscillator.frequency.setValueAtTime(150, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 2);
        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
        oscillator.type = 'sine';
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 2);
        break;
      case 'bird':
        oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
        oscillator.frequency.setValueAtTime(1200, ctx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        oscillator.type = 'sine';
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.5);
        break;
      case 'beep':
        oscillator.frequency.setValueAtTime(880, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        oscillator.type = 'square';
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.8);
        break;
      case 'bell':
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 1);
        gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
        oscillator.type = 'sine';
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 1.5);
        break;
      case 'chime':
        oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
        oscillator.frequency.setValueAtTime(1600, ctx.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(1400, ctx.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        oscillator.type = 'sine';
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.8);
        break;
      case 'singing':
        oscillator.frequency.setValueAtTime(256, ctx.currentTime);
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 5;
        lfoGain.gain.value = 10;
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator.frequency);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);
        oscillator.type = 'sine';
        lfo.start(ctx.currentTime);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 3);
        break;
      default:
        oscillator.frequency.setValueAtTime(440, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.5);
    }
  }, [alertSound]);

  // Send browser notification
  const sendNotification = useCallback((title, body) => {
    if (notificationsEnabled && document.hidden) {
      new Notification(title, { body, icon: '🍅', tag: 'pomodoro' });
    }
  }, [notificationsEnabled]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      playAlertSound();

      // Update stats
      if (session === 'FOCUS') {
        setStats(prev => ({
          ...prev,
          todayPomodoros: prev.todayPomodoros + 1,
          weekPomodoros: prev.weekPomodoros + 1,
          totalMinutes: prev.totalMinutes + sessions.FOCUS.time
        }));
      }

      sendNotification(
        `${sessions[session].label} Complete!`,
        session === 'FOCUS' ? 'Time for a break!' : 'Ready to focus again?'
      );
      generateQuote();

      // Auto transition
      if (autoTransition) {
        setTimeout(() => {
          if (session === 'FOCUS') {
            changeSession('SHORT_BREAK');
            setIsActive(true);
          } else {
            changeSession('FOCUS');
            setIsActive(true);
          }
        }, 2000);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, session, sessions, playAlertSound, sendNotification, generateQuote, autoTransition]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          setIsActive(prev => !prev);
          break;
        case 'KeyR':
          e.preventDefault();
          resetTimer();
          break;
        case 'KeyF':
          e.preventDefault();
          setFullscreenMode(prev => !prev);
          break;
        case 'KeyM':
          e.preventDefault();
          setSidebarOpen(prev => !prev);
          break;
        case 'Digit1':
          e.preventDefault();
          changeSession('FOCUS');
          break;
        case 'Digit2':
          e.preventDefault();
          changeSession('SHORT_BREAK');
          break;
        case 'Digit3':
          e.preventDefault();
          changeSession('LONG_BREAK');
          break;
        case 'Escape':
          if (fullscreenMode) setFullscreenMode(false);
          if (sidebarOpen) setSidebarOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenMode, sidebarOpen]);

  // Create ambient sound - Full real-world audio samples
  const createAmbientSound = useCallback((soundId) => {
    // Stop and clean up all previous audio/intervals
    ambientNodesRef.current.forEach(node => {
      try {
        if (node.pause) node.pause();
        if (node.stop) node.stop();
        if (node.clear) clearInterval(node.intervalId);
      } catch (e) { }
    });
    ambientNodesRef.current = [];

    if (!soundId) {
      setAmbientSound(null);
      return;
    }

    const sound = AMBIENT_SOUNDS.find(s => s.id === soundId);
    if (!sound || !sound.url) {
      console.warn("Sound URL not found for", soundId);
      setAmbientSound(null);
      return;
    }

    // Initialize and play real-world audio sample
    const audio = new Audio(sound.url);
    audio.loop = true;
    audio.volume = ambientVolume;

    // Attempt to play
    audio.play().catch(error => {
      console.error("Playback failed. This is often due to browser autoplay policies or invalid URLs:", error);
    });

    ambientNodesRef.current.push(audio);
    setAmbientSound(soundId);
  }, [ambientVolume]);

  // Update ambient volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = ambientVolume;
    }
    // Also update any playing Audio elements (URL-based sounds)
    ambientNodesRef.current.forEach(node => {
      if (node instanceof Audio) {
        node.volume = ambientVolume;
      }
    });
  }, [ambientVolume]);

  // Timer controls
  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    const time = sessions[session].time * 60;
    setTimeLeft(time);
    setInitialTime(time);
  };

  const changeSession = (type) => {
    setSession(type);
    const time = sessions[type].time * 60;
    setTimeLeft(time);
    setInitialTime(time);
    setIsActive(false);
    generateQuote();
  };

  const updateSessionTime = (type, minutes) => {
    const newTime = Math.max(1, Math.min(120, parseInt(minutes) || 1));
    setSessions(prev => ({
      ...prev,
      [type]: { ...prev[type], time: newTime }
    }));
    if (session === type && !isActive) {
      setTimeLeft(newTime * 60);
      setInitialTime(newTime * 60);
    }
  };

  // Section toggle
  const toggleSection = (sectionId) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Todo functions
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = { id: Date.now(), text: newTodo.trim(), completed: false };
      setTodos(prev => [...prev, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    if (activeTodoId === id) setActiveTodoId(null);
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress calculation
  const progress = ((initialTime - timeLeft) / initialTime) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Generate particles for animation
  const renderParticles = () => {
    return Array(20).fill(0).map((_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${10 + Math.random() * 10}s`
        }}
      />
    ));
  };

  // Generate matrix columns
  const renderMatrix = () => {
    return Array(30).fill(0).map((_, i) => (
      <div
        key={i}
        className="matrix-column"
        style={{
          left: `${i * 3.33}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${5 + Math.random() * 10}s`
        }}
      >
        {Array(20).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('')}
      </div>
    ));
  };

  return (
    <div className={fullscreenMode ? 'fullscreen-mode' : ''}>
      {/* Background */}
      <div
        className="background-layer"
        style={{ background: BACKGROUNDS.find(b => b.id === background)?.gradient }}
      />
      <div className="background-overlay" />

      {/* Animated Background */}
      <div className="animated-bg">
        {animation === 'orbs' && (
          <div className="floating-orbs">
            <div className="orb"></div>
            <div className="orb"></div>
            <div className="orb"></div>
          </div>
        )}
        {animation === 'gradient' && <div className="gradient-flow"></div>}
        {animation === 'particles' && <div className="particles">{renderParticles()}</div>}
        {animation === 'waves' && (
          <div className="waves">
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        )}
        {animation === 'aurora' && <div className="aurora"></div>}
        {animation === 'geometric' && (
          <div className="geometric">
            <div className="geo-shape" style={{ borderRadius: '0' }}></div>
            <div className="geo-shape" style={{ borderRadius: '50%' }}></div>
            <div className="geo-shape" style={{ borderRadius: '30%' }}></div>
          </div>
        )}
        {animation === 'matrix' && <div className="matrix-rain">{renderMatrix()}</div>}
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-badge">
          <span className="icon">🍅</span>
          <span>Today: <span className="value">{stats.todayPomodoros}</span></span>
        </div>
        <div className="stat-badge">
          <span className="icon">📅</span>
          <span>Week: <span className="value">{stats.weekPomodoros}</span></span>
        </div>
      </div>

      {/* Menu Toggle */}
      <button
        className={`menu-toggle ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar Backdrop */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Tasks Section */}
        <div className="sidebar-section">
          <div
            className={`section-header ${openSections.includes('tasks') ? 'open' : ''}`}
            onClick={() => toggleSection('tasks')}
          >
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              Tasks
            </h3>
            <svg className="section-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`section-content ${openSections.includes('tasks') ? 'open' : ''}`}>
            <div className="todo-input-container">
              <input
                type="text"
                className="todo-input"
                placeholder="Add a task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              />
              <button className="add-btn" onClick={addTodo}>+</button>
            </div>
            <div className="todo-list">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className={`todo-item ${todo.completed ? 'completed' : ''} ${activeTodoId === todo.id ? 'active' : ''}`}
                  onClick={() => setActiveTodoId(activeTodoId === todo.id ? null : todo.id)}
                >
                  <div
                    className="todo-checkbox"
                    onClick={(e) => { e.stopPropagation(); toggleTodo(todo.id); }}
                  >
                    {todo.completed && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="todo-text">{todo.text}</span>
                  <span className="todo-delete" onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>✕</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sounds Section */}
        <div className="sidebar-section">
          <div
            className={`section-header ${openSections.includes('sounds') ? 'open' : ''}`}
            onClick={() => toggleSection('sounds')}
          >
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
              Ambient Sounds
            </h3>
            <svg className="section-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`section-content ${openSections.includes('sounds') ? 'open' : ''}`}>
            <div className="sounds-grid">
              {AMBIENT_SOUNDS.map(sound => (
                <button
                  key={sound.id}
                  className={`sound-btn ${ambientSound === sound.id ? 'active' : ''}`}
                  onClick={() => createAmbientSound(ambientSound === sound.id ? null : sound.id)}
                  title={sound.label}
                >
                  <span className="sound-icon">{sound.icon}</span>
                  {sound.label}
                </button>
              ))}
            </div>
            <div className="volume-container">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              </svg>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.05"
                value={ambientVolume}
                onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Themes Section */}
        <div className="sidebar-section">
          <div
            className={`section-header ${openSections.includes('themes') ? 'open' : ''}`}
            onClick={() => toggleSection('themes')}
          >
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
              Themes
            </h3>
            <svg className="section-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`section-content ${openSections.includes('themes') ? 'open' : ''}`}>
            <div className="theme-grid">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  className={`theme-btn ${theme === t.id ? 'active' : ''}`}
                  data-theme={t.id}
                  onClick={() => setTheme(t.id)}
                  title={t.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Animations Section */}
        <div className="sidebar-section">
          <div
            className={`section-header ${openSections.includes('animations') ? 'open' : ''}`}
            onClick={() => toggleSection('animations')}
          >
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Animations
            </h3>
            <svg className="section-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`section-content ${openSections.includes('animations') ? 'open' : ''}`}>
            <div className="animation-grid">
              {ANIMATIONS.map(a => (
                <button
                  key={a.id}
                  className={`animation-btn ${animation === a.id ? 'active' : ''}`}
                  onClick={() => setAnimation(a.id)}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Backgrounds Section */}
        <div className="sidebar-section">
          <div
            className={`section-header ${openSections.includes('backgrounds') ? 'open' : ''}`}
            onClick={() => toggleSection('backgrounds')}
          >
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              Backgrounds
            </h3>
            <svg className="section-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`section-content ${openSections.includes('backgrounds') ? 'open' : ''}`}>
            <div className="bg-images-grid">
              {BACKGROUNDS.map(bg => (
                <button
                  key={bg.id}
                  className={`bg-image-btn ${background === bg.id ? 'active' : ''}`}
                  style={{ background: bg.gradient }}
                  onClick={() => setBackground(bg.id)}
                >
                  <span>{bg.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timer Settings Section */}
        <div className="sidebar-section">
          <div
            className={`section-header ${openSections.includes('timer') ? 'open' : ''}`}
            onClick={() => toggleSection('timer')}
          >
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Timer Settings
            </h3>
            <svg className="section-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`section-content ${openSections.includes('timer') ? 'open' : ''}`}>
            <div className="setting-row">
              <span className="setting-label">Focus (min)</span>
              <input type="number" className="setting-input" value={sessions.FOCUS.time} onChange={(e) => updateSessionTime('FOCUS', e.target.value)} min="1" max="120" />
            </div>
            <div className="setting-row">
              <span className="setting-label">Short Break</span>
              <input type="number" className="setting-input" value={sessions.SHORT_BREAK.time} onChange={(e) => updateSessionTime('SHORT_BREAK', e.target.value)} min="1" max="120" />
            </div>
            <div className="setting-row">
              <span className="setting-label">Long Break</span>
              <input type="number" className="setting-input" value={sessions.LONG_BREAK.time} onChange={(e) => updateSessionTime('LONG_BREAK', e.target.value)} min="1" max="120" />
            </div>
            <div className="setting-row">
              <span className="setting-label">Auto Transition</span>
              <div className={`toggle-switch ${autoTransition ? 'active' : ''}`} onClick={() => setAutoTransition(!autoTransition)} />
            </div>
          </div>
        </div>

        {/* Alert Sounds Section */}
        <div className="sidebar-section">
          <div
            className={`section-header ${openSections.includes('alerts') ? 'open' : ''}`}
            onClick={() => toggleSection('alerts')}
          >
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              Alert Sound
            </h3>
            <svg className="section-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`section-content ${openSections.includes('alerts') ? 'open' : ''}`}>
            <div className="alert-sounds">
              {ALERT_SOUNDS.map(sound => (
                <button
                  key={sound.id}
                  className={`alert-btn ${alertSound === sound.id ? 'active' : ''}`}
                  onClick={() => { setAlertSound(sound.id); }}
                >
                  {sound.icon} {sound.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="sidebar-section">
          <div
            className={`section-header ${openSections.includes('stats') ? 'open' : ''}`}
            onClick={() => toggleSection('stats')}
          >
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              Statistics
            </h3>
            <svg className="section-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`section-content ${openSections.includes('stats') ? 'open' : ''}`}>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.todayPomodoros}</div>
                <div className="stat-label">Today</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.weekPomodoros}</div>
                <div className="stat-label">This Week</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.totalMinutes}</div>
                <div className="stat-label">Total Minutes</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{Math.floor(stats.totalMinutes / 60)}h</div>
                <div className="stat-label">Hours Focused</div>
              </div>
            </div>
          </div>
        </div>

        {/* Shortcuts Section */}
        <div className="sidebar-section">
          <div
            className={`section-header ${openSections.includes('shortcuts') ? 'open' : ''}`}
            onClick={() => toggleSection('shortcuts')}
          >
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"></path>
              </svg>
              Shortcuts
            </h3>
            <svg className="section-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`section-content ${openSections.includes('shortcuts') ? 'open' : ''}`}>
            <div className="shortcuts-list">
              <div className="shortcut-row"><span className="shortcut-key">Space</span><span>Start/Pause</span></div>
              <div className="shortcut-row"><span className="shortcut-key">R</span><span>Reset</span></div>
              <div className="shortcut-row"><span className="shortcut-key">F</span><span>Fullscreen</span></div>
              <div className="shortcut-row"><span className="shortcut-key">M</span><span>Menu</span></div>
              <div className="shortcut-row"><span className="shortcut-key">1-3</span><span>Sessions</span></div>
              <div className="shortcut-row"><span className="shortcut-key">Esc</span><span>Close</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="app-container">
        <div className="main-content">
          <div className="glass-card timer-card fade-in">
            <h1 className="timer-title">Zen Space</h1>

            {/* Session Tabs */}
            <div className="session-tabs">
              {Object.keys(sessions).map((type) => (
                <button
                  key={type}
                  className={`session-tab ${session === type ? 'active' : ''}`}
                  onClick={() => changeSession(type)}
                >
                  {sessions[type].label}
                </button>
              ))}
            </div>

            {/* Progress Ring */}
            <div className="progress-ring-container">
              <svg className="progress-ring" width="280" height="280">
                <circle className="progress-ring-bg" cx="140" cy="140" r="120" />
                <circle
                  className="progress-ring-fill"
                  cx="140"
                  cy="140"
                  r="120"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className={`timer-display ${isActive ? 'pulse' : ''}`}>
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Active Task */}
            {activeTodoId && (
              <div style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Working on: <strong style={{ color: 'var(--accent-primary)' }}>
                  {todos.find(t => t.id === activeTodoId)?.text}
                </strong>
              </div>
            )}

            {/* Controls */}
            <div className="controls">
              <button className={`control-btn ${!isActive ? 'primary' : ''}`} onClick={toggleTimer}>
                {isActive ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    Start
                  </>
                )}
              </button>
              <button className="control-btn" onClick={resetTimer}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                  <path d="M3 21v-5h5"></path>
                </svg>
                Reset
              </button>
            </div>

            {/* Quote */}
            <div className="quote-container">
              <p className="quote-text">"{quote.text}"</p>
              <p className="quote-author">— {quote.author}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Button */}
      <button className="control-btn fullscreen" onClick={() => setFullscreenMode(true)} title="Fullscreen (F)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      </button>

      {/* Exit Fullscreen Button */}
      {fullscreenMode && (
        <button className="exit-fullscreen" onClick={() => setFullscreenMode(false)}>
          Exit Fullscreen (Esc)
        </button>
      )}
    </div>
  );
}

export default App;

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

// 24 Ambient sounds - Mixed high-quality samples and synthesized sounds
const AMBIENT_SOUNDS = [
  { id: 'rain', label: 'Rain', icon: '🌧️', url: 'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg' },
  { id: 'thunder', label: 'Thunder', icon: '⛈️', url: 'https://actions.google.com/sounds/v1/weather/rolling_thunder.ogg' },
  { id: 'ocean', label: 'Ocean', icon: '🌊', url: 'https://actions.google.com/sounds/v1/water/crashing_waves.ogg' },
  { id: 'forest', label: 'Forest', icon: '🌲', url: 'https://actions.google.com/sounds/v1/ambiences/forest_ambience.ogg' },
  { id: 'birds', label: 'Birds', icon: '🐦', url: 'https://actions.google.com/sounds/v1/animals/bird_sounds.ogg' },
  { id: 'wind', label: 'Wind', icon: '💨', url: 'https://actions.google.com/sounds/v1/weather/wind.ogg' },
  { id: 'fire', label: 'Fire', icon: '🔥', url: 'https://actions.google.com/sounds/v1/ambiences/campfire.ogg' },
  { id: 'night', label: 'Night', icon: '🌙', url: 'https://actions.google.com/sounds/v1/ambiences/night_sounds.ogg' },
  { id: 'cafe', label: 'Cafe', icon: '☕', url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg' },
  { id: 'whitenoise', label: 'White', icon: '📻' },
  { id: 'pinknoise', label: 'Pink', icon: '🎀' },
  { id: 'brownnoise', label: 'Brown', icon: '🟤' },
  { id: 'train', label: 'Train', icon: '🚂' },
  { id: 'river', label: 'River', icon: '🏞️' },
  { id: 'waterfall', label: 'Waterfall', icon: '💧' },
  { id: 'lofi', label: 'Lo-Fi', icon: '🎵' },
  { id: 'piano', label: 'Piano', icon: '🎹' },
  { id: 'space', label: 'Space', icon: '🌌' },
  { id: 'tibetan', label: 'Tibetan', icon: '🔔' },
  { id: 'binaural', label: 'Binaural', icon: '🧠' },
  { id: 'heartbeat', label: 'Heart', icon: '❤️' },
  { id: 'keyboard', label: 'Typing', icon: '⌨️' },
  { id: 'fan', label: 'Fan', icon: '🌀' },
  { id: 'underwater', label: 'Underwater', icon: '🫧' }
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

  // Create ambient sound - Detailed and realistic sound generation
  const createAmbientSound = useCallback((soundId) => {
    // Stop existing sounds and intervals
    ambientNodesRef.current.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.pause) node.pause();
        if (node.clear) clearInterval(node.intervalId);
      } catch (e) { }
    });
    ambientNodesRef.current = [];

    if (!soundId) {
      setAmbientSound(null);
      return;
    }

    const sound = AMBIENT_SOUNDS.find(s => s.id === soundId);
    if (!sound) return;

    // Use external high-quality sample if available
    if (sound.url) {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.volume = ambientVolume;
      audio.play().catch(e => console.error("Audio playback failed", e));
      ambientNodesRef.current.push(audio);
      setAmbientSound(soundId);
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current;

    // Master gain
    gainNodeRef.current = ctx.createGain();
    gainNodeRef.current.gain.value = ambientVolume;
    gainNodeRef.current.connect(ctx.destination);

    // Helper: Create filtered noise
    const createNoise = (filterFreq, filterType = 'lowpass', gain = 1) => {
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = filterFreq;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = gain;

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(gainNodeRef.current);
      noise.start();
      ambientNodesRef.current.push(noise);
      return { noise, filter, gain: noiseGain };
    };

    // Helper: Create oscillator tone
    const createTone = (freq, type = 'sine', gain = 0.2) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      const oscGain = ctx.createGain();
      oscGain.gain.value = gain;
      osc.connect(oscGain);
      oscGain.connect(gainNodeRef.current);
      osc.start();
      ambientNodesRef.current.push(osc);
      return { osc, gain: oscGain };
    };

    // Sound-specific generation
    switch (soundId) {

      // 🌧️ RAIN - Realistic rain with surface hit sounds (patter)
      case 'rain': {
        // 1. Base hum - The sound of rain falling in the distance
        createNoise(400, 'lowpass', 0.2);
        createNoise(1500, 'bandpass', 0.1);

        // 2. High-frequency hiss - The constant mist sound
        createNoise(8000, 'highpass', 0.05);

        // 3. Droplet Layer - Simulating raindrops hitting a surface
        const rainInterval = setInterval(() => {
          if (!audioContextRef.current) return;

          // Generate multiple mini-splashes for density
          const numDrops = 2 + Math.floor(Math.random() * 3);
          for (let i = 0; i < numDrops; i++) {
            const delay = Math.random() * 0.05;

            setTimeout(() => {
              if (!audioContextRef.current) return;

              // Create a short burst of noise for the "hit"
              const osc = ctx.createOscillator();
              const noiseGain = ctx.createGain();
              const filter = ctx.createBiquadFilter();

              filter.type = 'highpass';
              filter.frequency.value = 3000 + Math.random() * 4000;

              noiseGain.gain.setValueAtTime((0.05 + Math.random() * 0.1) * ambientVolume, ctx.currentTime);
              noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.01 + Math.random() * 0.03);

              // We use a very fast oscillator to simulate a click if noise isn't handy
              osc.type = 'square';
              osc.frequency.setValueAtTime(100 + Math.random() * 1000, ctx.currentTime);

              osc.connect(filter);
              filter.connect(noiseGain);
              noiseGain.connect(ctx.destination);

              osc.start();
              osc.stop(ctx.currentTime + 0.05);
            }, delay * 1000);
          }
        }, 80); // Fast enough to sound like continuous rain

        ambientNodesRef.current.push({ intervalId: rainInterval, clear: true });
        break;
      }

      // ⛈️ THUNDER - Deep rumbling thunder with occasional cracks
      case 'thunder': {
        // Continuous low rumble
        createNoise(80, 'lowpass', 0.5);
        createNoise(150, 'lowpass', 0.3);

        // Deep bass drone for distance thunder
        const bass = createTone(40, 'sine', 0.3);

        // LFO for rumble variation
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.3;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.2;
        lfo.connect(lfoGain);
        lfoGain.connect(gainNodeRef.current.gain);
        lfo.start();
        ambientNodesRef.current.push(lfo);

        // Periodic thunder crack effect
        const thunderInterval = setInterval(() => {
          if (!audioContextRef.current) return;
          const crack = ctx.createOscillator();
          crack.type = 'sawtooth';
          crack.frequency.value = 30 + Math.random() * 50;
          const crackGain = ctx.createGain();
          crackGain.gain.setValueAtTime(0.4 * ambientVolume, ctx.currentTime);
          crackGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2 + Math.random() * 2);
          crack.connect(crackGain);
          crackGain.connect(ctx.destination);
          crack.start();
          crack.stop(ctx.currentTime + 4);
        }, 8000 + Math.random() * 7000);
        ambientNodesRef.current.push({ intervalId: thunderInterval, clear: true });
        break;
      }

      // 🌊 OCEAN - Waves coming and going
      case 'ocean': {
        // Base ocean noise
        const oceanNoise = createNoise(400, 'lowpass', 0.4);
        createNoise(800, 'bandpass', 0.2);

        // Wave LFO - slow sweeping volume
        const waveLfo = ctx.createOscillator();
        waveLfo.type = 'sine';
        waveLfo.frequency.value = 0.08; // Very slow waves
        const waveLfoGain = ctx.createGain();
        waveLfoGain.gain.value = 0.25;
        waveLfo.connect(waveLfoGain);
        waveLfoGain.connect(oceanNoise.gain.gain);
        waveLfo.start();
        ambientNodesRef.current.push(waveLfo);

        // Secondary wave layer
        const waveLfo2 = ctx.createOscillator();
        waveLfo2.type = 'sine';
        waveLfo2.frequency.value = 0.12;
        const waveLfoGain2 = ctx.createGain();
        waveLfoGain2.gain.value = 0.15;
        waveLfo2.connect(waveLfoGain2);
        waveLfoGain2.connect(gainNodeRef.current.gain);
        waveLfo2.start();
        ambientNodesRef.current.push(waveLfo2);
        break;
      }

      // 🌲 FOREST - Birds, wind through leaves, ambient nature
      case 'forest': {
        // Wind through leaves
        createNoise(2000, 'bandpass', 0.15);
        createNoise(600, 'lowpass', 0.1);

        // Random bird chirps
        const birdInterval = setInterval(() => {
          if (!audioContextRef.current) return;
          const bird = ctx.createOscillator();
          bird.type = 'sine';
          const startFreq = 1800 + Math.random() * 1200;
          bird.frequency.setValueAtTime(startFreq, ctx.currentTime);
          bird.frequency.setValueAtTime(startFreq + 400, ctx.currentTime + 0.05);
          bird.frequency.setValueAtTime(startFreq - 200, ctx.currentTime + 0.1);
          bird.frequency.setValueAtTime(startFreq + 300, ctx.currentTime + 0.15);
          const birdGain = ctx.createGain();
          birdGain.gain.setValueAtTime(0.15 * ambientVolume, ctx.currentTime);
          birdGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
          bird.connect(birdGain);
          birdGain.connect(ctx.destination);
          bird.start();
          bird.stop(ctx.currentTime + 0.3);
        }, 2000 + Math.random() * 3000);
        ambientNodesRef.current.push({ intervalId: birdInterval, clear: true });
        break;
      }

      // 🐦 BIRDS - Active bird chirping
      case 'birds': {
        // Multiple bird chirp patterns
        const chirpInterval = setInterval(() => {
          if (!audioContextRef.current) return;
          const numChirps = 2 + Math.floor(Math.random() * 3);
          for (let i = 0; i < numChirps; i++) {
            setTimeout(() => {
              const bird = ctx.createOscillator();
              bird.type = 'sine';
              const baseFreq = 2000 + Math.random() * 2000;
              bird.frequency.setValueAtTime(baseFreq, ctx.currentTime);
              bird.frequency.linearRampToValueAtTime(baseFreq + 500, ctx.currentTime + 0.05);
              bird.frequency.linearRampToValueAtTime(baseFreq - 300, ctx.currentTime + 0.1);
              const birdGain = ctx.createGain();
              birdGain.gain.setValueAtTime(0.2 * ambientVolume, ctx.currentTime);
              birdGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
              bird.connect(birdGain);
              birdGain.connect(ctx.destination);
              bird.start();
              bird.stop(ctx.currentTime + 0.2);
            }, i * 100);
          }
        }, 1000 + Math.random() * 2000);
        ambientNodesRef.current.push({ intervalId: chirpInterval, clear: true });
        break;
      }

      // 💨 WIND - Howling and gusting wind
      case 'wind': {
        const windNoise = createNoise(600, 'bandpass', 0.4);
        createNoise(1200, 'highpass', 0.15);

        // Wind gusts LFO
        const gustLfo = ctx.createOscillator();
        gustLfo.type = 'sine';
        gustLfo.frequency.value = 0.15;
        const gustGain = ctx.createGain();
        gustGain.gain.value = 0.3;
        gustLfo.connect(gustGain);
        gustGain.connect(windNoise.filter.frequency);
        gustLfo.start();
        ambientNodesRef.current.push(gustLfo);
        break;
      }

      // 🔥 FIRE - Crackling campfire
      case 'fire': {
        // Base fire crackle
        createNoise(300, 'lowpass', 0.3);
        createNoise(1500, 'bandpass', 0.2);

        // Random crackle pops
        const crackleInterval = setInterval(() => {
          if (!audioContextRef.current) return;
          const pop = ctx.createOscillator();
          pop.type = 'sawtooth';
          pop.frequency.value = 100 + Math.random() * 200;
          const popGain = ctx.createGain();
          popGain.gain.setValueAtTime(0.15 * ambientVolume, ctx.currentTime);
          popGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
          pop.connect(popGain);
          popGain.connect(ctx.destination);
          pop.start();
          pop.stop(ctx.currentTime + 0.1);
        }, 200 + Math.random() * 400);
        ambientNodesRef.current.push({ intervalId: crackleInterval, clear: true });
        break;
      }

      // 🌙 NIGHT - Crickets and night ambiance
      case 'night': {
        // Ambient night noise
        createNoise(400, 'lowpass', 0.1);

        // Cricket chirps - high frequency pulsing
        const cricket1 = createTone(4000, 'sine', 0.08);
        const cricket2 = createTone(4200, 'sine', 0.06);

        // Cricket pulse LFO
        const cricketLfo = ctx.createOscillator();
        cricketLfo.type = 'square';
        cricketLfo.frequency.value = 15;
        const cricketLfoGain = ctx.createGain();
        cricketLfoGain.gain.value = 0.08;
        cricketLfo.connect(cricketLfoGain);
        cricketLfoGain.connect(cricket1.gain.gain);
        cricketLfo.start();
        ambientNodesRef.current.push(cricketLfo);
        break;
      }

      // 📻 WHITE NOISE - Pure white noise
      case 'whitenoise': {
        createNoise(20000, 'lowpass', 0.5);
        break;
      }

      // 🎀 PINK NOISE - Softer, more natural noise
      case 'pinknoise': {
        createNoise(1000, 'lowpass', 0.5);
        createNoise(500, 'lowpass', 0.3);
        break;
      }

      // 🟤 BROWN NOISE - Deep, rumbling noise
      case 'brownnoise': {
        createNoise(200, 'lowpass', 0.6);
        createNoise(100, 'lowpass', 0.3);
        break;
      }

      // ☕ CAFE - Coffee shop ambiance with murmurs
      case 'cafe': {
        // Background chatter (filtered noise)
        createNoise(800, 'bandpass', 0.25);
        createNoise(400, 'lowpass', 0.15);
        createNoise(1200, 'bandpass', 0.1);

        // Occasional cup/plate sounds
        const cafeInterval = setInterval(() => {
          if (!audioContextRef.current) return;
          const clink = ctx.createOscillator();
          clink.type = 'sine';
          clink.frequency.value = 2000 + Math.random() * 1000;
          const clinkGain = ctx.createGain();
          clinkGain.gain.setValueAtTime(0.08 * ambientVolume, ctx.currentTime);
          clinkGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          clink.connect(clinkGain);
          clinkGain.connect(ctx.destination);
          clink.start();
          clink.stop(ctx.currentTime + 0.15);
        }, 3000 + Math.random() * 5000);
        ambientNodesRef.current.push({ intervalId: cafeInterval, clear: true });
        break;
      }

      // 🚂 TRAIN - Rhythmic train on tracks
      case 'train': {
        // Base train rumble
        createNoise(100, 'lowpass', 0.3);

        // Rhythmic clacking
        const trainOsc = createTone(80, 'sine', 0.2);
        const trainLfo = ctx.createOscillator();
        trainLfo.type = 'square';
        trainLfo.frequency.value = 3; // Clack clack rhythm
        const trainLfoGain = ctx.createGain();
        trainLfoGain.gain.value = 0.15;
        trainLfo.connect(trainLfoGain);
        trainLfoGain.connect(trainOsc.gain.gain);
        trainLfo.start();
        ambientNodesRef.current.push(trainLfo);

        // Wheel on track sound
        createNoise(300, 'bandpass', 0.15);
        break;
      }

      // 🏞️ RIVER - Flowing river water
      case 'river': {
        createNoise(1000, 'bandpass', 0.35);
        createNoise(2000, 'highpass', 0.2);
        createNoise(500, 'lowpass', 0.2);

        // Flow variation
        const riverLfo = ctx.createOscillator();
        riverLfo.type = 'sine';
        riverLfo.frequency.value = 0.2;
        const riverLfoGain = ctx.createGain();
        riverLfoGain.gain.value = 0.1;
        riverLfo.connect(riverLfoGain);
        riverLfoGain.connect(gainNodeRef.current.gain);
        riverLfo.start();
        ambientNodesRef.current.push(riverLfo);
        break;
      }

      // 💧 WATERFALL - Powerful rushing water
      case 'waterfall': {
        createNoise(2000, 'lowpass', 0.5);
        createNoise(4000, 'highpass', 0.3);
        createNoise(800, 'bandpass', 0.25);
        // Deep rumble
        createNoise(200, 'lowpass', 0.2);
        break;
      }

      // 🎵 LO-FI - Chill lo-fi beats
      case 'lofi': {
        // Warm pad chords
        createTone(220, 'sine', 0.15);  // A3
        createTone(277, 'sine', 0.12);  // C#4
        createTone(330, 'sine', 0.12);  // E4
        createTone(440, 'sine', 0.08);  // A4

        // Vinyl crackle
        createNoise(8000, 'highpass', 0.05);
        break;
      }

      // 🎹 PIANO - Soft ambient piano
      case 'piano': {
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, i) => {
          createTone(freq, 'sine', 0.1 - i * 0.02);
        });
        break;
      }

      // 🌌 SPACE - Deep space ambient drone
      case 'space': {
        createTone(55, 'sine', 0.2);   // Deep bass
        createTone(82.5, 'sine', 0.15);
        createTone(110, 'triangle', 0.1);

        // Slow modulation for space feel
        const spaceLfo = ctx.createOscillator();
        spaceLfo.type = 'sine';
        spaceLfo.frequency.value = 0.05;
        const spaceLfoGain = ctx.createGain();
        spaceLfoGain.gain.value = 0.1;
        spaceLfo.connect(spaceLfoGain);
        spaceLfoGain.connect(gainNodeRef.current.gain);
        spaceLfo.start();
        ambientNodesRef.current.push(spaceLfo);
        break;
      }

      // 🔔 TIBETAN - Tibetan singing bowl
      case 'tibetan': {
        // Fundamental and harmonics of singing bowl
        createTone(256, 'sine', 0.25);
        createTone(512, 'sine', 0.15);
        createTone(768, 'sine', 0.08);
        createTone(1024, 'sine', 0.05);

        // Slow beating/wobble
        const bowlLfo = ctx.createOscillator();
        bowlLfo.type = 'sine';
        bowlLfo.frequency.value = 2;
        const bowlLfoGain = ctx.createGain();
        bowlLfoGain.gain.value = 0.05;
        bowlLfo.connect(bowlLfoGain);
        bowlLfoGain.connect(gainNodeRef.current.gain);
        bowlLfo.start();
        ambientNodesRef.current.push(bowlLfo);
        break;
      }

      // 🧠 BINAURAL - Binaural beats for focus (40Hz difference)
      case 'binaural': {
        // Left ear: 200Hz, Right ear: 240Hz = 40Hz binaural beat
        const leftOsc = ctx.createOscillator();
        leftOsc.type = 'sine';
        leftOsc.frequency.value = 200;
        const leftGain = ctx.createGain();
        leftGain.gain.value = 0.2;
        const leftPanner = ctx.createStereoPanner();
        leftPanner.pan.value = -1;
        leftOsc.connect(leftGain);
        leftGain.connect(leftPanner);
        leftPanner.connect(gainNodeRef.current);
        leftOsc.start();
        ambientNodesRef.current.push(leftOsc);

        const rightOsc = ctx.createOscillator();
        rightOsc.type = 'sine';
        rightOsc.frequency.value = 240;
        const rightGain = ctx.createGain();
        rightGain.gain.value = 0.2;
        const rightPanner = ctx.createStereoPanner();
        rightPanner.pan.value = 1;
        rightOsc.connect(rightGain);
        rightGain.connect(rightPanner);
        rightPanner.connect(gainNodeRef.current);
        rightOsc.start();
        ambientNodesRef.current.push(rightOsc);
        break;
      }

      // ❤️ HEARTBEAT - Realistic heartbeat pulse
      case 'heartbeat': {
        // Heartbeat at ~60 BPM
        const heartbeatInterval = setInterval(() => {
          if (!audioContextRef.current) return;
          // First beat (lub)
          const lub = ctx.createOscillator();
          lub.type = 'sine';
          lub.frequency.value = 60;
          const lubGain = ctx.createGain();
          lubGain.gain.setValueAtTime(0.4 * ambientVolume, ctx.currentTime);
          lubGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          lub.connect(lubGain);
          lubGain.connect(ctx.destination);
          lub.start();
          lub.stop(ctx.currentTime + 0.2);

          // Second beat (dub) - slightly delayed
          setTimeout(() => {
            const dub = ctx.createOscillator();
            dub.type = 'sine';
            dub.frequency.value = 50;
            const dubGain = ctx.createGain();
            dubGain.gain.setValueAtTime(0.3 * ambientVolume, ctx.currentTime);
            dubGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
            dub.connect(dubGain);
            dubGain.connect(ctx.destination);
            dub.start();
            dub.stop(ctx.currentTime + 0.15);
          }, 150);
        }, 1000);
        ambientNodesRef.current.push({ intervalId: heartbeatInterval, clear: true });
        break;
      }

      // ⌨️ KEYBOARD - Mechanical keyboard typing
      case 'keyboard': {
        const typeInterval = setInterval(() => {
          if (!audioContextRef.current) return;
          // Random typing pattern
          const numKeys = 1 + Math.floor(Math.random() * 4);
          for (let i = 0; i < numKeys; i++) {
            setTimeout(() => {
              const click = ctx.createOscillator();
              click.type = 'square';
              click.frequency.value = 800 + Math.random() * 400;
              const clickGain = ctx.createGain();
              clickGain.gain.setValueAtTime(0.08 * ambientVolume, ctx.currentTime);
              clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);
              click.connect(clickGain);
              clickGain.connect(ctx.destination);
              click.start();
              click.stop(ctx.currentTime + 0.03);
            }, i * (50 + Math.random() * 100));
          }
        }, 200 + Math.random() * 300);
        ambientNodesRef.current.push({ intervalId: typeInterval, clear: true });
        break;
      }

      // 🌀 FAN - Electric fan hum
      case 'fan': {
        createTone(120, 'sine', 0.2);  // Motor hum
        createTone(240, 'sine', 0.1);  // Harmonic
        createNoise(1500, 'bandpass', 0.15);  // Air movement

        // Slight wobble
        const fanLfo = ctx.createOscillator();
        fanLfo.type = 'sine';
        fanLfo.frequency.value = 0.5;
        const fanLfoGain = ctx.createGain();
        fanLfoGain.gain.value = 0.03;
        fanLfo.connect(fanLfoGain);
        fanLfoGain.connect(gainNodeRef.current.gain);
        fanLfo.start();
        ambientNodesRef.current.push(fanLfo);
        break;
      }

      // 🫧 UNDERWATER - Muffled underwater ambiance with bubbles
      case 'underwater': {
        // Muffled underwater sound
        createNoise(300, 'lowpass', 0.4);
        createTone(80, 'sine', 0.15);

        // Random bubbles
        const bubbleInterval = setInterval(() => {
          if (!audioContextRef.current) return;
          const numBubbles = 1 + Math.floor(Math.random() * 3);
          for (let i = 0; i < numBubbles; i++) {
            setTimeout(() => {
              const bubble = ctx.createOscillator();
              bubble.type = 'sine';
              bubble.frequency.setValueAtTime(300 + Math.random() * 200, ctx.currentTime);
              bubble.frequency.exponentialRampToValueAtTime(600 + Math.random() * 300, ctx.currentTime + 0.1);
              const bubbleGain = ctx.createGain();
              bubbleGain.gain.setValueAtTime(0.1 * ambientVolume, ctx.currentTime);
              bubbleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
              bubble.connect(bubbleGain);
              bubbleGain.connect(ctx.destination);
              bubble.start();
              bubble.stop(ctx.currentTime + 0.2);
            }, i * 100);
          }
        }, 500 + Math.random() * 1500);
        ambientNodesRef.current.push({ intervalId: bubbleInterval, clear: true });
        break;
      }

      default:
        createNoise(1000, 'lowpass', 0.3);
        break;
    }

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

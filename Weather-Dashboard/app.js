'use strict';

// ============================================
// CONSTANTS
// ============================================
const BASE = 'https://api.openweathermap.org';
const ICON  = id => `https://openweathermap.org/img/wn/${id}@2x.png`;

// ============================================
// STATE
// ============================================
const state = {
  apiKey:          localStorage.getItem('weather_api_key') || '',
  units:           localStorage.getItem('weather_units') || 'metric',
  favorites:       JSON.parse(localStorage.getItem('weather_favorites') || '[]'),
  currentWeather:  null,
  currentForecast: null,
  currentCity:     null,
  map:             null,
  weatherLayer:    null,
  activeLayer:     'precipitation_new',
};

// ============================================
// DOM
// ============================================
const $  = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const apiModal        = $('api-modal');
const apiKeyInput     = $('api-key-input');
const apiKeySubmit    = $('api-key-submit');
const errorBanner     = $('error-banner');
const errorText       = $('error-text');
const searchInput     = $('search-input');
const searchBtn       = $('search-btn');
const geoBtn          = $('geo-btn');
const favToggleBtn    = $('favorites-toggle');
const favoritesPanel  = $('favorites-panel');
const closeFavBtn     = $('close-favorites');
const favoritesList   = $('favorites-list');
const favoritesEmpty  = $('favorites-empty');
const loadingEl       = $('loading');
const emptyState      = $('empty-state');
const weatherCard     = $('weather-card');
const forecastSection = $('forecast-section');
const forecastRow     = $('forecast-row');
const favBtn          = $('fav-btn');

const cityNameEl       = $('city-name');
const cityCountryEl    = $('city-country');
const cityDatetimeEl   = $('city-datetime');
const weatherIconEl    = $('weather-icon');
const weatherDescEl    = $('weather-desc');
const tempCurrentEl    = $('temp-current');
const tempFeelsEl      = $('temp-feels');
const tempHighEl       = $('temp-high');
const tempLowEl        = $('temp-low');
const detailHumidity   = $('detail-humidity');
const detailWind       = $('detail-wind');
const detailVisibility = $('detail-visibility');
const detailSunrise    = $('detail-sunrise');
const detailSunset     = $('detail-sunset');

// ============================================
// UTILITIES
// ============================================

/** Convert Kelvin to display string in current units */
function tempStr(kelvin) {
  if (state.units === 'metric') {
    return `${Math.round(kelvin - 273.15)}°C`;
  }
  return `${Math.round((kelvin - 273.15) * 9 / 5 + 32)}°F`;
}

/** Convert m/s to display string in current units */
function windStr(mps) {
  if (state.units === 'metric') return `${Math.round(mps)} m/s`;
  return `${Math.round(mps * 2.237)} mph`;
}

/** Convert wind degrees to compass direction */
function degToCompass(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round((deg % 360) / 45) % 8];
}

/** Format a Unix timestamp with a timezone offset into HH:MM */
function formatTime(unixTs, tzOffset) {
  const d = new Date((unixTs + tzOffset) * 1000);
  return `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`;
}

/** Format the current local datetime for a city given its timezone offset */
function formatLocalDateTime(tzOffset) {
  const now = Math.floor(Date.now() / 1000);
  const d = new Date((now + tzOffset) * 1000);
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hh = d.getUTCHours().toString().padStart(2, '0');
  const mm = d.getUTCMinutes().toString().padStart(2, '0');
  return `${days[d.getUTCDay()]}, ${d.getUTCDate()} ${months[d.getUTCMonth()]} · ${hh}:${mm}`;
}

/** Format visibility in metres to a readable string */
function visibilityStr(m) {
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${m} m`;
}

// ============================================
// ERROR BANNER
// ============================================
let errorTimer = null;

function showError(msg) {
  errorText.textContent = msg;
  errorBanner.classList.remove('hidden');
  clearTimeout(errorTimer);
  errorTimer = setTimeout(() => errorBanner.classList.add('hidden'), 5000);
}

$$('.error-dismiss').forEach(btn => btn.addEventListener('click', () => {
  errorBanner.classList.add('hidden');
}));

// ============================================
// API
// ============================================
async function apiFetch(url) {
  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new Error('Unable to reach the weather service. Check your connection.');
  }
  if (res.status === 401) {
    localStorage.removeItem('weather_api_key');
    state.apiKey = '';
    apiModal.classList.remove('hidden');
    throw new Error('Invalid API key. Please re-enter your key.');
  }
  if (res.status === 404) {
    throw new Error('City not found. Please check the spelling and try again.');
  }
  if (!res.ok) {
    throw new Error('Unable to reach the weather service. Check your connection.');
  }
  return res.json();
}

async function geocode(city) {
  const data = await apiFetch(
    `${BASE}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${state.apiKey}`
  );
  if (!data || data.length === 0) {
    throw new Error('City not found. Please check the spelling and try again.');
  }
  return data[0];
}

async function reverseGeocode(lat, lon) {
  const data = await apiFetch(
    `${BASE}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${state.apiKey}`
  );
  if (!data || data.length === 0) {
    throw new Error('Could not resolve your location. Please search for a city manually.');
  }
  return data[0];
}

async function fetchCurrentWeather(lat, lon) {
  return apiFetch(`${BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${state.apiKey}`);
}

async function fetchForecast(lat, lon) {
  return apiFetch(`${BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${state.apiKey}`);
}

// ============================================
// RENDER — CURRENT WEATHER
// ============================================
function renderCurrentWeather(data) {
  state.currentWeather = data;

  cityNameEl.textContent    = data.name;
  cityCountryEl.textContent = data.sys.country;
  cityDatetimeEl.textContent = formatLocalDateTime(data.timezone);

  weatherIconEl.src = ICON(data.weather[0].icon);
  weatherIconEl.alt = data.weather[0].description;
  weatherDescEl.textContent = data.weather[0].description;

  tempCurrentEl.textContent = tempStr(data.main.temp);
  tempFeelsEl.textContent   = tempStr(data.main.feels_like);
  tempHighEl.textContent    = tempStr(data.main.temp_max);
  tempLowEl.textContent     = tempStr(data.main.temp_min);

  detailHumidity.textContent   = `${data.main.humidity}%`;
  detailWind.textContent       = `${windStr(data.wind.speed)} ${degToCompass(data.wind.deg || 0)}`;
  detailVisibility.textContent = visibilityStr(data.visibility || 0);
  detailSunrise.textContent    = formatTime(data.sys.sunrise, data.timezone);
  detailSunset.textContent     = formatTime(data.sys.sunset, data.timezone);

  syncFavButton();
  weatherCard.classList.remove('hidden');
  emptyState.classList.add('hidden');
}

// ============================================
// RENDER — FORECAST
// ============================================
function renderForecast(data) {
  state.currentForecast = data;
  const tzOffset = data.city.timezone;

  // Group forecast entries by local calendar day
  const byDay = {};
  for (const item of data.list) {
    const d = new Date((item.dt + tzOffset) * 1000);
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
    (byDay[key] = byDay[key] || []).push(item);
  }

  // Exclude today; take up to 5 upcoming days
  const todayD = new Date((Date.now() / 1000 + tzOffset) * 1000);
  const todayKey = `${todayD.getUTCFullYear()}-${todayD.getUTCMonth()}-${todayD.getUTCDate()}`;
  const days = Object.keys(byDay).filter(k => k !== todayKey).slice(0, 5);

  forecastRow.innerHTML = '';

  days.forEach((key, i) => {
    const entries = byDay[key];

    // Representative entry: one closest to noon local time
    const noon = entries.reduce((best, e) => {
      const dh = Math.abs(new Date((e.dt + tzOffset) * 1000).getUTCHours() - 12);
      const bh = Math.abs(new Date((best.dt + tzOffset) * 1000).getUTCHours() - 12);
      return dh < bh ? e : best;
    });

    const high = Math.max(...entries.map(e => e.main.temp_max));
    const low  = Math.min(...entries.map(e => e.main.temp_min));

    const dayLabel = new Date((noon.dt + tzOffset) * 1000)
      .toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.setAttribute('role', 'listitem');
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <span class="forecast-day">${dayLabel}</span>
      <img src="${ICON(noon.weather[0].icon)}" alt="${noon.weather[0].description}" width="44" height="44" loading="lazy">
      <span class="forecast-high">${tempStr(high)}</span>
      <span class="forecast-low">${tempStr(low)}</span>
    `;
    forecastRow.appendChild(card);
  });

  forecastSection.classList.remove('hidden');
}

/** Re-render all displayed temperatures without a new API call */
function rerenderTemps() {
  if (state.currentWeather)  renderCurrentWeather(state.currentWeather);
  if (state.currentForecast) renderForecast(state.currentForecast);
  if (favoritesPanel.classList.contains('open')) renderFavoritesList();
}

// ============================================
// SEARCH
// ============================================
async function searchCity(query) {
  if (!query.trim()) return;
  setLoading(true);
  try {
    const geo = await geocode(query);
    state.currentCity = { name: geo.name, country: geo.country, lat: geo.lat, lon: geo.lon };
    localStorage.setItem('weather_last_city', JSON.stringify(state.currentCity));
    await loadCoords(geo.lat, geo.lon);
  } catch (err) {
    showError(err.message);
  } finally {
    setLoading(false);
  }
}

async function loadCoords(lat, lon) {
  const [weather, forecast] = await Promise.all([
    fetchCurrentWeather(lat, lon),
    fetchForecast(lat, lon),
  ]);
  renderCurrentWeather(weather);
  renderForecast(forecast);
  if (state.map) {
    state.map.setView([lat, lon], 8);
    updateMapLayer(state.activeLayer);
  }
}

function setLoading(on) {
  loadingEl.classList.toggle('hidden', !on);
  if (on) {
    weatherCard.classList.add('hidden');
    forecastSection.classList.add('hidden');
    emptyState.classList.add('hidden');
  }
}

// ============================================
// GEOLOCATION
// ============================================
function useGeolocation() {
  if (!navigator.geolocation) {
    showError('Geolocation is not supported by your browser.');
    return;
  }
  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    async pos => {
      try {
        const { latitude: lat, longitude: lon } = pos.coords;
        const geo = await reverseGeocode(lat, lon);
        state.currentCity = { name: geo.name, country: geo.country, lat: geo.lat, lon: geo.lon };
        localStorage.setItem('weather_last_city', JSON.stringify(state.currentCity));
        searchInput.value = geo.name;
        await loadCoords(lat, lon);
      } catch (err) {
        showError(err.message);
      } finally {
        setLoading(false);
      }
    },
    () => {
      setLoading(false);
      showError('Location access denied. Please search for a city manually.');
    }
  );
}

// ============================================
// UNIT TOGGLE
// ============================================
function setUnits(units) {
  state.units = units;
  localStorage.setItem('weather_units', units);
  $$('.unit-btn').forEach(btn => {
    const active = btn.dataset.unit === units;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active.toString());
  });
  rerenderTemps();
}

// ============================================
// TABS
// ============================================
function switchTab(name) {
  $$('.tab-btn').forEach(btn => {
    const active = btn.dataset.tab === name;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active.toString());
  });
  $$('.tab-content').forEach(el => {
    el.classList.toggle('active', el.id === `${name}-tab`);
  });
  if (name === 'map') {
    if (!state.map) initMap();
    else setTimeout(() => state.map.invalidateSize(), 50);
  }
}

// ============================================
// FAVORITES
// ============================================
function saveFavorites() {
  localStorage.setItem('weather_favorites', JSON.stringify(state.favorites));
}

function syncFavButton() {
  if (!state.currentCity) return;
  const saved = state.favorites.some(
    f => f.lat === state.currentCity.lat && f.lon === state.currentCity.lon
  );
  favBtn.classList.toggle('active', saved);
  favBtn.setAttribute('aria-pressed', saved.toString());
  favBtn.setAttribute('aria-label', saved ? 'Remove from favorites' : 'Add to favorites');
  favBtn.querySelector('svg').setAttribute('fill', saved ? 'currentColor' : 'none');
}

function toggleFavorite() {
  if (!state.currentCity) return;
  const { lat, lon } = state.currentCity;
  const idx = state.favorites.findIndex(f => f.lat === lat && f.lon === lon);
  if (idx >= 0) {
    state.favorites.splice(idx, 1);
  } else {
    if (state.favorites.length >= 10) {
      showError('You can save up to 10 favorite cities.');
      return;
    }
    state.favorites.push({ ...state.currentCity });
  }
  saveFavorites();
  syncFavButton();
  if (favoritesPanel.classList.contains('open')) renderFavoritesList();
}

function removeFavorite(lat, lon) {
  state.favorites = state.favorites.filter(f => !(f.lat === lat && f.lon === lon));
  saveFavorites();
  syncFavButton();
  renderFavoritesList();
}

async function loadFavoriteCity(city) {
  state.currentCity = city;
  searchInput.value = city.name;
  setLoading(true);
  try {
    await loadCoords(city.lat, city.lon);
  } catch (err) {
    showError(err.message);
  } finally {
    setLoading(false);
  }
  if (window.innerWidth < 768) closeFavoritesPanel();
}

function renderFavoritesList() {
  favoritesList.innerHTML = '';
  if (state.favorites.length === 0) {
    favoritesEmpty.style.display = '';
    return;
  }
  favoritesEmpty.style.display = 'none';

  for (const city of state.favorites) {
    const li = document.createElement('li');
    li.className = 'fav-item';

    const info = document.createElement('div');
    info.className = 'fav-item-info';
    info.setAttribute('role', 'button');
    info.setAttribute('tabindex', '0');
    info.setAttribute('aria-label', `Load weather for ${city.name}`);
    info.innerHTML = `
      <div class="fav-item-name">${city.name}, ${city.country}</div>
      <div class="fav-item-temp">—</div>
    `;
    info.addEventListener('click', () => loadFavoriteCity(city));
    info.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') loadFavoriteCity(city); });

    const delBtn = document.createElement('button');
    delBtn.className = 'fav-item-delete';
    delBtn.setAttribute('aria-label', `Remove ${city.name} from favorites`);
    delBtn.textContent = '×';
    delBtn.addEventListener('click', e => {
      e.stopPropagation();
      removeFavorite(city.lat, city.lon);
    });

    li.appendChild(info);
    li.appendChild(delBtn);
    favoritesList.appendChild(li);

    // Fetch current temp in the background
    fetchCurrentWeather(city.lat, city.lon).then(data => {
      const el = info.querySelector('.fav-item-temp');
      if (el) el.textContent = tempStr(data.main.temp);
    }).catch(() => {});
  }
}

function openFavoritesPanel() {
  favoritesPanel.classList.add('open');
  favToggleBtn.classList.add('active');
  favToggleBtn.setAttribute('aria-expanded', 'true');
  renderFavoritesList();
}

function closeFavoritesPanel() {
  favoritesPanel.classList.remove('open');
  favToggleBtn.classList.remove('active');
  favToggleBtn.setAttribute('aria-expanded', 'false');
}

// ============================================
// MAP
// ============================================
function initMap() {
  if (state.map) return;
  const center = state.currentCity ? [state.currentCity.lat, state.currentCity.lon] : [30, 0];
  state.map = L.map('weather-map').setView(center, state.currentCity ? 8 : 3);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(state.map);

  updateMapLayer(state.activeLayer);
  setTimeout(() => state.map.invalidateSize(), 100);
}

function updateMapLayer(layerName) {
  state.activeLayer = layerName;
  if (!state.map || !state.apiKey) return;
  if (state.weatherLayer) state.map.removeLayer(state.weatherLayer);
  state.weatherLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${state.apiKey}`,
    { opacity: 0.65, attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>' }
  ).addTo(state.map);
}

// ============================================
// API KEY FLOW
// ============================================
function submitApiKey() {
  const key = apiKeyInput.value.trim();
  if (!key) { apiKeyInput.focus(); return; }
  state.apiKey = key;
  localStorage.setItem('weather_api_key', key);
  apiModal.classList.add('hidden');
  tryLoadLastCity();
}

function tryLoadLastCity() {
  const raw = localStorage.getItem('weather_last_city');
  if (!raw) return;
  try {
    const city = JSON.parse(raw);
    state.currentCity = city;
    searchInput.value = city.name;
    setLoading(true);
    loadCoords(city.lat, city.lon).finally(() => setLoading(false));
  } catch { /* ignore malformed data */ }
}

// ============================================
// EVENT LISTENERS
// ============================================
apiKeySubmit.addEventListener('click', submitApiKey);
apiKeyInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitApiKey(); });

searchBtn.addEventListener('click', () => searchCity(searchInput.value));
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') searchCity(searchInput.value); });

geoBtn.addEventListener('click', useGeolocation);

$$('.unit-btn').forEach(btn => btn.addEventListener('click', () => setUnits(btn.dataset.unit)));

favToggleBtn.addEventListener('click', () => {
  favoritesPanel.classList.contains('open') ? closeFavoritesPanel() : openFavoritesPanel();
});
closeFavBtn.addEventListener('click', closeFavoritesPanel);

favBtn.addEventListener('click', toggleFavorite);

$$('.tab-btn').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

$$('.layer-btn').forEach(btn => btn.addEventListener('click', () => {
  $$('.layer-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateMapLayer(btn.dataset.layer);
}));

// ============================================
// THEME / SETTINGS
// ============================================
const THEME_DEFAULTS = { bg: '#080c18', accent: '#52c4ff', text: '#e8f0fe' };

const settingsBtn   = $('settings-btn');
const settingsPanel = $('settings-panel');
const settingsClose = $('settings-close');
const settingsReset = $('settings-reset');
const colorBgInput     = $('color-bg');
const colorAccentInput = $('color-accent');
const colorTextInput   = $('color-text');
const colorBgHex       = $('color-bg-hex');
const colorAccentHex   = $('color-accent-hex');
const colorTextHex     = $('color-text-hex');

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function lighten(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const clamp = v => Math.min(255, v + amount);
  return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
}

function applyTheme({ bg, accent, text }) {
  const root = document.documentElement.style;
  const a = hexToRgb(accent);
  const t = hexToRgb(text);

  root.setProperty('--bg-deep', bg);
  root.setProperty('--bg-mid',  lighten(bg, 10));

  root.setProperty('--accent',      accent);
  root.setProperty('--accent-dim',  `rgba(${a.r},${a.g},${a.b},0.12)`);
  root.setProperty('--accent-glow', `0 0 24px rgba(${a.r},${a.g},${a.b},0.35)`);
  root.setProperty('--border-glow', `rgba(${a.r},${a.g},${a.b},0.28)`);

  root.setProperty('--text-primary',   text);
  root.setProperty('--text-secondary', `rgba(${t.r},${t.g},${t.b},0.55)`);
  root.setProperty('--text-dim',       `rgba(${t.r},${t.g},${t.b},0.28)`);
}

function saveTheme(theme) {
  localStorage.setItem('weather_theme', JSON.stringify(theme));
}

function loadTheme() {
  try {
    return JSON.parse(localStorage.getItem('weather_theme')) || { ...THEME_DEFAULTS };
  } catch {
    return { ...THEME_DEFAULTS };
  }
}

function syncColorInputs(theme) {
  colorBgInput.value     = theme.bg;
  colorAccentInput.value = theme.accent;
  colorTextInput.value   = theme.text;
  colorBgHex.textContent     = theme.bg;
  colorAccentHex.textContent = theme.accent;
  colorTextHex.textContent   = theme.text;
}

function onColorChange() {
  const theme = {
    bg:     colorBgInput.value,
    accent: colorAccentInput.value,
    text:   colorTextInput.value,
  };
  applyTheme(theme);
  saveTheme(theme);
  colorBgHex.textContent     = theme.bg;
  colorAccentHex.textContent = theme.accent;
  colorTextHex.textContent   = theme.text;
}

colorBgInput.addEventListener('input',     onColorChange);
colorAccentInput.addEventListener('input', onColorChange);
colorTextInput.addEventListener('input',   onColorChange);

settingsBtn.addEventListener('click', e => {
  e.stopPropagation();
  const open = !settingsPanel.classList.contains('hidden');
  settingsPanel.classList.toggle('hidden', open);
  settingsBtn.classList.toggle('active', !open);
  settingsBtn.setAttribute('aria-expanded', (!open).toString());
});

settingsClose.addEventListener('click', () => {
  settingsPanel.classList.add('hidden');
  settingsBtn.classList.remove('active');
  settingsBtn.setAttribute('aria-expanded', 'false');
});

settingsReset.addEventListener('click', () => {
  applyTheme(THEME_DEFAULTS);
  saveTheme(THEME_DEFAULTS);
  syncColorInputs(THEME_DEFAULTS);
});

// Close settings panel when clicking outside
document.addEventListener('click', e => {
  if (!settingsPanel.classList.contains('hidden') &&
      !settingsPanel.contains(e.target) &&
      e.target !== settingsBtn) {
    settingsPanel.classList.add('hidden');
    settingsBtn.classList.remove('active');
    settingsBtn.setAttribute('aria-expanded', 'false');
  }
});

// ============================================
// INIT
// ============================================
(function init() {
  // Apply persisted theme
  const theme = loadTheme();
  applyTheme(theme);
  syncColorInputs(theme);

  // Apply persisted unit preference
  setUnits(state.units);

  if (!state.apiKey) {
    apiModal.classList.remove('hidden');
  } else {
    apiModal.classList.add('hidden');
    tryLoadLastCity();
  }
})();

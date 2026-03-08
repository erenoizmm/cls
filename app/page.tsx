'use client';

import { useEffect, useRef, useState } from 'react';

// ============================================================
// TYPES
// ============================================================
interface GalleryItem { src: string; caption: string; }
interface Book { title: string; author: string; cover: string; }
interface Track { title: string; genre: string; link: string; thumb: string; }

interface SiteData {
  heroBg: string;
  heroTag: string;
  heroSubtitle: string;
  statYear: string;
  statAlbum: string;
  gallery: GalleryItem[];
  books: Book[];
  music: Track[];
}

const DEFAULT_DATA: SiteData = {
  heroBg: '',
  heroTag: 'MÜZİSYEN & SANATÇI',
  heroSubtitle: 'Müziğin ruhunu hisseden, kelimelerin ötesinde ifade arayan bir sanatçı. Her notada bir hikaye.',
  statYear: '2024',
  statAlbum: '∞',
  gallery: [],
  books: [],
  music: [],
};

const ADMIN_PASSWORD = 'eren2024'; // ← ŞİFREYİ BURADAN DEĞİŞTİR

// ============================================================
// GLOBAL STYLES (injected once)
// ============================================================
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

:root {
  --bg: #080808;
  --white: #ffffff;
  --muted: rgba(255,255,255,0.45);
  --glass: rgba(255,255,255,0.05);
  --border: rgba(255,255,255,0.1);
  --accent: #c8a96e;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  color: var(--white);
  overflow-x: hidden;
}
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.3); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

/* SNOW */
.ea-snow { position: fixed; inset: 0; pointer-events: none; z-index: 5; overflow: hidden; }
.ea-flake {
  position: absolute; top: -20px; color: rgba(255,255,255,0.5);
  animation: ea-fall linear infinite; user-select: none;
}
@keyframes ea-fall {
  0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
  5%   { opacity: 1; }
  50%  { transform: translateY(55vh) translateX(20px) rotate(180deg); }
  95%  { opacity: 0.5; }
  100% { transform: translateY(110vh) translateX(-10px) rotate(360deg); opacity: 0; }
}

/* NAV */
.ea-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 28px;
  background: rgba(8,8,8,0.8);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border);
}
.ea-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(18px, 4vw, 24px);
  letter-spacing: 3px;
  color: var(--white);
  text-decoration: none;
}
.ea-logo span { color: var(--accent); }
.ea-nav-links { display: flex; gap: 4px; }
.ea-nav-links a {
  color: rgba(255,255,255,0.6); text-decoration: none;
  font-size: 13px; font-weight: 500;
  padding: 7px 14px; border-radius: 100px;
  border: 1px solid transparent; transition: all 0.25s;
}
.ea-nav-links a:hover { color: #fff; border-color: var(--border); background: var(--glass); }
.ea-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
.ea-hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; }
@media (max-width: 520px) {
  .ea-nav-links { display: none; }
  .ea-hamburger { display: flex; }
  .ea-nav-links.open {
    display: flex; flex-direction: column; gap: 4px;
    position: fixed; top: 65px; left: 0; right: 0;
    background: rgba(8,8,8,0.97); backdrop-filter: blur(24px);
    padding: 20px; border-bottom: 1px solid var(--border);
    z-index: 199;
  }
  .ea-nav-links.open a { text-align: center; }
  .ea-hero-stats { position: static !important; margin-top: 40px; justify-content: flex-start; }
}

/* HERO */
.ea-hero {
  min-height: 100vh;
  display: flex; align-items: center;
  padding: 110px 28px 60px;
  position: relative; overflow: hidden;
}
.ea-hero-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  filter: brightness(0.35) saturate(0.8);
  transition: background-image 0.6s ease;
}
.ea-hero-bg::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(8,8,8,0.6) 0%, transparent 50%, rgba(8,8,8,0.8) 100%);
}
.ea-hero-content { position: relative; z-index: 2; max-width: 680px; }
.ea-hero-tag {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(200,169,110,0.12);
  border: 1px solid rgba(200,169,110,0.35);
  border-radius: 100px;
  padding: 6px 14px; font-size: 12px;
  color: var(--accent); letter-spacing: 2px; font-weight: 500;
  margin-bottom: 24px; text-transform: uppercase;
}
.ea-hero-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(52px, 12vw, 120px);
  line-height: 0.95; letter-spacing: 2px;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.ea-hero-subtitle {
  font-size: clamp(14px, 2vw, 17px);
  color: var(--muted); font-weight: 300;
  margin: 20px 0 36px; line-height: 1.7; max-width: 500px;
}
.ea-hero-subtitle span { color: var(--accent); }
.ea-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
.ea-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent); color: #000;
  padding: 13px 28px; border-radius: 100px;
  font-weight: 700; font-size: 14px; text-decoration: none;
  transition: all 0.3s; letter-spacing: 0.5px; border: none; cursor: pointer;
  font-family: 'Outfit', sans-serif;
}
.ea-btn-primary:hover { background: #dfc07e; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(200,169,110,0.3); }
.ea-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid var(--border); color: rgba(255,255,255,0.7);
  padding: 13px 28px; border-radius: 100px;
  font-weight: 500; font-size: 14px; text-decoration: none;
  transition: all 0.3s; background: none; cursor: pointer;
  font-family: 'Outfit', sans-serif;
}
.ea-btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: #fff; background: var(--glass); }
.ea-hero-stats {
  position: absolute; bottom: 40px; right: 28px;
  display: flex; gap: 32px; z-index: 2;
}
.ea-stat { text-align: center; }
.ea-stat-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(28px, 5vw, 42px); color: var(--accent); line-height: 1;
}
.ea-stat-label { font-size: 11px; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px; }

/* SECTIONS */
.ea-section { padding: 80px 28px; max-width: 1100px; margin: 0 auto; }
.ea-section-tag { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; display: block; }
.ea-section-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 7vw, 64px); line-height: 1; letter-spacing: 1px; margin-bottom: 20px; }
.ea-section-desc { color: var(--muted); font-size: 15px; line-height: 1.8; max-width: 580px; margin-bottom: 48px; }

/* GALLERY */
.ea-gallery-masonry { columns: 3; column-gap: 14px; }
@media (max-width: 640px) { .ea-gallery-masonry { columns: 2; } }
@media (max-width: 380px) { .ea-gallery-masonry { columns: 1; } }
.ea-gallery-item {
  break-inside: avoid; margin-bottom: 14px;
  border-radius: 12px; overflow: hidden;
  position: relative; cursor: pointer;
  border: 1px solid var(--border);
  transition: transform 0.3s, box-shadow 0.3s; display: block;
}
.ea-gallery-item:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
.ea-gallery-item img { width: 100%; display: block; transition: transform 0.5s; }
.ea-gallery-item:hover img { transform: scale(1.03); }
.ea-gallery-item .ea-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
  opacity: 0; transition: opacity 0.3s;
  display: flex; align-items: flex-end; padding: 16px;
}
.ea-gallery-item:hover .ea-overlay { opacity: 1; }
.ea-gallery-item .ea-overlay span { font-size: 12px; color: rgba(255,255,255,0.8); }
.ea-empty {
  text-align: center; padding: 60px;
  color: var(--muted); font-size: 14px;
  border: 2px dashed var(--border); border-radius: 16px;
}
.ea-empty i { font-size: 36px; display: block; margin-bottom: 12px; opacity: 0.3; }

/* BOOKS */
.ea-books-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 24px; }
.ea-book-card {
  background: var(--glass); border: 1px solid var(--border);
  border-radius: 14px; overflow: hidden;
  transition: all 0.3s; cursor: pointer;
}
.ea-book-card:hover { transform: translateY(-6px); border-color: var(--accent); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
.ea-book-cover {
  aspect-ratio: 3/4; background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.ea-book-cover img { width: 100%; height: 100%; object-fit: cover; }
.ea-book-info { padding: 14px; }
.ea-book-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; line-height: 1.3; }
.ea-book-meta { font-size: 12px; color: var(--muted); }

/* MUSIC */
.ea-music-list { display: flex; flex-direction: column; gap: 12px; }
.ea-music-card {
  background: var(--glass); border: 1px solid var(--border);
  border-radius: 14px; padding: 16px 20px;
  display: flex; align-items: center; gap: 16px;
  transition: all 0.3s; cursor: pointer;
}
.ea-music-card:hover { border-color: var(--accent); background: rgba(200,169,110,0.06); }
.ea-music-thumb {
  width: 52px; height: 52px; border-radius: 10px;
  overflow: hidden; flex-shrink: 0; background: #1a1a1a;
  display: flex; align-items: center; justify-content: center;
}
.ea-music-thumb img { width: 100%; height: 100%; object-fit: cover; }
.ea-music-info { flex: 1; min-width: 0; }
.ea-music-title { font-size: 15px; font-weight: 600; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ea-music-genre { font-size: 12px; color: var(--muted); }
.ea-music-play { color: var(--accent); font-size: 20px; flex-shrink: 0; }

/* FOOTER */
.ea-footer {
  text-align: center; padding: 40px 28px;
  border-top: 1px solid var(--border);
  color: var(--muted); font-size: 13px;
}
.ea-footer a { color: var(--accent); text-decoration: none; }

/* ADMIN TRIGGER */
.ea-admin-trigger {
  position: fixed; bottom: 18px; right: 18px;
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  cursor: pointer; z-index: 999;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; opacity: 0.2;
}
.ea-admin-trigger:hover { opacity: 1; background: rgba(200,169,110,0.15); border-color: var(--accent); }
.ea-admin-trigger i { font-size: 14px; color: var(--accent); }

/* ADMIN OVERLAY */
.ea-admin-overlay {
  position: fixed; inset: 0; z-index: 9998;
  background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
  display: none; align-items: center; justify-content: center;
}
.ea-admin-overlay.open { display: flex; }
.ea-admin-panel {
  background: #0f0f0f;
  border: 1px solid rgba(200,169,110,0.3);
  border-radius: 16px;
  width: min(700px, 96vw);
  max-height: 90vh; overflow-y: auto;
  padding: 32px; position: relative;
}
.ea-admin-panel::-webkit-scrollbar { width: 4px; }
.ea-admin-panel::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 4px; }
.ea-admin-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px; padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}
.ea-admin-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 3px; color: var(--accent); }
.ea-admin-close {
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--glass); border: 1px solid var(--border);
  color: var(--white); cursor: pointer; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.ea-admin-close:hover { background: rgba(255,80,80,0.15); border-color: rgba(255,80,80,0.4); }
.ea-admin-input {
  width: 100%; padding: 12px 16px;
  background: var(--glass); border: 1px solid var(--border);
  border-radius: 10px; color: var(--white); font-size: 15px;
  font-family: 'Outfit', sans-serif;
  outline: none; transition: border 0.2s; margin-bottom: 12px;
}
.ea-admin-input:focus { border-color: var(--accent); }
.ea-admin-btn {
  width: 100%; padding: 12px; border-radius: 10px;
  background: var(--accent); border: none;
  color: #000; font-weight: 700; font-size: 14px;
  letter-spacing: 1px; cursor: pointer; transition: all 0.2s;
  font-family: 'Outfit', sans-serif;
}
.ea-admin-btn:hover { background: #dfc07e; transform: translateY(-1px); }
.ea-tabs { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
.ea-tab-btn {
  padding: 8px 16px; border-radius: 8px;
  background: var(--glass); border: 1px solid var(--border);
  color: var(--muted); font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif;
}
.ea-tab-btn.active { background: rgba(200,169,110,0.15); border-color: var(--accent); color: var(--accent); }
.ea-form-label { font-size: 12px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; display: block; }
.ea-upload-zone {
  border: 2px dashed var(--border); border-radius: 10px;
  padding: 24px; text-align: center; cursor: pointer;
  transition: all 0.2s; position: relative; margin-bottom: 12px;
}
.ea-upload-zone:hover { border-color: var(--accent); background: rgba(200,169,110,0.05); }
.ea-upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
.ea-upload-zone i { font-size: 24px; color: var(--muted); margin-bottom: 8px; display: block; }
.ea-upload-zone span { font-size: 13px; color: var(--muted); }
.ea-preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-top: 12px; }
.ea-preview-item { position: relative; aspect-ratio: 1; border-radius: 8px; overflow: hidden; border: 1px solid var(--border); }
.ea-preview-item img { width: 100%; height: 100%; object-fit: cover; }
.ea-del-btn {
  position: absolute; top: 4px; right: 4px;
  width: 22px; height: 22px; border-radius: 6px;
  background: rgba(255,80,80,0.8); border: none;
  color: #fff; font-size: 10px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.ea-save-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: 10px;
  background: rgba(200,169,110,0.15); border: 1px solid var(--accent);
  color: var(--accent); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif;
  margin-top: 16px;
}
.ea-save-btn:hover { background: rgba(200,169,110,0.25); }
.ea-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 480px) { .ea-form-row { grid-template-columns: 1fr; } }
.ea-small-btn {
  background: rgba(255,80,80,0.15); border: 1px solid rgba(255,80,80,0.3);
  color: #ff6b6b; padding: 5px 10px; border-radius: 7px;
  font-size: 11px; cursor: pointer; font-family: 'Outfit', sans-serif;
}
.ea-add-btn {
  background: var(--accent); border: none;
  color: #000; padding: 10px 24px; border-radius: 10px;
  font-weight: 700; font-size: 14px; cursor: pointer;
  font-family: 'Outfit', sans-serif; transition: all 0.2s;
}
.ea-add-btn:hover { background: #dfc07e; }

/* LIGHTBOX */
.ea-lightbox {
  position: fixed; inset: 0; z-index: 5000;
  background: rgba(0,0,0,0.95);
  display: none; align-items: center; justify-content: center; padding: 20px;
}
.ea-lightbox.open { display: flex; }
.ea-lightbox img { max-width: 100%; max-height: 90vh; border-radius: 12px; object-fit: contain; }
.ea-lightbox-close {
  position: absolute; top: 20px; right: 20px;
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.1); border: none;
  color: #fff; font-size: 18px; cursor: pointer;
}

/* TOAST */
@keyframes ea-fadeInOut {
  0%{opacity:0;transform:translateY(10px)} 15%{opacity:1;transform:translateY(0)} 80%{opacity:1} 100%{opacity:0}
}
.ea-toast {
  position: fixed; bottom: 70px; right: 20px; z-index: 9999;
  background: rgba(200,169,110,0.15); border: 1px solid var(--accent);
  color: var(--accent); padding: 10px 18px; border-radius: 10px;
  font-size: 13px; font-family: 'Outfit', sans-serif; font-weight: 600;
  backdrop-filter: blur(10px); animation: ea-fadeInOut 2.5s ease forwards;
  pointer-events: none;
}
`;

// ============================================================
// SNOW COMPONENT
// ============================================================
function Snow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const chars = ['❄', '❅', '❆', '·', '*'];
    for (let i = 0; i < 60; i++) {
      const f = document.createElement('div');
      f.className = 'ea-flake';
      const size = Math.random() * 10 + 4;
      f.textContent = chars[Math.floor(Math.random() * chars.length)];
      f.style.cssText = `left:${Math.random()*100}%;font-size:${size}px;animation-delay:-${Math.random()*15}s;animation-duration:${Math.random()*10+8}s;opacity:${Math.random()*0.5+0.1};`;
      el.appendChild(f);
    }
  }, []);
  return <div className="ea-snow" ref={ref} />;
}

// ============================================================
// MAIN LAYOUT
// ============================================================
export default function Layout({ children }: { children?: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(DEFAULT_DATA);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [passVal, setPassVal] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero'|'gallery'|'books'|'music'>('hero');
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  // Hero form state
  const [heroTagInput, setHeroTagInput] = useState('');
  const [heroSubInput, setHeroSubInput] = useState('');
  const [statYearInput, setStatYearInput] = useState('');
  const [statAlbumInput, setStatAlbumInput] = useState('');

  // Book form
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookCover, setBookCover] = useState('');

  // Music form
  const [musicTitle, setMusicTitle] = useState('');
  const [musicGenre, setMusicGenre] = useState('');
  const [musicLink, setMusicLink] = useState('');
  const [musicThumb, setMusicThumb] = useState('');

  // ---- LOAD / SAVE ----
  useEffect(() => {
    try {
      const saved = localStorage.getItem('erenSiteData');
      if (saved) setData(JSON.parse(saved));
    } catch {}
    // inject global CSS
    if (!document.getElementById('ea-global-css')) {
      const s = document.createElement('style');
      s.id = 'ea-global-css'; s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
    // FA
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
      document.head.appendChild(l);
    }
  }, []);

  function persist(next: SiteData) {
    setData(next);
    localStorage.setItem('erenSiteData', JSON.stringify(next));
  }

  function showToast(msg: string) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  }

  // ---- ADMIN ----
  function openAdmin() {
    setAdminOpen(true);
    setHeroTagInput(data.heroTag);
    setHeroSubInput(data.heroSubtitle);
    setStatYearInput(data.statYear);
    setStatAlbumInput(data.statAlbum);
    document.body.style.overflow = 'hidden';
  }
  function closeAdmin() { setAdminOpen(false); document.body.style.overflow = ''; }
  function checkPass() {
    if (passVal === ADMIN_PASSWORD) { setLoggedIn(true); setLoginError(false); }
    else { setLoginError(true); setPassVal(''); }
  }
  function saveHero() {
    persist({ ...data, heroTag: heroTagInput || data.heroTag, heroSubtitle: heroSubInput || data.heroSubtitle, statYear: statYearInput || data.statYear, statAlbum: statAlbumInput || data.statAlbum });
    showToast('✅ Kaydedildi!');
  }

  // ---- HERO BG ----
  function handleHeroBg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => persist({ ...data, heroBg: ev.target?.result as string });
    reader.readAsDataURL(file);
  }

  // ---- GALLERY ----
  function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    let done = 0;
    const newItems: GalleryItem[] = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        newItems.push({ src: ev.target?.result as string, caption: file.name.replace(/\.[^.]+$/, '') });
        done++;
        if (done === files.length) persist({ ...data, gallery: [...data.gallery, ...newItems] });
      };
      reader.readAsDataURL(file);
    });
  }
  function deleteGallery(i: number) { persist({ ...data, gallery: data.gallery.filter((_, idx) => idx !== i) }); }

  // ---- BOOKS ----
  function handleBookCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setBookCover(ev.target?.result as string);
    reader.readAsDataURL(file);
  }
  function addBook() {
    if (!bookTitle.trim()) return;
    persist({ ...data, books: [...data.books, { title: bookTitle, author: bookAuthor, cover: bookCover }] });
    setBookTitle(''); setBookAuthor(''); setBookCover('');
    showToast('📚 Kitap eklendi!');
  }
  function deleteBook(i: number) { persist({ ...data, books: data.books.filter((_, idx) => idx !== i) }); }

  // ---- MUSIC ----
  function handleMusicThumb(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setMusicThumb(ev.target?.result as string);
    reader.readAsDataURL(file);
  }
  function addMusic() {
    if (!musicTitle.trim()) return;
    persist({ ...data, music: [...data.music, { title: musicTitle, genre: musicGenre, link: musicLink, thumb: musicThumb }] });
    setMusicTitle(''); setMusicGenre(''); setMusicLink(''); setMusicThumb('');
    showToast('🎵 Şarkı eklendi!');
  }
  function deleteMusic(i: number) { persist({ ...data, music: data.music.filter((_, idx) => idx !== i) }); }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      {/* GLOBAL CSS & SNOW */}
      <Snow />

      {/* NAV */}
      <nav className="ea-nav">
        <a href="#home" className="ea-logo">EREN <span>ADIGÜZEL</span></a>
        <div className={`ea-nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Ana Sayfa</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Galeri</a>
          <a href="#books" onClick={() => setMenuOpen(false)}>Kitaplar</a>
          <a href="#music" onClick={() => setMenuOpen(false)}>Müzik</a>
        </div>
        <button className="ea-hamburger" onClick={() => setMenuOpen(m => !m)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="ea-hero">
        <div className="ea-hero-bg" style={data.heroBg ? { backgroundImage: `url('${data.heroBg}')` } : {}} />
        <div className="ea-hero-content">
          <div className="ea-hero-tag">
            <i className="fas fa-circle" style={{ fontSize: 6 }} />
            <span>{data.heroTag}</span>
          </div>
          <h1 className="ea-hero-name">EREN<br />ADIGÜZEL</h1>
          <p className="ea-hero-subtitle">{data.heroSubtitle}</p>
          <div className="ea-hero-cta">
            <a href="#gallery" className="ea-btn-primary"><i className="fas fa-images" /> Galeri</a>
            <a href="#music" className="ea-btn-ghost"><i className="fas fa-music" /> Müziklerim</a>
          </div>
        </div>
        <div className="ea-hero-stats">
          <div className="ea-stat">
            <div className="ea-stat-num">{data.statYear}</div>
            <div className="ea-stat-label">Yıl</div>
          </div>
          <div className="ea-stat">
            <div className="ea-stat-num">{data.statAlbum}</div>
            <div className="ea-stat-label">Şarkı</div>
          </div>
        </div>
      </section>

      {/* GALERİ */}
      <section id="gallery" className="ea-section">
        <span className="ea-section-tag">Fotoğraflar</span>
        <h2 className="ea-section-title">GALERİ</h2>
        <p className="ea-section-desc">Anların ve duyguların donduğu kareler.</p>
        {data.gallery.length === 0 ? (
          <div className="ea-empty"><i className="fas fa-camera" />Henüz fotoğraf eklenmedi.</div>
        ) : (
          <div className="ea-gallery-masonry">
            {data.gallery.map((img, i) => (
              <div key={i} className="ea-gallery-item" onClick={() => setLightboxSrc(img.src)}>
                <img src={img.src} alt={img.caption} loading="lazy" />
                <div className="ea-overlay"><span>{img.caption}</span></div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* KİTAPLAR */}
      <section id="books" className="ea-section">
        <span className="ea-section-tag">Okuma Listesi</span>
        <h2 className="ea-section-title">KİTAPLAR</h2>
        <p className="ea-section-desc">Beni şekillendiren, ilham veren kitaplar.</p>
        {data.books.length === 0 ? (
          <div className="ea-empty"><i className="fas fa-book" />Henüz kitap eklenmedi.</div>
        ) : (
          <div className="ea-books-grid">
            {data.books.map((b, i) => (
              <div key={i} className="ea-book-card">
                <div className="ea-book-cover">
                  {b.cover ? <img src={b.cover} alt={b.title} /> : <i className="fas fa-book" style={{ color: 'var(--muted)', fontSize: 36 }} />}
                </div>
                <div className="ea-book-info">
                  <div className="ea-book-title">{b.title}</div>
                  <div className="ea-book-meta">{b.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MÜZİK */}
      <section id="music" className="ea-section">
        <span className="ea-section-tag">Şarkılar</span>
        <h2 className="ea-section-title">MÜZİK</h2>
        <p className="ea-section-desc">Ruhumu döktüğüm parçalar.</p>
        {data.music.length === 0 ? (
          <div className="ea-empty"><i className="fas fa-music" />Henüz şarkı eklenmedi.</div>
        ) : (
          <div className="ea-music-list">
            {data.music.map((t, i) => (
              <div key={i} className="ea-music-card" onClick={() => t.link && window.open(t.link, '_blank')}>
                <div className="ea-music-thumb">
                  {t.thumb ? <img src={t.thumb} alt="" /> : <i className="fas fa-music" style={{ color: 'var(--accent)', fontSize: 20 }} />}
                </div>
                <div className="ea-music-info">
                  <div className="ea-music-title">{t.title}</div>
                  <div className="ea-music-genre">{t.genre}</div>
                </div>
                <i className={`fas fa-${t.link ? 'external-link-alt' : 'music'} ea-music-play`} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CHILDREN (extra pages) */}
      {children}

      {/* FOOTER */}
      <footer className="ea-footer">
        <p>© 2024 <a href="#">Eren Adigüzel</a> — Tüm Hakları Saklıdır</p>
      </footer>

      {/* GİZLİ ADMIN BUTONU */}
      <button className="ea-admin-trigger" onClick={openAdmin} title="">
        <i className="fas fa-key" />
      </button>

      {/* ADMIN OVERLAY */}
      {adminOpen && (
        <div className="ea-admin-overlay open" onClick={e => e.target === e.currentTarget && closeAdmin()}>
          <div className="ea-admin-panel">
            <div className="ea-admin-header">
              <div className="ea-admin-title">⚡ ADMİN PANEL</div>
              <button className="ea-admin-close" onClick={closeAdmin}><i className="fas fa-times" /></button>
            </div>

            {!loggedIn ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>Devam etmek için şifreyi girin</p>
                <input type="password" className="ea-admin-input" value={passVal}
                  onChange={e => setPassVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && checkPass()}
                  placeholder="Şifre..." />
                <button className="ea-admin-btn" onClick={checkPass}>GİRİŞ YAP</button>
                {loginError && <div style={{ color: '#ff6b6b', fontSize: 13, marginTop: 8 }}>❌ Yanlış şifre!</div>}
              </div>
            ) : (
              <>
                <div className="ea-tabs">
                  {(['hero','gallery','books','music'] as const).map(tab => (
                    <button key={tab} className={`ea-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                      <i className={`fas fa-${tab === 'hero' ? 'home' : tab === 'gallery' ? 'images' : tab === 'books' ? 'book' : 'music'}`} />
                      {' '}{tab === 'hero' ? 'Ana Sayfa' : tab === 'gallery' ? 'Galeri' : tab === 'books' ? 'Kitaplar' : 'Müzik'}
                    </button>
                  ))}
                </div>

                {/* HERO TAB */}
                {activeTab === 'hero' && (
                  <div>
                    <label className="ea-form-label">Arka Plan Fotoğrafı</label>
                    <div className="ea-upload-zone">
                      <input type="file" accept="image/*" onChange={handleHeroBg} />
                      <i className="fas fa-cloud-upload-alt" /><span>Tıkla veya sürükle-bırak</span>
                    </div>
                    {data.heroBg && (
                      <div style={{ marginBottom: 16 }}>
                        <img src={data.heroBg} style={{ width: '100%', borderRadius: 10, maxHeight: 140, objectFit: 'cover', border: '1px solid var(--border)' }} alt="" />
                        <button className="ea-small-btn" style={{ marginTop: 6 }} onClick={() => persist({ ...data, heroBg: '' })}>Kaldır</button>
                      </div>
                    )}
                    <label className="ea-form-label">Tag Metni</label>
                    <input className="ea-admin-input" value={heroTagInput} onChange={e => setHeroTagInput(e.target.value)} placeholder="MÜZİSYEN & SANATÇI" />
                    <label className="ea-form-label">Açıklama</label>
                    <textarea className="ea-admin-input" rows={3} value={heroSubInput} onChange={e => setHeroSubInput(e.target.value)} style={{ resize: 'vertical' }} />
                    <div className="ea-form-row">
                      <div>
                        <label className="ea-form-label">Yıl</label>
                        <input className="ea-admin-input" value={statYearInput} onChange={e => setStatYearInput(e.target.value)} placeholder="2024" />
                      </div>
                      <div>
                        <label className="ea-form-label">Şarkı Sayısı</label>
                        <input className="ea-admin-input" value={statAlbumInput} onChange={e => setStatAlbumInput(e.target.value)} placeholder="12" />
                      </div>
                    </div>
                    <button className="ea-save-btn" onClick={saveHero}><i className="fas fa-save" /> Kaydet</button>
                  </div>
                )}

                {/* GALLERY TAB */}
                {activeTab === 'gallery' && (
                  <div>
                    <label className="ea-form-label">Fotoğraf Ekle</label>
                    <div className="ea-upload-zone">
                      <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
                      <i className="fas fa-images" /><span>Birden fazla fotoğraf seçebilirsin</span>
                    </div>
                    <label className="ea-form-label">Mevcut Fotoğraflar ({data.gallery.length})</label>
                    {data.gallery.length === 0
                      ? <div style={{ color: 'var(--muted)', fontSize: 13, padding: 12 }}>Henüz fotoğraf yok</div>
                      : <div className="ea-preview-grid">
                          {data.gallery.map((img, i) => (
                            <div key={i} className="ea-preview-item">
                              <img src={img.src} alt="" />
                              <button className="ea-del-btn" onClick={() => deleteGallery(i)}><i className="fas fa-trash" /></button>
                            </div>
                          ))}
                        </div>
                    }
                    <button className="ea-save-btn" onClick={() => showToast('✅ Kaydedildi!')}><i className="fas fa-save" /> Kaydet</button>
                  </div>
                )}

                {/* BOOKS TAB */}
                {activeTab === 'books' && (
                  <div>
                    <label className="ea-form-label">Yeni Kitap</label>
                    <div className="ea-form-row" style={{ marginBottom: 12 }}>
                      <input className="ea-admin-input" value={bookTitle} onChange={e => setBookTitle(e.target.value)} placeholder="Kitap adı..." style={{ marginBottom: 0 }} />
                      <input className="ea-admin-input" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)} placeholder="Yazar..." style={{ marginBottom: 0 }} />
                    </div>
                    <div className="ea-upload-zone">
                      <input type="file" accept="image/*" onChange={handleBookCover} />
                      <i className="fas fa-book-open" /><span>Kapak fotoğrafı (isteğe bağlı)</span>
                    </div>
                    <button className="ea-add-btn" onClick={addBook}>+ Kitap Ekle</button>
                    <div style={{ marginTop: 20 }}>
                      <label className="ea-form-label">Kitaplar ({data.books.length})</label>
                      {data.books.length === 0
                        ? <div style={{ color: 'var(--muted)', fontSize: 13 }}>Henüz kitap yok</div>
                        : data.books.map((b, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', marginBottom: 8 }}>
                              {b.cover ? <img src={b.cover} style={{ width: 36, height: 48, objectFit: 'cover', borderRadius: 6 }} alt="" /> : <i className="fas fa-book" style={{ color: 'var(--muted)', fontSize: 20, width: 36, textAlign: 'center' }} />}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{b.title}</div>
                                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{b.author}</div>
                              </div>
                              <button className="ea-small-btn" onClick={() => deleteBook(i)}>Sil</button>
                            </div>
                          ))
                      }
                    </div>
                  </div>
                )}

                {/* MUSIC TAB */}
                {activeTab === 'music' && (
                  <div>
                    <label className="ea-form-label">Yeni Şarkı</label>
                    <input className="ea-admin-input" value={musicTitle} onChange={e => setMusicTitle(e.target.value)} placeholder="Şarkı adı..." />
                    <input className="ea-admin-input" value={musicGenre} onChange={e => setMusicGenre(e.target.value)} placeholder="Tür / Açıklama..." />
                    <div className="ea-upload-zone">
                      <input type="file" accept="image/*" onChange={handleMusicThumb} />
                      <i className="fas fa-compact-disc" /><span>Kapak görseli (isteğe bağlı)</span>
                    </div>
                    <input className="ea-admin-input" value={musicLink} onChange={e => setMusicLink(e.target.value)} placeholder="YouTube / Spotify linki..." />
                    <button className="ea-add-btn" onClick={addMusic}>+ Şarkı Ekle</button>
                    <div style={{ marginTop: 20 }}>
                      <label className="ea-form-label">Şarkılar ({data.music.length})</label>
                      {data.music.length === 0
                        ? <div style={{ color: 'var(--muted)', fontSize: 13 }}>Henüz şarkı yok</div>
                        : data.music.map((t, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', marginBottom: 8 }}>
                              <div style={{ width: 36, height: 36, borderRadius: 8, overflow: 'hidden', background: '#1a1a1a', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {t.thumb ? <img src={t.thumb} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : <i className="fas fa-music" style={{ color: 'var(--accent)', fontSize: 14 }} />}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.title}</div>
                                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.genre}</div>
                              </div>
                              <button className="ea-small-btn" onClick={() => deleteMusic(i)}>Sil</button>
                            </div>
                          ))
                      }
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightboxSrc && (
        <div className="ea-lightbox open" onClick={e => e.target === e.currentTarget && setLightboxSrc('')}>
          <button className="ea-lightbox-close" onClick={() => setLightboxSrc('')}><i className="fas fa-times" /></button>
          <img src={lightboxSrc} alt="" />
        </div>
      )}

      {/* TOAST */}
      {toast && <div className="ea-toast">{toast}</div>}
    </>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
// ─── Color tokens ─────────────────────────────────────────────────────────────
const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
--bg-light: #ffffff;
--bg-dark: #0d0d0d;
--bg-dark2: #111111;
--brand: #00379a;
--text-dark: #0a0a0a;
--text-light: #ffffff;
--text-muted: #6b7280;
--border: rgba(0,0,0,0.08);
--border-dark: rgba(255,255,255,0.10);
--pill-bg: #000;
--pill-text: #fff;
--font-sans: 'DM Sans', sans-serif;
--font-serif: 'DM Serif Display', serif;
--nav-h: 64px;
--radius: 12px;
--radius-lg: 20px;
}
body { font-family: var(--font-sans); background: var(--bg-light); color: var(--text-dark); line-height: 1.5; -webkit-font-smoothing: antialiased; }
/* ── Navbar ── */
.nav {
position: fixed; top: 0; left: 0; right: 0; z-index: 100;
height: var(--nav-h);
display: flex; align-items: center; justify-content: space-between;
padding: 0 24px;
background: rgba(255,255,255,0.95);
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--border);
transition: background 0.3s;
}
.nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
.nav-logo svg { height: 22px; width: auto; }
.nav-links { display: flex; align-items: center; gap: 4px; }
.nav-link {
font-size: 14px; font-weight: 500; color: var(--text-dark);

padding: 6px 12px; border-radius: 8px;
cursor: pointer; background: none; border: none;
display: flex; align-items: center; gap: 4px;
transition: background 0.15s;
text-decoration: none;
}
.nav-link:hover { background: rgba(0,0,0,0.05); }
.nav-link.agents { color: #7c3aed; font-weight: 600; }
.nav-actions { display: flex; align-items: center; gap: 8px; }
.btn-login {
font-size: 14px; font-weight: 500; padding: 7px 16px;
border-radius: 8px; border: 1px solid rgba(0,0,0,0.15);
background: transparent; cursor: pointer;
color: var(--text-dark); text-decoration: none;
transition: background 0.15s; display: inline-flex; align-items: center;
}
.btn-login:hover { background: rgba(0,0,0,0.04); }
.btn-signup {
font-size: 14px; font-weight: 600; padding: 7px 18px;
border-radius: 8px; border: none;
background: var(--text-dark); color: #fff; cursor: pointer;
text-decoration: none; display: inline-flex; align-items: center;
transition: opacity 0.15s;
}
.btn-signup:hover { opacity: 0.85; }
/* ── Hamburger (mobile) ── */
.hamburger {
display: none;
flex-direction: column; justify-content: center; align-items: center;
width: 36px; height: 36px; gap: 5px;
background: none; border: none; cursor: pointer; padding: 0;
}
.hamburger span {
display: block; width: 22px; height: 2px;
background: var(--text-dark); border-radius: 2px;
transition: transform 0.25s, opacity 0.25s;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
/* ── Mobile drawer ── */
.mobile-drawer {
display: none;
position: fixed; top: var(--nav-h); left: 0; right: 0; bottom: 0;
background: #fff; z-index: 99;

flex-direction: column;
padding: 24px;
overflow-y: auto;
gap: 8px;
}
.mobile-drawer.open { display: flex; }
.mobile-drawer-link {
font-size: 18px; font-weight: 500; color: var(--text-dark);
text-decoration: none; padding: 12px 0;
border-bottom: 1px solid var(--border);
display: block;
}
.mobile-drawer-link.agents { color: #7c3aed; font-weight: 600; }
.mobile-drawer-actions {
display: flex; gap: 12px; margin-top: 16px;
}
.mobile-drawer-actions .btn-login,
.mobile-drawer-actions .btn-signup {
flex: 1; justify-content: center; padding: 12px;
font-size: 16px; border-radius: 10px;
}
/* chevron */
.chevron { display: inline-block; width: 10px; height: 10px; margin-left: 2px; transition: transform 0.2s; }
.chevron svg { display: block; }
/* ── Mega dropdown ── */
.mega-wrap { position: relative; }
.mega-menu {
display: none;
position: absolute; top: calc(100% + 8px); left: 50%;
transform: translateX(-50%);
background: #fff;
border: 1px solid var(--border);
border-radius: var(--radius-lg);
box-shadow: 0 20px 60px rgba(0,0,0,0.12);
padding: 24px;
min-width: 680px;
gap: 24px;
}
.mega-wrap:hover .mega-menu,
.mega-wrap.open .mega-menu { display: grid; grid-template-columns: repeat(3, 1fr) 200px; }
.mega-col-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 12px; }
.mega-item { display: block; text-decoration: none; padding: 8px 0; border-radius: 8px; }
.mega-item:hover .mega-item-title { color: var(--brand); }
.mega-item-title { font-size: 14px; font-weight: 500; color: var(--text-dark); margin-bottom: 2px; display: flex; align-items: center; gap: 6px; }
.mega-item-desc { font-size: 12px; color: var(--text-muted); }

.badge-new, .badge-rate {
font-size: 10px; font-weight: 700; padding: 2px 6px;
border-radius: 4px; background: var(--text-dark); color: #fff;
}
.badge-rate { background: #16a34a; }
.mega-card {
border-radius: var(--radius);
background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
padding: 20px; color: #fff; cursor: pointer; position: relative; overflow: hidden;
}
.mega-card h4 { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
.mega-card p { font-size: 12px; opacity: 0.7; line-height: 1.4; }
/* ── Promo banner ── */
.promo-banner {
position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 90;
background: #f0f9ff;
border-bottom: 1px solid #bae6fd;
padding: 10px 16px;
display: flex; align-items: center; justify-content: center; gap: 12px;
font-size: 13px; flex-wrap: wrap; text-align: center;
}
.promo-banner a { color: var(--brand); font-weight: 600; text-decoration: none; white-space: nowrap; }
.promo-close { margin-left: auto; background: none; border: none; cursor: pointer; font-size: 18px; color: var(--text-muted); flex-shrink: 0; }
/* ── Hero ── */
.hero {
min-height: 100vh;
padding-bottom: 80px;
width: 100%;
display: flex;
flex-direction: column;
gap: 32px;
}
.hero-inner {
display: flex;
flex-direction: column;
gap: 28px;
align-items: flex-start;
width: 100%;
max-width: 1280px;
margin: 0 auto;
padding: 0 24px;
}
.hero-h2 {
font-family: var(--font-sans);
font-size: clamp(36px, 7vw, 80px);

font-weight: 350;
line-height: 1.05;
letter-spacing: -0.03em;
margin-bottom: 28px;
color: var(--text-dark);
}
.hero-row {
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
gap: 16px;
}
.hero-pills {
display: flex;
flex-wrap: wrap;
gap: 10px;
}
.hero-pill {
display: flex; align-items: center; gap: 6px;
font-size: 14px; font-weight: 500; color: var(--text-dark);
background: #f3f4f6; border-radius: 100px; padding: 6px 12px;
white-space: nowrap;
}
.btn-primary {
display: inline-flex; align-items: center; gap: 8px;
font-size: 16px; font-weight: 600; padding: 14px 40px;
border-radius: 40px; border: none;
background: var(--text-dark); color: #fff; cursor: pointer;
text-decoration: none;
transition: opacity 0.15s;
white-space: nowrap; flex-shrink: 0;
}
.btn-primary:hover { opacity: 0.85; }
.hero-media {
width: 100%;
border-radius: var(--radius-lg);
overflow: hidden;
background: linear-gradient(135deg, #1a1a2e 0%, #0d0d0d 100%);
aspect-ratio: 16 / 9;
}
.hero-media video {
width: 100%;
height: 100%;
object-fit: cover;
display: block;
}

/* ── Ticker ── */
.ticker-section {
border-top: 1px solid var(--border);
border-bottom: 1px solid var(--border);
overflow: hidden;
padding: 18px 0;
background: var(--bg-light);
}
.ticker-track {
display: flex; gap: 0;
animation: scroll 30s linear infinite;
width: max-content;
}
.ticker-track:hover { animation-play-state: paused; }
.ticker-item {
display: inline-flex; align-items: center; gap: 8px;
padding: 0 20px;
font-size: 14px; font-weight: 600; color: var(--text-dark);
white-space: nowrap; text-decoration: none;
border-right: 1px solid var(--border);
transition: color 0.15s;
}
.ticker-item:hover { color: var(--brand); }
.ticker-pill {
font-size: 11px; font-weight: 700; padding: 2px 7px;
border-radius: 100px; background: #000; color: #fff;
}
.ticker-pill.green { background: #16a34a; }
@keyframes scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
/* ── Section containers ── */
.section { padding: 96px 48px; }
.concierge-section { width: 100%; padding: 96px 48px; }
.section-kicker { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 16px; text-align: center; }
.section-h2 {
text-align: center;
font-family: var(--font-sans);
font-size: clamp(28px, 4vw, 48px);
font-weight: 700; line-height: 1.1; letter-spacing: -0.025em;
margin-bottom: 64px;
}
.container { max-width: 1280px; margin: 0 auto; }
/* ── Feature rows ── */
.feature-list { display: flex; flex-direction: column; gap: 0; }
.feature-row {

display: flex;
flex-direction: column;
align-items: center;
text-align: center;
gap: 28px;
padding: 64px 0;
border-top: 1px solid var(--border);
}
.feature-row:first-child { border-top: none; }
.feature-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 12px; }
.feature-h3 { font-size: clamp(22px, 3vw, 28px); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 14px; }
.feature-p { font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 20px; max-width: 480px; }
.feature-link { font-size: 14px; font-weight: 600; color: var(--text-dark); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; border-bottom: 1.5px solid currentColor; padding-bottom: 1px; }
.feature-link:hover { color: var(--brand); }
.feature-media {
width: 100%;
max-width: 500px;
margin: 0 auto;
border-radius: var(--radius-lg);
overflow: hidden;
background: transparent;
aspect-ratio: 16/10;
display: flex;
align-items: center;
justify-content: center;
position: relative;
}
.feature-media img {
width: 100%;
height: 100%;
object-fit: cover;
display: block;
border-radius: var(--radius-lg);
filter: drop-shadow(0 25px 60px rgba(0,0,0,0.18));
transform: scale(1.02);
}
.feature-item {
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
}
.feature-row.full { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 28px; padding: 64px 0; border-top: 1px solid var(--border); }
.feature-row.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 64px 0; border-top: 1px solid var(--border); }
/* ── Dark section ── */
.section-dark { background: var(--bg-dark); color: var(--text-light); padding: 96px 48px; }

.section-dark .section-h2 { color: var(--text-light); }
.section-dark .feature-media { background: #1a1a1a; border-color: rgba(255,255,255,0.08); }
.section-dark .feature-p { color: rgba(255,255,255,0.65); }
.section-dark .feature-link { color: #fff; }
.section-dark .feature-row { border-top-color: rgba(255,255,255,0.08); }
.trading-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; }
.trading-card {
background: #1a1a1a; border: 1px solid rgba(255,255,255,0.08);
border-radius: var(--radius-lg); overflow: hidden;
}
.trading-card-body { padding: 28px 28px 0; }
.trading-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; color: #fff; }
.trading-card p { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 16px; }
.trading-card-link { font-size: 14px; font-weight: 600; color: #fff; text-decoration: none; border-bottom: 1.5px solid rgba(255,255,255,0.4); }
.trading-card-img {
height: 160px; margin-top: 24px;
background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
display: flex; align-items: center; justify-content: center;
}
.rate-badge {
display: inline-flex; flex-direction: column; align-items: center;
background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
border-radius: 10px; padding: 10px 20px; margin: 4px;
}
.rate-badge span { font-size: 11px; color: rgba(255,255,255,0.5); }
.rate-badge b { font-size: 24px; font-weight: 700; color: #fff; }
/* ── Nerdy features ── */
.features-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 24px;
margin-top: 48px;
}
.nerdy-feature {
background: var(--bg-light);
border: 1px solid var(--border);
border-radius: var(--radius-lg);
padding: 32px;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
gap: 20px;
}
.nerdy-feature.full-width { grid-column: 1/-1; }
.nerdy-feature h3 { font-size: 20px; font-weight: 700; margin-bottom: 10px; }

.nerdy-feature p { font-size: 14px; color: #4b5563; line-height: 1.6; margin-bottom: 14px; }
.nerdy-content { max-width: 500px; }
.nerdy-media {
width: 100%;
max-width: 500px;
aspect-ratio: 16/10;
border-radius: var(--radius);
overflow: hidden;
background: #f3f4f6;
display: flex;
align-items: center;
justify-content: center;
}
.nerdy-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
/* ── Buying power ── */
.buying-power {
text-align: center; padding: 80px 24px;
background: #f9fafb; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
}
.buying-power h2 { font-size: clamp(28px, 4vw, 40px); font-weight: 700; letter-spacing: -0.025em; max-width: 600px; margin: 0 auto 12px; }
.buying-power h2 span { color: #16a34a; }
.buying-power p { color: var(--text-muted); font-size: 15px; }
/* ── Concierge ── */
.concierge-grid {
width: 100%;
max-width: 1400px;
margin: 0 auto;
display: grid;
grid-template-columns: 1fr auto;
gap: 80px;
align-items: center;
}
.concierge-left { max-width: 600px; }
.concierge-desc {
color: rgba(255,255,255,0.55);
font-size: 16px;
margin-top: 16px;
line-height: 1.6;
}
.concierge-card {
width: 360px;
max-width: 100%;
background: #000;
border: 1px solid rgba(255,255,255,0.08);
border-radius: var(--radius-lg);

padding: 32px;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
gap: 20px;
}
.concierge-card h3 { font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #fff; }
.concierge-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.concierge-list li { font-size: 15px; color: rgba(255,255,255,0.8); display: flex; align-items: center; gap: 10px; }
.concierge-list li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.5); flex-shrink: 0; }
.btn-glow {
display: inline-flex; align-items: center; gap: 8px;
font-size: 15px; font-weight: 600; padding: 14px 28px;
border-radius: 10px; border: 1px solid rgba(255,255,255,0.2);
background: rgba(255,255,255,0.08); color: #fff; cursor: pointer;
transition: background 0.2s; text-decoration: none;
}
.btn-glow.center { margin-top: 12px; justify-content: center; }
.btn-glow:hover { background: rgba(255,255,255,0.15); }
/* ── Safeguards ── */
.safeguards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 48px; }
.safeguard-card {
background: #1a1a1a; border: 1px solid rgba(255,255,255,0.06);
border-radius: var(--radius); padding: 28px;
}
.safeguard-card h3 { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 10px; }
.safeguard-card p { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; }
/* ── CTA ── */
.cta-section {
background: var(--bg-dark);
color: #fff;
padding: 120px 48px;
width: 100%;
position: relative;
overflow: hidden;
}
.cta-inner {
max-width: 1400px;
margin: 0 auto;
display: flex;
align-items: center;
justify-content: space-between;
gap: 80px;
}

.cta-left { flex: 1; text-align: left; }
.cta-left h2 {
font-size: clamp(28px, 4vw, 52px);
font-weight: 700;
line-height: 1.1;
margin-bottom: 24px;
}
.cta-media { flex: 1; display: flex; justify-content: center; align-items: center; }
.cta-image { width: 100%; max-width: 800px; display: flex; justify-content: flex-end; align-items: center; position: relative; }
.cta-image img { width: 110%; max-width: none; object-fit: contain; }
.cta-section::before {
content: ''; position: absolute; width: 600px; height: 600px;
border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
top: 50%; left: 50%; transform: translate(-50%,-50%);
pointer-events: none;
}
.cta-review { margin-top: 48px; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
.stars { display: flex; gap: 4px; }
.star { color: #fbbf24; font-size: 20px; }
.cta-review p { font-size: 16px; color: rgba(255,255,255,0.75); max-width: 400px; }
.cta-review small { font-size: 12px; color: rgba(255,255,255,0.4); }
/* ── Footer ── */
.footer { background: var(--bg-dark); border-top: 1px solid rgba(255,255,255,0.06); }
.footer-cols { display: grid; grid-template-columns: repeat(4,1fr) 200px; gap: 40px; padding: 72px 48px 48px; max-width: 1280px; margin: 0 auto; }
.footer-col h3 { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 16px; }
.footer-col nav { display: flex; flex-direction: column; gap: 10px; }
.footer-col nav a { font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.15s; }
.footer-col nav a:hover { color: rgba(255,255,255,0.9); }
.footer-links { max-width: 1280px; margin: 0 auto; padding: 24px 48px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-wrap: wrap; gap: 12px; }
.footer-links a { font-size: 12px; color: rgba(255,255,255,0.35); text-decoration: none; }
.footer-links a:hover { color: rgba(255,255,255,0.7); }
.footer-disc { max-width: 1280px; margin: 0 auto; padding: 0 48px 48px; }
.footer-disc p { font-size: 12px; color: rgba(255,255,255,0.3); line-height: 1.6; margin-bottom: 8px; }
.footer-social { display: flex; gap: 16px; margin-top: 16px; }
.footer-social a { color: rgba(255,255,255,0.4); text-decoration: none; font-size: 16px; transition: color 0.15s; }
.footer-social a:hover { color: #fff; }
.footer-copy { font-size: 12px; color: rgba(255,255,255,0.25); padding: 24px 48px; max-width: 1280px; margin: 0 auto; border-top: 1px solid rgba(255,255,255,0.04); }
/* ══════════════════════════════════════════════
RESPONSIVE — MOBILE FIXES
══════════════════════════════════════════════ */
@media (max-width: 900px) {
/* Nav */
.nav-links { display: none; }
.hamburger { display: flex; }

/* Hero */
.hero {
padding-left: 0;
padding-right: 0;
gap: 20px;
}
.hero-inner { padding: 0 20px; gap: 20px; }
.hero-h2 { font-size: clamp(32px, 9vw, 52px); margin-bottom: 16px; }
/* Pills + button stacked on mobile */
.hero-row {
flex-direction: column;
align-items: flex-start;
gap: 16px;
}
.hero-pills { gap: 8px; }
.hero-pill { font-size: 13px; padding: 5px 10px; }
.btn-primary { width: 100%; justify-content: center; padding: 14px 24px; }
/* Sections */
.section { padding: 60px 20px; }
.section-dark { padding: 60px 20px; }
.concierge-section { padding: 60px 20px; }
/* Feature rows */
.feature-row.two-col {
grid-template-columns: 1fr;
gap: 48px;
}
/* Trading cards */
.trading-cards { grid-template-columns: 1fr; gap: 16px; }
/* Nerdy features */
.features-grid { grid-template-columns: 1fr; }
.nerdy-feature.full-width { grid-column: 1; }
/* Safeguards */
.safeguards-grid { grid-template-columns: 1fr; gap: 16px; }
/* Concierge */
.concierge-grid {
grid-template-columns: 1fr;
gap: 40px;
text-align: center;
}
.concierge-left { max-width: 100%; }

.concierge-card { margin: 0 auto; }
.concierge-list li { justify-content: center; }
/* CTA */
.cta-section { padding: 80px 20px; }
.cta-inner {
flex-direction: column;
text-align: center;
gap: 48px;
}
.cta-left { text-align: center; }
.cta-review { align-items: center; }
.cta-media { width: 100%; }
.cta-image { justify-content: center; }
.cta-image img { width: 100%; }
/* Footer */
.footer-cols { grid-template-columns: repeat(2,1fr); padding: 48px 20px 32px; gap: 32px; }
.footer-links { padding: 20px; }
.footer-disc { padding: 0 20px 32px; }
.footer-copy { padding: 20px; }
}
@media (max-width: 480px) {
.hero-h2 { font-size: 30px; }
.section-h2 { font-size: 26px; margin-bottom: 40px; }
.footer-cols { grid-template-columns: 1fr; }
.promo-banner { font-size: 12px; }
.promo-banner b { display: block; }
.trading-card-body { padding: 20px 20px 0; }
}
`;
// ─── Logo ────────────────────────────────────────────────────────────────────
function PublicLogo({ dark = false }) {
const fill = dark ? "#fff" : "#0a0a0a";
return (
<svg width="87" height="26" viewBox="0 0 87 26" fill={fill} xmlns="http://www.w3.org/2000/svg">
<g fillRule="nonzero">
<g transform="translate(23.391400, 2.020020)">
<path d="M57.5794,18.09968 C59.6437,18.09968 61.7311,16.92788 62.8334,14.98138 L61.0273,13.80948 C60.3706,14.98138 59.2495,15.82598 57.5762,15.82598 C55.7472,15.82598 54.0823,14.46698 54.0823,11.93408 C54.0823,9.26098 55.7472,8.04208 57.5762,8.04208 C58.9358,8.04208 60.039,8.60448 61.0273,9.77638 L62.6221,8.34738 C62.067,7.5557 61.3304,6.90838 60.4739,6.45953 C59.6173,6.01068 58.6657,5.77334 57.6986,5.76736 C54.6491,5.76736 51.6467,8.04208 51.6467,11.93508 C51.6467,15.82808 54.578,18.09968 57.5794,18.09968 Z"/>
<path d="M48.2448,3.86895 C48.61,3.87144 48.9678,3.76529 49.2725,3.56401 C49.5773,3.36273 49.8152,3.07542 49.9562,2.73859 C50.0972,2.40176 50.1348,2.03063 50.0642,1.67239 C49.9936,1.31415 49.8181,0.98498 49.5599,0.72673 C49.3017,0.46848 48.9725,0.29281 48.6142,0.22206 C48.2558,0.15131 47.8845,0.18867 47.5475,0.3294 C47.2105,0.47012 46.9229,0.70786 46.7214,1.01237 C46.5198,1.31689 46.4134,1.67443 46.4157,2.03954 C46.4128,2.28051 46.4581,2.51964 46.5489,2.74285 C46.6398,2.96607 46.7744,3.16887 46.9448,3.33932 C47.1152,3.50977 47.318,3.64443 47.5413,3.73539 C47.7645,3.82635 48.0037,3.87176 48.2448,3.86895 Z"/>
<polygon points="49.3711 6.14266 47.0495 6.14266 47.0495 17.81848 49.3711 17.81848"/>
<polygon points="43.9529 0 41.4201 0 41.4201 17.81848 43.9529 17.81848"/>
<path d="M33.4931,5.76736 C31.7341,5.76736 30.4436,6.49913 29.7168,7.66682 L29.7168,0 L27.1369,0 L27.1369,17.81848 L29.7168,17.81848 L29.7168,16.34138 C30.4488,17.44318 31.7341,18.09968 33.4931,18.09968 C36.8699,18.09968 39.2156,15.49778 39.2156,11.93198 C39.2156,8.55648 36.7297,5.76736 33.4931,5.76736 Z M33.2839,15.70888 C30.9612,15.70888 29.3905,14.14088 29.3905,11.93408 C29.3905,9.77638 30.9592,8.15918 33.2839,8.15918 C35.3755,8.15918 36.872,9.65928 36.872,11.93408 C36.8699,14.13768 35.3692,15.70888 33.2818,15.70888 L33.2839,15.70888 Z"/>
<path d="M18.6912,17.98268 C19.9346,17.98268 20.9657,17.44318 21.7406,16.34138 L21.7406,17.81848 L24.1564,17.81848 L24.1564,6.14266 L21.6716,6.14266 L21.6716,12.89478 C21.6716,14.60608 20.6394,15.70888 18.9526,15.70888 C17.522,15.70888 16.7481,14.46598 16.7481,12.89478 L16.7481,6.14266 L14.2131,6.14266 L14.2131,13.29408 C14.2131,16.01318 15.9021,17.98268 18.6912,17.98268 Z"/>
<path d="M6.4974,5.76736 C4.8085,5.76736 3.5191,6.49913 2.4628,7.66682 L2.4628,6.14265 L0,6.14265 L0,21.99168 L2.4628,21.99168 L2.4628,16.34658 C3.5191,17.44848 4.8085,18.10498 6.4974,18.10498 C9.8512,18.10498 12.267,15.31478 12.267,11.93718 C12.267,8.34738 9.8512,5.76736 6.4974,5.76736 Z M6.1691,15.70888 C3.7763,15.70888 2.3457,14.14088 2.3457,11.93408 C2.3457,9.77638 3.7763,8.15918 6.1691,8.15918 C8.4436,8.15918 9.8512,9.77638 9.8512,11.93408 C9.8512,14.13768 8.4426,15.70888 6.1691,15.70888 Z"/>

</g>
<g>
<path d="M7.79749,15.595 C12.1039,15.595 15.595,12.1039 15.595,7.79749 C15.595,3.49106 12.1039,0 7.79749,0 C3.49105,0 0,3.49106 0,7.79749 C0,12.1039 3.49105,15.595 7.79749,15.595 Z"/>
<path d="M3.89874,26 C4.93479,25.9931 5.92608,25.5768 6.65644,24.8419 C7.38679,24.1071 7.79696,23.1132 7.79749,22.0772 C7.79749,19.9639 6.03609,18.2025 3.89874,18.2025 C1.7614,18.2025 0,19.9639 0,22.0772 C0.000529819,23.1132 0.410695,24.1071 1.14105,24.8419 C1.8714,25.5768 2.8627,25.9931 3.89874,26 Z"/>
</g>
</g>
</svg>
);
}
function Chevron() {
return (
<span className="chevron">
<svg width="10" height="6" viewBox="0 0 10 6" fill="none">
<path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</span>
);
}
// ─── Mega menus ───────────────────────────────────────────────────────────────
function ProductsMega() {
return (
<div className="mega-menu" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
<div>
<div className="mega-col-label">Assets</div>
{[["Stocks","Build your portfolio with over 9,000 stocks."],["Crypto","Explore a growing collection of 40+ assets."],["ETFs","Broaden your exposure with baskets of assets."],["Options Trading","Earn rebates on your options trades."],["Bonds","Fractionalized access to corporate bonds."]].map(([t,d])=>(
<a key={t} href="#" className="mega-item"><div className="mega-item-title">{t}</div><div className="mega-item-desc">{d}</div></a>
))}
</div>
<div>
<div className="mega-col-label">Custom Strategies</div>
{[["Direct Indexing","Build a custom, tax-optimized portfolio."],["Generated Assets","Turn any idea into an investable index.",true],["Trading API","Program your trading with no commissions."]].map(([t,d,isNew])=>(
<a key={String(t)} href="#" className="mega-item"><div className="mega-item-title">{t}{isNew&&<span className="badge-new">New</span>}</div><div className="mega-item-desc">{d}</div></a>
))}
<div className="mega-col-label" style={{marginTop:20}}>Yield Accounts</div>
{[["Bond Account","Lock in yield with regular interest payments."],["High-Yield Cash Account","Earn 3.30% APY on your cash with no fees."],["Treasuries","Build a customizable ladder of US Treasuries.",false,"3.71%"]].map(([t,d,_,rate])=>(
<a key={String(t)} href="#" className="mega-item"><div className="mega-item-title">{t}{rate&&<span className="badge-rate">{rate}</span>}</div><div className="mega-item-desc">{d}</div></a>
))}
</div>
<div>
<div className="mega-col-label">Account Types</div>
{[["Margin","Access the industry's lowest margin rates."],["Traditional & Roth IRAs","Earn a 1% match on your annual contributions."],["Crypto IRAs","Trade crypto in a tax-advantaged account.",true]].map(([t,d,isNew])=>(
<a key={String(t)} href="#" className="mega-item"><div className="mega-item-title">{t}{isNew&&<span className="badge-new">New</span>}</div><div className="mega-item-desc">{d}</div></a>
))}
</div>
<div>

<div className="mega-card"><h4>Transfer your portfolio</h4><p>Earn a 1% match when you transfer your investment portfolio to Public.</p></div>
</div>
</div>
);
}
function ToolsMega() {
return (
<div className="mega-menu" style={{gridTemplateColumns:"1fr 1fr 200px"}}>
<div>{[["Options Rebate Program","See how you earn on every stock and ETF contract."],["Learn and Earn","Browse our latest articles and investing resources."],["Bond Screener","Explore over 10,000 bonds with our advanced tool."]].map(([t,d])=>(<a key={t} href="#" className="mega-item"><div className="mega-item-title">{t}</div><div className="mega-item-desc">{d}</div></a>))}</div>
<div>{[["Margin Interest Calculator","Compare how much interest you could save."],["Prompt Hub","Learn how to craft prompts for Generated Assets and AI agents."],["API Documentation","View docs, endpoints, SDKs, and tools."]].map(([t,d])=>(<a key={t} href="#" className="mega-item"><div className="mega-item-title">{t}</div><div className="mega-item-desc">{d}</div></a>))}</div>
<div><div className="mega-card"><h4>Transfer your portfolio</h4><p>Earn a 1% match when you transfer your portfolio to Public.</p></div></div>
</div>
);
}
function CompanyMega() {
return (
<div className="mega-menu" style={{gridTemplateColumns:"1fr 1fr 200px"}}>
<div>{[["About","We exist to give people every opportunity to grow their wealth."],["Careers","Join our team and help build the future of Public."],["Newsroom","Access our media kit and a collection of our latest news."]].map(([t,d])=>(<a key={t} href="#" className="mega-item"><div className="mega-item-title">{t}</div><div className="mega-item-desc">{d}</div></a>))}</div>
<div>{[["Public Concierge","An exclusive program for investors with $500k+ accounts."],["Have questions?","Reach out to us at support@public.com — we're here to help."],["Media","Market news, live commentary, and analysis from industry experts."]].map(([t,d])=>(<a key={t} href="#" className="mega-item"><div className="mega-item-title">{t}</div><div className="mega-item-desc">{d}</div></a>))}</div>
<div><div className="mega-card"><h4>Transfer your portfolio</h4><p>Earn a 1% match when you transfer your portfolio to Public.</p></div></div>
</div>
);
}
// ─── Ticker ───────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
{ label: "Stocks" }, { label: "Bonds" }, { label: "Treasuries" }, { label: "Options" },
{ label: "Crypto" }, { label: "ETFs" },
{ label: "Bond Account", pill: "5.82% yield*", pillGreen: true },
{ label: "High-Yield Cash Account", pill: "3.30% APY*", pillGreen: true },
{ label: "Treasury Account" }, { label: "Direct Indexing" }, { label: "Generated Assets" },
{ label: "IRAs", pill: "1% MATCH" }, { label: "Crypto IRA" }, { label: "Investment Plans" },
{ label: "Agents" }, { label: "API" },
];
// ─── Feature item ─────────────────────────────────────────────────────────────
type Feature = { tag: string; h: string; p: string; link: string; rev?: boolean; img?: string; };
const FeatureItem = ({ f }: { f: Feature }) => (
<div className="feature-item">
<div className="feature-tag">{f.tag}</div>
<h3 className="feature-h3">{f.h}</h3>
<p className="feature-p">{f.p}</p>
<a href={f.link} className="feature-link">Learn more →</a>
<div className="feature-media">
{f.img ? <img src={f.img} alt={f.h} /> : <div style={{color:"rgba(0,0,0,0.2)",fontSize:12}}>App screenshot — {f.h}</div>}

</div>
</div>
);
// ─── Data ─────────────────────────────────────────────────────────────────────
const AI_FEATURES: Feature[] = [
{ tag:"Agents", h:"Agents", p:"Public is the world's first agentic brokerage. You can manage your portfolio and automate your investing with Agents that act on your behalf.", link:"/ai-agents", img:"/ai-features-pics/feature-01-01.webp" },
{ tag:"Market Briefing", h:"Market briefing", p:"Get a detailed breakdown of what's moving the markets each day. Our AI summarizes the most important developments—from economic data to global events.", link:"/ai-agents", img:"/ai-features-pics/feature-01-02.webp" },
{ tag:"Key Moments", h:"Key moments", p:"Learn the reasons behind every major stock price movement with detailed, contextual summaries embedded directly on the asset's performance chart.", link:"/ai-agents", img:"/ai-features-pics/feature-01-03.webp" },
{ tag:"Generated Assets", h:"Generated Assets", p:"Turn any idea into an investable index with AI. Just enter a prompt, backtest your results against the S&P 500, and invest with a few clicks.", link:"/generated-asset", img:"/ai-features-pics/feature-01-04.webp" },
{ tag:"Earnings", h:"Earnings call summaries", p:"Catch up on earnings calls the moment they end with AI-generated summaries covering the company's latest performance, outlook, and analyst guidance.", link:"/ai-agents", img:"/ai-features-pics/feature-01-05.webp" },
{ tag:"Research", h:"Research assistant", p:"Dive deep into any company or sector with an AI research assistant that synthesizes news, filings, and analyst data into clear, actionable insights.", link:"/ai-agents", img:"/ai-features-pics/feature-01-06.webp" },
];
const TRADING_CARDS = [
{ h:"Trade options. Earn rebates.", p:"Public is the only investing platform with options trading rebates. Earn $0.06–$0.18 per stock or ETF contract based on your monthly trading volume.", href:"/invest/options-trading", type:"options" },
{ h:"The lowest margin rates. Period.", p:"Now, you can increase your buying power on Public with a base margin rate of just 5.65%. That's the lowest base rate among leading brokerages.", href:"/invest/margin", type:"rates" },
{ h:"Access our API for programmatic trading", p:"With the Public API, you can tap into real-time market data and automate your trading—all while earning rebates on your options contracts.", href:"/api", type:"api" },
];
const NERDY = [
{ h:"Crypto IRAs", p:"Build your crypto position for the long term inside a tax-advantaged retirement account. Buy and sell your favorite coins with no capital gains taxes.", href:"/invest/crypto-ira", img:"/nerdy-features-pics/feature-02-01.webp" },
{ h:"Income Hub", p:"View a monthly breakdown of your earnings from every income-generating asset you own. Plus, see a forecast of your earnings for the year ahead.", href:"/ai-agents", img:"/nerdy-features-pics/feature-02-02.webp" },
{ h:"Direct indexing", p:"Take advantage of tax-loss harvesting with direct indexing on Public. Choose from 100+ customizable indices and get started with as little as $1,000.", href:"/direct-indexing", full:true, img:"/nerdy-features-pics/feature-02-03.webp" },
{ h:"Earnings Hub", p:"Access AI-generated earnings recaps, company KPIs, investor presentations, and the actual audio of the earnings call—all without leaving Public.", href:"/ai-agents", img:"/nerdy-features-pics/feature-02-04.webp" },
{ h:"Queue", p:"Tee up all your equities and options trades in one place, make real-time edits with live price data, and place multiple orders in a single move.", href:"/invest/options-trading", img:"/nerdy-features-pics/feature-02-05.webp" },
];
const SAFEGUARDS = [
{ h:"Regulated in the US", p:"Brokerage services for US-listed, registered securities are offered through Public Investing, Inc., a registered broker-dealer and FINRA/SIPC member." },
{ h:"Insurance coverage", p:"SIPC protects the cash and securities in your portfolio up to $500,000. FDIC provides up to $5 million in protection for your High-Yield Cash Account." },
{ h:"Financial-grade security", p:"We secure your data with AES 256-bit encryption and the latest TLS protocols, ensuring your information stays protected at all times." },
{ h:"Headquartered in New York", p:"Public is based in New York, with a customer support team here in the US. Our mission is to give people every opportunity to grow their wealth." },
{ h:"Fee transparency", p:"Our straightforward fee structure can help you understand exactly what things cost—and what our incentives are as a business." },
{ h:"99.994% uptime*", p:"Our reliable platform achieves 99.994% uptime, keeping you connected to the markets whenever you need. *Based on calendar year 2024." },
];
const FOOTER_PRODUCTS = ["Stocks","ETFs","Crypto","Crypto IRA","Options","Margin","Bonds","Direct Indexing","Treasuries","High-Yield Cash Account","Premium","Agents"];
const FOOTER_RESOURCES = ["About Us","Learn","Careers","Public's Fee Schedule"];
const FOOTER_LINKS = ["Investment Themes","Investing Glossary","Fixed Income Glossary","Options Trading Glossary","Transfer your Portfolio","Treasury Yield Curve","Margin Interest Calculator","High Yield Savings Calculator"];
const FOOTER_CONTACT = ["Help","FAQ","support@public.com","press@public.com"];
// ─── Main component ───────────────────────────────────────────────────────────
export default function PublicHomePage() {
const [promoBannerVisible, setPromoBannerVisible] = useState(true);
const [openMenu, setOpenMenu] = useState<string | null>(null);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
// Close menu on outside click
useEffect(() => {

const handleClick = () => setOpenMenu(null);
document.addEventListener("click", handleClick);
return () => document.removeEventListener("click", handleClick);
}, []);
const toggleMenu = (name: string) => {
setOpenMenu(prev => prev === name ? null : name);
};
const navOffset = promoBannerVisible ? 64 + 44 : 64;
return (
<>
<style>{styles}</style>
{/* ── Navbar ── */}
<nav className="nav">
<Link href="/" className="nav-logo"><PublicLogo /></Link>
<div className="nav-links">
<div className="mega-wrap" onClick={e => { e.stopPropagation(); toggleMenu("products"); }}>
<button className="nav-link">Products <Chevron /></button>
{openMenu === "products" && <ProductsMega />}
</div>
<a href="#" className="nav-link agents">Agents</a>
<div className="mega-wrap" onClick={e => { e.stopPropagation(); toggleMenu("tools"); }}>
<button className="nav-link">Tools &amp; Resources <Chevron /></button>
{openMenu === "tools" && <ToolsMega />}
</div>
<div className="mega-wrap" onClick={e => { e.stopPropagation(); toggleMenu("company"); }}>
<button className="nav-link">Company <Chevron /></button>
{openMenu === "company" && <CompanyMega />}
</div>
</div>
<div className="nav-actions">
{/* Desktop buttons */}
<Link href="/login" className="btn-login" style={{display:"none"}} aria-hidden>Log in</Link>
<Link href="/signup" className="btn-signup" style={{display:"none"}} aria-hidden>Sign up</Link>
{/* Shown via media query on desktop */}
<Link href="/login" className="btn-login nav-desktop-btn">Log in</Link>
<Link href="/signup" className="btn-signup nav-desktop-btn">Sign up</Link>
{/* Hamburger (mobile) */}
<button
className={`hamburger${mobileMenuOpen ? " open" : ""}`}
onClick={() => setMobileMenuOpen(v => !v)}

aria-label="Toggle menu"
>
<span /><span /><span />
</button>
</div>
</nav>
{/* ── Mobile drawer ── */}
<div className={`mobile-drawer${mobileMenuOpen ? " open" : ""}`} style={{top: navOffset}}>
<a href="#" className="mobile-drawer-link">Products</a>
<a href="#" className="mobile-drawer-link agents">Agents</a>
<a href="#" className="mobile-drawer-link">Tools &amp; Resources</a>
<a href="#" className="mobile-drawer-link">Company</a>
<div className="mobile-drawer-actions">
<Link href="/login" className="btn-login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
<Link href="/signup" className="btn-signup" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
</div>
</div>
{/* ── Promo banner ── */}
{promoBannerVisible && (
<div className="promo-banner">
<span><b>Transfer your portfolio. Earn 1% uncapped.</b> Move a brokerage account, IRA, or 401(k) to Public and get a 1% uncapped match.</span>
<a href="#">Learn more →</a>
<button className="promo-close" onClick={() => setPromoBannerVisible(false)}>×</button>
</div>
)}
<div style={{paddingTop: navOffset}}>
{/* ── Hero ── */}
<section className="hero" style={{paddingTop: 40}}>
<div className="hero-inner">
<div className="hero-content">
<h2 className="hero-h2">
Investing for those<br />who take it seriously
</h2>
</div>
<div className="hero-row">
<div className="hero-pills">
<span className="hero-pill">Multi-asset investing</span>
<span className="hero-pill">AI Agents</span>
<span className="hero-pill">3.3% APY* on cash</span>
</div>
<Link href="/signup" className="btn-primary">Get started</Link>
</div>

<div className="hero-media">
<video autoPlay muted loop playsInline>
<source src="/hero-media.webm" type="video/webm" />
</video>
</div>
</div>
</section>
{/* ── Ticker ── */}
<div className="ticker-section">
<div className="ticker-track">
{doubled.map((item, i) => (
<a href="#" key={i} className="ticker-item">
{item.label}
{item.pill && <span className={`ticker-pill${item.pillGreen ? " green" : ""}`}>{item.pill}</span>}
</a>
))}
</div>
</div>
{/* ── AI for investors ── */}
<section className="section">
<div className="container">
<div className="section-kicker">AI for investors</div>
<h2 className="section-h2">Bring AI into every part of<br />your investing experience</h2>
<div className="feature-list">
<div className="feature-row full"><FeatureItem f={AI_FEATURES[0]} /></div>
<div className="feature-row two-col">
<FeatureItem f={AI_FEATURES[1]} />
<FeatureItem f={AI_FEATURES[2]} />
</div>
<div className="feature-row full"><FeatureItem f={AI_FEATURES[3]} /></div>
<div className="feature-row two-col">
<FeatureItem f={AI_FEATURES[4]} />
<FeatureItem f={AI_FEATURES[5]} />
</div>
</div>
</div>
</section>
{/* ── Active trading (dark) ── */}
<div className="section-dark">
<div className="container">
<div className="section-kicker" style={{color:"rgba(255,255,255,0.4)"}}>Active Trading</div>
<h2 className="section-h2">The new standard.<br />For active trading.</h2>
<div className="trading-cards">

{TRADING_CARDS.map((c, i) => (
<div key={i} className="trading-card">
<div className="trading-card-body">
<h3>{c.h}</h3>
<p>{c.p}</p>
<a href={c.href} className="trading-card-link">Learn more →</a>
</div>
<div className="trading-card-img">
{c.type === "rates" ? (
<div style={{display:"flex",gap:8}}>
<div className="rate-badge"><span>Base rate</span><b>4.90%</b></div>
<div className="rate-badge"><span>Lowest rate</span><b>3.95%</b></div>
</div>
) : (
<span style={{color:"rgba(255,255,255,0.15)",fontSize:12}}>App screenshot</span>
)}
</div>
</div>
))}
</div>
</div>
</div>
{/* ── Five nerdy features ── */}
<section className="section">
<div className="container">
<div className="section-kicker">Features</div>
<h2 className="section-h2">Five nerdy features you'll love.<br /><span style={{fontWeight:400,color:"#6b7280"}}>(Discover many more in the app.)</span></h2>
<div className="features-grid">
{NERDY.map((n, i) => (
<div key={i} className={`nerdy-feature${n.full ? " full-width" : ""}`}>
<div className="nerdy-content">
<h3>{n.h}</h3>
<p>{n.p}</p>
<a href={n.href} className="feature-link">Learn more →</a>
</div>
<div className="nerdy-media">
{n.img ? <img src={n.img} alt={n.h} /> : <>App screenshot — {n.h}</>}
</div>
</div>
))}
</div>
</div>
</section>
{/* ── Buying power ── */}
<div className="buying-power">

<h2>And up to $250,000 <span>in instant buying power</span></h2>
<p style={{margin:"12px auto 4px",maxWidth:480}}>Take advantage of every investment opportunity by making moves without waiting for funds to settle.</p>
<p style={{fontSize:12,color:"#9ca3af"}}>Varies by account.</p>
</div>
{/* ── Concierge (dark) ── */}
<div className="section-dark concierge-section">
<div className="concierge-grid">
<div className="concierge-left">
<div className="section-kicker" style={{color:"rgba(255,255,255,0.4)",marginBottom:12,textAlign:"left"}}>
Public Concierge
</div>
<h2 className="section-h2" style={{marginBottom:0,textAlign:"left"}}>
Have an account valued<br />at $500,000 or more?
</h2>
<p className="concierge-desc">Gain access to Public Concierge, an exclusive program for select investors.</p>
</div>
<div className="concierge-card">
<h3>Your benefits include</h3>
<ul className="concierge-list">
<li>VIP, white-glove support</li>
<li>Exclusive invitations and events</li>
<li>Personalized opportunities</li>
</ul>
<a href="#" className="btn-glow center">Apply now</a>
</div>
</div>
</div>
{/* ── Safeguards (dark) ── */}
<div className="section-dark" style={{borderTop:"1px solid rgba(255,255,255,0.06)"}}>
<div className="container">
<h2 className="section-h2">Secure by design.<br /><span style={{fontWeight:400,color:"rgba(255,255,255,0.4)"}}>Transparent by choice.</span></h2>
<div className="safeguards-grid">
{SAFEGUARDS.map((s, i) => (
<div key={i} className="safeguard-card">
<h3>{s.h}</h3>
<p>{s.p}</p>
</div>
))}
</div>
</div>
</div>
{/* ── CTA (dark) ── */}
<div className="cta-section">
<div className="cta-inner">

<div className="cta-left">
<h2>Transfer your portfolio.<br />Earn an uncapped 1% match.</h2>
<Link href="/signup" className="btn-glow" style={{fontSize:16,padding:"14px 32px"}}>Sign up</Link>
<div className="cta-review">
<div className="stars">{"★★★★★".split("").map((s, i) => <span key={i} className="star">{s}</span>)}</div>
<p>Public earns high marks for ease-of-use and its investment selection.</p>
<small>10K+ reviews · NerdWallet</small>
</div>
</div>
<div className="cta-media">
<div className="cta-image">
<img src="/com-bg.webp" alt="cta" />
</div>
</div>
</div>
</div>
{/* ── Footer ── */}
<footer className="footer">
<div className="footer-cols">
<div className="footer-col"><h3>Products</h3><nav>{FOOTER_PRODUCTS.map(l=><a key={l} href="#">{l}</a>)}</nav></div>
<div className="footer-col"><h3>Resources</h3><nav>{FOOTER_RESOURCES.map(l=><a key={l} href="#">{l}</a>)}</nav></div>
<div className="footer-col"><h3>Quick Links</h3><nav>{FOOTER_LINKS.map(l=><a key={l} href="#">{l}</a>)}</nav></div>
<div className="footer-col">
<h3>Contact Us</h3>
<nav>{FOOTER_CONTACT.map(l=><a key={l} href="#">{l}</a>)}</nav>
<div className="footer-social">
<a href="#">X</a><a href="#"> </a><a href="#">f</a><a href="#">in</a>
</div>
</div>
<div className="footer-col">
<PublicLogo dark />
<p style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:12,lineHeight:1.6}}>Check the background of this firm on FINRA's BrokerCheck.</p>
</div>
</div>
<div className="footer-links">
{["Disclosures","Privacy Policy","Your Privacy Choices","Terms of Service","Fractional Shares Disclosure","Markets","Stocks Directory","ETFs Directory","Options Chain"].map(l=>(
<a key={l} href="#">{l}</a>
))}
</div>
<div className="footer-disc">
<p>© Copyright 2026 Public Holdings, Inc. All Rights Reserved.</p>
<p><b style={{color:"rgba(255,255,255,0.5)"}}>All investments</b> involve the risk of loss and the past performance of a security does not guarantee future results or returns. This material is not intended as a recommendation, offer, or solicitation to purchase or sell securities, open a brokerage account, or engage in any investment strategy.</p>
<p style={{marginTop:8}}><b style={{color:"rgba(255,255,255,0.4)"}}>Securities, Options, and Bonds.</b> Self-directed brokerage accounts are offered by Open to the Public Investing, Inc., a registered broker-dealer and member of FINRA &amp; SIPC.</p>
</div>
<div className="footer-copy">© 2026 Public Holdings, Inc.</div>
</footer>

</div>
{/* Hide desktop nav buttons on mobile via style tag (avoids inline duplication) */}
<style>{`
.nav-desktop-btn { display: inline-flex; }
.hamburger { display: none; }
@media (max-width: 900px) {
.nav-desktop-btn { display: none !important; }
.hamburger { display: flex !important; }
}
`}</style>
</>
);
}
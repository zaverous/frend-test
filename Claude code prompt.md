# Claude Code Prompt — Test Frontend (NPM Proxy Validator)

## Mission
Build a minimal but visually complete **single-page Next.js app** that:
1. Runs on **port 3000** inside Docker
2. Serves as a **proxy connectivity test** for Nginx Proxy Manager
3. Has a fully realized **Early Internet / Internet Nostalgia** aesthetic

---

## Docker Requirements
- Multi-stage `Dockerfile` (builder + runner)
- Runs on `node:20-alpine`
- Exposes port `3000`
- Must work with this `docker-compose.yml` (already provided separately):
  - No host port binding
  - Joins external Docker network named `proxy`
  - Container name: `test-frontend-app-1`

---

## Page Design — "Early Internet Nostalgia"

### Aesthetic Requirements
- **Background:** Deep black `#0a0a0a` or dark navy
- **Font:** Monospace only — `Courier New`, `VT323` (Google Font), or `Share Tech Mono`
- **Color palette:** Phosphor green `#00FF41`, amber `#FFB000`, and white `#F0F0F0`
- **CRT effect:** CSS scanlines overlay across the entire viewport (repeating linear gradient)
- **Viewport feel:** Like booting into a very old terminal or visiting a GeoCities page

### Must-Have UI Elements

#### 1. Custom Cursor
- Replace the default cursor with a blinking block cursor (`█`) or crosshair made from ASCII characters
- Implemented via `cursor: none` on body + a div that follows `mousemove` events

#### 2. ASCII Hero Section
- Large ASCII art (can be a face, a computer, a skull, a globe — your choice)
- Generated in `<pre>` tags, monospace font, glowing green text
- Add a slow CRT flicker animation on it

#### 3. "System Boot" Intro Text
- Fake terminal boot sequence typed out on load:
```
SYSTEM BOOT v1.0 .............. OK
LOADING MODULES ................ OK
ESTABLISHING CONNECTION ........ OK
WELCOME TO ZAVEROUS.NET
```
- Use `setTimeout` or CSS animation to type it character by character

#### 4. Marquee / Ticker
- Old-school scrolling `<marquee>`-style text (or CSS animation equivalent):
```
★ BEST VIEWED IN 800x600 ★ NETSCAPE NAVIGATOR 4.0 ★ YOU ARE VISITOR #000420 ★
```

#### 5. "Under Construction" Badge
- Animated GIF-style construction badge (CSS animated, not an actual GIF)
- Blinking text: `⚠ SITE UNDER CONSTRUCTION ⚠`

#### 6. Navigation Links
- Styled like old hyperlinks — blue, underlined, no hover smoothness
- Links: `[HOME]` `[ABOUT]` `[PROJECTS]` `[GUESTBOOK]` `[WEBRING]`

#### 7. Status Bar
- Fixed bottom bar mimicking IE/Netscape status bar:
```
Done | Internet Zone | 🔒
```

---

## Tech Stack
- **Framework:** Next.js 15 App Router (or Pages Router — your choice)
- **Styling:** Tailwind CSS or plain CSS modules — whichever is cleaner for this aesthetic
- **No external UI libraries** — everything hand-crafted

---

## File Structure Expected
```
test-frontend/
├── Dockerfile
├── docker-compose.yml       ← already provided, just place it here
├── next.config.js
├── package.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
└── components/
    ├── CRTOverlay.tsx
    ├── CustomCursor.tsx
    ├── BootSequence.tsx
    └── StatusBar.tsx
```

---

## Proxy Validation
When the page loads successfully via `https://test.zaverous.com` (or whichever subdomain), it confirms:
- NPM is correctly routing to the container over the shared Docker `proxy` network
- Container name resolution is working
- SSL termination via Let's Encrypt is functioning

The page should show a visible "CONNECTION ESTABLISHED" message prominently so it's immediately clear the proxy is working.


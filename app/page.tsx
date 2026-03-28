import CRTOverlay from "@/components/CRTOverlay";
import CustomCursor from "@/components/CustomCursor";
import BootSequence from "@/components/BootSequence";
import StatusBar from "@/components/StatusBar";

const ASCII_MONITOR = `
  .-=========================================-.
  ||                                         ||
  ||   > SYSTEM BOOT COMPLETE                ||
  ||   > HOST:    ZAVEROUS.NET               ||
  ||   > STATUS:  ONLINE          [ OK ]     ||
  ||   > PROXY:   NPM VALIDATED   [ OK ]     ||
  ||   > SSL:     CERT ACTIVE     [ OK ]     ||
  ||   > NET:     CONNECTED       [ OK ]     ||
  ||                                         ||
  ||   >_                                    ||
  ||                                         ||
  '--=========================================--'
              ||               ||
         .====''===============''====.
         '==================================='
`.trim();

const MARQUEE_TEXT =
  "\u2605 BEST VIEWED IN 800x600 \u2605 NETSCAPE NAVIGATOR 4.0 \u2605 YOU ARE VISITOR #000420 \u2605  ";

export default function Home() {
  return (
    <>
      <CRTOverlay />
      <CustomCursor />
      <StatusBar />

      <div>
        {/* ── Marquee ticker ─────────────────────── */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            <span>{MARQUEE_TEXT}</span>
            <span>{MARQUEE_TEXT}</span>
          </div>
        </div>

        {/* ── Navigation ─────────────────────────── */}
        <nav className="nav-bar">
          <a href="#" className="nav-link">[HOME]</a>
          <a href="#" className="nav-link">[ABOUT]</a>
          <a href="#" className="nav-link">[PROJECTS]</a>
          <a href="#" className="nav-link">[GUESTBOOK]</a>
          <a href="#" className="nav-link">[WEBRING]</a>
        </nav>

        {/* ── ASCII Hero ──────────────────────────── */}
        <section className="ascii-section">
          <pre className="ascii-art glow-green">{ASCII_MONITOR}</pre>
        </section>

        {/* ── Content ─────────────────────────────── */}
        <div className="content-area">

          {/* CONNECTION ESTABLISHED */}
          <div className="connection-badge">
            <p className="headline glow-green">
              {"\u2593\u2593\u2593 CONNECTION ESTABLISHED \u2593\u2593\u2593"}
            </p>
            <p className="subline">
              PROXY VALIDATION SUCCESSFUL :: ALL SYSTEMS OPERATIONAL
            </p>
          </div>

          <div className="retro-divider">
            {"\u2500".repeat(58)}
          </div>

          {/* Boot sequence */}
          <BootSequence />

          {/* Under construction */}
          <div className="under-construction-wrapper">
            <span className="under-construction glow-amber">
              {"\u26a0 SITE UNDER CONSTRUCTION \u26a0"}
            </span>
          </div>

          <div className="retro-divider">
            {"\u2500".repeat(58)}
          </div>

          {/* Footer */}
          <footer className="footer">
            <p>{"© 1996 ZAVEROUS.NET \u2014 All Rights Reserved"}</p>
            <p>Best viewed in 800\u00d7600 with Netscape Navigator 4.0</p>
          </footer>

        </div>
      </div>
    </>
  );
}

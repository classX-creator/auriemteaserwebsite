import Features from './components/Features';
import MinimalHero from './components/MinimalHero';
import WaitlistForm from './components/WaitlistForm';

function MinimalPage() {
  return (
    <div className="app-shell minimal-page-shell">
      <div className="background-orb orb-left" aria-hidden="true" />
      <div className="background-orb orb-right" aria-hidden="true" />

      <header className="topbar minimal-ghost" aria-hidden="true">
        <div className="brand-badge">Auriem</div>
        <div className="topbar-note">Private preview</div>
      </header>

      <main className="main-content" aria-label="Auriem brand page">
        <section className="stage-shell" aria-label="Auriem minimal stage">
          <MinimalHero />
          <div className="minimal-ghost minimal-hidden-column" aria-hidden="true">
            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="footer-content minimal-ghost" aria-hidden="true">
        <Features />
      </footer>
    </div>
  );
}

export default MinimalPage;

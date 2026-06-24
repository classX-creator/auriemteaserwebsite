import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Features from './components/Features';
import WaitlistForm from './components/WaitlistForm';
import SiteFooter from './components/SiteFooter';
import { getHeroPhaseText, getHeroPhraseStage } from './utils/heroPhaseText';

function App() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const heroPhaseText = getHeroPhaseText({
    email: waitlistEmail,
    submitted: waitlistSubmitted,
  });
  const heroPhraseStage = getHeroPhraseStage({
    email: waitlistEmail,
    submitted: waitlistSubmitted,
  });

  const handleEmailChange = (nextEmail) => {
    setWaitlistEmail(nextEmail);
    setWaitlistSubmitted(false);
  };

  const handleSubmitSuccess = () => {
    setWaitlistSubmitted(true);
  };

  return (
    <div className="app-shell">
      <CustomCursor />

      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <div className="background-orb orb-left" aria-hidden="true" />
      <div className="background-orb orb-right" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-badge">Auriem</div>
        <a className="topbar-note contact-link" href="mailto:info@auriem.app" data-cursor-stays-small>
          Contact us
        </a>
      </header>

      <main className="main-content" id="content" tabIndex="-1">
        <section className="stage-shell" aria-label="Auriem teaser">
          <Hero phaseText={heroPhaseText} phraseStage={heroPhraseStage} />
          <WaitlistForm onEmailChange={handleEmailChange} onSubmitSuccess={handleSubmitSuccess} />
        </section>
      </main>

      <footer className="footer-content">
        <Features />
        <SiteFooter />
      </footer>
    </div>
  );
}

export default App;

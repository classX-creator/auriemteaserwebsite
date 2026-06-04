import { useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const MOBILE_VIEWPORT_QUERY = '(max-width: 720px)';

const phraseMotion = {
  initial: { opacity: 0, y: 5, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -5, filter: 'blur(4px)' },
};

const subscribeToViewport = (callback) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia(MOBILE_VIEWPORT_QUERY);

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  }

  mediaQuery.addListener(callback);
  return () => mediaQuery.removeListener(callback);
};

const getViewportSnapshot = () =>
  typeof window !== 'undefined' && window.matchMedia(MOBILE_VIEWPORT_QUERY).matches;

const useIsMobileViewport = () =>
  useSyncExternalStore(subscribeToViewport, getViewportSnapshot, () => false);

const HeroPhrase = ({ phaseText, phraseStage, reduceMotion, phraseDuration }) => {
  if (phraseStage === 'coming-soon') {
    return (
      <AnimatePresence mode="wait">
        <motion.p
          key={phaseText}
          className="hero-phase"
          initial={reduceMotion ? false : phraseMotion.initial}
          animate={phraseMotion.animate}
          exit={reduceMotion ? undefined : phraseMotion.exit}
          transition={{ duration: reduceMotion ? 0 : phraseDuration, ease: 'easeOut' }}
        >
          {phaseText}
        </motion.p>
      </AnimatePresence>
    );
  }

  return (
    <p className="hero-phase hero-phrase-lockup">
      <motion.span
        className="hero-phrase-word"
        initial={reduceMotion ? false : phraseMotion.initial}
        animate={phraseMotion.animate}
        transition={{ duration: reduceMotion ? 0 : phraseDuration, ease: 'easeOut' }}
      >
        Seize
      </motion.span>
      <AnimatePresence>
        {(phraseStage === 'seize-your' || phraseStage === 'seize-your-aura') && (
          <motion.span
            key="your"
            className="hero-phrase-word"
            initial={reduceMotion ? false : phraseMotion.initial}
            animate={phraseMotion.animate}
            exit={reduceMotion ? undefined : phraseMotion.exit}
            transition={{ duration: reduceMotion ? 0 : phraseDuration, ease: 'easeOut' }}
          >
            your
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {phraseStage === 'seize-your-aura' && (
          <motion.span
            key="aura"
            className="hero-phrase-word"
            initial={reduceMotion ? false : phraseMotion.initial}
            animate={phraseMotion.animate}
            exit={reduceMotion ? undefined : phraseMotion.exit}
            transition={{ duration: reduceMotion ? 0 : phraseDuration, ease: 'easeOut' }}
          >
            Aura
          </motion.span>
        )}
      </AnimatePresence>
    </p>
  );
};

const Hero = ({ phaseText = 'Coming soon', phraseStage = 'coming-soon' }) => {
  const reduceMotion = useReducedMotion();
  useIsMobileViewport();
  const phraseDuration = 0.7;

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <h1 id="hero-title" className="visually-hidden">
        Auriem coming soon
      </h1>

      <motion.img
        src="/logo.png"
        alt="Auriem logo"
        className="hero-logo"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      <p className="eyebrow">A focus ritual is on the way</p>

      <div className="hero-phase-frame" aria-live="polite">
        <HeroPhrase
          phaseText={phaseText}
          phraseStage={phraseStage}
          reduceMotion={reduceMotion}
          phraseDuration={phraseDuration}
        />
      </div>

      <motion.div
        className="brand-lockup"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.82, ease: 'easeOut', delay: reduceMotion ? 0 : 0.18 }}
      >
        <div className="brand-wordmark">
          <span className="brand-letter brand-letter-a">A</span>
          <span className="brand-letter brand-letter-u">u</span>
          <span className="brand-letter brand-letter-r">r</span>
          <span className="brand-letter brand-letter-i">i</span>
          <span className="brand-letter brand-letter-e">e</span>
          <span className="brand-letter brand-letter-m">m</span>
        </div>
      </motion.div>

      <motion.p
        className="hero-copy hero-copy-strong hero-copy-desktop"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.68, delay: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
      >
        Focus, made softer.
      </motion.p>

      <motion.p
        className="hero-copy hero-copy-strong hero-copy-mobile"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.68, delay: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
      >
        A quieter way into deep work.
      </motion.p>

      <motion.p
        className="hero-copy hero-copy-desktop"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.68, delay: reduceMotion ? 0.1 : 0.55, ease: 'easeOut' }}
      >
        A quiet studio for calmer deep work and more intentional momentum.
      </motion.p>
    </section>
  );
};

export default Hero;

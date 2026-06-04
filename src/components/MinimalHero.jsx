import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ease = [0.16, 1, 0.3, 1];

function FinalWordmark() {
  return (
    <div className="brand-wordmark">
      <span className="brand-letter brand-letter-a">A</span>
      <span className="brand-letter brand-letter-u">u</span>
      <span className="brand-letter brand-letter-r">r</span>
      <span className="brand-letter brand-letter-i">i</span>
      <span className="brand-letter brand-letter-e">e</span>
      <span className="brand-letter brand-letter-m">m</span>
    </div>
  );
}

function MergeLayer({ reduceMotion }) {
  return (
    <motion.div
      key="merge"
      className="minimal-motion-layer"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.span
        className="minimal-motion-token minimal-token-aur minimal-gradient-word"
        initial={reduceMotion ? false : { x: '-1.28em', opacity: 1 }}
        animate={{ x: '-1.24em', opacity: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        Aur
      </motion.span>

      <motion.span
        className="minimal-motion-token minimal-token-a"
        initial={reduceMotion ? false : { x: '0.02em', opacity: 1, scale: 1 }}
        animate={{ x: '0.02em', opacity: 0, scale: 0.18, filter: 'blur(7px)' }}
        transition={{ duration: 1.35, ease }}
      >
        a
      </motion.span>

      <motion.span
        className="minimal-motion-token minimal-token-plus"
        initial={reduceMotion ? false : { x: '0.86em', opacity: 1, scale: 1 }}
        animate={{ x: '0.68em', opacity: 0, scale: 0.16, filter: 'blur(7px)' }}
        transition={{ duration: 1.35, ease }}
      >
        +
      </motion.span>

      <motion.span
        className="minimal-motion-token minimal-token-d"
        initial={reduceMotion ? false : { x: '1.48em', opacity: 1, scale: 1 }}
        animate={{ x: '1.14em', opacity: 0, scale: 0.16, filter: 'blur(7px)' }}
        transition={{ duration: 1.35, ease }}
      >
        D
      </motion.span>

      <motion.span
        className="minimal-motion-token minimal-token-iem minimal-gradient-word"
        initial={reduceMotion ? false : { x: '1.92em', opacity: 1 }}
        animate={{ x: '0.12em', opacity: 1 }}
        transition={{ duration: 1.95, ease }}
      >
        iem
      </motion.span>
    </motion.div>
  );
}

function MinimalHero() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(reduceMotion ? 3 : 0);

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const timers = [
      window.setTimeout(() => setPhase(1), 3300),
      window.setTimeout(() => setPhase(2), 6600),
      window.setTimeout(() => setPhase(3), 9100),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduceMotion]);

  return (
    <section className="hero-section minimal-animated-hero" aria-labelledby="minimal-hero-title">
      <h1 id="minimal-hero-title" className="visually-hidden">
        Auriem animation
      </h1>

      <motion.img
        src="/logo.png"
        alt="Auriem logo"
        className="hero-logo minimal-logo-reveal"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 14 }}
        transition={{ duration: 1.05, ease: 'easeOut', delay: reduceMotion ? 0 : 0.2 }}
      />

      <p className="eyebrow">A focus ritual is on the way</p>
      <div className="hero-phase-frame" aria-hidden="true" />

      <div className="brand-lockup" aria-hidden="true">
        <div className="minimal-motion-stage">
          <AnimatePresence mode="wait">
            {phase < 2 && (
              <motion.div
                key="intro"
                className="minimal-motion-layer"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <motion.span
                  className="minimal-motion-token minimal-token-aura"
                  initial={reduceMotion ? false : { x: '-1.28em', opacity: 0, scale: 0.08 }}
                  animate={{ x: '-1.28em', opacity: 1, scale: 1 }}
                  transition={{ duration: 1.9, ease: [0.12, 0.9, 0.2, 1] }}
                >
                  Aura
                </motion.span>

                <AnimatePresence>
                  {phase === 1 && (
                    <motion.span
                      key="diem-arrival"
                      className="minimal-motion-token minimal-token-diem-arrival"
                      initial={reduceMotion ? false : { x: '0.7em', opacity: 0 }}
                      animate={{ x: '0.86em', opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.35, ease }}
                    >
                      <span className="minimal-token-plus-inline">+</span>
                      <span className="minimal-token-diem-inline">Diem</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {phase === 2 && <MergeLayer reduceMotion={reduceMotion} key="merge" />}

            {phase === 3 && (
              <motion.div
                key="final"
                className="minimal-final-wordmark"
                initial={reduceMotion ? false : { opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.72, ease }}
              >
                <FinalWordmark />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="hero-copy hero-copy-strong">Focus, made softer.</p>
      <p className="hero-copy">A quiet studio for calmer deep work and more intentional momentum.</p>
    </section>
  );
}

export default MinimalHero;

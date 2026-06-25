import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle, ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const SOURCE_OPTIONS = [
  'A friend shared it',
  'Instagram',
  'LinkedIn',
  'Search',
  'Newsletter',
  'Community',
  'Other',
];

const WaitlistForm = ({ onEmailChange, onSubmitSuccess }) => {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sourceChoice, setSourceChoice] = useState('');
  const [isSourceMenuOpen, setIsSourceMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 720px)').matches : false,
  );
  const sourceMenuRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 720px)');
    const syncViewport = (event) => {
      setIsMobile(event.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncViewport);
      return () => mediaQuery.removeEventListener('change', syncViewport);
    }

    mediaQuery.addListener(syncViewport);
    return () => mediaQuery.removeListener(syncViewport);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!sourceMenuRef.current?.contains(event.target)) {
        setIsSourceMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValid) {
      setError('Enter a valid email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    setIsSourceMenuOpen(false);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          company: formData.get('company'),
          sourceChoice: sourceChoice || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || 'Unable to save your email right now.');
      }

      window.localStorage.setItem('auriem-coming-soon-email', trimmedEmail);
      setSubmitted(true);
      onSubmitSuccess?.(trimmedEmail);
    } catch {
      setError("Couldn't send your email right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      className="waitlist-section"
      aria-labelledby="waitlist-title"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, delay: reduceMotion ? 0 : 0.52 }}
    >
      <div className="waitlist-card">
        <p className="waitlist-kicker">Private Preview</p>
        <h2 id="waitlist-title" className="waitlist-title">
          Be first inside.
        </h2>
        <p className="waitlist-copy waitlist-copy-desktop">
          Leave your email and we&apos;ll send the first invitation.
        </p>
        <p className="waitlist-copy waitlist-copy-mobile">Leave your email for the first invitation.</p>

        <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
          <input type="text" name="company" className="form-honeypot" tabIndex="-1" autoComplete="off" aria-hidden="true" />
          <label className="visually-hidden" htmlFor="waitlist-email">
            Email address
          </label>
          <div className={`waitlist-row ${submitted ? 'is-success' : ''}`}>
            {!submitted ? (
              <>
                <input
                  id="waitlist-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    const nextEmail = e.target.value;
                    setEmail(nextEmail);
                    setError('');
                    onEmailChange?.(nextEmail);
                  }}
                  placeholder={isMobile ? 'Email address' : 'Enter your email here'}
                  autoComplete="email"
                  inputMode="email"
                  className="waitlist-input"
                  aria-describedby="waitlist-note waitlist-error"
                  aria-invalid={error ? 'true' : 'false'}
                  disabled={isSubmitting}
                  required
                />
                <button type="submit" className="btn-primary waitlist-button" disabled={isSubmitting}>
                  <span>{isSubmitting ? 'Joining...' : 'Join'}</span>
                  <span className="waitlist-button-icon" aria-hidden="true">
                    <ArrowUpRight size={14} strokeWidth={2.1} />
                  </span>
                </button>
              </>
            ) : (
              <div className="waitlist-success" aria-live="polite">
                <CheckCircle size={20} aria-hidden="true" />
                <span>{isMobile ? "You're in. Check your inbox." : "You're in. A welcome note is on its way."}</span>
              </div>
            )}
          </div>
          <p className={`waitlist-note ${submitted ? 'is-hidden' : ''}`} id="waitlist-note">
            One note, when it is ready.
          </p>
          <p className="waitlist-error" id="waitlist-error" aria-live="polite">
            {submitted ? '' : error}
          </p>
          {!submitted ? (
            <div className="waitlist-source-shell">
              <label className="waitlist-source-label" htmlFor="waitlist-source-trigger">
                How did you come across Auriem? <span>Optional</span>
              </label>
              <p className="waitlist-source-intro">A small note, if you&apos;d like to leave one.</p>
              <div
                className={`waitlist-source-select-wrap ${isSourceMenuOpen ? 'is-open' : ''}`}
                ref={sourceMenuRef}
              >
                <input type="hidden" name="source-choice" value={sourceChoice} />
                <button
                  id="waitlist-source-trigger"
                  type="button"
                  className={`waitlist-source-trigger ${sourceChoice ? 'has-value' : ''}`}
                  aria-expanded={isSourceMenuOpen ? 'true' : 'false'}
                  aria-controls="waitlist-source-menu"
                  disabled={isSubmitting}
                  onClick={() => setIsSourceMenuOpen((open) => !open)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setIsSourceMenuOpen(false);
                    }
                  }}
                >
                  <span>{sourceChoice || "If you'd like to share"}</span>
                </button>
                <span className="waitlist-source-icon" aria-hidden="true">
                  <ChevronDown size={16} strokeWidth={2.1} />
                </span>

                {isSourceMenuOpen ? (
                  <div className="waitlist-source-menu" id="waitlist-source-menu" role="listbox">
                    {SOURCE_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={sourceChoice === option ? 'true' : 'false'}
                        className={`waitlist-source-menu-item ${sourceChoice === option ? 'is-selected' : ''}`}
                        onClick={() => {
                          setSourceChoice(option);
                          setIsSourceMenuOpen(false);
                        }}
                      >
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </motion.section>
  );
};

export default WaitlistForm;

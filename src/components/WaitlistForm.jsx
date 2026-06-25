import { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
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
  const [sourceStatus, setSourceStatus] = useState('idle');
  const [sourceError, setSourceError] = useState('');
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 720px)').matches : false,
  );

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

  const saveSourceChoice = async (nextChoice, signupEmail) => {
    setSourceChoice(nextChoice);
    setSourceStatus('saving');
    setSourceError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: signupEmail,
          intent: 'source',
          sourceChoice: nextChoice,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || 'Unable to save your note right now.');
      }

      setSourceStatus('saved');
    } catch {
      setSourceStatus('idle');
      setSourceError("Couldn't save that note right now.");
    }
  };

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
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || 'Unable to save your email right now.');
      }

      window.localStorage.setItem('auriem-coming-soon-email', trimmedEmail);
      setSubmitted(true);
      setSourceChoice('');
      setSourceStatus('idle');
      setSourceError('');
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

          {submitted ? (
            <div className="waitlist-followup" aria-live="polite">
              <fieldset className="waitlist-source-group">
                <legend className="visually-hidden">How you came across Auriem</legend>
                <p className="waitlist-followup-inline">
                  <span className="waitlist-followup-label">How did you come across Auriem?</span>
                  <span className="waitlist-followup-subtle"> Optional, but lovely to know.</span>
                </p>
                <div className="waitlist-source-grid">
                  {SOURCE_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className={`waitlist-source-option ${sourceChoice === option ? 'is-selected' : ''} ${
                        sourceStatus === 'saved' ? 'is-locked' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="source-choice"
                        value={option}
                        checked={sourceChoice === option}
                        onChange={() => saveSourceChoice(option, email.trim().toLowerCase())}
                        disabled={sourceStatus === 'saving' || sourceStatus === 'saved'}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <p className={`waitlist-source-status ${sourceStatus === 'saved' ? 'is-saved' : ''}`}>
                {sourceStatus === 'saving'
                  ? 'Saving your note...'
                  : sourceStatus === 'saved'
                    ? 'Thank you. We have it.'
                    : sourceError}
              </p>
            </div>
          ) : null}
        </form>
      </div>
    </motion.section>
  );
};

export default WaitlistForm;

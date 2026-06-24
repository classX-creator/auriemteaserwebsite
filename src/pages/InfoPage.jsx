import { useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';
import SiteFooter from '../components/SiteFooter';

const supportLink = (
  <a href="mailto:support@auriem.app">support@auriem.app</a>
);

const pages = {
  product: {
    eyebrow: 'Private Preview',
    title: 'A calmer place to plan, focus, and follow through.',
    intro:
      'Auriem is an independent productivity and focus software platform being built in India. It brings planning, focused work, habits, and reflection into one softer digital workspace.',
    sections: [
      {
        title: 'What Auriem does',
        paragraphs: [
          'Auriem is designed to help people plan their day, manage tasks and projects, run focus sessions, track habits, reflect on moods, and build calmer work routines.',
          'The product is still in private preview. Features, limits, and availability may evolve as we learn from early users.',
        ],
      },
      {
        title: 'What we sell',
        paragraphs: [
          'Auriem plans to offer a free tier and paid Pro access through monthly, yearly, and limited lifetime plans. Paid plans unlock eligible premium features and higher usage limits.',
          'Auriem is a digital software product. We do not ship physical goods, packages, printed materials, or hardware.',
        ],
      },
      {
        title: 'How access works',
        paragraphs: [
          'An Auriem account is required. Users sign in using an email-based login and supported verification methods, and paid access is linked to the Auriem account and/or payment email.',
          'After a successful payment, eligible access is expected to activate digitally through the Auriem website, web app, PWA, or another supported app platform. Some features may work offline, while login, payment verification, subscription updates, and cloud sync require an internet connection.',
        ],
      },
      {
        title: 'Availability',
        paragraphs: [
          'Auriem is coming soon and is not presented as a fully launched service. Joining the preview list does not create a paid subscription or guarantee immediate access.',
          <>For access or product questions, contact {supportLink}.</>,
        ],
      },
    ],
  },
  pricing: {
    eyebrow: 'Private Preview Pricing',
    title: 'Simple plans for a product still taking shape.',
    intro:
      'These are Auriem’s planned introductory prices. Paid checkout is not currently offered on this teaser site.',
    pricingNote: 'Preview pricing may change at launch.',
    pricing: [
      { name: 'Free', price: '$0', detail: 'Selected core planning, task, habit, and focus features.' },
      { name: 'Pro Monthly', price: '$5.99 / month', detail: 'Planned introductory monthly subscription.' },
      { name: 'Pro Yearly', price: '$55 / year', detail: 'Planned introductory yearly subscription.' },
      { name: 'Lifetime Early Access', price: '$99 once', detail: 'Planned limited offer for the first 100 eligible customers.' },
    ],
    sections: [
      {
        title: 'What Pro may include',
        bullets: [
          'More projects, tasks, and habits',
          'Advanced focus sessions and planning tools',
          'Mood and reflection tools',
          'Cloud sync, offline-first workflows, customization, and future standard Pro improvements',
        ],
      },
      {
        title: 'Billing and renewal',
        paragraphs: [
          'Monthly and yearly subscriptions renew automatically unless cancelled before the next billing date. After cancellation, Pro access generally remains active until the end of the current paid billing period, after which the account may move to the Free plan.',
          'Prices are shown in USD. Taxes, currency conversion, provider fees, and bank charges may be added or vary at checkout. The final total is shown before payment.',
        ],
      },
      {
        title: 'Lifetime access',
        paragraphs: [
          'Lifetime access means access to eligible Auriem Pro features for the lifetime of the Auriem product or service, not the lifetime of the customer. It does not guarantee that the service will operate forever.',
          'Separate add-ons, enterprise or team features, third-party paid integrations, high-cost AI features, premium packs, and separately launched products may not be included.',
        ],
      },
      {
        title: 'Future pricing',
        paragraphs: [
          'After the introductory phase, Auriem may offer Pro at $9.99 per month or $99 per year, and regular lifetime access at $199. Plans, features, limits, offers, and availability may change before purchase.',
          <>For pricing or billing questions, contact {supportLink}.</>,
        ],
      },
    ],
  },
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    intro: 'Effective 18 June 2026 · Last updated 18 June 2026',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'Auriem is an independent productivity software platform based in India. This policy explains how we collect, use, store, and protect information when you use our website, web app, PWA, and related services.',
        ],
      },
      {
        title: 'Information we collect',
        paragraphs: [
          'We may collect account information such as your name, email address, login details, preferences, and an optional profile picture. We may also store information you create in Auriem, including tasks, projects, habits, focus sessions, notes, workspace settings, mood labels, and reflection responses.',
          'We may collect limited technical information needed for security, support, and operation, such as device and browser type, operating system, IP address, session information, error logs, and performance information.',
        ],
      },
      {
        title: 'Payments',
        paragraphs: [
          'Payments are handled by third-party payment providers. Auriem does not directly store your full card number or complete payment credentials. We may store account-level billing information such as plan type, subscription status, provider customer or subscription IDs, and renewal or cancellation status.',
        ],
      },
      {
        title: 'Local storage and cloud sync',
        paragraphs: [
          'Some data may be stored locally in your browser or device for offline use and a faster experience. When internet access is available, data may sync with Auriem’s cloud database provider, Supabase, so it remains available across supported sessions and devices.',
        ],
      },
      {
        title: 'How we use information',
        bullets: [
          'Create and manage accounts and provide Auriem features',
          'Save and sync app data and preferences',
          'Activate subscriptions and provide customer support',
          'Send login, security, billing, and other transactional messages',
          'Improve reliability and prevent fraud, misuse, or unauthorized access',
          'Meet legal, tax, payment, and regulatory obligations',
        ],
      },
      {
        title: 'Service providers and international processing',
        paragraphs: [
          'We may use Supabase for authentication, database, storage, and cloud infrastructure; payment providers such as Dodo Payments or similar services; email providers; and hosting providers. These providers may process information as needed to deliver their services.',
          'Auriem is based in India, and users may access it from other countries. Information may be processed or stored where our service providers operate.',
        ],
      },
      {
        title: 'Security and retention',
        paragraphs: [
          'We use reasonable technical and organizational safeguards, but no internet service can guarantee absolute security. Information is retained as long as needed to provide the service, maintain accounts, meet legal obligations, resolve disputes, and support billing or security requirements.',
        ],
      },
      {
        title: 'Your choices and rights',
        paragraphs: [
          'Depending on your location, you may have rights to access, correct, delete, object to certain processing, withdraw consent, or request a copy of your personal data where technically feasible. Account deletion requests are usually processed within 30 days, subject to legal, tax, billing, fraud-prevention, security, or dispute-related retention.',
          'Auriem is not intended for children under 13. Marketing emails may be unsubscribed from at any time; necessary account and transactional messages may still be sent.',
          <>To make a privacy or deletion request, email {supportLink}. We may ask you to verify account ownership.</>,
        ],
      },
      {
        title: 'Changes to this policy',
        paragraphs: [
          'We may update this policy from time to time. Material changes may be communicated through the website, app, email, or another appropriate method.',
        ],
      },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms of Service',
    intro: 'Effective 18 June 2026 · Last updated 18 June 2026',
    sections: [
      {
        title: 'Agreement and service',
        paragraphs: [
          'These terms govern access to and use of Auriem. By creating an account, using the service, or purchasing a plan, you agree to these terms. If you do not agree, do not use Auriem.',
          'Auriem helps users plan their day, manage tasks and projects, run focus sessions, track habits, reflect on moods, and build calmer work routines. It may be offered through a website, web app, PWA, and supported app platforms.',
        ],
      },
      {
        title: 'Accounts and user data',
        paragraphs: [
          'An account is required. You must provide accurate information, keep access secure, avoid unauthorized sharing, and accept responsibility for activity under your account.',
          'You retain ownership of content you create. You grant Auriem the limited permission needed to store, process, sync, display, and operate that content to provide the service. Some data may be stored locally and synced when internet access returns.',
        ],
      },
      {
        title: 'Plans, payments, and cancellation',
        paragraphs: [
          'Auriem may offer free, subscription, and lifetime plans. Current or planned prices, features, limits, and availability may change and will be displayed on the pricing or checkout page before purchase.',
          'Subscriptions renew automatically unless cancelled before the next billing date. By subscribing, you authorize the payment provider to charge your selected payment method. Access generally continues through the paid billing period after cancellation.',
          'If a paid plan ends, some Pro features or limits may become unavailable. Users may need to review, export, reduce, archive, or delete data above Free plan limits.',
        ],
      },
      {
        title: 'Acceptable use',
        paragraphs: ['You may not use Auriem to violate law, infringe rights, upload harmful code, access another user’s account, interfere with security, scrape or reverse engineer the platform, resell it without permission, or engage in harmful or abusive activity.'],
      },
      {
        title: 'Product limitations',
        paragraphs: [
          'Auriem is not a medical, therapy, diagnosis, treatment, crisis, emergency, financial advisory, or professional productivity-guarantee service. Mood and reflection tools are for self-reflection and productivity support only.',
          'We do not guarantee specific productivity, financial, academic, business, or mental health outcomes. The service is provided on an “as is” and “as available” basis and may change or experience maintenance, technical issues, or third-party outages.',
        ],
      },
      {
        title: 'Ownership and third parties',
        paragraphs: [
          'Auriem’s name, design, interface, branding, software, features, text, graphics, and related materials are owned by or licensed to Auriem. They may not be copied, sold, modified, distributed, or used to create derivative works without written permission.',
          'Auriem may rely on third parties for hosting, authentication, storage, payments, email, and distribution, and is not responsible for third-party outages, policy changes, delays, fees, or failures beyond reasonable control.',
        ],
      },
      {
        title: 'Suspension, liability, and law',
        paragraphs: [
          'Auriem may suspend or terminate access for a terms violation, failed or disputed payment, security or legal risk, provider requirements, or discontinuation of the service.',
          'To the maximum extent permitted by law, Auriem is not liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, business interruption, personal decisions, or productivity outcomes. You agree to indemnify Auriem for claims arising from your use, content, or violation of these terms or third-party rights.',
          'These terms are governed by the laws of India, subject to applicable consumer-protection law and any required payment-provider or app-store dispute process.',
        ],
      },
      {
        title: 'Changes and contact',
        paragraphs: [
          'We may update these terms and communicate material changes through the website, app, email, or another appropriate method. Continued use after changes become effective means you accept the updated terms.',
          <>For legal, support, billing, or account questions, contact {supportLink}.</>,
        ],
      },
    ],
  },
  refunds: {
    eyebrow: 'Legal',
    title: 'Refund & Cancellation Policy',
    intro: 'Effective 18 June 2026 · Last updated 18 June 2026',
    sections: [
      {
        title: 'Subscriptions and cancellation',
        paragraphs: [
          'Monthly and yearly subscriptions renew automatically unless cancelled before the next billing date. If you cancel, Pro access generally remains active until the end of the current paid billing period, after which the account may move to the Free plan.',
        ],
      },
      {
        title: 'General refund rule',
        paragraphs: [
          'Payments are generally non-refundable once Pro, subscription, or lifetime access has been activated. Refunds may be considered for a duplicate charge, an accidental unused purchase, successful payment without access delivery, an unresolved technical access issue, a refund required by law, or a case approved by Auriem or the payment provider.',
        ],
      },
      {
        title: 'Generally non-refundable situations',
        bullets: [
          'Changing your mind after access is activated',
          'Forgetting to cancel before renewal',
          'Not using the service after purchase',
          'Partial billing periods or downgrades after a billing period begins',
          'Lifetime access after activation, except for the limited cases above',
          'Not achieving personal productivity goals or expected results',
        ],
      },
      {
        title: 'How to request a refund',
        paragraphs: [
          <>Email {supportLink} with your account email, payment email if different, purchase date, plan, reason for the request, and any receipt or transaction reference. We may request more information to verify the request.</>,
          'Approved refunds are sent through the original payment provider. Arrival time depends on the provider, bank, card network, and payment method, so Auriem cannot guarantee an exact settlement date after the refund is initiated.',
        ],
      },
      {
        title: 'Downgrades',
        paragraphs: [
          'When a paid plan ends, some Pro features or limits may no longer be available. To avoid accidental data loss, users may be asked to review, export, reduce, archive, or delete data above Free plan limits.',
        ],
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'A real inbox, for real questions.',
    intro:
      'Auriem is an independent productivity software platform based in India. We welcome support, billing, privacy, legal, partnership, and general enquiries.',
    contact: true,
    sections: [
      {
        title: 'What we can help with',
        bullets: [
          'Account access, login, or OTP issues',
          'Subscriptions, billing, refunds, and cancellations',
          'Pro access activation',
          'Privacy and data deletion requests',
          'Bug reports, product feedback, and partnerships',
        ],
      },
      {
        title: 'Response time',
        paragraphs: [
          'We aim to respond within 2–5 business days. Billing verification, account ownership checks, and data deletion requests may take longer.',
        ],
      },
    ],
  },
};

const renderSection = (section) => (
  <section className="info-section" key={section.title}>
    <h2>{section.title}</h2>
    {section.paragraphs?.map((paragraph, index) => (
      <p key={`${section.title}-${index}`}>{paragraph}</p>
    ))}
    {section.bullets && (
      <ul>
        {section.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    )}
  </section>
);

const InfoPage = ({ pageKey }) => {
  const page = pages[pageKey] ?? pages.product;

  useEffect(() => {
    document.title = `${page.title} | Auriem`;
  }, [page.title]);

  return (
    <div className="info-shell">
      <CustomCursor />
      <a className="skip-link" href="#info-content">Skip to content</a>
      <div className="background-orb orb-left" aria-hidden="true" />
      <div className="background-orb orb-right" aria-hidden="true" />

      <header className="info-topbar">
        <a className="brand-badge brand-link" href="/">Auriem</a>
        <span className="info-preview-badge">Coming soon · Private Preview</span>
      </header>

      <main className="info-main" id="info-content" tabIndex="-1">
        <a className="back-link" href="/">← Back to preview</a>
        <div className="info-hero">
          <p className="info-eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="info-intro">{page.intro}</p>
        </div>

        {page.contact && (
          <a className="contact-card" href="mailto:support@auriem.app">
            <span>Email support</span>
            <strong>support@auriem.app</strong>
          </a>
        )}

        {page.pricing && (
          <>
            <div className="pricing-grid" aria-label="Planned Auriem pricing">
              {page.pricing.map((plan) => (
                <article className="pricing-card" key={plan.name}>
                  <p>{plan.name}</p>
                  <h2>{plan.price}</h2>
                  <span>{plan.detail}</span>
                </article>
              ))}
            </div>
            <p className="pricing-note">{page.pricingNote}</p>
          </>
        )}

        <div className="info-document">{page.sections.map(renderSection)}</div>
      </main>

      <footer className="info-footer">
        <SiteFooter compact />
      </footer>
    </div>
  );
};

export default InfoPage;

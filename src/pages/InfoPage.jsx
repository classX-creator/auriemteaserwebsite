import { useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';
import SiteFooter from '../components/SiteFooter';
import { infoPages } from '../content/infoPages';
import {
  applySeo,
  buildOrganizationSchema,
  buildWebPageSchema,
} from '../utils/seo';

const renderParagraph = (paragraph, key) => {
  if (typeof paragraph === 'string') {
    return <p key={key}>{paragraph}</p>;
  }

  if (paragraph.type === 'linked-paragraph') {
    return (
      <p key={key}>
        {paragraph.prefix}
        <a href={paragraph.link.href}>{paragraph.link.label}</a>
        {paragraph.suffix}
      </p>
    );
  }

  return null;
};

const renderSection = (section) => (
  <section className="info-section" key={section.title}>
    <h2>{section.title}</h2>
    {section.paragraphs?.map((paragraph, index) =>
      renderParagraph(paragraph, `${section.title}-${index}`),
    )}
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
  const page = infoPages[pageKey] ?? infoPages.product;

  useEffect(() => {
    applySeo({
      title: `${page.title} | Auriem`,
      description: page.seoDescription,
      path: page.path,
      structuredData: [
        buildOrganizationSchema(),
        buildWebPageSchema({
          title: `${page.title} | Auriem`,
          description: page.seoDescription,
          path: page.path,
        }),
      ],
    });
  }, [page.path, page.seoDescription, page.title]);

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

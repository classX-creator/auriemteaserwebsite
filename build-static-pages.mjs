import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { footerLinks } from './src/content/footerLinks.js';
import { infoPages, SUPPORT_EMAIL, SUPPORT_MAILTO } from './src/content/infoPages.js';
import {
  DEFAULT_OG_IMAGE,
  SEO_ROBOTS,
  SITE_URL,
  buildOrganizationSchema,
  buildWebPageSchema,
} from './src/content/siteMetadata.js';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const distDir = path.join(rootDir, 'dist');
const baseHtmlPath = path.join(distDir, 'index.html');

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const renderParagraph = (paragraph) => {
  if (typeof paragraph === 'string') {
    return `<p>${escapeHtml(paragraph)}</p>`;
  }

  if (paragraph.type === 'linked-paragraph') {
    return `<p>${escapeHtml(paragraph.prefix)}<a href="${escapeHtml(paragraph.link.href)}">${escapeHtml(paragraph.link.label)}</a>${escapeHtml(paragraph.suffix)}</p>`;
  }

  return '';
};

const renderSection = (section) => {
  const paragraphs = (section.paragraphs ?? []).map(renderParagraph).join('\n');
  const bullets = section.bullets?.length
    ? `<ul>${section.bullets
        .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
        .join('')}</ul>`
    : '';

  return `<section class="info-section">
    <h2>${escapeHtml(section.title)}</h2>
    ${paragraphs}
    ${bullets}
  </section>`;
};

const renderFooter = () => `<div class="site-footer site-footer-compact">
  <p class="site-footer-status">Auriem · Private Preview</p>
  <nav aria-label="Footer navigation">
    <ul class="site-footer-links">
      ${footerLinks
        .map(
          (link) =>
            `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`,
        )
        .join('')}
    </ul>
  </nav>
  <p class="site-footer-copy">© 2026 Auriem</p>
</div>`;

const renderPageBody = (page) => {
  const pricing = page.pricing?.length
    ? `<div class="pricing-grid" aria-label="Planned Auriem pricing">
        ${page.pricing
          .map(
            (plan) => `<article class="pricing-card">
              <p>${escapeHtml(plan.name)}</p>
              <h2>${escapeHtml(plan.price)}</h2>
              <span>${escapeHtml(plan.detail)}</span>
            </article>`,
          )
          .join('')}
      </div>
      <p class="pricing-note">${escapeHtml(page.pricingNote ?? '')}</p>`
    : '';

  const contactCard = page.contact
    ? `<a class="contact-card" href="${SUPPORT_MAILTO}">
        <span>Email support</span>
        <strong>${SUPPORT_EMAIL}</strong>
      </a>`
    : '';

  return `<div id="root">
    <div class="info-shell">
      <a class="skip-link" href="#info-content">Skip to content</a>
      <div class="background-orb orb-left" aria-hidden="true"></div>
      <div class="background-orb orb-right" aria-hidden="true"></div>
      <header class="info-topbar">
        <a class="brand-badge brand-link" href="/">Auriem</a>
        <span class="info-preview-badge">Coming soon · Private Preview</span>
      </header>
      <main class="info-main" id="info-content" tabindex="-1">
        <a class="back-link" href="/">← Back to preview</a>
        <div class="info-hero">
          <p class="info-eyebrow">${escapeHtml(page.eyebrow)}</p>
          <h1>${escapeHtml(page.title)}</h1>
          <p class="info-intro">${escapeHtml(page.intro)}</p>
        </div>
        ${contactCard}
        ${pricing}
        <div class="info-document">
          ${page.sections.map(renderSection).join('\n')}
        </div>
      </main>
      <footer class="info-footer">
        ${renderFooter()}
      </footer>
    </div>
  </div>`;
};

const assetTagsFrom = (html) =>
  [...html.matchAll(/<(script type="module"[^>]*><\/script>|link rel="modulepreload"[^>]*>|link rel="stylesheet"[^>]*href="\/assets\/[^"]+"[^>]*>)/g)]
    .map((match) => match[0])
    .join('\n    ');

const renderHead = (page) => {
  const title = `${page.title} | Auriem`;
  const canonicalUrl = new URL(page.path, SITE_URL).toString();
  const structuredData = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        buildOrganizationSchema(),
        buildWebPageSchema({
          title,
          description: page.seoDescription,
          path: page.path,
        }),
      ],
    },
    null,
    2,
  );

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" sizes="256x256" href="/favicon-auriem-256.png?v=1" />
    <link rel="apple-touch-icon" href="/favicon-auriem-256.png?v=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta name="description" content="${escapeHtml(page.seoDescription)}" />
    <meta name="robots" content="${escapeHtml(SEO_ROBOTS)}" />
    <meta name="theme-color" content="#eef1f5" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(page.seoDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Auriem" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}" />
    <meta property="og:image:alt" content="Auriem logo" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.seoDescription)}" />
    <meta name="twitter:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}" />
    <meta name="twitter:image:alt" content="Auriem logo" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;700;800&display=swap"
      rel="stylesheet"
    />
    <script type="application/ld+json">${structuredData}</script>
    <title>${escapeHtml(title)}</title>
    __ASSET_TAGS__
  </head>
  <body>
    __BODY__
  </body>
</html>`;
};

const baseHtml = await readFile(baseHtmlPath, 'utf8');
const assetTags = assetTagsFrom(baseHtml);

for (const page of Object.values(infoPages)) {
  const pageDir = path.join(distDir, page.path.replace(/^\//, ''));
  const outputPath = path.join(pageDir, 'index.html');
  const html = renderHead(page)
    .replace('__ASSET_TAGS__', assetTags)
    .replace('__BODY__', renderPageBody(page));

  await mkdir(pageDir, { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

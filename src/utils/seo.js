import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  SEO_ROBOTS,
  HOME_SEO,
  buildOrganizationSchema,
  buildWebsiteSchema,
  buildWebPageSchema,
} from '../content/siteMetadata';

const STRUCTURED_DATA_ID = 'auriem-structured-data';

const ensureMetaTag = (attribute, value) => {
  let tag = document.head.querySelector(`meta[${attribute}="${value}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }

  return tag;
};

const ensureLinkTag = (rel) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }

  return tag;
};

const setMetaName = (name, content) => {
  ensureMetaTag('name', name).setAttribute('content', content);
};

const setMetaProperty = (property, content) => {
  ensureMetaTag('property', property).setAttribute('content', content);
};

const setStructuredData = (entries) => {
  const existing = document.getElementById(STRUCTURED_DATA_ID);

  if (!entries?.length) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement('script');
  script.id = STRUCTURED_DATA_ID;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': entries,
    },
    null,
    0,
  );

  if (!existing) {
    document.head.appendChild(script);
  }
};

export const applySeo = ({
  title,
  description,
  path = '/',
  ogTitle = title,
  ogDescription = description,
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
  image = DEFAULT_OG_IMAGE,
  imageAlt = 'Auriem logo',
  robots = SEO_ROBOTS,
  structuredData = [],
}) => {
  const canonicalUrl = new URL(path, SITE_URL).toString();

  document.title = title;
  document.documentElement.lang = 'en';

  setMetaName('description', description);
  setMetaName('robots', robots);
  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', twitterTitle);
  setMetaName('twitter:description', twitterDescription);
  setMetaName('twitter:image', image);
  setMetaName('twitter:image:alt', imageAlt);

  setMetaProperty('og:title', ogTitle);
  setMetaProperty('og:description', ogDescription);
  setMetaProperty('og:type', 'website');
  setMetaProperty('og:site_name', 'Auriem');
  setMetaProperty('og:url', canonicalUrl);
  setMetaProperty('og:image', image);
  setMetaProperty('og:image:alt', imageAlt);

  ensureLinkTag('canonical').setAttribute('href', canonicalUrl);

  setStructuredData(structuredData);
};

export {
  SITE_URL as SITE_ORIGIN,
  HOME_SEO,
  buildOrganizationSchema,
  buildWebsiteSchema,
  buildWebPageSchema,
};

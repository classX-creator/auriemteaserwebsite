export const SITE_URL = 'https://auriem.app';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;
export const SEO_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export const HOME_SEO = {
  title: 'Auriem | Calmer productivity, coming soon',
  description:
    'Auriem is a calmer productivity studio in the making for planning, focus, habits, and thoughtful work. Join the private preview.',
  ogDescription:
    'Auriem is building a softer productivity experience for planning, deep work, habits, and reflection.',
  twitterDescription:
    'Join the Auriem private preview for a calmer approach to planning, focus, habits, and follow-through.',
  path: '/',
};

export const buildOrganizationSchema = () => ({
  '@type': 'Organization',
  name: 'Auriem',
  url: `${SITE_URL}/`,
  logo: DEFAULT_OG_IMAGE,
  email: 'info@auriem.app',
});

export const buildWebsiteSchema = (description) => ({
  '@type': 'WebSite',
  name: 'Auriem',
  url: `${SITE_URL}/`,
  description,
  publisher: {
    '@type': 'Organization',
    name: 'Auriem',
  },
});

export const buildWebPageSchema = ({ title, description, path }) => ({
  '@type': 'WebPage',
  name: title,
  description,
  url: new URL(path, SITE_URL).toString(),
  isPartOf: {
    '@type': 'WebSite',
    name: 'Auriem',
    url: `${SITE_URL}/`,
  },
});

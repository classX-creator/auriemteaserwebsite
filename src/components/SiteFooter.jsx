const footerLinks = [
  { href: '/product', label: 'Product' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/refunds', label: 'Refund Policy' },
  { href: '/contact', label: 'Contact' },
];

const SiteFooter = ({ compact = false }) => (
  <div className={`site-footer${compact ? ' site-footer-compact' : ''}`}>
    <p className="site-footer-status">Auriem · Private Preview</p>
    <nav aria-label="Footer navigation">
      <ul className="site-footer-links">
        {footerLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
    <p className="site-footer-copy">© 2026 Auriem</p>
  </div>
);

export default SiteFooter;

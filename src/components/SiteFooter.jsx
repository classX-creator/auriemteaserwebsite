import { footerLinks } from '../content/footerLinks';

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

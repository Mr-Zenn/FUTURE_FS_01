import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const SOCIALS = [
  { icon: <FiGithub />,   href: 'https://github.com/Mr-Zenn',                                    label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/jayprakash-sahu-06b501290',         label: 'LinkedIn' },
  { icon: <FiMail />,     href: 'mailto:jayprakash6231ssb@gmail.com',                            label: 'Email' },
];

const Footer = () => (
  <footer className="footer-v2">
    <div className="container">
      <div className="footer-v2__grid">
        <div className="footer-v2__brand">
          <Link to="/" className="footer-v2__logo">JP<span>.</span></Link>
          <p className="footer-v2__tagline">
            Building scalable web apps with the MERN stack.
          </p>
          <div className="footer-v2__socials">
            {SOCIALS.map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="footer-social" aria-label={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-v2__nav">
          <p className="footer-v2__title">Navigation</p>
          {NAV.map(({ to, label }) => (
            <Link key={to} to={to} className="footer-v2__link">
              {label} <FiArrowUpRight />
            </Link>
          ))}
        </div>

        <div className="footer-v2__contact">
          <p className="footer-v2__title">Contact</p>
          <a href="mailto:jayprakash6231ssb@gmail.com" className="footer-v2__link">jayprakash6231ssb@gmail.com</a>
          <a href="https://github.com/Mr-Zenn" target="_blank" rel="noreferrer" className="footer-v2__link">
            github.com/Mr-Zenn
          </a>
        </div>
      </div>

      <div className="footer-v2__bottom">
        <span>© {new Date().getFullYear()} Jay Prakash. All rights reserved.</span>
        <span>Made with React + Node.js</span>
      </div>
    </div>
  </footer>
);

export default Footer;

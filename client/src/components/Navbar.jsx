import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => setScrolled(v > 0.01));

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
      />

      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <Link to="/" className="navbar__logo">
          JP<span>.</span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__link ${pathname === to ? 'navbar__link--active' : ''}`}
              >
                {label}
                {pathname === to && (
                  <motion.span
                    className="navbar__link-indicator"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__right">
          <Link to="/admin/login" className="navbar__admin-btn">Admin</Link>
          <button className="navbar__toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <button className="mobile-menu__close" onClick={() => setOpen(false)}><HiX /></button>
              <nav className="mobile-menu__nav">
                {links.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={to}
                      className={`mobile-menu__link ${pathname === to ? 'mobile-menu__link--active' : ''}`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

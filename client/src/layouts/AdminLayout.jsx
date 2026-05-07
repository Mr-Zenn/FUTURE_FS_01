import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiViewGrid, HiFolder, HiMail, HiLogout, HiMenuAlt2, HiX } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin/overview', icon: <HiViewGrid />, label: 'Overview' },
  { to: '/admin/projects', icon: <HiFolder />, label: 'Projects' },
  { to: '/admin/messages', icon: <HiMail />, label: 'Messages' },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const SidebarContent = () => (
    <>
      <div className="sidebar__brand">
        <span className="sidebar__logo">JP<span>.</span></span>
        {!collapsed && <span className="sidebar__brand-label">Admin</span>}
      </div>

      <nav className="sidebar__nav">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <span className="sidebar__link-icon">{icon}</span>
            {!collapsed && <span className="sidebar__link-label">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        {!collapsed && (
          <div className="sidebar__user">
            <div className="sidebar__avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user?.name}</span>
              <span className="sidebar__user-role">Administrator</span>
            </div>
          </div>
        )}
        <button className="sidebar__logout" onClick={handleLogout} title="Logout">
          <HiLogout />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="admin-shell">
      {/* Desktop sidebar */}
      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
        <button className="sidebar__toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <HiMenuAlt2 /> : <HiX />}
        </button>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            className="sidebar sidebar--mobile"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="topbar__menu-btn" onClick={() => setMobileOpen(true)}>
            <HiMenuAlt2 />
          </button>
          <span className="topbar__title">Dashboard</span>
          <div className="topbar__user">
            <div className="sidebar__avatar sidebar__avatar--sm">{user?.name?.[0]?.toUpperCase()}</div>
          </div>
        </header>

        <motion.div
          className="admin-content"
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLayout;

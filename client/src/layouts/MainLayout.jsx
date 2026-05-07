import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <>
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default MainLayout;

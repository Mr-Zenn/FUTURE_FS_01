import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import DashboardOverview from './pages/admin/DashboardOverview.jsx';
import ManageProjects from './pages/admin/ManageProjects.jsx';
import ManageMessages from './pages/admin/ManageMessages.jsx';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* Admin routes — own layout, no public navbar/footer */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="messages" element={<ManageMessages />} />
          {/* Legacy redirect */}
          <Route path="dashboard" element={<Navigate to="/admin/overview" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;

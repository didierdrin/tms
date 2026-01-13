import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import useThemeStore from './store/useThemeStore';
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from './layouts/ClientLayout';
import PrivateRoute from './components/PrivateRoute';

// Client Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Track from './pages/Track';
import Contact from './pages/Contact';
import ClientDashboard from './pages/ClientDashboard';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import Shipments from './pages/Shipments';
import Customers from './pages/Customers';

// Placeholder admin pages (to be implemented)
const Documents = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Documents</h1><p>Generate and manage documents.</p></div>;
const Analytics = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Analytics</h1><p>View performance metrics and reports.</p></div>;
const Map = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Live Map</h1><p>Real-time tracking map coming soon.</p></div>;
const Settings = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Settings</h1><p>Configure system settings.</p></div>;

// Placeholder pages
const PrivacyPolicy = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Privacy Policy</h1></div>;
const TermsOfService = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Terms of Service</h1></div>;

function App() {
  const { initialize, loading } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  useEffect(() => {
    // Apply theme on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Loading TMS...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="services" element={<Services />} />
          <Route path="track" element={<Track />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />

          {/* Protected Client Routes */}
          <Route
            path="dashboard"
            element={
              <PrivateRoute requiredRole="client">
                <ClientDashboard />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Admin Routes - All Protected */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="customers" element={<Customers />} />
          <Route path="documents" element={<Documents />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="map" element={<Map />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
              <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">404</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Page not found</p>
              <a
                href="/"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Go Home
              </a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

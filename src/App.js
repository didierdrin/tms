import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from './layouts/ClientLayout';

// Placeholder pages
const Landing = () => <div className="p-8"><h1>Welcome to TMS</h1><p>Streamlining Logistics for ITO East Africa Ltd.</p></div>;
const Login = () => <div className="p-8"><h1>Login Page</h1></div>;
const AdminDashboard = () => <div className="p-8"><h1>Admin Dashboard</h1><p>Overview of operations.</p></div>;

function App() {
  const { initialize, loading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950 text-primary-500">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          {/* Add more client routes here */}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* Add modules: customer, supplier, tracking, documents, analytics */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

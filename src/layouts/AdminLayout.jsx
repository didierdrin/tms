import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Truck,
    FileText,
    BarChart,
    Settings,
    Menu,
    X,
    LogOut,
    Map as MapIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import useAuthStore from '../store/useAuthStore';

const SidebarItem = ({ icon: Icon, label, to, collapsed }) => (
    <NavLink
        to={to}
        className={({ isActive }) => clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
            isActive
                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400"
        )}
    >
        <Icon size={20} className="min-w-[20px]" />
        {!collapsed && (
            <span className="font-medium whitespace-nowrap overflow-hidden">{label}</span>
        )}
    </NavLink>
);

const MobileNavItem = ({ icon: Icon, label, to }) => (
    <NavLink
        to={to}
        className={({ isActive }) => clsx(
            "flex flex-col items-center justify-center w-full py-2 text-xs transition-colors",
            isActive
                ? "text-primary-600 dark:text-primary-400"
                : "text-slate-500 dark:text-slate-400"
        )}
    >
        <Icon size={24} className="mb-1" />
        <span className="truncate max-w-[60px]">{label}</span>
    </NavLink>
);

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { logout } = useAuthStore();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
        { icon: Truck, label: 'Shipments', to: '/admin/shipments' },
        { icon: Users, label: 'Customers', to: '/admin/customers' },
        { icon: FileText, label: 'Documents', to: '/admin/documents' },
        { icon: BarChart, label: 'Analytics', to: '/admin/analytics' },
        { icon: MapIcon, label: 'Map', to: '/admin/map' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans">

            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 80 : 260 }}
                className="hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-20 h-full shadow-sm"
            >
                <div className="p-6 flex items-center justify-between">
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400"
                        >
                            TMS
                        </motion.div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                    >
                        {collapsed ? <Menu size={20} /> : <X size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={logout}
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300",
                            collapsed && "justify-center px-0"
                        )}
                    >
                        <LogOut size={20} />
                        {!collapsed && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-20">
                    <div className="font-bold text-xl text-primary-600">TMS</div>
                    <button onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth">
                    <Outlet />
                </div>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around px-2 pb-safe z-30">
                    {navItems.slice(0, 5).map((item) => (
                        <MobileNavItem key={item.label} {...item} />
                    ))}
                </nav>
            </main>

            {/* Mobile Drawer (Overlay) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white dark:bg-slate-900 z-50 shadow-2xl md:hidden p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-2xl font-bold text-primary-600">Menu</span>
                                <button onClick={() => setMobileMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="space-y-2 flex-1">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.label}
                                        to={item.to}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) => clsx(
                                            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                                            isActive
                                                ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                                                : "text-slate-600 dark:text-slate-400"
                                        )}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                ))}
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-4 px-4 py-3 text-red-500 font-medium"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
};

export default AdminLayout;

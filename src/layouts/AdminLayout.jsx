import React from 'react';
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
    Map as MapIcon,
    User,
    Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import useAuthStore from '../store/useAuthStore';
import useUIStore from '../store/useUIStore';
import ThemeToggle from '../components/ThemeToggle';
import CurrencyToggle from '../components/CurrencyToggle';

const SidebarItem = ({ icon: Icon, label, to, collapsed }) => (
    <NavLink
        to={to}
        className={({ isActive }) => clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
            isActive
                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400"
        )}
    >
        <Icon size={20} className="min-w-[20px]" />
        {!collapsed && (
            <span className="font-medium whitespace-nowrap overflow-hidden">{label}</span>
        )}
        {collapsed && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {label}
            </span>
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
    const { sidebarCollapsed, mobileMenuOpen, toggleSidebar, setMobileMenuOpen, closeMobileMenu } = useUIStore();
    const { logout, user, userProfile } = useAuthStore();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
        { icon: Truck, label: 'Shipments', to: '/admin/shipments' },
        { icon: Users, label: 'Customers', to: '/admin/customers' },
        { icon: FileText, label: 'Documents', to: '/admin/documents' },
        { icon: BarChart, label: 'Analytics', to: '/admin/analytics' },
        { icon: MapIcon, label: 'Map', to: '/admin/map' },
        { icon: Settings, label: 'Settings', to: '/admin/settings' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans">

            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarCollapsed ? 80 : 260 }}
                className="hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-20 h-full shadow-sm"
            >
                {/* Logo & Toggle */}
                <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                    {!sidebarCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400"
                        >
                            TMS
                        </motion.div>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
                    </button>
                </div>

                {/* User Profile Section */}
                {!sidebarCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 border-b border-slate-200 dark:border-slate-800"
                    >
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                                {userProfile?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                                    {userProfile?.displayName || 'Admin'}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                            collapsed={sidebarCollapsed}
                        />
                    ))}
                </nav>

                {/* Bottom Section - Currency, Theme & Logout */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    {!sidebarCollapsed && (
                        <>
                            <div className="flex items-center justify-between px-4 py-2">
                                <span className="text-sm text-slate-600 dark:text-slate-400">Currency</span>
                                <CurrencyToggle />
                            </div>
                            <div className="flex items-center justify-between px-4 py-2">
                                <span className="text-sm text-slate-600 dark:text-slate-400">Theme</span>
                                <ThemeToggle />
                            </div>
                        </>
                    )}
                    {sidebarCollapsed && (
                        <div className="flex justify-center gap-2">
                            <CurrencyToggle />
                            <ThemeToggle />
                        </div>
                    )}

                    <button
                        onClick={logout}
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300",
                            sidebarCollapsed && "justify-center px-0"
                        )}
                    >
                        <LogOut size={20} />
                        {!sidebarCollapsed && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-20">
                    <div className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                        TMS
                    </div>
                    <div className="flex items-center gap-2">
                        <CurrencyToggle />
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
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
                            onClick={closeMobileMenu}
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
                                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                                    Menu
                                </span>
                                <button
                                    onClick={closeMobileMenu}
                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* User Profile in Drawer */}
                            <div className="mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold text-lg">
                                        {userProfile?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                                            {userProfile?.displayName || 'Admin User'}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 flex-1 overflow-y-auto">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.label}
                                        to={item.to}
                                        onClick={closeMobileMenu}
                                        className={({ isActive }) => clsx(
                                            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                                            isActive
                                                ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        )}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                                <div className="flex items-center justify-between px-4 py-2">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Currency</span>
                                    <CurrencyToggle />
                                </div>
                                <div className="flex items-center justify-between px-4 py-2">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Dark Mode</span>
                                    <ThemeToggle />
                                </div>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-4 px-4 py-3 text-red-500 font-medium w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
};

export default AdminLayout;


import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    Home,
    Package,
    FileText,
    Phone,
    LogIn,
    User,
    LogOut,
    Search
} from 'lucide-react';
import clsx from 'clsx';
import useAuthStore from '../store/useAuthStore';
import ThemeToggle from '../components/ThemeToggle';

const ClientLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, userProfile, logout } = useAuthStore();
    const navigate = useNavigate();

    const navLinks = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/services', label: 'Services', icon: Package },
        { to: '/track', label: 'Track', icon: Search },
        { to: '/contact', label: 'Contact', icon: Phone },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-primary-500 selection:text-white">

            {/* Desktop & Mobile Navigation */}
            <nav className="fixed w-full top-0 z-50 glass border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                TMS
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        clsx(
                                            "text-sm font-medium transition-colors relative group",
                                            isActive
                                                ? "text-primary-600 dark:text-primary-400"
                                                : "text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                                        )
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.label}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-indicator"
                                                    className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary-600"
                                                    initial={false}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                        {/* Desktop Right Section */}
                        <div className="hidden md:flex items-center gap-4">
                            <ThemeToggle />

                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                        <User size={16} />
                                        <span className="max-w-[100px] truncate">
                                            {userProfile?.displayName || userProfile?.email?.split('@')[0] || 'Account'}
                                        </span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5"
                                >
                                    <LogIn size={16} />
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-2">
                            <ThemeToggle />
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Open menu"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white dark:bg-slate-900 z-50 shadow-2xl md:hidden flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
                                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* User Section */}
                            {user && (
                                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                                            {userProfile?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                                                {userProfile?.displayName || 'User'}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {/* Navigation Links */}
                            <div className="flex-1 overflow-y-auto py-6">
                                <div className="space-y-2 px-6">
                                    {navLinks.map((link) => (
                                        <NavLink
                                            key={link.to}
                                            to={link.to}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={({ isActive }) =>
                                                clsx(
                                                    "flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all",
                                                    isActive
                                                        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                )
                                            }
                                        >
                                            <link.icon size={20} />
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                                {user ? (
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-500 font-medium shadow-lg shadow-primary-500/30"
                                    >
                                        <LogIn size={20} />
                                        Login
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 pt-16">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe">
                <div className="flex justify-around px-2 py-2">
                    {navLinks.slice(0, 4).map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                clsx(
                                    "flex flex-col items-center justify-center w-full py-2 text-xs transition-colors rounded-lg",
                                    isActive
                                        ? "text-primary-600 dark:text-primary-400"
                                        : "text-slate-500 dark:text-slate-400"
                                )
                            }
                        >
                            <link.icon size={22} className="mb-1" />
                            <span className="truncate max-w-[60px]">{link.label}</span>
                        </NavLink>
                    ))}
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="flex flex-col items-center justify-center w-full py-2 text-xs text-slate-500 dark:text-slate-400"
                        >
                            <User size={22} className="mb-1" />
                            <span className="truncate max-w-[60px]">Account</span>
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="flex flex-col items-center justify-center w-full py-2 text-xs text-primary-600 dark:text-primary-400"
                        >
                            <LogIn size={22} className="mb-1" />
                            <span className="truncate max-w-[60px]">Login</span>
                        </Link>
                    )}
                </div>
            </nav>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                        {/* Company Info */}
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-4">
                                ITO East Africa Ltd
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-md">
                                Streamlining logistics and transportation operations with cutting-edge technology.
                                Real-time tracking, automated documentation, and comprehensive fleet management.
                            </p>
                            <div className="flex gap-4">
                                <ThemeToggle />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {navLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Services</h3>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li>Import Clearance</li>
                                <li>Ocean Transport</li>
                                <li>Inland Transport</li>
                                <li>Storage Solutions</li>
                                <li>Real-time Tracking</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left">
                                &copy; {new Date().getFullYear()} ITO East Africa Ltd. All rights reserved.
                            </p>
                            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                                <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ClientLayout;


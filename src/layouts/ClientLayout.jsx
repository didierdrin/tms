import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const ClientLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-primary-500 selection:text-white">
            <nav className="fixed w-full top-0 z-50 glass border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                TMS
                            </Link>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-sm font-medium hover:text-primary-600 transition-colors">Home</Link>
                            <Link to="/services" className="text-sm font-medium hover:text-primary-600 transition-colors">Services</Link>
                            <Link to="/contact" className="text-sm font-medium hover:text-primary-600 transition-colors">Contact</Link>
                        </div>
                        <div>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex-1 pt-16">
                <Outlet />
            </main>
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} ITO East Africa Ltd. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default ClientLayout;

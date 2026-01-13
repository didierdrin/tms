import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import useThemeStore from '../store/useThemeStore';

const ThemeToggle = ({ className = '' }) => {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${className}`}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'light' ? (
                    <Moon size={20} className="text-slate-600 dark:text-slate-400" />
                ) : (
                    <Sun size={20} className="text-yellow-500" />
                )}
            </motion.div>
        </button>
    );
};

export default ThemeToggle;

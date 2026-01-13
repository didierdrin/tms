import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Landing = () => {
    const { user } = useAuthStore();

    const features = [
        {
            icon: Truck,
            title: 'Real-time Tracking',
            description: 'Track your shipments in real-time with live GPS updates and delivery status.'
        },
        {
            icon: MapPin,
            title: 'Location Services',
            description: 'Interactive maps showing routes, warehouses, and delivery points across Rwanda.'
        },
        {
            icon: Clock,
            title: 'Fast Processing',
            description: 'Automated document generation and quick clearance processing for imports.'
        },
        {
            icon: Shield,
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security with encrypted data storage and access control.'
        }
    ];

    const services = [
        { title: 'Import Clearance', description: 'Streamlined customs clearance for imported goods' },
        { title: 'Ocean Transport', description: 'International shipping coordination and management' },
        { title: 'Inland Transport', description: 'Domestic logistics and delivery services' },
        { title: 'Storage Solutions', description: 'Secure warehousing and inventory management' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-primary-50/30 to-slate-50 dark:from-slate-950 dark:via-primary-950/30 dark:to-slate-950">
            {/* Hero Section */}
            <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                            Transport Management
                            <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                Simplified
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                            Streamline your logistics operations with real-time tracking, automated documentation, and comprehensive fleet management for ITO East Africa Ltd.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {user ? (
                                <>
                                    <Link
                                        to="/services"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30 hover:-translate-y-1 transition-all"
                                    >
                                        Explore Services
                                        <ArrowRight size={20} />
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                                    >
                                        Go to Dashboard
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/services"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30 hover:-translate-y-1 transition-all"
                                    >
                                        Get Started
                                        <ArrowRight size={20} />
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Hero Image Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative h-96 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-2xl border border-primary-200 dark:border-primary-800 flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        <Truck className="text-primary-600 dark:text-primary-400" size={120} />
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Everything you need to manage your logistics operations efficiently
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                            >
                                <feature.icon className="text-primary-600 dark:text-primary-400 mb-4" size={32} />
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Our Services
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Comprehensive logistics solutions tailored to your needs
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="p-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-500">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to Transform Your Logistics?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Join ITO East Africa Ltd in revolutionizing transport management
                        </p>
                        <Link
                            to={user ? "/services" : "/register"}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-lg"
                        >
                            {user ? 'Explore Services' : 'Create Account'}
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Landing;

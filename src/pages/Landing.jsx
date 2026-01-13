import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Truck,
    Package,
    MapPin,
    FileText,
    BarChart3,
    CheckCircle,
    ArrowRight,
    Shield,
    Clock,
    Globe
} from 'lucide-react';

const Landing = () => {
    const features = [
        {
            icon: MapPin,
            title: 'Real-time Tracking',
            description: 'Track your shipments in real-time with live GPS updates and accurate ETAs.'
        },
        {
            icon: FileText,
            title: 'Automated Documentation',
            description: 'Generate invoices, receipts, and quotes automatically with zero errors.'
        },
        {
            icon: Truck,
            title: 'Fleet Management',
            description: 'Comprehensive fleet oversight with route optimization and performance tracking.'
        },
        {
            icon: BarChart3,
            title: 'Analytics Dashboard',
            description: 'Data-driven insights for better decision-making and cost optimization.'
        },
        {
            icon: Shield,
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security with cloud backup and 99.9% uptime guarantee.'
        },
        {
            icon: Clock,
            title: '24/7 Support',
            description: 'Round-the-clock customer support for uninterrupted operations.'
        }
    ];

    const stats = [
        { value: '500+', label: 'Active Shipments' },
        { value: '150+', label: 'Satisfied Clients' },
        { value: '50+', label: 'Fleet Vehicles' },
        { value: '99.9%', label: 'On-time Delivery' }
    ];

    const services = [
        'Import Clearance',
        'Ocean Transport',
        'Inland Transport',
        'Warehousing & Storage',
        'Customs Documentation',
        'Last-mile Delivery'
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900">
                <div className="absolute inset-0 bg-grid-white/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Transform Your Logistics with{' '}
                            <span className="text-yellow-300">Smart TMS</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
                            Streamline operations, track shipments in real-time, and automate documentation
                            for ITO East Africa Ltd.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-2xl hover:shadow-xl hover:-translate-y-1 transition-all"
                            >
                                Get Started Free
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                to="/track"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700/50 text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-primary-700 transition-all"
                            >
                                <MapPin size={20} />
                                Track Shipment
                            </Link>
                        </div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-20 left-10 opacity-20"
                    >
                        <Package size={80} className="text-white" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-20 right-10 opacity-20"
                    >
                        <Truck size={100} className="text-white" />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white dark:bg-slate-900 py-12 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Powerful Features for Modern Logistics
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Everything you need to manage your transportation business efficiently
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary-500/30">
                                    <feature.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                                Comprehensive Logistics Services
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                                From import clearance to last-mile delivery, we've got you covered with
                                end-to-end logistics solutions across Rwanda and East Africa.
                            </p>
                            <ul className="space-y-4">
                                {services.map((service, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                                            {service}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-3xl flex items-center justify-center">
                                <Globe size={200} className="text-primary-500 dark:text-primary-400 opacity-50" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 dark:to-slate-900/10 rounded-3xl"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-900 dark:to-primary-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Modernize Your Logistics?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Join hundreds of businesses already using TMS to streamline their operations
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-2xl hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            Start Your Free Trial
                            <Arrow Right size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Landing;

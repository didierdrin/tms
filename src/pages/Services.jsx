import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Ship, Package, Warehouse, FileText, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Services = () => {
    const { user } = useAuthStore();
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            id: 1,
            icon: FileText,
            title: 'Import Clearance',
            description: 'Streamlined customs clearance for imported goods',
            details: 'Our expert team handles all documentation and customs procedures to ensure smooth import clearance with minimal delays.',
            features: ['Document preparation', 'Customs coordination', 'Duty calculation', 'Fast processing']
        },
        {
            id: 2,
            icon: Ship,
            title: 'Ocean Transport',
            description: 'International shipping coordination and management',
            details: 'Full-service ocean freight solutions with real-time tracking and comprehensive logistics support.',
            features: ['FCL/LCL services', 'Port coordination', 'Insurance coverage', 'Real-time tracking']
        },
        {
            id: 3,
            icon: Truck,
            title: 'Inland Transport',
            description: 'Domestic logistics and delivery services',
            details: 'Reliable ground transportation across Rwanda with GPS tracking and professional drivers.',
            features: ['Same-day delivery', 'GPS tracking', 'Professional drivers', 'Flexible scheduling']
        },
        {
            id: 4,
            icon: Warehouse,
            title: 'Storage Solutions',
            description: 'Secure warehousing and inventory management',
            details: 'Climate-controlled storage facilities with 24/7 security and inventory management systems.',
            features: ['Climate control', '24/7 security', 'Inventory tracking', 'Flexible terms']
        },
        {
            id: 5,
            icon: MapPin,
            title: 'Real-time Tracking',
            description: 'Live GPS tracking for all shipments',
            details: 'Monitor your shipments in real-time with detailed location updates and delivery status.',
            features: ['Live GPS tracking', 'Status updates', 'Delivery notifications', 'Historical data']
        },
        {
            id: 6,
            icon: Package,
            title: 'Packaging & Labeling',
            description: 'Professional packaging and labeling services',
            details: 'Expert packaging to ensure safe delivery with proper labeling and documentation.',
            features: ['Custom packaging', 'Labeling services', 'Fragile handling', 'Eco-friendly options']
        }
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
            {/* Header */}
            <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Our Services
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Comprehensive logistics solutions tailored to meet all your transportation and warehousing needs
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                onClick={() => setSelectedService(service.id)}
                                className="group cursor-pointer"
                            >
                                <div className="h-full p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <service.icon className="text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:gap-2 transition-all">
                                        Learn more
                                        <ArrowRight size={18} className="ml-2" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Service Details Modal */}
            {selectedService && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedService(null)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-8 border border-slate-200 dark:border-slate-800"
                    >
                        {(() => {
                            const service = services.find(s => s.id === selectedService);
                            return (
                                <>
                                    <service.icon className="text-primary-600 dark:text-primary-400 mb-4" size={48} />
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                        {service.title}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                        {service.details}
                                    </p>
                                    <div className="space-y-3 mb-8">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0" size={20} />
                                                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        {user ? (
                                            <Link
                                                to="/dashboard"
                                                className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all text-center"
                                            >
                                                Request Service
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/login"
                                                className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all text-center"
                                            >
                                                Sign In to Request
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => setSelectedService(null)}
                                            className="flex-1 py-3 px-4 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </>
                            );
                        })()}
                    </motion.div>
                </motion.div>
            )}

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Need a Custom Solution?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                            Contact our team to discuss your specific logistics requirements
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30 hover:-translate-y-1 transition-all"
                        >
                            Get in Touch
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;

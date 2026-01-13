import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Truck, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import useShipmentStore from '../store/useShipmentStore';

const Track = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [searchedShipment, setSearchedShipment] = useState(null);
    const [error, setError] = useState('');
    const { shipments } = useShipmentStore();

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setSearchedShipment(null);

        if (!trackingNumber.trim()) {
            setError('Please enter a tracking number');
            return;
        }

        const found = shipments.find(s => s.trackingNumber?.toLowerCase() === trackingNumber.toLowerCase());
        if (found) {
            setSearchedShipment(found);
        } else {
            setError('Shipment not found. Please check your tracking number.');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'text-green-600 dark:text-green-400';
            case 'in-transit':
                return 'text-blue-600 dark:text-blue-400';
            case 'pending':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'delayed':
                return 'text-red-600 dark:text-red-400';
            default:
                return 'text-slate-600 dark:text-slate-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle size={24} />;
            case 'in-transit':
                return <Truck size={24} />;
            case 'delayed':
                return <AlertCircle size={24} />;
            default:
                return <Clock size={24} />;
        }
    };

    const timeline = searchedShipment?.timeline || [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-primary-50/30 to-slate-50 dark:from-slate-950 dark:via-primary-950/30 dark:to-slate-950">
            {/* Header */}
            <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Track Your Shipment
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Enter your tracking number to get real-time updates
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        onSubmit={handleSearch}
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8"
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    placeholder="Enter tracking number (e.g., TMS-2024-001)"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30 hover:from-primary-700 hover:to-primary-600 transition-all hover:-translate-y-0.5"
                            >
                                Track
                            </button>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
                            >
                                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </motion.div>
                        )}
                    </motion.form>
                </div>
            </section>

            {/* Tracking Results */}
            {searchedShipment && (
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8"
                        >
                            {/* Shipment Header */}
                            <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                            {searchedShipment.trackingNumber}
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {searchedShipment.origin} → {searchedShipment.destination}
                                        </p>
                                    </div>
                                    <div className={`flex items-center gap-2 ${getStatusColor(searchedShipment.status)}`}>
                                        {getStatusIcon(searchedShipment.status)}
                                        <span className="font-semibold capitalize">{searchedShipment.status}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipment Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Shipment Type</p>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        {searchedShipment.type}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Weight</p>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        {searchedShipment.weight} kg
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Shipped Date</p>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        {new Date(searchedShipment.shippedDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Expected Delivery</p>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        {new Date(searchedShipment.expectedDelivery).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Timeline */}
                            {timeline.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                                        Tracking Timeline
                                    </h3>
                                    <div className="space-y-6">
                                        {timeline.map((event, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-400"></div>
                                                    {idx < timeline.length - 1 && (
                                                        <div className="w-0.5 h-12 bg-slate-200 dark:bg-slate-700 mt-2"></div>
                                                    )}
                                                </div>
                                                <div className="pb-6">
                                                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                                                        {event.status}
                                                    </p>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        {event.location}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                                        {new Date(event.timestamp).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Info Section */}
            {!searchedShipment && (
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center"
                        >
                            <MapPin className="text-blue-600 dark:text-blue-400 mx-auto mb-4" size={40} />
                            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                How to Track Your Shipment
                            </h3>
                            <p className="text-blue-800 dark:text-blue-200">
                                Enter your tracking number above to see real-time updates on your shipment's location and status.
                                Your tracking number can be found in your confirmation email.
                            </p>
                        </motion.div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Track;

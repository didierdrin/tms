import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Truck, Package, FileText, TrendingUp, Receipt, FileCheck, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';
import useShipmentStore from '../store/useShipmentStore';
import useAuthStore from '../store/useAuthStore';
import useCurrencyStore from '../store/useCurrencyStore';
import AddShipmentDialog from '../components/AddShipmentDialog';
import { generateInvoice, generateReceipt, generateQuotation, generateCoverLetter } from '../utils/documentGenerator';

const ClientDashboard = () => {
    const { shipments, fetchShipments } = useShipmentStore();
    const { userProfile, user } = useAuthStore();
    const { formatAmount } = useCurrencyStore();
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (user) {
            fetchShipments(user.uid);
        }
    }, [user, fetchShipments]);

    const stats = [
        {
            icon: Truck,
            label: 'Active Shipments',
            value: shipments.filter(s => s.status === 'in-transit').length,
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: Package,
            label: 'Completed',
            value: shipments.filter(s => s.status === 'delivered').length,
            color: 'from-green-500 to-green-600'
        },
        {
            icon: FileText,
            label: 'Documents',
            value: shipments.length,
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: TrendingUp,
            label: 'Total Spent',
            value: formatAmount(shipments.length * 150),
            color: 'from-orange-500 to-orange-600'
        }
    ];

    const recentShipments = shipments.slice(0, 5);

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
        <div className="space-y-8 mb-10">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl mt-5 mx-2 p-8 text-white shadow-lg"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Welcome back, {userProfile?.displayName || userProfile?.email.slice(0)}!
                        </h1>
                        <p className="text-primary-100">
                            Manage your shipments and track deliveries in real-time
                        </p>
                    </div>
                    <button
                        onClick={() => setDialogOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <Plus size={20} />
                        New Shipment
                    </button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
                    >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon className="text-white" size={24} />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Shipments */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg"
                >
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Recent Shipments</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Tracking</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Route</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {recentShipments.length > 0 ? (
                                    recentShipments.map((shipment) => (
                                        <tr key={shipment.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                                                {shipment.trackingNumber}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {shipment.origin} → {shipment.destination}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    shipment.status === 'delivered'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                        : shipment.status === 'in-transit'
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                    {shipment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {new Date(shipment.shippedDate).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-slate-600 dark:text-slate-400">
                                            No shipments yet. <Link to="/services" className="text-primary-600 dark:text-primary-400 hover:underline">Create one</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-4"
                >
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => setDialogOpen(true)}
                                className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                            >
                                <Plus size={20} />
                                <span className="font-medium">New Shipment</span>
                            </button>
                            <Link
                                to="/track"
                                className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                            >
                                <Truck size={20} />
                                <span className="font-medium">Track Shipment</span>
                            </Link>
                            <Link
                                to="/contact"
                                className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                            >
                                <FileText size={20} />
                                <span className="font-medium">Contact Support</span>
                            </Link>
                        </div>
                    </div>

                    {/* Account Balance */}
                    {/* <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Account Balance</h3>
                            <button
                                onClick={() => setShowBalance(!showBalance)}
                                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                        <p className="text-3xl font-bold">
                            {showBalance ? formatAmount(5250) : '••••••'}
                        </p>
                        <p className="text-slate-400 text-sm mt-2">Available for shipments</p>
                    </div> */}
                </motion.div>
            </div>

            {/* Document Generation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg"
            >
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Generate Documents</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Create invoices, receipts, quotations, and covers for your shipments</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        onClick={() => recentShipments[0] && generateInvoice(recentShipments[0], userProfile)}
                        disabled={recentShipments.length === 0}
                        className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FileText size={24} />
                        <div className="text-left">
                            <p className="font-semibold">Invoice</p>
                            <p className="text-xs opacity-75">Generate invoice</p>
                        </div>
                    </button>
                    <button
                        onClick={() => recentShipments[0] && generateReceipt(recentShipments[0], userProfile)}
                        disabled={recentShipments.length === 0}
                        className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Receipt size={24} />
                        <div className="text-left">
                            <p className="font-semibold">Receipt</p>
                            <p className="text-xs opacity-75">Generate receipt</p>
                        </div>
                    </button>
                    <button
                        onClick={() => recentShipments[0] && generateQuotation(recentShipments[0], userProfile)}
                        disabled={recentShipments.length === 0}
                        className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FileSpreadsheet size={24} />
                        <div className="text-left">
                            <p className="font-semibold">Quotation</p>
                            <p className="text-xs opacity-75">Generate quote</p>
                        </div>
                    </button>
                    <button
                        onClick={() => recentShipments[0] && generateCoverLetter(recentShipments[0], userProfile)}
                        disabled={recentShipments.length === 0}
                        className="flex items-center gap-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FileCheck size={24} />
                        <div className="text-left">
                            <p className="font-semibold">Cover</p>
                            <p className="text-xs opacity-75">Generate cover</p>
                        </div>
                    </button>
                </div>
            </motion.div>

            <AddShipmentDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
        </div>
    );
};

export default ClientDashboard;

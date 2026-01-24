import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Truck, Package, DollarSign, ArrowUpRight, ArrowDownRight, Calendar, Filter, FileText, Receipt, FileCheck, FileSpreadsheet } from 'lucide-react';
import useShipmentStore from '../store/useShipmentStore';
import useCustomerStore from '../store/useCustomerStore';
import useCurrencyStore from '../store/useCurrencyStore';
import { generateInvoice, generateReceipt, generateQuotation, generateCoverLetter } from '../utils/documentGenerator';

const AdminDashboard = () => {
    const { shipments, fetchShipments } = useShipmentStore();
    const { customers } = useCustomerStore();
    const { formatAmount } = useCurrencyStore();

    useEffect(() => {
        fetchShipments();
    }, [fetchShipments]);

    const totalRevenue = shipments.length * 150;
    const activeShipments = shipments.filter(s => s.status === 'in-transit').length;
    const completedShipments = shipments.filter(s => s.status === 'delivered').length;

    const stats = [
        {
            icon: Truck,
            label: 'Total Shipments',
            value: shipments.length,
            change: '+12%',
            positive: true,
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: Users,
            label: 'Active Customers',
            value: customers.length,
            change: '+8%',
            positive: true,
            color: 'from-green-500 to-green-600'
        },
        {
            icon: DollarSign,
            label: 'Total Revenue',
            value: formatAmount(totalRevenue),
            change: '+23%',
            positive: true,
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: Package,
            label: 'In Transit',
            value: activeShipments,
            change: '-5%',
            positive: false,
            color: 'from-orange-500 to-orange-600'
        }
    ];

    const recentActivities = [
        { type: 'shipment', message: 'New shipment created', time: '2 hours ago', icon: Truck },
        { type: 'delivery', message: 'Shipment delivered successfully', time: '4 hours ago', icon: Package },
        { type: 'customer', message: 'New customer registered', time: '6 hours ago', icon: Users },
        { type: 'revenue', message: 'Payment received', time: '8 hours ago', icon: DollarSign },
        { type: 'shipment', message: 'Shipment delayed', time: '10 hours ago', icon: Truck }
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
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <Filter size={18} />
                    <span className="text-sm font-medium">Filter</span>
                </button>
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
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="text-white" size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-semibold ${stat.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Shipment Status Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Shipment Status Overview</h2>
                        <BarChart3 className="text-slate-400" size={24} />
                    </div>

                    <div className="space-y-6">
                        {[
                            { label: 'Delivered', value: completedShipments, max: shipments.length, color: 'bg-green-500' },
                            { label: 'In Transit', value: activeShipments, max: shipments.length, color: 'bg-blue-500' },
                            { label: 'Pending', value: shipments.filter(s => s.status === 'pending').length, max: shipments.length, color: 'bg-yellow-500' },
                            { label: 'Delayed', value: shipments.filter(s => s.status === 'delayed').length, max: shipments.length, color: 'bg-red-500' }
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                        className={`${item.color} h-2 rounded-full transition-all`}
                                        style={{ width: `${item.max > 0 ? (item.value / item.max) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activities */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg"
                >
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Recent Activities</h2>
                    <div className="space-y-4">
                        {recentActivities.map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 last:border-0 last:pb-0">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                                    activity.type === 'shipment' ? 'from-blue-500 to-blue-600' :
                                    activity.type === 'delivery' ? 'from-green-500 to-green-600' :
                                    activity.type === 'customer' ? 'from-purple-500 to-purple-600' :
                                    'from-orange-500 to-orange-600'
                                } flex items-center justify-center flex-shrink-0`}>
                                    <activity.icon className="text-white" size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                        {activity.message}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Performance Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {[
                    { label: 'On-Time Delivery Rate', value: '94%', trend: '+2%', icon: TrendingUp },
                    { label: 'Average Delivery Time', value: '2.5 days', trend: '-0.3 days', icon: Calendar },
                    { label: 'Customer Satisfaction', value: '4.8/5', trend: '+0.2', icon: Users }
                ].map((metric, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{metric.label}</p>
                            <metric.icon className="text-primary-600 dark:text-primary-400" size={20} />
                        </div>
                        <div className="flex items-end justify-between">
                            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{metric.value}</p>
                            <p className="text-sm font-semibold text-green-600 dark:text-green-400">{metric.trend}</p>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Document Generation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg"
            >
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Generate Documents</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Create invoices, receipts, quotations, and covers for shipments</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        onClick={() => shipments[0] && generateInvoice(shipments[0], { displayName: 'Admin', email: 'admin@tms.com' })}
                        disabled={shipments.length === 0}
                        className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FileText size={24} />
                        <div className="text-left">
                            <p className="font-semibold">Invoice</p>
                            <p className="text-xs opacity-75">Generate invoice</p>
                        </div>
                    </button>
                    <button
                        onClick={() => shipments[0] && generateReceipt(shipments[0], { displayName: 'Admin', email: 'admin@tms.com' })}
                        disabled={shipments.length === 0}
                        className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Receipt size={24} />
                        <div className="text-left">
                            <p className="font-semibold">Receipt</p>
                            <p className="text-xs opacity-75">Generate receipt</p>
                        </div>
                    </button>
                    <button
                        onClick={() => shipments[0] && generateQuotation(shipments[0], { displayName: 'Admin', email: 'admin@tms.com' })}
                        disabled={shipments.length === 0}
                        className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FileSpreadsheet size={24} />
                        <div className="text-left">
                            <p className="font-semibold">Quotation</p>
                            <p className="text-xs opacity-75">Generate quote</p>
                        </div>
                    </button>
                    <button
                        onClick={() => shipments[0] && generateCoverLetter(shipments[0], { displayName: 'Admin', email: 'admin@tms.com' })}
                        disabled={shipments.length === 0}
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
        </div>
    );
};

export default AdminDashboard;

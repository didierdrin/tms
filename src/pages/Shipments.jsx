import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import useShipmentStore from '../store/useShipmentStore';

const Shipments = () => {
    const { shipments, deleteShipment } = useShipmentStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedShipment, setSelectedShipment] = useState(null);

    const filteredShipments = shipments.filter(s => {
        const matchesSearch = s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.destination.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this shipment?')) {
            try {
                await deleteShipment(id);
            } catch (error) {
                console.error('Error deleting shipment:', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            Shipments Management
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Manage and track all shipments
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30 hover:-translate-y-0.5 transition-all">
                        <Plus size={20} />
                        New Shipment
                    </button>
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by tracking number, origin, or destination..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="delayed">Delayed</option>
                    </select>
                </div>
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Tracking</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Route</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Type</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {filteredShipments.length > 0 ? (
                                filteredShipments.map((shipment) => (
                                    <tr key={shipment.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                                            {shipment.trackingNumber}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                            {shipment.origin} → {shipment.destination}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                            {shipment.type}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                shipment.status === 'delivered'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : shipment.status === 'in-transit'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                    : shipment.status === 'delayed'
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                                {shipment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                            {new Date(shipment.shippedDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedShipment(shipment)}
                                                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(shipment.id)}
                                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-600 dark:text-slate-400">
                                        No shipments found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Detail Modal */}
            {selectedShipment && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedShipment(null)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-8 border border-slate-200 dark:border-slate-800"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Shipment Details
                        </h2>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Tracking Number</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedShipment.trackingNumber}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Status</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 capitalize">
                                    {selectedShipment.status}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Origin</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedShipment.origin}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Destination</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedShipment.destination}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Weight</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedShipment.weight} kg
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Type</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedShipment.type}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedShipment(null)}
                            className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Shipments;

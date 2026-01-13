import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, Mail, Phone } from 'lucide-react';
import useCustomerStore from '../store/useCustomerStore';

const Customers = () => {
    const { customers, deleteCustomer } = useCustomerStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(id);
            } catch (error) {
                console.error('Error deleting customer:', error);
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
                            Customer Management
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Manage and track all customers
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30 hover:-translate-y-0.5 transition-all">
                        <Plus size={20} />
                        Add Customer
                    </button>
                </div>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
            >
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                    />
                </div>
            </motion.div>

            {/* Grid View */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                        <div
                            key={customer.id}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                                    {customer.name[0]}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedCustomer(customer)}
                                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
                                    >
                                        <Eye size={18} />
                                    </button>
                                    <button
                                        className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer.id)}
                                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                {customer.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                {customer.company}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Mail size={16} />
                                    <span className="truncate">{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Phone size={16} />
                                    <span>{customer.phone}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-500">Shipments</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                        {customer.totalShipments}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-500">Total Spent</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                        ${customer.totalSpent}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-slate-600 dark:text-slate-400">No customers found</p>
                    </div>
                )}
            </motion.div>

            {/* Detail Modal */}
            {selectedCustomer && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedCustomer(null)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-8 border border-slate-200 dark:border-slate-800"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold text-2xl">
                                {selectedCustomer.name[0]}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    {selectedCustomer.name}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {selectedCustomer.company}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Email</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedCustomer.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Phone</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedCustomer.phone}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Address</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedCustomer.address}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Status</p>
                                <p className="text-lg font-semibold text-green-600 dark:text-green-400 capitalize">
                                    {selectedCustomer.status}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Shipments</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedCustomer.totalShipments}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Spent</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    ${selectedCustomer.totalSpent}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedCustomer(null)}
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

export default Customers;

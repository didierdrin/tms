import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Package, DollarSign } from 'lucide-react';
import useShipmentStore from '../store/useShipmentStore';
import useAuthStore from '../store/useAuthStore';
import useCurrencyStore from '../store/useCurrencyStore';

const SERVICES = [
    { id: 'import-clearance', name: 'Import Clearance', basePrice: 200 },
    { id: 'ocean-transport', name: 'Ocean Transport', basePrice: 500 },
    { id: 'inland-transport', name: 'Inland Transport', basePrice: 150 },
    { id: 'storage', name: 'Storage Solutions', basePrice: 100 },
    { id: 'packaging', name: 'Packaging & Labeling', basePrice: 50 }
];

const AddShipmentDialog = ({ isOpen, onClose }) => {
    const { addShipment } = useShipmentStore();
    const { user } = useAuthStore();
    const { formatAmount } = useCurrencyStore();
    
    const [formData, setFormData] = useState({
        service: '',
        origin: 'Kigali, Rwanda',
        destination: '',
        items: [{ description: '', quantity: 1, weight: 0 }]
    });
    const [loading, setLoading] = useState(false);

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { description: '', quantity: 1, weight: 0 }]
        }));
    };

    const removeItem = (index) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const updateItem = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const calculateCost = () => {
        const service = SERVICES.find(s => s.id === formData.service);
        if (!service) return 0;
        
        const totalWeight = formData.items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
        const totalItems = formData.items.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
        
        return service.basePrice + (totalWeight * 2) + (totalItems * 10);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const totalWeight = formData.items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
            const estimatedCost = calculateCost();
            
            const shipmentData = {
                userId: user?.id || user?.uid,
                userEmail: user.email,
                trackingNumber: `TMS-${Date.now()}`,
                type: SERVICES.find(s => s.id === formData.service)?.name || 'General',
                origin: formData.origin,
                destination: formData.destination,
                items: formData.items,
                weight: totalWeight,
                estimatedCost,
                status: 'pending',
                shippedDate: new Date().toISOString(),
                expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString()
            };

            await addShipment(shipmentData);
            onClose();
            setFormData({
                service: '',
                origin: 'Kigali, Rwanda',
                destination: '',
                items: [{ description: '', quantity: 1, weight: 0 }]
            });
        } catch (error) {
            console.error('Error creating shipment:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">New Shipment</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Service Selection */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Service Type *
                            </label>
                            <select
                                required
                                value={formData.service}
                                onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100"
                            >
                                <option value="">Select a service</option>
                                {SERVICES.map(service => (
                                    <option key={service.id} value={service.id}>
                                        {service.name} - Base: {formatAmount(service.basePrice)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Origin */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Origin *
                            </label>
                            <input
                                required
                                type="text"
                                value={formData.origin}
                                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100"
                            />
                        </div>

                        {/* Destination */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Destination *
                            </label>
                            <input
                                required
                                type="text"
                                value={formData.destination}
                                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                                placeholder="e.g., Kampala, Uganda"
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                            />
                        </div>

                        {/* Items */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Items *
                                </label>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                                >
                                    <Plus size={16} />
                                    Add Item
                                </button>
                            </div>

                            <div className="space-y-3">
                                {formData.items.map((item, index) => (
                                    <div key={index} className="flex gap-3 items-start p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                        <Package className="text-slate-400 mt-3 flex-shrink-0" size={20} />
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <input
                                                required
                                                type="text"
                                                placeholder="Description"
                                                value={item.description}
                                                onChange={(e) => updateItem(index, 'description', e.target.value)}
                                                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm text-slate-900 dark:text-slate-100"
                                            />
                                            <input
                                                required
                                                type="number"
                                                min="1"
                                                placeholder="Quantity"
                                                value={item.quantity}
                                                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm text-slate-900 dark:text-slate-100"
                                            />
                                            <input
                                                required
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                placeholder="Weight (kg)"
                                                value={item.weight}
                                                onChange={(e) => updateItem(index, 'weight', e.target.value)}
                                                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm text-slate-900 dark:text-slate-100"
                                            />
                                        </div>
                                        {formData.items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-1"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Estimated Cost */}
                        {formData.service && (
                            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="text-primary-600 dark:text-primary-400" size={20} />
                                        <span className="font-medium text-slate-900 dark:text-slate-100">Estimated Cost</span>
                                    </div>
                                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                        {formatAmount(calculateCost())}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating...' : 'Create Shipment'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AddShipmentDialog;

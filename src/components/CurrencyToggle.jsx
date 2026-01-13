import React from 'react';
import { DollarSign } from 'lucide-react';
import useCurrencyStore from '../store/useCurrencyStore';

const CurrencyToggle = () => {
    const { currency, setCurrency } = useCurrencyStore();

    return (
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    currency === 'USD'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
            >
                USD
            </button>
            <button
                onClick={() => setCurrency('RWF')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    currency === 'RWF'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
            >
                RWF
            </button>
        </div>
    );
};

export default CurrencyToggle;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCurrencyStore = create(
    persist(
        (set) => ({
            currency: 'USD', // 'USD' | 'RWF'
            exchangeRate: 1300, // 1 USD = 1300 RWF (approximate)

            setCurrency: (currency) => set({ currency }),
            
            formatAmount: (amount) => {
                const state = useCurrencyStore.getState();
                if (state.currency === 'RWF') {
                    return `${(amount * state.exchangeRate).toLocaleString('en-US', { maximumFractionDigits: 0 })} RWF`;
                }
                return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            },

            convertAmount: (amount, toCurrency) => {
                const state = useCurrencyStore.getState();
                if (toCurrency === 'RWF' && state.currency === 'USD') {
                    return amount * state.exchangeRate;
                }
                if (toCurrency === 'USD' && state.currency === 'RWF') {
                    return amount / state.exchangeRate;
                }
                return amount;
            }
        }),
        {
            name: 'currency-storage'
        }
    )
);

export default useCurrencyStore;

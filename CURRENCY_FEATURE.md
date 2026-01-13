# 💱 Currency Feature - USD & RWF Support

## Overview

The TMS now supports **dual currency** functionality, allowing users to switch between **USD (US Dollars)** and **RWF (Rwandan Francs)** throughout the application.

## Features

### ✅ Currency Toggle
- Easy-to-use currency switcher
- Available in multiple locations:
  - Client layout (top navigation)
  - Admin layout (sidebar & mobile drawer)
  - Mobile header

### ✅ Automatic Conversion
- Real-time currency conversion
- Exchange rate: 1 USD = 1300 RWF (configurable)
- Automatic formatting based on selected currency

### ✅ Persistent Storage
- Currency preference saved to browser
- Persists across sessions
- Uses Zustand with localStorage

### ✅ Smart Formatting
- USD: `$1,234.56` (2 decimal places)
- RWF: `1,604,800 RWF` (no decimal places)

## Implementation

### New Files Created

#### 1. **src/store/useCurrencyStore.js**
Zustand store for currency management:
```javascript
const useCurrencyStore = create(
    persist(
        (set) => ({
            currency: 'USD', // 'USD' | 'RWF'
            exchangeRate: 1300,
            setCurrency: (currency) => set({ currency }),
            formatAmount: (amount) => { /* ... */ },
            convertAmount: (amount, toCurrency) => { /* ... */ }
        }),
        { name: 'currency-storage' }
    )
);
```

#### 2. **src/components/CurrencyToggle.jsx**
UI component for currency switching:
```javascript
<button onClick={() => setCurrency('USD')}>USD</button>
<button onClick={() => setCurrency('RWF')}>RWF</button>
```

### Updated Files

#### 1. **src/layouts/ClientLayout.jsx**
- Added CurrencyToggle in desktop navigation
- Added CurrencyToggle in mobile drawer
- Added CurrencyToggle in footer

#### 2. **src/layouts/AdminLayout.jsx**
- Added CurrencyToggle in sidebar
- Added CurrencyToggle in mobile header
- Added CurrencyToggle in mobile drawer

#### 3. **src/pages/ClientDashboard.jsx**
- Updated "Total Spent" to use `formatAmount()`
- Dynamic currency display

#### 4. **src/pages/AdminDashboard.jsx**
- Updated "Total Revenue" to use `formatAmount()`
- Dynamic currency display

#### 5. **src/pages/Customers.jsx**
- Updated "Total Spent" in customer cards
- Updated "Total Spent" in customer detail modal
- Dynamic currency display

## Usage

### For Developers

#### Import the store:
```javascript
import useCurrencyStore from '../store/useCurrencyStore';
```

#### Format amounts:
```javascript
const { formatAmount } = useCurrencyStore();
const formatted = formatAmount(1000); // "$1,000.00" or "1,300,000 RWF"
```

#### Convert amounts:
```javascript
const { convertAmount } = useCurrencyStore();
const rwf = convertAmount(100, 'RWF'); // 130000
const usd = convertAmount(130000, 'USD'); // 100
```

#### Get current currency:
```javascript
const { currency } = useCurrencyStore();
console.log(currency); // 'USD' or 'RWF'
```

### For Users

1. **Desktop**: Click USD/RWF toggle in top navigation
2. **Mobile**: Click USD/RWF toggle in drawer menu
3. **Admin**: Click USD/RWF toggle in sidebar or drawer
4. **Preference**: Automatically saved and persists

## Exchange Rate

**Current Rate**: 1 USD = 1300 RWF

### To Update Exchange Rate:
Edit `src/store/useCurrencyStore.js`:
```javascript
exchangeRate: 1300, // Change this value
```

## Formatting Examples

### USD Format
- `$1,000.00`
- `$5,250.00`
- `$150.00`

### RWF Format
- `1,300,000 RWF`
- `6,825,000 RWF`
- `195,000 RWF`

## Pages with Currency Support

✅ **Client Dashboard**
- Total Spent amount

✅ **Admin Dashboard**
- Total Revenue amount

✅ **Customers Page**
- Customer total spent (grid view)
- Customer total spent (detail modal)

## Future Enhancements

- [ ] Add more currencies (EUR, GBP, etc.)
- [ ] Real-time exchange rate API integration
- [ ] Currency symbol customization
- [ ] Locale-specific formatting
- [ ] Currency history tracking
- [ ] Multi-currency transactions

## Technical Details

### Storage
- Uses Zustand `persist` middleware
- Stored in browser localStorage
- Key: `currency-storage`

### Performance
- Minimal re-renders
- Efficient state updates
- No external API calls (unless configured)

### Compatibility
- Works on all modern browsers
- Mobile-friendly
- Responsive design

## Testing

### Test Currency Toggle
1. Click USD/RWF button
2. Verify amounts update
3. Refresh page
4. Verify preference persists

### Test Formatting
- USD: Should show `$` and 2 decimals
- RWF: Should show `RWF` and no decimals

### Test Conversion
- Switch currencies
- Verify amounts convert correctly
- Check exchange rate accuracy

## Configuration

### Change Default Currency
Edit `src/store/useCurrencyStore.js`:
```javascript
currency: 'RWF', // Default to RWF instead of USD
```

### Change Exchange Rate
Edit `src/store/useCurrencyStore.js`:
```javascript
exchangeRate: 1350, // Update to new rate
```

### Add New Currency
1. Update store with new currency option
2. Add formatting logic
3. Update CurrencyToggle component
4. Add to all relevant pages

## Troubleshooting

### Currency not persisting
- Clear browser cache
- Check localStorage is enabled
- Verify Zustand persist middleware

### Amounts not formatting correctly
- Check exchange rate value
- Verify formatAmount() is being called
- Check currency store is imported

### Toggle not appearing
- Verify CurrencyToggle component is imported
- Check component is placed in correct location
- Verify CSS classes are applied

## Support

For issues or questions about the currency feature:
1. Check this documentation
2. Review store implementation
3. Check component usage
4. Verify page integration

---

**Version**: 1.0.0  
**Status**: ✅ COMPLETE  
**Last Updated**: 2024

The currency feature is fully integrated and ready to use! 💱

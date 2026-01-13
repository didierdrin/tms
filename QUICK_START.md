# TMS Quick Start Guide

## ⚡ Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The app opens at `http://localhost:3000`

### 3. Test the Application

#### As a Client:
1. Click "Sign In" or go to `/login`
2. Use credentials:
   - Email: `client@tms.com`
   - Password: `client123`
3. Explore: Services → Track → Dashboard

#### As an Admin:
1. Go to `/login`
2. Use credentials:
   - Email: `admin@tms.com`
   - Password: `admin123`
3. Access: `/admin/dashboard`

### 4. Explore Features

**Client Features:**
- 🏠 Landing page with features overview
- 📦 Services catalog
- 🔍 Shipment tracking
- 📊 Personal dashboard
- 💬 Contact form

**Admin Features:**
- 📈 Analytics dashboard
- 🚚 Shipment management
- 👥 Customer management
- 📋 Document generation
- 🗺️ Live tracking map

## 🎨 Customize

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
primary: {
  50: '#f0f9ff',
  // ... change to your brand color
}
```

### Update Company Info
Edit `src/pages/Landing.jsx` and `src/layouts/ClientLayout.jsx`:
- Company name
- Contact information
- Services list

### Modify Demo Data
Edit store files in `src/store/`:
- `useShipmentStore.js` - Sample shipments
- `useCustomerStore.js` - Sample customers

## 📱 Test Responsive Design

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1920px

## 🌙 Test Dark Mode

Click the moon/sun icon in:
- Top navigation (client)
- Sidebar (admin)
- Footer (client)

## 🔧 Build for Production

```bash
npm run build
```

Creates optimized build in `build/` folder

## 📚 Project Structure Quick Reference

```
src/
├── pages/          ← Add new pages here
├── components/     ← Reusable components
├── store/          ← State management
├── layouts/        ← Page layouts
├── lib/            ← Firebase config
└── utils/          ← Helper functions
```

## 🚀 Next Steps

1. **Customize Branding**
   - Update colors in `tailwind.config.js`
   - Replace logo in `public/`
   - Update company info in pages

2. **Add Real Data**
   - Connect to Firebase Firestore
   - Replace demo data in stores
   - Set up real authentication

3. **Implement Missing Pages**
   - Documents management
   - Analytics dashboard
   - Map integration
   - Settings page

4. **Deploy**
   - Build: `npm run build`
   - Deploy to Firebase Hosting or Vercel

## 🐛 Debug Tips

**Check Console:**
- Open DevTools (F12)
- Look for errors in Console tab
- Check Network tab for API calls

**Firebase Issues:**
- Verify config in `src/lib/firebase.js`
- Check Firestore rules in Firebase Console
- Ensure authentication is enabled

**Styling Issues:**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check Tailwind config

## 📞 Common Commands

```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (one-way, don't do this!)
npm run eject
```

## ✅ Checklist Before Deployment

- [ ] Update company information
- [ ] Customize colors and branding
- [ ] Test all routes and pages
- [ ] Test on mobile devices
- [ ] Test dark mode
- [ ] Verify Firebase configuration
- [ ] Set up proper error handling
- [ ] Add analytics tracking
- [ ] Configure email notifications
- [ ] Set up backup strategy

## 🎯 Key Features to Explore

1. **Authentication System**
   - Email/password login
   - Role-based access (admin/client)
   - Protected routes

2. **State Management**
   - Zustand stores
   - Persistent theme storage
   - Real-time updates

3. **UI Components**
   - Responsive layouts
   - Dark mode support
   - Smooth animations
   - Mobile navigation

4. **Data Management**
   - Firebase Firestore
   - CRUD operations
   - Real-time sync

## 📖 Documentation Files

- `README.md` - Project overview
- `IMPLEMENTATION_GUIDE.md` - Detailed guide
- `COMPLETE_TMS_PROMPT.md` - Full requirements
- `PROJECT_BRIEF.md` - Business requirements

---

**Happy coding! 🚀**

For detailed information, see `IMPLEMENTATION_GUIDE.md`

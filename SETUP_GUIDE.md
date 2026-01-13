# Environment & Configuration Setup

## 🔧 Initial Setup

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager
- Git (optional)
- Modern web browser

### Installation Steps

1. **Navigate to project directory**
```bash
cd tms
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The application will automatically open at `http://localhost:3000`

## 🔑 Firebase Configuration

### Current Setup
Firebase is already configured in `src/lib/firebase.js` with the following credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDX2QSPJaSrdRE3Q-pQG6PzFBgC_d4CZu8",
  authDomain: "transport-management-sys-35720.firebaseapp.com",
  projectId: "transport-management-sys-35720",
  storageBucket: "transport-management-sys-35720.firebasestorage.app",
  messagingSenderId: "215206475609",
  appId: "1:215206475609:web:0aad5cb023571bb2fa3e48",
  measurementId: "G-MGK4DY7CRY"
};
```

### To Use Your Own Firebase Project

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project
   - Enable Authentication (Email/Password)
   - Create Firestore Database
   - Enable Storage

2. **Update Configuration**
   - Copy your Firebase config
   - Replace values in `src/lib/firebase.js`

3. **Set Firestore Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /shipments/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /customers/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. **Set Authentication Rules**
   - Enable Email/Password authentication
   - Configure sign-in methods
   - Set up email templates

## 🎨 Tailwind CSS Configuration

### Current Setup
Tailwind is configured with custom colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        // ... more shades
        600: '#0284c7',
        // ... more shades
      }
    }
  }
}
```

### Customize Colors

1. **Edit `tailwind.config.js`**
```javascript
primary: {
  50: '#your-color-50',
  100: '#your-color-100',
  // ... update all shades
  600: '#your-primary-color',
}
```

2. **Use in Components**
```jsx
<div className="bg-primary-600 text-primary-50">
  Your content
</div>
```

## 🌍 Environment Variables

### Create `.env.local` (Optional)
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Update `src/lib/firebase.js`
```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ... rest of config
};
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "react-router-dom": "^7.12.0",
  "zustand": "^5.0.10",
  "firebase": "^12.7.0",
  "tailwindcss": "^3.4.1",
  "framer-motion": "^12.26.1",
  "lucide-react": "^0.562.0",
  "clsx": "^2.1.1"
}
```

### Install Specific Package
```bash
npm install package-name
```

### Update All Dependencies
```bash
npm update
```

## 🚀 Build Configuration

### Development Build
```bash
npm start
```
- Runs on `http://localhost:3000`
- Hot reload enabled
- Source maps included
- Development warnings shown

### Production Build
```bash
npm run build
```
- Optimized bundle
- Minified code
- Source maps excluded
- Ready for deployment

### Test Build
```bash
npm test
```
- Runs test suite
- Watch mode enabled
- Coverage reports

## 📱 Mobile Testing

### Using Chrome DevTools
1. Open DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select device or custom dimensions
4. Test responsive behavior

### Using Real Device
1. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On mobile, visit: `http://YOUR_IP:3000`
3. Test on actual device

### Recommended Test Devices
- iPhone 12 (390x844)
- iPhone 14 Pro (393x852)
- Samsung Galaxy S21 (360x800)
- iPad (768x1024)
- Desktop (1920x1080)

## 🔍 Debugging

### Browser DevTools
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Use React DevTools extension

### React DevTools Extension
- Install from Chrome Web Store
- Inspect component hierarchy
- Check props and state
- Profile performance

### Firebase Console
- Monitor authentication
- Check Firestore data
- Review storage files
- Check analytics

## 🌙 Dark Mode Testing

### Manual Testing
1. Click theme toggle (moon/sun icon)
2. Verify colors change
3. Check all pages
4. Verify persistence (refresh page)

### System Preference
- Windows: Settings → Personalization → Colors
- Mac: System Preferences → General → Appearance
- Linux: Varies by desktop environment

## 📊 Performance Testing

### Lighthouse Audit
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Review recommendations

### Performance Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

## 🔐 Security Checklist

- [ ] Firebase rules configured
- [ ] Authentication enabled
- [ ] HTTPS enabled (production)
- [ ] Environment variables secured
- [ ] No sensitive data in code
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CORS configured

## 📝 Code Style

### ESLint Configuration
Already configured in `package.json`:
```json
"eslintConfig": {
  "extends": ["react-app", "react-app/jest"]
}
```

### Format Code
```bash
npm run format
```

### Check Linting
```bash
npm run lint
```

## 🚢 Deployment Checklist

- [ ] Build passes without errors
- [ ] All tests pass
- [ ] No console warnings
- [ ] Lighthouse score > 90
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Authentication works
- [ ] Database connected

## 🔄 Continuous Integration

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm test
```

## 📚 Useful Resources

### Documentation
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion)

### Tools
- [VS Code](https://code.visualstudio.com)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools)
- [Firebase Console](https://console.firebase.google.com)
- [Tailwind Play](https://play.tailwindcss.com)

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Firebase Connection Error
- Check internet connection
- Verify Firebase config
- Check Firestore rules
- Review Firebase console

### Styling Not Applied
- Clear browser cache
- Restart dev server
- Check Tailwind config
- Verify class names

## 📞 Support

For issues:
1. Check documentation files
2. Review Firebase console
3. Check browser console
4. Review network requests
5. Contact development team

---

**Setup Complete!** 🎉

Your TMS application is ready to use. Start with `npm start` and explore the features!

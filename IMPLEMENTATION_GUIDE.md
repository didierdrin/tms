# Transport Management System (TMS)

A modern, full-featured Transport Management System built with React, Zustand, Tailwind CSS, and Firebase. Designed for ITO East Africa Ltd to streamline logistics operations with real-time tracking, automated documentation, and comprehensive fleet management.

## 🚀 Features

### Client-Side Features
- **User Authentication**: Email/password registration and login
- **Real-time Shipment Tracking**: Track shipments with live GPS updates
- **Service Browsing**: Explore available logistics services
- **Dashboard**: View active shipments, completed deliveries, and account balance
- **Responsive Design**: Mobile-first approach with bottom navigation on mobile
- **Light/Dark Mode**: Theme toggle for user preference

### Admin-Side Features
- **Admin Dashboard**: Comprehensive analytics and KPIs
- **Shipment Management**: Create, view, edit, and delete shipments
- **Customer Management**: Manage customer profiles and history
- **Real-time Analytics**: Performance metrics and reporting
- **Role-based Access Control**: Secure admin-only routes
- **Collapsible Sidebar**: Desktop navigation with mobile drawer

### Core Functionality
- **Firebase Integration**: Real-time database and authentication
- **Base64 Image Storage**: Convert images to base64 for storage
- **Responsive UI**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Framer Motion for polished interactions
- **State Management**: Zustand for efficient state handling

## 📋 System Requirements

- Node.js 14+ 
- npm or yarn
- Modern web browser

## 🔧 Installation

1. **Clone the repository**
```bash
cd tms
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
The Firebase configuration is already included in `src/lib/firebase.js`. No additional setup needed.

4. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PrivateRoute.jsx
│   └── ThemeToggle.jsx
├── layouts/            # Layout components
│   ├── AdminLayout.jsx
│   └── ClientLayout.jsx
├── lib/                # External library configs
│   └── firebase.js
├── pages/              # Page components
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Services.jsx
│   ├── Track.jsx
│   ├── Contact.jsx
│   ├── ClientDashboard.jsx
│   ├── AdminDashboard.jsx
│   ├── Shipments.jsx
│   └── Customers.jsx
├── store/              # Zustand stores
│   ├── useAuthStore.js
│   ├── useShipmentStore.js
│   ├── useCustomerStore.js
│   ├── useThemeStore.js
│   └── useUIStore.js
├── utils/              # Utility functions
│   └── imageHelper.js
├── App.js              # Main app component
└── index.js            # Entry point
```

## 🔐 Authentication

### Demo Credentials (for testing)

**Admin Account:**
- Email: `admin@tms.com`
- Password: `admin123`

**Client Account:**
- Email: `client@tms.com`
- Password: `client123`

### Authentication Flow
1. Users register with email and password
2. Firebase handles authentication
3. User profiles stored in Firestore
4. Role-based access control (admin/client)
5. Protected routes redirect unauthorized users

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Primary blue with slate neutrals
- **Typography**: Clean, modern sans-serif
- **Spacing**: Consistent 4px grid system
- **Shadows**: Subtle depth with shadow layers
- **Animations**: Smooth transitions with Framer Motion

### Responsive Breakpoints
- Mobile: < 768px (bottom navigation, drawer menu)
- Tablet: 768px - 1024px (adaptive layout)
- Desktop: > 1024px (full sidebar, expanded views)

### Dark Mode
- System preference detection
- Manual toggle in navigation
- Persistent storage with Zustand
- Smooth transitions between themes

## 📊 Data Management

### Zustand Stores

**useAuthStore**
- User authentication state
- Profile management
- Role-based access

**useShipmentStore**
- Shipment CRUD operations
- Real-time tracking data
- Status management

**useCustomerStore**
- Customer profiles
- Transaction history
- Account management

**useThemeStore**
- Light/dark mode preference
- Persistent storage

**useUIStore**
- Sidebar collapse state
- Mobile menu state
- UI interactions

## 🖼️ Image Handling

### Image Helper Utilities
```javascript
// Convert image to base64
const base64 = await fileToBase64(file);

// Compress before conversion
const compressed = await compressAndConvertToBase64(file, 800, 800, 0.8);

// Validate image
const validation = validateImageFile(file, 5); // 5MB max
```

### Supported Formats
- JPEG
- PNG
- GIF
- WebP

## 🗺️ Mapping Integration

The system is ready for mapping integration using:
- **Leaflet**: Lightweight mapping library
- **OpenStreetMap**: Free mapping tiles
- **Location**: Kigali, Rwanda as base location

## 📱 Mobile Optimization

### Mobile Features
- Bottom navigation bar
- Drawer menu for navigation
- Touch-friendly buttons
- Optimized form inputs
- Responsive images
- Safe area padding

### Mobile Navigation
- Home, Services, Track, Contact in bottom nav
- Account/Login in bottom nav
- Drawer menu for additional options

## 🔄 API Integration

### Firebase Services Used
- **Authentication**: Email/password auth
- **Firestore**: Real-time database
- **Storage**: File storage (configured)

### Data Collections
- `users`: User profiles and roles
- `shipments`: Shipment records
- `customers`: Customer information

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Eject configuration (one-way operation)
npm run eject
```

## 📦 Dependencies

### Core
- **react**: UI library
- **react-router-dom**: Routing
- **zustand**: State management
- **firebase**: Backend services

### UI/UX
- **tailwindcss**: Utility-first CSS
- **framer-motion**: Animations
- **lucide-react**: Icon library
- **clsx**: Conditional classnames

### Utilities
- **leaflet**: Mapping library
- **react-leaflet**: React wrapper for Leaflet

## 🔒 Security Features

- Email/password authentication
- Role-based access control
- Protected routes
- Secure Firebase rules
- Input validation
- XSS protection with React

## 📈 Performance Optimization

- Code splitting with React Router
- Lazy loading of components
- Image compression utilities
- Optimized re-renders with Zustand
- CSS minification with Tailwind

## 🐛 Troubleshooting

### Common Issues

**Firebase Connection Error**
- Verify Firebase config in `src/lib/firebase.js`
- Check internet connection
- Ensure Firebase project is active

**Authentication Issues**
- Clear browser cache
- Check email/password credentials
- Verify user role in Firestore

**Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.js`
- Rebuild CSS with `npm start`

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review Firebase console
3. Check browser console for errors
4. Contact development team

## 📄 License

This project is proprietary software for ITO East Africa Ltd.

## 🎯 Future Enhancements

- [ ] SMS/Email notifications
- [ ] Advanced analytics dashboard
- [ ] Document generation (PDF)
- [ ] Payment integration
- [ ] Multi-language support
- [ ] API documentation
- [ ] Mobile app (React Native)
- [ ] Advanced mapping features
- [ ] Automated reporting
- [ ] Integration with logistics APIs

## 👥 Team

Developed for ITO East Africa Ltd - Streamlining Logistics Operations

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready

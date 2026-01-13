# Transport Management System (TMS) - Complete Development Prompt

## Project Overview
Create a modern, responsive **Transport Management System (TMS)** for **ITO East Africa Ltd.** using React.js. This system optimizes logistics and transportation operations including import clearance, inland/ocean transport coordination, storage management, and automated document handling with real-time shipment tracking.

---

## Technology Stack

### Core Technologies
- **Frontend Framework**: React.js (functional components with hooks)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Backend/Database**: Firebase (Firestore, Authentication, Analytics)
- **Maps Integration**: Free mapping API (Leaflet with OpenStreetMap or similar)
  - Base location: **Kigali, Rwanda** (Coordinates: -1.9441, 30.0619)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx for conditional classes

### Key Technical Requirements
1. **Image Handling**: Convert all images to Base64 strings and store in Firebase as text
2. **Authentication**: Firebase Auth with email/password only (admin side)
3. **Responsive Design**: 
   - Mobile-first approach
   - Desktop: Professional dashboard with collapsible sidebar
   - Mobile: Drawer navigation + bottom navigation bar
4. **Theme Support**: Full light/dark mode with smooth transitions

---

## System Architecture

### Dual Interface System
The application runs on a **single site** with two distinct interfaces:

#### 1. **Client-Side Interface** (`/`)
- **Public Access**: Users can browse the platform without login
- **Authentication Required**: Login needed to request services or track shipments
- Features:
  - Landing page with service overview
  - Service request forms
  - Shipment tracking (with login)
  - Contact/support pages
  - Quote request system
  - Real-time shipment status updates

#### 2. **Admin-Side Interface** (`/admin`)
- **Protected**: Requires email/password authentication
- Features:
  - Comprehensive dashboard with analytics
  - Customer management
  - Supplier coordination
  - Shipment/transport management
  - Document generation and management
  - Real-time tracking map
  - Analytics and reporting
  - Settings and user management

---

## Core Modules & Features

### Module 1: Customer Management
**Client Side:**
- User registration and profile management
- Service request submission
- Shipment tracking dashboard
- Document access (invoices, receipts)
- Communication history

**Admin Side:**
- Customer profiles with complete history
- Request management and approval
- Customer analytics and insights
- Communication tools (email/SMS notifications)

### Module 2: Supplier Management
**Admin Side:**
- Supplier/manpower coordination
- Storage facility management
- Transport agent assignment
- Performance tracking
- Cost management

### Module 3: Shipment Tracking
**Client Side:**
- Real-time shipment location on map (Kigali-based)
- Delivery status timeline
- Estimated arrival times
- Push notifications for status changes

**Admin Side:**
- Fleet management dashboard
- Real-time vehicle tracking on map
- Route optimization
- Delivery assignment and scheduling
- Live status updates

### Module 4: Document Management
**Admin Side:**
- Automated generation of:
  - Invoices
  - Receipts
  - Quotations
  - Cover letters
  - Customs documentation
- Secure cloud storage
- Document versioning
- PDF generation and export
- Search and retrieval system

### Module 5: Analytics & Reporting
**Admin Side:**
- Performance dashboards with charts
- Cost analysis and trends
- Operational efficiency metrics
- Revenue tracking
- Custom report generation
- Data export capabilities

### Module 6: Admin Control Panel
**Admin Side:**
- User role management (RBAC)
- System settings
- Security configurations
- Database backups
- Audit logs
- Email/SMS templates

---

## UI/UX Design Requirements

### Design Philosophy
- **Modern & Sleek**: Contemporary design with smooth animations
- **Professional**: Business-grade interface suitable for logistics operations
- **Intuitive**: Easy navigation with clear information hierarchy

### Layout Structure

#### Desktop (≥1024px)
```
┌─────────────────────────────────────────┐
│  [Sidebar]  │     Main Content          │
│             │                            │
│  Logo       │   Header Bar              │
│             │   ┌──────────────────┐   │
│  Nav Items  │   │                  │   │
│  - Dash     │   │   Page Content   │   │
│  - Ships    │   │                  │   │
│  - Cust     │   │                  │   │
│  - Docs     │   └──────────────────┘   │
│  - Map      │                            │
│  - Analytics│   Footer                  │
│             │                            │
│  [Collapse] │                            │
│  [Theme]    │                            │
│  [Logout]   │                            │
└─────────────────────────────────────────┘
```

#### Mobile (≤768px)
```
┌───────────────────┐
│  Header Bar       │
│  [Logo]  [Menu]   │
├───────────────────┤
│                   │
│   Page Content    │
│                   │
│                   │
├───────────────────┤
│  Bottom Nav Bar   │
│ [🏠][📦][📄][👤] │
└───────────────────┘
```

### Navigation Components

#### Admin Sidebar (Desktop)
- Collapsible sidebar (260px → 80px)
- Animated collapse with icon-only mode
- Active state highlighting
- Smooth transitions
- Sticky positioning

#### Admin Mobile Navigation
- **Drawer**: Slide-in from right (triggered by hamburger menu)
- **Bottom Bar**: Fixed navigation with 4-5 key items
- Gesture support for smooth interactions

#### Client Navigation
- **Desktop**: Horizontal navbar with transparent/glass effect
- **Mobile**: Hamburger menu + bottom navigation
- Smooth scroll behavior
- Sticky header

### Theme System
- Toggle switch in navbar/sidebar
- Persist preference in localStorage
- Smooth color transitions (300ms)
- Dark mode optimized for OLED screens
- Consistent color palette across themes

#### Color Palette (suggested)
```css
/* Light Mode */
- Primary: Blue (#3B82F6)
- Background: Slate-50 (#F8FAFC)
- Surface: White (#FFFFFF)
- Text: Slate-900 (#0F172A)

/* Dark Mode */
- Primary: Blue-400 (#60A5FA)
- Background: Slate-950 (#020617)
- Surface: Slate-900 (#0F172A)
- Text: Slate-100 (#F1F5F9)
```

---

## Firebase Integration

### Firebase Configuration
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

### Firestore Collections Structure
```
/users
  /{userId}
    - email
    - role (admin/client)
    - profile data
    - createdAt

/customers
  /{customerId}
    - name, contact, address
    - shipments[]
    - documents[]

/shipments
  /{shipmentId}
    - customerId
    - status
    - origin, destination
    - currentLocation (lat, lng)
    - estimatedArrival
    - trackingHistory[]
    - assignedVehicle

/vehicles
  /{vehicleId}
    - plateNumber
    - type
    - currentLocation
    - status
    - driverId

/documents
  /{documentId}
    - type (invoice/receipt/quote)
    - customerId
    - shipmentId
    - data
    - pdfBase64
    - createdAt

/suppliers
  /{supplierId}
    - name, contact
    - services[]
    - performanceMetrics

/notifications
  /{notificationId}
    - userId
    - type
    - message
    - read
    - createdAt
```

### Authentication Flow
1. **Admin**: Email/password only via Firebase Auth
2. **Client**: Email/password registration with email verification
3. **Route Protection**: PrivateRoute component for admin pages
4. **Session Management**: Firebase Auth state persistence

---

## Map Integration

### Requirements
- **Library**: Leaflet.js with react-leaflet
- **Tile Provider**: OpenStreetMap (free)
- **Base Location**: Kigali, Rwanda (-1.9441, 30.0619)
- **Features**:
  - Real-time vehicle markers
  - Route polylines
  - Shipment origin/destination markers
  - Custom markers for warehouses
  - Popup information cards
  - Zoom controls
  - Geolocation support

### Map Components
1. **Admin Map View** (`/admin/map`)
   - All active shipments
   - Fleet locations
   - Warehouse locations
   - Click markers for details

2. **Client Tracking Map**
   - Individual shipment tracking
   - Estimated route
   - Current status

---

## State Management (Zustand)

### Store Structure
```javascript
// authStore.js
{
  user: null,
  loading: false,
  login: (email, password) => {},
  logout: () => {},
  register: (data) => {}
}

// themeStore.js
{
  theme: 'light',
  toggleTheme: () => {}
}

// shipmentStore.js
{
  shipments: [],
  activeShipment: null,
  fetchShipments: () => {},
  updateShipmentLocation: () => {},
  createShipment: () => {}
}

// customerStore.js
{
  customers: [],
  selectedCustomer: null,
  fetchCustomers: () => {},
  createCustomer: () => {}
}

// uiStore.js
{
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  toggleSidebar: () => {},
  toggleMobileMenu: () => {}
}
```

---

## Key Implementation Details

### Image Handling
```javascript
// Convert image to Base64
const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Store in Firestore as string
await setDoc(doc(db, 'documents', docId), {
  imageBase64: base64String
});
```

### Responsive Sidebar
```javascript
// Desktop: Collapsible
<motion.aside
  animate={{ width: collapsed ? 80 : 260 }}
  className="hidden md:flex"
>
  {/* Sidebar content */}
</motion.aside>

// Mobile: Drawer
<motion.div
  initial={{ x: '100%' }}
  animate={{ x: mobileMenuOpen ? 0 : '100%' }}
  className="fixed inset-y-0 right-0 md:hidden"
>
  {/* Drawer content */}
</motion.div>

// Mobile: Bottom Nav
<nav className="md:hidden fixed bottom-0 w-full">
  {/* Bottom nav items */}
</nav>
```

### Real-time Updates
```javascript
// Listen to shipment location updates
useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, 'shipments'), 
    (snapshot) => {
      // Update state with new data
    }
  );
  return () => unsubscribe();
}, []);
```

---

## Page Components to Build

### Client Pages
1. **Landing Page** (`/`)
   - Hero section with CTA
   - Services overview
   - Features highlights
   - Contact form

2. **Services Page** (`/services`)
   - Detailed service listings
   - Request quote button

3. **Track Shipment** (`/track`)
   - Search by tracking number
   - Map display
   - Status timeline

4. **Login/Register** (`/login`, `/register`)
   - Form with validation
   - Social auth (optional)

5. **Client Dashboard** (`/dashboard`)
   - Active shipments
   - Recent documents
   - Quick actions

### Admin Pages
1. **Dashboard** (`/admin/dashboard`)
   - KPI cards
   - Charts (Recharts)
   - Recent activity

2. **Shipments** (`/admin/shipments`)
   - Table with filters
   - Create/edit forms
   - Status management

3. **Customers** (`/admin/customers`)
   - Customer list
   - Profile views
   - Communication tools

4. **Documents** (`/admin/documents`)
   - Document generator
   - Template manager
   - Archive

5. **Map View** (`/admin/map`)
   - Real-time tracking
   - Fleet overview

6. **Analytics** (`/admin/analytics`)
   - Performance charts
   - Reports generation
   - Export tools

7. **Settings** (`/admin/settings`)
   - User management
   - System preferences
   - Security

---

## Development Checklist

### Phase 1: Foundation
- [ ] Setup React project with Tailwind CSS
- [ ] Configure Firebase
- [ ] Create Zustand stores
- [ ] Build layout components (Admin/Client)
- [ ] Implement routing
- [ ] Setup theme system

### Phase 2: Authentication
- [ ] Firebase Auth integration
- [ ] Login/Register pages
- [ ] Protected routes
- [ ] Auth state management

### Phase 3: Core Features
- [ ] Customer management
- [ ] Shipment CRUD
- [ ] Map integration
- [ ] Document generation
- [ ] Real-time updates

### Phase 4: UI Polish
- [ ] Responsive design refinement
- [ ] Animations and transitions
- [ ] Loading states
- [ ] Error handling
- [ ] Form validation

### Phase 5: Advanced Features
- [ ] Analytics dashboard
- [ ] Notifications system
- [ ] Search functionality
- [ ] Data export
- [ ] Performance optimization

---

## Expected Outcomes

✅ **Streamlined Operations**: Centralized platform reducing manual coordination  
✅ **Real-time Visibility**: Live tracking with accurate ETAs  
✅ **Automation**: Reduced paperwork errors through automated document generation  
✅ **Enhanced Communication**: Integrated notification system keeping all stakeholders informed  
✅ **Data-Driven Decisions**: Analytics providing insights for optimization  
✅ **Professional Experience**: Modern, responsive UI across all devices  
✅ **Secure & Scalable**: Firebase-backed infrastructure with proper authentication

---

## Design Guidelines

### Typography
- Headings: Bold, clear hierarchy
- Body: Readable (16px minimum on mobile)
- Font: System fonts or Inter/Roboto

### Spacing
- Consistent padding/margins (4px grid)
- Generous whitespace
- Card-based layouts

### Interactions
- Hover effects on clickable elements
- Loading skeletons
- Success/error feedback
- Smooth page transitions

### Accessibility
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Focus indicators

---

## Performance Considerations
- Lazy load routes
- Image optimization (Base64 with compression)
- Debounced search inputs
- Virtualized long lists
- Memoized components
- Firebase query optimization (indexes, pagination)

---

## Success Metrics
- Page load time < 2s
- Mobile responsive score: 95+
- Lighthouse performance: 90+
- Zero console errors
- Support all modern browsers (Chrome, Firefox, Safari, Edge)

---

**Build this system with production-quality code, proper error handling, and comprehensive documentation. Ensure the UI is modern, sleek, and professional - suitable for a logistics company serving enterprise clients.**

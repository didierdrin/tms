# Transport Management System (TMS) - Project Brief

## Overview
Develop a **Transport Management System (TMS)** web application for **ITO East Africa Ltd** to streamline logistics, import clearance, transport coordination, and document handling.

## Tech Stack
- **Frontend**: React.js (v19)
- **State Management**: Zustand
- **Styling**: TailwindCSS (Custom configuration for premium look)
- **Backend/Data**: Firebase (Firestore, Auth)
- **Maps**: Leaflet / React-Leaflet (OpenStreetMap)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Core Requirements

### Design & UX
- **Aesthetic**: Modern, sleek, "Pro" dashboard look.
- **Responsiveness**: Mobile-first approach.
  - *Desktop*: Collapsible sidebar navigation.
  - *Mobile*: Bottom navigation bar + Drawer.
- **Theming**: Full Light/Dark mode support.
- **Visuals**: Vibrant colors, glassmorphism effects, dynamic micro-animations.

### Authentication & Roles
- **Admin**: Email/Password login via Firebase. Full access to control panel.
- **Client**:
  - Unauthenticated: Can view the landing/home platform.
  - Authenticated: Required to request services or view private data.

### Features
1. **Map Integration**: 
   - Use Free API (OpenStreetMap).
   - Base location: **Kigali, Rwanda** (1°57' S, 30°04' E).
   - Visualize products and routes.
2. **Image Handling**:
   - Convert images to **Base64** strings and store directly in the database (as per specific constraint).
3. **Modules**:
   - **Customer Management**: Profiles, requests, communication.
   - **Supplier Management**: Manpower, storage, transport.
   - **Shipment Tracking**: Real-time status updates.
   - **Document Management**: Automated Invoices, Receipts, Quotations.
   - **Analytics**: Performance and cost monitoring dashboards.

## Implementation Steps
1. **Setup**: Initialize React with Tailwind, Zustand, Firebase.
2. **Routing**: Configure Client vs Admin routes (`/`, `/login`, `/admin/*`, `/dashboard/*`).
3. **Store**: Create Zustand stores for Auth, Shipments, Notification.
4. **UI Components**: Build reusable, styled components (Cards, Inputs, Sidebar, Maps).
5. **Integration**: Connect Firebase Auth and Firestore.

## Objective
Deliver a high-performance, visually stunning application that automates logistics and provides real-time insights for ITO East Africa Ltd.

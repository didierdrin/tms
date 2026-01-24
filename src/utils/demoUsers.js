/**
 * Demo Users Setup Utility
 * 
 * This file contains instructions for setting up demo users.
 * These users need to be created in Firebase Authentication and Firestore.
 * 
 * IMPORTANT: You must create these users manually in Firebase Console
 * or use the registration page and then update their roles in Firestore.
 */

// Demo User Credentials
export const DEMO_USERS = {
    admin: {
        email: 'admin@tms.com',
        password: 'admin123',
        role: 'admin',
        displayName: 'Admin User'
    },
    client: {
        email: 'client@tms.com',
        password: 'client123',
        role: 'client',
        displayName: 'Client User'
    }
};

/**
 * Setup Instructions:
 * 
 * 1. Go to Firebase Console: https://console.firebase.google.com
 * 2. Select your project: transport-management-sys-35720
 * 
 * 3. Enable Email/Password Authentication:
 *    - Go to Authentication → Sign-in method
 *    - Enable "Email/Password"
 *    - Save
 * 
 * 4. Create Admin User:
 *    - Go to Authentication → Users
 *    - Click "Add user"
 *    - Email: admin@tms.com
 *    - Password: admin123
 *    - Click "Add user"
 *    - Copy the User UID
 * 
 * 5. Set Admin Role in Firestore:
 *    - Go to Firestore Database
 *    - Create collection: "users"
 *    - Add document with ID = User UID from step 4
 *    - Add fields:
 *      {
 *        email: "admin@tms.com",
 *        role: "admin",
 *        displayName: "Admin User",
 *        createdAt: [current timestamp]
 *      }
 * 
 * 6. Create Client User:
 *    - Go to Authentication → Users
 *    - Click "Add user"
 *    - Email: client@tms.com
 *    - Password: client123
 *    - Click "Add user"
 *    - Copy the User UID
 * 
 * 7. Set Client Role in Firestore:
 *    - Go to Firestore Database → users collection
 *    - Add document with ID = User UID from step 6
 *    - Add fields:
 *      {
 *        email: "client@tms.com",
 *        role: "client",
 *        displayName: "Client User",
 *        createdAt: [current timestamp]
 *      }
 * 
 * 8. Test Login:
 *    - Admin: admin@tms.com / admin123 → Should go to /admin/dashboard
 *    - Client: client@tms.com / client123 → Should go to /dashboard
 * 
 * Alternative Method:
 * 
 * 1. Register via the app at /register
 * 2. Use the demo credentials
 * 3. Go to Firebase Console → Firestore
 * 4. Find the user document
 * 5. Change the "role" field to "admin" for admin user
 * 
 * Firestore Rules (Development):
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /{document=**} {
 *       allow read, write: if true; // Development only!
 *     }
 *   }
 * }
 * 
 * Note: Change to proper rules for production!
 */

// Helper function to check if demo users exist (for debugging)
export const checkDemoUsers = async () => {
    console.log('Demo Users Configuration:');
    console.log('Admin:', DEMO_USERS.admin.email);
    console.log('Client:', DEMO_USERS.client.email);
    console.log('\nThese users must be created in Firebase Console.');
    console.log('See DEMO_USERS_SETUP.md for detailed instructions.');
};

export default DEMO_USERS;

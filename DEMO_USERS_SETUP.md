# 🔐 Demo Users Setup Guide

## Issue
The demo credentials shown in the login page don't exist in Firebase yet. You need to create them first.

## Solution Options

### Option 1: Create Users via Firebase Console (Recommended)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Select your project: `transport-management-sys-35720`

2. **Create Admin User**
   - Go to Authentication → Users
   - Click "Add user"
   - Email: `admin@tms.com`
   - Password: `admin123`
   - Click "Add user"

3. **Set Admin Role in Firestore**
   - Go to Firestore Database
   - Create collection: `users`
   - Add document with ID matching the user's UID
   - Add fields:
     ```
     email: "admin@tms.com"
     role: "admin"
     displayName: "Admin User"
     createdAt: [current timestamp]
     ```

4. **Create Client User**
   - Go to Authentication → Users
   - Click "Add user"
   - Email: `client@tms.com`
   - Password: `client123`
   - Click "Add user"

5. **Set Client Role in Firestore**
   - Go to Firestore Database → users collection
   - Add document with ID matching the user's UID
   - Add fields:
     ```
     email: "client@tms.com"
     role: "client"
     displayName: "Client User"
     createdAt: [current timestamp]
     ```

### Option 2: Register via the App

1. **Register Admin User**
   - Go to `/register`
   - Email: `admin@tms.com`
   - Password: `admin123`
   - Submit

2. **Manually Change Role to Admin**
   - Go to Firebase Console → Firestore
   - Find the user document
   - Change `role` field from `"client"` to `"admin"`

3. **Register Client User**
   - Go to `/register`
   - Email: `client@tms.com`
   - Password: `client123`
   - Submit (role will be "client" by default)

### Option 3: Use Your Own Credentials

Simply register with your own email and password, then:
- For admin access: Change role to "admin" in Firestore
- For client access: Keep role as "client" (default)

## Quick Setup Steps

### Step 1: Enable Email/Password Authentication
1. Firebase Console → Authentication
2. Sign-in method tab
3. Enable "Email/Password"
4. Save

### Step 2: Create Firestore Database
1. Firebase Console → Firestore Database
2. Create database
3. Start in test mode (for development)
4. Choose location: closest to Rwanda

### Step 3: Set Firestore Rules (Development)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Development only!
    }
  }
}
```

### Step 4: Create Demo Users
Follow Option 1 or Option 2 above.

## Verify Setup

1. **Test Admin Login**
   - Go to `/login`
   - Email: `admin@tms.com`
   - Password: `admin123`
   - Should redirect to `/admin/dashboard`

2. **Test Client Login**
   - Logout
   - Go to `/login`
   - Email: `client@tms.com`
   - Password: `client123`
   - Should redirect to `/dashboard`

## Troubleshooting

### "User not found" Error
- User doesn't exist in Firebase Authentication
- Create user via Firebase Console or register via app

### "Wrong password" Error
- Password is incorrect
- Reset password or create new user

### Redirects to wrong dashboard
- Check user's role in Firestore
- Should be "admin" or "client"
- Update role field if incorrect

### "Permission denied" Error
- Firestore rules are too restrictive
- Update rules to allow read/write (development)

## Production Setup

For production, use proper Firestore rules:

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

## Alternative: Remove Demo Credentials

If you don't want to create demo users, remove the demo credentials section from Login.jsx:

```javascript
// Remove this section:
<div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-2">
        Demo Credentials (for testing)
    </p>
    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
        <p><strong>Admin:</strong> admin@tms.com / admin123</p>
        <p><strong>Client:</strong> client@tms.com / client123</p>
    </div>
</div>
```

## Summary

✅ **Enable Email/Password auth in Firebase**
✅ **Create Firestore database**
✅ **Set development rules**
✅ **Create demo users** (admin@tms.com & client@tms.com)
✅ **Set roles in Firestore** (admin & client)
✅ **Test login for both users**

Once setup is complete, the demo credentials will work!

---

**Need Help?**
- Check Firebase Console for errors
- Verify authentication is enabled
- Confirm Firestore rules allow access
- Check browser console for error messages

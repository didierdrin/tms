/**
 * Demo Users (Postgres/Neon)
 *
 * Demo users are seeded by the TMS API server on startup (see server/db.js seedDemoUsers).
 * Use these credentials to log in after the server has run at least once.
 */

export const DEMO_USERS = {
  admin: {
    email: 'admin@tms.com',
    password: 'admin123',
    role: 'admin',
    displayName: 'Admin User',
  },
  client: {
    email: 'client@tms.com',
    password: 'client123',
    role: 'client',
    displayName: 'Client User',
  },
};

export const checkDemoUsers = async () => {
  console.log('Demo users (seeded by API server):');
  console.log('Admin:', DEMO_USERS.admin.email);
  console.log('Client:', DEMO_USERS.client.email);
};

export default DEMO_USERS;

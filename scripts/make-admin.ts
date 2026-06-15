import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local manually since this is a standalone script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// ES modules hoist imports, so we must use a dynamic import/require for firebase
// after we ensure dotenv is loaded.


async function makeAdmin(email: string) {
    try {
        console.log(`Looking up user by email: ${email}...`);
        const { auth } = await import('../lib/firebase-admin');
        const user = await auth.getUserByEmail(email);
        
        console.log(`Found user: ${user.uid}. Setting admin claim...`);
        await auth.setCustomUserClaims(user.uid, { admin: true });
        
        console.log(`✅ Success! User ${email} is now an admin.`);
        console.log(`Important: The user must log out and log back in for the changes to take effect.`);
        process.exit(0);
    } catch (error) {
        console.error('Error setting admin claim:', error);
        process.exit(1);
    }
}

// Get the admin email from env or command line args
const targetEmail = process.argv[2] || process.env.ADMIN_EMAIL;

if (!targetEmail) {
    console.error('Please provide an email address or set ADMIN_EMAIL in .env.local');
    console.error('Usage: npx tsx scripts/make-admin.ts <email>');
    process.exit(1);
}

makeAdmin(targetEmail);

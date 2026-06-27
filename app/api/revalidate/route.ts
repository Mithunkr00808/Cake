import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';

const REVALIDATION_SECRET = env.REVALIDATION_SECRET;

// Allowlist of valid cache tags to prevent arbitrary cache purging
const ALLOWED_TAGS = ['products', 'settings'];

export async function POST(request: NextRequest) {
    // 1. Verify shared secret via Bearer token
    const authHeader = request.headers.get('authorization');
    if (!REVALIDATION_SECRET || authHeader !== `Bearer ${REVALIDATION_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { tag, path } = body;

        // 2. Validate tag against allowlist
        if (tag) {
            if (typeof tag !== 'string' || !ALLOWED_TAGS.includes(tag)) {
                return NextResponse.json({ error: 'Invalid tag' }, { status: 400 });
            }
            revalidateTag(tag, 'default');
        }

        // 3. Validate path is a string starting with /
        if (path) {
            if (typeof path !== 'string' || !path.startsWith('/')) {
                return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
            }
            revalidatePath(path, 'page');
        }

        if (!tag && !path) {
            return NextResponse.json({ error: 'Must provide tag or path' }, { status: 400 });
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}

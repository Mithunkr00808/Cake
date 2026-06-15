import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

// In-memory rate limiter (per-instance; use Redis for multi-instance deployments)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5;       // max requests per window
const RATE_WINDOW = 60_000; // 1 minute window

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now - entry.lastReset > RATE_WINDOW) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return true;
    }
    if (entry.count >= RATE_LIMIT) return false;
    entry.count++;
    return true;
}

export async function POST(request: Request) {
    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
        return NextResponse.json(
            { success: false, message: 'Too many requests. Please try again later.' },
            { status: 429 }
        );
    }

    try {
        const body = await request.json();
        
        // Validate with Zod
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { success: false, message: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const { email, message } = result.data;

        // TODO: Integrate with real email service (e.g., SendGrid, Nodemailer)
        // For now, log the submission
        console.log('Contact form submitted:', { email, message });

        return NextResponse.json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.'
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

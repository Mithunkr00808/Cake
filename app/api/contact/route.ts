import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

export async function POST(request: Request) {
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

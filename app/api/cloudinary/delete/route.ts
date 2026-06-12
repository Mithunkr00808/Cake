import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function extractPublicId(url: string) {
    try {
        const parts = url.split('/upload/');
        if (parts.length !== 2) return null;
        
        let path = parts[1];
        
        // Remove version if it exists
        if (path.match(/^v\d+\//)) {
            path = path.replace(/^v\d+\//, '');
        }
        
        // Remove file extension
        const dotIndex = path.lastIndexOf('.');
        if (dotIndex !== -1) {
            path = path.substring(0, dotIndex);
        }
        
        return path;
    } catch (e) {
        return null;
    }
}

export async function POST(req: Request) {
    try {
        const { urls } = await req.json();

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json({ error: 'Missing or invalid urls array' }, { status: 400 });
        }

        const deletePromises = urls.map(async (url) => {
            const publicId = extractPublicId(url);
            if (publicId) {
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (err) {
                    console.error(`Failed to delete Cloudinary image: ${publicId}`, err);
                }
            }
        });

        await Promise.all(deletePromises);

        return NextResponse.json({ success: true, message: 'Images deleted successfully' });
    } catch (error) {
        console.error('Error in cloudinary delete route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

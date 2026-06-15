import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const path = request.nextUrl.searchParams.get('path');
  
  if (tag) {
    // @ts-ignore
    revalidateTag(tag);
  }
  
  if (path) {
    revalidatePath(path);
  }
  
  return NextResponse.json({ revalidated: true, tag, path, now: Date.now() });
}

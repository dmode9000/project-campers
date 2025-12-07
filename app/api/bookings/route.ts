import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json();
  const endpoint = process.env.NEXT_PUBLIC_BOOKINGS_API;

  if (endpoint) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Booking proxy failed', error);
    }
  }

  return NextResponse.json({ success: true });
}

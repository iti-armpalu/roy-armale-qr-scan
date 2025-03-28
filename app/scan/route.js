import { NextResponse } from 'next/server';

export async function GET() {
  const url = new URL(process.env.NEXT_PUBLIC_LOG_SHEET_URL);
  url.searchParams.set('type', 'qr-scan');

  fetch(url.toString(), {
    method: 'GET',
    mode: 'no-cors',
  });

  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL));
}

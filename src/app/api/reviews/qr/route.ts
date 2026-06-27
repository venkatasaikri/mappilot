import { NextResponse } from 'next/server';

export async function GET() {
  // Stub: Generate a mock QR code image URL or payload based on the business's funnel settings.
  return NextResponse.json({ 
    destination: "https://g.page/r/Cdf342s/review",
    funnelType: "Interceptor",
    qrImageUrl: "https://mock-qr-service.com/qr/12345.png"
  });
}

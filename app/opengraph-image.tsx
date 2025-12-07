import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6f452aff 0%, #32573aff 100%)',
          color: 'white',
          fontSize: 72,
          fontFamily: 'Nunito Sans, Inter, sans-serif',
          fontWeight: 700,
        }}
      >
        TravelTrucks - Camper Rental
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

import type { Metadata } from 'next';
import { Inter, Nunito_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import ScrollToTopBtn from '@/components/ScrollToTopBtn/ScrollToTopBtn';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import { NextIntlClientProvider } from 'next-intl';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TravelTrucks - Camper Rental',
  description:
    'TravelTrucks — your go-to service for camper rentals. Browse our wide catalog, book online, and hit the road for your next adventure!',
  openGraph: {
    type: 'website',
    url: 'https://project-campers.vercel.app',
    title: 'TravelTrucks - Camper Rental',
    description:
      'TravelTrucks — your go-to service for camper rentals. Browse our wide catalog, book online, and hit the road for your next adventure!',
    images: [
      {
        url: 'https://project-campers.vercel.app/img/hero-camper.jpg',
        width: 1200,
        height: 630,
        alt: 'TravelTrucks - Camper Rental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TravelTrucks - Camper Rental',
    description:
      'TravelTrucks — your go-to service for camper rentals. Browse our wide catalog, book online, and hit the road for your next adventure!',
    images: ['https://project-campers.vercel.app/img/hero-camper.jpg'],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${nunitoSans.variable}`}>
        <NextIntlClientProvider>
          <TanStackProvider>
            <Header />
            <main>{children}</main>
            {modal}
            <ScrollToTopBtn />
            <div id="modal-root"></div>
          </TanStackProvider>
        </NextIntlClientProvider>
        <CookieBanner />
      </body>
    </html>
  );
}

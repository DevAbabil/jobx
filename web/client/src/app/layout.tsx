import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Analytics, Footer, Header } from '@/components';
import ReduxProvider from '@/providers/redux-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JobX - AI-Powered Job Application Automation',
  description:
    'Automate your job hunt with AI-powered CLI tool. Generate personalized emails, track applications with Google Sheets',
  openGraph: {
    title: 'JobX - AI-Powered Job Application Automation',
    description:
      'Automate your job hunt with AI-powered CLI tool. Generate personalized emails, track applications with Google Sheets',
    url: 'https://jobx.devababil.com',
    siteName: 'JobX',
    images: [
      {
        url: 'https://api.devababil.com/v1/assets/share/69279b1ff0138b6121267fbd',
        width: 1200,
        height: 630,
        alt: 'JobX - AI-Powered Job Application Automation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JobX - AI-Powered Job Application Automation',
    description:
      'Automate your job hunt with AI-powered CLI tool. Generate personalized emails, track applications with Google Sheets',
    images: [
      'https://api.devababil.com/v1/assets/share/69279b1ff0138b6121267fbd',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}

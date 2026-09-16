import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Botanic - Landscaping & Garden Design',
  description: 'Turn your backyard into something truly extraordinary with Botanic.',
  openGraph: {
    title: 'Botanic - Landscaping & Garden Design',
    description: 'Turn your backyard into something truly extraordinary with Botanic.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Botanic - Landscaping & Garden Design',
    description: 'Turn your backyard into something truly extraordinary with Botanic.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black text-white antialiased selection:bg-[#eae8d8] selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}

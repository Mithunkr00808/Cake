import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sliceofcake.in"),
  title: {
    default: "Slice of Cake – Premium Cakes & Bakery in Thrissur, Kerala",
    template: "%s | Slice of Cake",
  },
  description:
    "Order premium handcrafted cakes online from Slice of Cake, Thrissur. Custom birthday cakes, wedding cakes, cupcakes & pastries. Layered in love, delivered fresh to your doorstep across Kerala.",
  keywords: [
    "cake shop online",
    "order cake online",
    "birthday cakes Thrissur",
    "custom cakes Kerala",
    "bakery near me",
    "premium cakes",
    "wedding cake Thrissur",
    "cupcakes Kerala",
    "cake delivery Thrissur",
    "Slice of Cake",
  ],
  authors: [{ name: "Slice of Cake" }],
  creator: "Slice of Cake",
  publisher: "Slice of Cake",
  icons: {
    icon: "/assets/images/favicon.png",
    apple: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sliceofcake.in",
    siteName: "Slice of Cake",
    title: "Slice of Cake – Premium Cakes & Bakery in Thrissur, Kerala",
    description:
      "Order premium handcrafted cakes online from Slice of Cake, Thrissur. Custom birthday cakes, wedding cakes, cupcakes & pastries delivered fresh.",
    images: [
      {
        url: "/assets/images/main-slider/slide_2.jpg",
        width: 1200,
        height: 630,
        alt: "Slice of Cake – Premium Bakery in Thrissur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slice of Cake – Premium Cakes & Bakery in Thrissur",
    description:
      "Order premium handcrafted cakes online. Custom birthday cakes, wedding cakes & pastries delivered fresh across Kerala.",
    images: ["/assets/images/main-slider/slide_2.jpg"],
  },
  alternates: {
    canonical: "https://sliceofcake.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Food & Beverage",
};

// JSON-LD Structured Data
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Slice of Cake",
  url: "https://sliceofcake.in",
  description:
    "Premium handcrafted cakes and bakery in Thrissur, Kerala. Order online for delivery.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://sliceofcake.in/shop?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const bakeryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Slice of Cake",
  url: "https://sliceofcake.in",
  logo: "https://sliceofcake.in/assets/images/favicon.png",
  image: "https://sliceofcake.in/assets/images/main-slider/slide_2.jpg",
  description:
    "Premium handcrafted cakes and bakery in Thrissur, Kerala. Custom birthday cakes, wedding cakes, cupcakes & pastries.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thrissur",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "10.5276",
    longitude: "76.2144",
  },
  priceRange: "₹₹",
  servesCuisine: "Bakery",
  hasMenu: "https://sliceofcake.in/shop",
  sameAs: [],
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Preloader from "@/components/layout/Preloader";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import SiteAccessControl from "@/components/common/SiteAccessControl";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import { getCachedSettings } from "@/lib/db/cache";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isLive = true;
  let facebook = "#";
  let instagram = "#";

  try {
    const data = await getCachedSettings();
    if (data) {
      if (typeof data.isLive === 'boolean') {
        isLive = data.isLive;
      }
      if (typeof data.facebook === 'string') {
        facebook = data.facebook;
      }
      if (typeof data.instagram === 'string') {
        instagram = data.instagram;
      }
    }
  } catch (error) {
    console.error("Error fetching settings for layout:", error);
  }

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Helper function to prefix assets path */}
        {/* Google Fonts – Non-blocking load with preconnect */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Roboto:wght@300;400;500;700&family=Leckerli+One&family=Merienda+One&display=swap" rel="stylesheet" />
        
        {/* Stylesheets */}
        <link href="/assets/css/bootstrap.css" rel="stylesheet" />

        <link href="/assets/css/style.css" rel="stylesheet" />
        <link href="/assets/css/responsive.css" rel="stylesheet" />
        <link href="/assets/css/fontawesome-all.css" rel="stylesheet" />
        <link href="/assets/css/flaticon.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" rel="stylesheet" />
      </head>
      <body>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...bakeryJsonLd,
              sameAs: [facebook, instagram].filter((url) => url !== "#"),
            }),
          }}
        />
        <div className="page-wrapper">
          <AuthProvider>
            <CartProvider>
              <SiteAccessControl isLive={isLive}>
                <Preloader />
                <Header />
                {children}
                <ConditionalFooter isLive={isLive}>
                  <Footer facebook={facebook} instagram={instagram} />
                </ConditionalFooter>
                <Toaster position="bottom-right" reverseOrder={false} />
              </SiteAccessControl>
            </CartProvider>
          </AuthProvider>
        </div>

        {/* Scripts */}
        <Script src="/assets/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/assets/js/popper.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />

        {/* Revolution Slider */}



        <Script src="/assets/js/jquery.fancybox.js" strategy="afterInteractive" />
        <Script src="/assets/js/owl.js" strategy="afterInteractive" />
        <Script src="/assets/js/wow.js" strategy="afterInteractive" />
        <Script src="/assets/js/appear.js" strategy="afterInteractive" />
        <Script src="/assets/js/script.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

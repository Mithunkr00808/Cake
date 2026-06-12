import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slice of Cake - Layered in love",
  description: "Slice of Cake - Layered in love",
  icons: {
    icon: "/assets/images/favicon.png",
  },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Helper function to prefix assets path */}
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css?family=ABeeZee:400,400i|Roboto:300,400,500,700|Leckerli+One|Merienda+One&display=swap" rel="stylesheet" />
        
        {/* Stylesheets */}
        <link href="/assets/css/bootstrap.css" rel="stylesheet" />

        <link href="/assets/css/style.css" rel="stylesheet" />
        <link href="/assets/css/responsive.css" rel="stylesheet" />
        <link href="/assets/css/fontawesome-all.css" rel="stylesheet" />
        <link href="/assets/css/flaticon.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" rel="stylesheet" />
      </head>
      <body>
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

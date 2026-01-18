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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <link href="/assets/plugins/revolution/css/settings.css" rel="stylesheet" type="text/css" />
        <link href="/assets/plugins/revolution/css/layers.css" rel="stylesheet" type="text/css" />
        <link href="/assets/plugins/revolution/css/navigation.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/style.css" rel="stylesheet" />
        <link href="/assets/css/responsive.css" rel="stylesheet" />
        <link href="/assets/css/fontawesome-all.css" rel="stylesheet" />
        <link href="/assets/css/flaticon.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" rel="stylesheet" />
      </head>
      <body>
        <div className="page-wrapper">
          <Preloader />
          <Header />
          {children}
          <Footer />
        </div>

        {/* Scripts */}
        <Script src="/assets/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/assets/js/popper.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />

        {/* Revolution Slider */}
        <Script src="/assets/plugins/revolution/js/jquery.themepunch.revolution.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/jquery.themepunch.tools.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/extensions/revolution.extension.actions.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/extensions/revolution.extension.carousel.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/extensions/revolution.extension.kenburn.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/extensions/revolution.extension.layeranimation.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/extensions/revolution.extension.migration.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/extensions/revolution.extension.navigation.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/extensions/revolution.extension.parallax.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/extensions/revolution.extension.slideanims.min.js" strategy="afterInteractive" />
        <Script src="/assets/plugins/revolution/js/extensions/revolution.extension.video.min.js" strategy="afterInteractive" />


        <Script src="/assets/js/jquery.fancybox.js" strategy="afterInteractive" />
        <Script src="/assets/js/owl.js" strategy="afterInteractive" />
        <Script src="/assets/js/wow.js" strategy="afterInteractive" />
        <Script src="/assets/js/appear.js" strategy="afterInteractive" />
        <Script src="/assets/js/script.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

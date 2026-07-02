import 'katex/dist/katex.min.css';
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { siteConfig } from "../siteConfig";
import SplashScreen from "../components/SplashScreen";
import MobileBackButton from '../components/MobileBackButton';
import Banner from '../components/Banner';
import BannerTitle from '../components/BannerTitle';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.bio,
  icons: {
    icon: siteConfig.faviconUrl,
    apple: siteConfig.faviconUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <style
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              #app-mount-root { opacity: 0; visibility: hidden; pointer-events: none; }
              html.splash-seen #app-mount-root { opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }
            `
          }}
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('hasSeenSplash') === 'true') {
                  document.documentElement.classList.add('splash-seen');
                }
              } catch (e) {}
            `
          }}
        />
      </head>

      <body className="w-screen overflow-x-hidden min-h-full flex flex-col relative transition-colors duration-1000 bg-[#e0e0e0] dark:bg-[#121212] font-serif">
        <ThemeProvider>
          <SplashScreen />

          <div id="app-mount-root" className="flex-1 flex flex-col transition-opacity duration-1000">
            
            <div className="fixed top-0 left-0 w-full h-[50vh] z-0 overflow-hidden">
              <Banner />
              <BannerTitle />
            </div>

            <div className="relative z-10 mt-[50vh] bg-[#e0e0e0] dark:bg-[#121212] min-h-screen">
              <div className="relative z-10 flex-1 flex flex-col">
                {children}
              </div>
              <div className="md:hidden block">
                <MobileBackButton />
              </div>
            </div>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
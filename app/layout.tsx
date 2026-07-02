import 'katex/dist/katex.min.css';
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { siteConfig } from "../siteConfig";
import SplashScreen from "../components/SplashScreen";

import MobileBackButton from '../components/MobileBackButton';

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

      <body className="w-screen overflow-x-hidden min-h-full flex flex-col relative transition-colors duration-1000 bg-slate-50 dark:bg-slate-950 font-serif">
        <ThemeProvider>

          <SplashScreen />

          <div id="app-mount-root" className="flex-1 flex flex-col transition-opacity duration-1000">
              <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
                {/* Chr (2026年06月29日): 全站统一使用静态背景图，并随日夜主题切换。 */}
                <img
                  src="/images/backgrounds/site-background-day.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-700 dark:opacity-0"
                />
                <img
                  src="/images/backgrounds/site-background.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 dark:opacity-100"
                />
                <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/55 transition-colors duration-700"></div>
              </div>

              <div className="relative z-10 flex-1 flex flex-col">
                {children}
              </div>

              <div className="md:hidden block">
                <MobileBackButton />
              </div>

          </div>

          {/* 隐藏赛博猫 */}
          {/* <div className="hidden md:block">
            <CyberCat />
          </div> */}

        </ThemeProvider>
      </body>
    </html>
  );
}

// components/Banner.tsx
'use client';

import { useTheme } from './ThemeProvider';
import { useState, useEffect } from 'react';

export default function Banner() {
  const { isDark } = useTheme();
  const [currentImage, setCurrentImage] = useState(isDark ? 'dark' : 'light');
  const [fade, setFade] = useState(true);

  // 当主题变化时，切换图片（带淡出淡入效果）
  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => {
      setCurrentImage(isDark ? 'dark' : 'light');
      setFade(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [isDark]);

  const imageSrc =
    currentImage === 'dark'
      ? '/images/backgrounds/site-background.png'
      : '/images/backgrounds/site-background-day.png';

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={imageSrc}
        alt="Banner"
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* 可选：添加一个渐变遮罩，让文字更清晰（可根据需要调整） */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

/*
  Lightweight page transition: crossfade on route change.
  Wraps children and fades out on navigation, fades in on new page.
  To remove: just unwrap this component from layout.tsx.
*/

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      // New route loaded — fade in
      setIsVisible(false);
      // Force a reflow then fade in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <div
      className="transition-opacity duration-500 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {children}
    </div>
  );
}

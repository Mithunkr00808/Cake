"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SiteAccessControl({
  isLive,
  children,
}: {
  isLive: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isRestrictedPath =
    !pathname?.startsWith("/admin") &&
    !pathname?.startsWith("/api") &&
    pathname !== "/";

  useEffect(() => {
    if (!isLive && isRestrictedPath) {
      router.replace("/");
    }
  }, [isLive, isRestrictedPath, router]);

  // To prevent hydration mismatch, only render block after mount if needed.
  if (!isLive && isRestrictedPath && mounted) {
    return (
      <div style={{ display: 'flex', minHeight: '50vh', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#ff7a7a', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></span>
          <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#ff7a7a', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '0.2s' }}></span>
          <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#ff7a7a', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '0.4s' }}></span>
        </div>
      </div>
    );
  }

  // Before hydration, we return children. But the UI flash is minimal since useEffect will redirect.
  // We avoid returning null initially to prevent hydration errors for layouts.
  return <>{children}</>;
}

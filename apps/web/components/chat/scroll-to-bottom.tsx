'use client';

import { useEffect, useRef } from 'react';

export function ScrollToBottom({ deps = [] }: { deps?: any[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, deps);

  return <div ref={bottomRef} />;
}

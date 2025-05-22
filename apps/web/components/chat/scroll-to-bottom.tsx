'use client';

import { useEffect, useRef } from 'react';

export function ScrollToBottom() {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return <div ref={bottomRef} />;
}

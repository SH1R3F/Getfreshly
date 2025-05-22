'use client';

import { useEffect, useRef } from 'react';

export function ScrollToBottom<T>({ deps = [] }: { deps?: readonly T[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, deps);

  return <div ref={bottomRef} />;
}

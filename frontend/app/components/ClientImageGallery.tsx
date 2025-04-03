'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with no SSR to avoid hydration issues
const ImageGallery = dynamic(() => import('./ImageGallery'), {
  ssr: false
});

export default function ClientImageGallery() {
  return <ImageGallery />;
} 
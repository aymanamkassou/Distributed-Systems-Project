'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { UnsplashImage } from '../types/unsplash';

export default function ImageGallery() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/unsplash');
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred fetching images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Memoize the image gallery to prevent unnecessary re-renders
  const imageGallery = useMemo(() => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64"
          >
            <Image
              src={image.urls.regular}
              alt={image.alt_description || 'Unsplash image'}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={false}
              className="hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-sm truncate">
                Photo by {image.user.name}
              </p>
              <p className="text-xs">
                {image.likes} likes
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }, [images]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading images...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Unsplash Top Images</h1>
      {imageGallery}
    </div>
  );
} 
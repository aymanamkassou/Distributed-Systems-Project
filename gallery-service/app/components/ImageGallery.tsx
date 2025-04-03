'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { MongoImage } from '../types/image';

interface ImageGalleryProps {
  initialImages: MongoImage[];
}

export default function ImageGallery({ initialImages }: ImageGalleryProps) {
  const [images, setImages] = useState<MongoImage[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the gallery component to prevent unnecessary re-renders
  const gallery = useMemo(() => {
    if (images.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">No images found in the database.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-64 w-full">
              <Image
                src={image.urls.regular}
                alt={image.altDescription || image.description || 'Unsplash image'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">
                Photo by <span className="font-medium">{image.user.name}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {image.likes} likes • ID: {image.unsplashId.substring(0, 8)}...
              </p>
              {image.description && (
                <p className="mt-2 text-sm line-clamp-2 text-gray-700">
                  {image.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }, [images]);

  if (loading) {
    return <div className="text-center py-10">Loading images...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {gallery}
    </div>
  );
} 
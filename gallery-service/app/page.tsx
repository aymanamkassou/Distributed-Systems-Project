'use client';

import { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery';
import SyncButton from './components/SyncButton';
import { getImagesFromDB } from './services/imageService';
import { MongoImage } from './types/image';

export default function GalleryPage() {
  const [images, setImages] = useState<MongoImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedImages = await getImagesFromDB();
      setImages(fetchedImages);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">MongoDB Gallery</h1>
          <p className="text-gray-600 mb-8">
            Viewing images stored in MongoDB from Unsplash API
          </p>
          <SyncButton onSuccess={fetchImages} />
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading images...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        ) : (
          <ImageGallery initialImages={images} />
        )}
      </div>
    </div>
  );
} 
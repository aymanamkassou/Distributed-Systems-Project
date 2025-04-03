import React from 'react';
import ClientImageGallery from './components/ClientImageGallery';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Unsplash Image Gallery</h1>
        <p className="text-gray-600 mt-2">
          Displaying the top 10 images from Unsplash
        </p>
      </header>
      
      <main>
        <ClientImageGallery />
      </main>
      
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Unsplash Image Gallery. All rights reserved.</p>
      </footer>
    </div>
  );
}

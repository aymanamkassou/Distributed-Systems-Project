'use client';

import { useState } from 'react';
import { fetchAndStoreImages } from '../services/imageService';

interface SyncButtonProps {
  onSuccess: () => void;
}

export default function SyncButton({ onSuccess }: SyncButtonProps) {
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setMessage(null);
    setError(null);

    try {
      const result = await fetchAndStoreImages(10);

      if (result.success) {
        setMessage(result.message);
        onSuccess();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to sync images. Please try again.');
      console.error('Error in sync:', err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={handleSync}
        disabled={syncing}
        className={`px-4 py-2 rounded-md font-medium ${
          syncing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-blue-700 active:bg-blue-800'
        } transition-colors`}
      >
        {syncing ? 'Syncing...' : 'Sync Images from Unsplash'}
      </button>

      {message && (
        <div className="mt-2 p-2 bg-green-100 text-green-800 rounded-md text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 
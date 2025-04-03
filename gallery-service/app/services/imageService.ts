import { MongoImage } from '../types/image';

const IMAGE_SERVICE_URL = process.env.IMAGE_SERVICE_URL || 'http://localhost:3001';

export const getImagesFromDB = async (): Promise<MongoImage[]> => {
  try {
    const response = await fetch(`${IMAGE_SERVICE_URL}/api/images`, {
      cache: 'no-store', // Equivalent to getServerSideProps
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching images from DB:', error);
    return [];
  }
};

export const fetchAndStoreImages = async (count = 10): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${IMAGE_SERVICE_URL}/api/images/fetch-and-store?count=${count}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch and store images: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || 'Successfully fetched and stored images',
    };
  } catch (error) {
    console.error('Error fetching and storing images:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}; 
import axios from 'axios';
import config from '../config';

export const fetchTopUnsplashImages = async (count = 10) => {
  try {
    if (!config.unsplashAccessKey) {
      throw new Error('Unsplash API access key is not configured');
    }

    const response = await axios.get(`${config.unsplashApiUrl}/photos`, {
      params: {
        per_page: count,
        order_by: 'popular'
      },
      headers: {
        'Authorization': `Client-ID ${config.unsplashAccessKey}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    throw error;
  }
}; 
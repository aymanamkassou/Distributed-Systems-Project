import express, { Request, Response } from 'express';
import { fetchTopUnsplashImages } from '../services/unsplashService';
import { storeImage, getAllImages, getImageById } from '../services/imageDbService';

const router = express.Router();

// Route to fetch and store top Unsplash images
router.get('/fetch-and-store', async (req: Request, res: Response) => {
  try {
    const count = req.query.count ? parseInt(req.query.count as string) : 10;
    const unsplashImages = await fetchTopUnsplashImages(count);
    
    const storedImages = [];
    for (const image of unsplashImages) {
      const storedImage = await storeImage(image);
      storedImages.push(storedImage);
    }
    
    res.status(200).json({
      message: `Successfully fetched and stored ${storedImages.length} images`,
      images: storedImages
    });
  } catch (error) {
    console.error('Error in fetch-and-store route:', error);
    res.status(500).json({ 
      error: 'Failed to fetch and store images',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Route to get all stored images
router.get('/', async (req: Request, res: Response) => {
  try {
    const images = await getAllImages();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching all images:', error);
    res.status(500).json({ 
      error: 'Failed to fetch images',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Route to get a specific image by ID - fixed to avoid TypeScript error
router.get('/:id', (req: Request, res: Response) => {
  getImageById(req.params.id)
    .then(image => {
      if (!image) {
        res.status(404).json({ error: 'Image not found' });
        return;
      }
      res.status(200).json(image);
    })
    .catch(error => {
      console.error(`Error fetching image with ID ${req.params.id}:`, error);
      res.status(500).json({ 
        error: 'Failed to fetch image',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    });
});

export default router; 
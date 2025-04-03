import ImageModel, { IImage } from '../models/ImageModel';

export const storeImage = async (imageData: any) => {
  try {
    // Check if image already exists
    const existingImage = await ImageModel.findOne({ unsplashId: imageData.id });
    
    if (existingImage) {
      // Update existing image
      existingImage.description = imageData.description;
      existingImage.altDescription = imageData.alt_description;
      existingImage.likes = imageData.likes;
      existingImage.updatedAt = new Date();
      await existingImage.save();
      return existingImage;
    }

    // Create new image document
    const newImage = new ImageModel({
      unsplashId: imageData.id,
      description: imageData.description,
      altDescription: imageData.alt_description,
      width: imageData.width,
      height: imageData.height,
      urls: {
        raw: imageData.urls.raw,
        full: imageData.urls.full,
        regular: imageData.urls.regular,
        small: imageData.urls.small,
        thumb: imageData.urls.thumb,
      },
      user: {
        id: imageData.user.id,
        username: imageData.user.username,
        name: imageData.user.name,
      },
      likes: imageData.likes,
    });

    await newImage.save();
    return newImage;
  } catch (error) {
    console.error('Error storing image in database:', error);
    throw error;
  }
};

export const getAllImages = async () => {
  try {
    return await ImageModel.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error retrieving images from database:', error);
    throw error;
  }
};

export const getImageById = async (id: string) => {
  try {
    return await ImageModel.findById(id);
  } catch (error) {
    console.error(`Error retrieving image with ID ${id}:`, error);
    throw error;
  }
}; 
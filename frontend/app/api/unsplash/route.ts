import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Instead of fetching directly from Unsplash, get images from the image service
    const imageServiceUrl = process.env.IMAGE_SERVICE_URL || 'http://image-service:3001';
    
    const response = await axios.get(`${imageServiceUrl}/api/images`);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching images from image service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images from image service' },
      { status: 500 }
    );
  }
} 
export interface MongoImage {
  _id: string;
  unsplashId: string;
  description: string | null;
  altDescription: string | null;
  width: number;
  height: number;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
  };
  likes: number;
  createdAt: string;
  updatedAt: string;
} 
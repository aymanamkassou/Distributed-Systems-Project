import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema: Schema = new Schema({
  unsplashId: { type: String, required: true, unique: true },
  description: { type: String },
  altDescription: { type: String },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  urls: {
    raw: { type: String, required: true },
    full: { type: String, required: true },
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  user: {
    id: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
  },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IImage>('Image', ImageSchema); 
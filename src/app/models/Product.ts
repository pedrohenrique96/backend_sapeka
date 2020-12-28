import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  image: string;
  description: string;
  price: number;
}

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
  },
  {
    timestamps: true,
  },
);

export default model<IProduct>('Product', ProductSchema);
